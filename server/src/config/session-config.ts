import { PrismaStore } from "../prismaSessionStore";
import { prisma } from "../db";
import { Role } from "@prisma/client";

declare module "express-session" {
  interface SessionData {
    count?: number;
    userId: string | null | undefined;
    role: Role | null;
  }
}

export const expressSessionOptions = {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  store: new PrismaStore(prisma, { period: 1000 * 30 }),
  cookie: {
    maxAge: 1000 * 60 * 30,
    secure: process.env.USING_HTTPS === "true" ? true : false,
  },
};