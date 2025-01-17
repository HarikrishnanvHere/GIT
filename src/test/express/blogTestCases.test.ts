import request from "supertest";
import app from "../../app/express/express";

describe("CRUD API Tests", () => {
  describe("Testing GET /blogs API", () => {
    it("should return an empty array initially", async () => {
      const res = await request(app).get("/read/blogs");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe("Testing POST /blogs API", () => {
    it("should create a new item", async () => {
      const res = await request(app).post("/read/blogs").send({
        title: "New Blog",
        username: "Hari",
        description: "My First blog",
        content:
          "This is my first blog. I am now testing the post blog functionality of the app",
      });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.title).toBe("New Blog");
    });
  });

  describe("Testing GET /blogs/:id API", () => {
    it("should return the blog with the given ID", async () => {
      const res = await request(app).get("/read/blogs/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        id: 1,
        title: "New Blog",
        username: "Hari",
        description: "My First blog",
        content:
          "This is my first blog. I am now testing the post blog functionality of the app",
      });
    });

    it("should return 404 if the item is not found", async () => {
      const res = await request(app).get("/read/blogs/999");
      expect(res.status).toBe(404);
    });
  });

  describe("Testing PUT /blogs/:id API", () => {
    it("should update the blog with the given ID", async () => {
      const res = await request(app).put("/read/blogs/1").send({
        title: "Second Blog",
        username: "Harikrishnan",
        description: "My Second blog",
        content:
          "This is my second blog. I am now testing the update functionality of the app",
      });
      expect(res.status).toBe(200);
      expect(res.body.title).toBe("Second Blog");
    });

    it("should return 404 if the item is not found", async () => {
      const res = await request(app)
        .put("/read/blogs/999")
        .send({ name: "Nonexistent Item" });
      expect(res.status).toBe(404);
    });
  });

  describe("Testing DELETE /blogs/:id API", () => {
    it("should delete the item with the given ID", async () => {
      const res = await request(app).delete("/read/blogs/1");
      expect(res.status).toBe(204);
    });

    it("should return 404 if the item is not found", async () => {
      const res = await request(app).delete("/read/blogs/999");
      expect(res.status).toBe(404);
    });
  });
});

