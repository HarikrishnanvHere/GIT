import { sequelize } from "../database/database";

import Sequelize from "sequelize";

const Blog = sequelize.define("blog", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export { Blog };

// import { blogs } from "../express";

// export class BlogModel {
//   public id: number;
//   public title: string;
//   public username: string;
//   public description: string;
//   public content: string;

//   constructor(
//     id: number,
//     title: string,
//     username: string,
//     description: string,
//     content: string
//   ) {
//     (this.id = id),
//       (this.username = username),
//       (this.title = title),
//       (this.content = content),
//       (this.description = description);
//   }
// }
