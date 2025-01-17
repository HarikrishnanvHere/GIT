import { blogs } from "../express";

export class BlogModel {
  public id: number;
  public title: string;
  public username: string;
  public description: string;
  public content: string;

  constructor(
    id: number,
    title: string,
    username: string,
    description: string,
    content: string
  ) {
    (this.id = id),
      (this.username = username),
      (this.title = title),
      (this.content = content),
      (this.description = description);
  }
}
