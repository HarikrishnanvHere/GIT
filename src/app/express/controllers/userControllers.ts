import { userModel } from "../models/userModel";
import { users } from "../express";
import { Request, Response } from "express";
import { v4 } from "uuid";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(404).json({ message: "Details Not Valid" });
    return;
  }
  const id = users.length + 1;
  const user = new userModel(id, name, email, password);
  users.push(user);
  res.status(200).json(user);
};

export const validateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).json({ message: "Details Not Valid" });
    return;
  }
  const user = users.find((item) => {
    return item.email == email;
  });
  if (!user) {
    res.status(404).json({ message: "Details Not Valid" });
    return;
  }
  if (user?.password === password) {
    const token = v4();
    res.status(200).json(token);
  }
};
