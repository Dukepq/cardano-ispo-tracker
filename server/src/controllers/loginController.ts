import { prisma } from "../db";
import { Response, Request } from "express";
import { z } from "zod";

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(5),
  }),
});

export const handleLogin = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req);
  if (!result.success) {
    return res.status(400).json({ success: false });
  }
  try {
    const body = result.data.body;
    const userEmail = body.email;
    const userPassword = body.password;
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (user?.email === userEmail && user.password === userPassword) {
      return res.status(200).json({ success: true });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false });
  } finally {
    prisma.$disconnect();
  }
};
