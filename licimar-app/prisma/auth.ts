import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient(); 

const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prismaClient), 
  providers: [],
});

export { handlers, auth, signIn, signOut };