import { Request, Response } from "express";
import { Blog } from "../models/blogModel";

export const getBlog = async (req: Request, res: Response) => {
  const data = await Blog.findAll();
  //console.log(data);
  res.status(200).json(data);
};

export const postBlog = async (req: Request, res: Response) => {
  const { title, username, description, content } = req.body;
  const newBlog = await req.user.createBlog({
    title: title,
    username: username,
    description: description,
    content: content,
  });
  //console.log(newBlog);
  res.status(200).json(newBlog);
};

export const getBlogSingle = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = await Blog.findByPk(id);
  //console.log(item);
  if (!item) res.status(404).send("Item not found");
  res.status(200).json(item);
};

export const editBlog = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  //console.log(id);
  const item = await Blog.findByPk(id);
  //console.log(item);
  if (!item) {
    res.status(404).send("Item not found");
    return;
  }
  //console.log(item);
  const { title, username, description, content } = req.body;
  const newItem = {
    title: title,
    username: username,
    description: description,
    content: content,
  };
  //console.log(newItem);
  const updatedItem = await Blog.update(newItem, { where: { id: id } });
  //console.log(updatedItem);
  res.status(200).json(newItem);
};

export const deleteBlog = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  //console.log(id);
  const item = await Blog.findByPk(id);
  if (!item) {
    res.status(404).send("Item not found");
    return;
  }
  const deletedItem = await item?.destroy();
  res.status(204).send();
};

// export const deleteBlog = async (req: Request, res: Response) => {
//   const { itemId } = req.body;
//   const item = await Blog.findByPk(itemId);
//   const deletedItem = await item?.destroy();
//   console.log(deletedItem);
//   res.status(200).json({ message: "successfully deleted" });
// };
