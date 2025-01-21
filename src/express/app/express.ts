import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

import { Blog } from "./models/blogModel";
import { User } from "./models/userModel";

Blog.belongsTo(User);
User.hasMany(Blog);

import { router as blogRoutes } from "./routes/blogRoutes";
import { router as userRoutes } from "./routes/userRoutes";
import { sequelize } from "./database/database";

app.use("/read", blogRoutes);
app.use("/user", userRoutes);

sequelize.sync({}).then(() => {
  const server = app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
  server.close();
});

export default app;
