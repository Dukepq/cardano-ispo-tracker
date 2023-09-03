import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
export const isAuthAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!!req.session.userId && req.session.role === "ADMIN") {
    return next();
  }
  return res.status(401).json({ success: false, message: "unauthorized" });
};

export const isAuth = (role: Role) => {
  console.log("returning auth function -->");
  return (req: Request, res: Response, next: NextFunction) => {
    if (!!req.session.userId && req.session.role === role) {
      return next();
    }
    return res.status(401).json({ success: false, message: "unauthorized" });
  };
};
