import * as jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import cors from "cors";
import express, { Request, Response, NextFunction, Application } from "express";
const app: Application = express();
app.use(cors());

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const getUserAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("AuthToken is missing");
    }
    const userId = jwt.verify(token, "harikrishnanv") as jwt.JwtPayload;
    const id: number = userId.userId;
    //console.log(id);
    const currentUser = await User.findByPk(id);
    if (!currentUser) {
      throw new Error("AuthToken is missing");
    }
    req.user = currentUser;
    // console.log(currentUser);
    next();
  } catch (err) {
    //console.log(err);
    res.status(401).json({ err });
  }
};
