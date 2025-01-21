import { User } from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(404).json({ message: "Details Not Valid" });
    return;
  }
  const hashrounds = 10;

  bcrypt.hash(password, hashrounds, async (err, hash: string) => {
    if (err) {
      console.log(err);
      res.send("SOmething went Wrong!!");
      res.end();
    }
    User.create({
      name: name,
      email: email,
      password: hash,
    }).then((newUser) => {
      //console.log(newUser.dataValues);
      res.status(200).json(newUser.dataValues);
    });
  });
};

function generateToken(id: Number) {
  const token: String = jwt.sign({ userId: id }, "harikrishnanv");
  return token;
}

export const validateUser = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;
    if (!email || !password) {
      res.status(404).json({ message: "Details Not Valid" });
      return;
    }
    const data: any = await User.findOne({ where: { email: email } });
    // console.log(data);
    if (!data) {
      res.status(404).json({ message: "Details Not Valid" });
      return;
    }
    //console.log(data);
    bcrypt.compare(password, data.password, (err, result: boolean) => {
      if (err) {
        return res
          .status(404)
          .json({ message: "Error Code 400 - User Not Found!" });
      } else if (result === true) {
        res.status(200).json({
          token: generateToken(data.id),
          message: "login successful!",
        });
      } else if (result === false) {
        res.status(404).json({ message: "User Not Authorized!" });
      }
    });
  } catch (err) {
    res.status(404).json({ err });
  }
};

// export const validateUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res.status(404).json({ message: "Details Not Valid" });
//     return;
//   }
//   const user = users.find((item) => {
//     return item.email == email;
//   });
//   if (!user) {
//     res.status(404).json({ message: "Details Not Valid" });
//     return;
//   }
//   if (user?.password === password) {
//     const token = v4();
//     res.status(200).json(token);
//   }
// };
