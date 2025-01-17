import { Request, Response } from "express";
import { blogs } from "../express";
import { BlogModel } from "../models/blogModel";

export const getBlogs = (req: Request, res: Response) => {
  res.status(200).json(blogs);
};

export const postBlogs = (req: Request, res: Response) => {
  const { title, username, description, content } = req.body;
  const id = blogs.length + 1;
  const newItem = new BlogModel(id, title, username, description, content);
  blogs.push(newItem);
  res.status(201).json(newItem);
};

export const getBlogSingle = (req: Request, res: Response) => {
  const item = blogs.find((i) => i.id === parseInt(req.params.id));
  if (!item) res.status(404).send("Item not found");
  res.status(200).json(item);
};

export const editBlog = (req: Request, res: Response) => {
  const item = blogs.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).send("Item not found");
    return;
  }
  //console.log(item);
  const { title, username, description, content } = req.body;
  item.username = username;
  item.title = title;
  item.description = description;
  item.content = content;

  //console.log(item);
  res.status(200).json(item);
};

export const deleteBlog = (req: Request, res: Response) => {
  const index = blogs.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send("Item not found");
    return;
  }
  blogs.splice(index, 1);
  res.status(204).send();
};
