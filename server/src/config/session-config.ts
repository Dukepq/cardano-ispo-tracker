import { PrismaStore } from "../prismaSessionStore";
import { prisma } from "../db";
import { Role } from "@prisma/client";
import session from "express-session";
import { CookieOptions } from "express-session";
import envHelper from "../utils/envHelper";

declare module "express-session" {
  interface SessionData {
    count?: number;
    userId: string | null | undefined;
    role: Role | null;
  }
}

const cookieOptions: CookieOptions = {
  maxAge: 1000 * 60 * 60,
  secure: process.env.USING_HTTPS === "true",
  sameSite: "lax",
  domain: process.env.DOMAIN || "localhost",
};

export const expressSessionOptions = {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  store: new PrismaStore(prisma, { period: 1000 * 30 }),
  rolling: true,
  cookie: cookieOptions,
};

const sessionMiddleware = session(expressSessionOptions);
export default sessionMiddleware;
