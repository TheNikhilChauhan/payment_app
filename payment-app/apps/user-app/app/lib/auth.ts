import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@repo/db/client";

interface Credentials {
  phone: string;
  password: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "2344542",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials: Credentials) {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              number: existingUser.number,
            };
          }
          return null;
        }

        try {
          const newUser = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
            },
          });

          return {
            id: newUser.id.toString(),
            name: newUser.name,
            number: newUser.number,
          };
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",

  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
};
