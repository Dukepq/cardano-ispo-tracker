import { PrismaStore } from "../prismaSessionStore";
import { prisma } from "../db";

export const expressSessionOptions = {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  store: new PrismaStore(prisma, { period: 1000 * 15 }),
  cookie: {
    maxAge: 1000 * 60,
    secure: process.env.USING_HTTPS === "true" ? true : false,
  },
};
