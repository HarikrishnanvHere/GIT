import express, { Request, Response } from "express";
const app = express();
app.use(express.json());

import { BlogModel } from "./models/blogModel";
import { userModel } from "./models/userModel";

export const blogs: BlogModel[] = [];
export const users: userModel[] = [];

import { router as blogRoutes } from "./routes/blogRoutes";
import { router as userRoutes } from "./routes/userRoutes";

app.use("/read", blogRoutes);
app.use("/user", userRoutes);

const server = app.listen(3000, () => {
  console.log("Listening on port 3000!");
});

//server.close();

export default app;
