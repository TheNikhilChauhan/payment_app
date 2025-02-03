import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";

const Transfer = () => {
  return (
    <div>
      <AddMoney />
      <BalanceCard amount={200} locked={2} />
    </div>
  );
};

export default Transfer;
