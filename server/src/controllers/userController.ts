import { prisma } from "../db";
import { Response, Request } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(5),
  }),
});

export const loginUser = async (req: Request, res: Response) => {
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
    if (!user) return res.status(404).json({ success: false });
    if (
      user.email === userEmail &&
      (await bcrypt.compare(userPassword, user.password))
    ) {
      return res.status(200).json({ success: true });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false });
  } finally {
    prisma.$disconnect();
  }
};

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(5),
    name: z.string().min(2).max(15),
  }),
});

export const registerUser = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req);
  if (!result.success) {
    return res.status(400).json({ success: false });
  }
  try {
    const body = result.data.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });
    return res
      .status(200)
      .json({ success: true, message: `registered: ${user.email}` });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ success: false, message: "email likely already in use" });
  }
};

const deleteUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const deleteUser = async (req: Request, res: Response) => {
  const result = deleteUserSchema.safeParse(req);
  if (!result.success) {
    return res.status(400).json({ success: false });
  }
  try {
    const body = result.data.body;
    const user = await prisma.user.delete({
      where: {
        email: body.email,
      },
    });
    return res
      .status(200)
      .json({ success: true, message: `deleted: ${user.email}` });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ success: false, message: "failed to delete user" });
  }
};
