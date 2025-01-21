import { sequelize } from "../database/database";

import Sequelize from "sequelize";

export const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// export class userModel {
//   public id: number;
//   public name: string;
//   public email: string;
//   public password: String;

//   constructor(id: number, name: string, email: string, password: string) {
//     this.id = id;
//     this.password = password;
//     this.name = name;
//     this.email = email;
//   }
// }
