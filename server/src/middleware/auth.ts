import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
export const isAuthAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.session);
  if (!!req.session?.userId && req.session?.role === "ADMIN") {
    return next();
  }
  return res.status(401).json({ success: false, message: "unauthorized" });
};

export const isAuth = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      req.session.userId &&
      req.session.role &&
      roles.includes(req.session.role)
    ) {
      console.log("authorized");
      return next();
    }
    console.log("not authorized");
    return res.status(401).json({ success: false, message: "unauthorized" });
  };
};
