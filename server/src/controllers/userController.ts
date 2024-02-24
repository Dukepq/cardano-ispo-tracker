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
      req.session.userId = user.id || null;
      req.session.role = user.role || null;
      return res
        .status(200)
        .json({ success: true, user: { email: user.email, name: user.name } });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "email or password incorrect" });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false });
  } finally {
    prisma.$disconnect();
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    req.session.userId = null;
    req.session.role = null;
    res.status(200).json({ success: true, message: "successfully logged out" });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ success: false });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const role = req.session.role;
    switch (role) {
      case "ADMIN": {
        res.status(200).json({ success: true, auth: "ADMIN" });
        break;
      }
      case "EDITOR": {
        res.status(200).json({ success: true, auth: "EDITOR" });
        break;
      }
      case "BASIC": {
        res.status(200).json({ success: true, auth: "BASIC" });
        break;
      }
      default: {
        res.status(200).json({ success: true, auth: null });
        break;
      }
    }
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, message: "something went wrong" });
  }
};

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(5),
    name: z.string().min(2).max(15),
    role: z
      .union([z.literal("BASIC"), z.literal("EDITOR"), z.literal("ADMIN")])
      .optional(),
  }),
});

export const registerUser = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req);
  if (!result.success) {
    return res.status(400).json({ success: false });
  }
  try {
    const body = result.data.body;
    const hashedPassword = await bcrypt.hash(body.password, 12);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
        role: body.role || undefined,
      },
    });
    return res
      .status(201)
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

const getUsersSchema = z.object({});

export async function getUsers(req: Request, res: Response) {
  try {
    const response = await prisma.user.findMany({
      orderBy: [{ email: "asc" }],
      select: {
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ success: false, message: "something went wrong" });
  }
}
