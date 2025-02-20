// types/next-auth.d.ts

import { DefaultSession } from "next-auth";

// Extending the default session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add id property to the user object
    } & DefaultSession["user"];
  }
}
