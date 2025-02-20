import { getServerSession } from "next-auth";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransaction } from "../../../components/OnRampTransaction";
import { authOptions } from "../../lib/auth";
import prisma from "../../../../../packages/db/src";

async function getBalance() {
  const session = await getServerSession(authOptions);

  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransaction() {
  const session = await getServerSession(authOptions);
  const trans = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return trans.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

const Transfer = async () => {
  const balance = await getBalance();
  const transactions = await getOnRampTransaction();
  console.log(balance);
  console.log(balance.amount, balance.locked);

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransaction transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
