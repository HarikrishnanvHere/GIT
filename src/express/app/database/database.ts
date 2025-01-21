import { Sequelize } from "sequelize";

const sequelize = new Sequelize("todo-app", "root", "johnwick1#1", {
  dialect: "mysql",
  host: "localhost",
});

export { sequelize };
