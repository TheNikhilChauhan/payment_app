import db from "../../../../packages/db/src";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        number: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      // TODO: User credentials type from next-aut
      async authorize(credentials) {
        const { number, password } = credentials as Record<
          "number" | "password",
          string
        >;
        const existingUser = await db.user.findFirst({
          where: {
            number: number,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number,
            };
          }
          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.number,
          };
        }

        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await db.user.create({
            data: {
              number: number,
              password: hashedPassword,
              Balance: {
                create: { amount: 0, locked: 0 },
              },
            },
            include: { Balance: true },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: { token: JWT; session: Session }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }

      return session;
    },
  },
};
