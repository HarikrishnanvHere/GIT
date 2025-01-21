import request from "supertest";
import app from "../../express/app/express";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { sequelize } from "../../express/app/database/database";

jest.mock("jsonwebtoken", () => ({
  sign: () => {
    return "123";
  },
  verify: () => {
    return {
      userId: 1,
    };
  },
}));

describe("APT Tests for User Registration and Login", () => {
  describe("TestCase for Creation of User", () => {
    it("should create the user and return the created data", async () => {
      const actual = await request(app).post("/user/createUser").send({
        name: "Harikrishnan",
        email: "harikrishnanv.rko@gmail.com",
        password: "abc",
      });
      expect(actual.status).toBe(200);
      expect(actual.body.name).toBe("Harikrishnan");
    });

    it("should return 404 status and appropriate message if the user-details are absent", async () => {
      const actual = await request(app).post("/user/createUser").send({
        email: "harikrishnanv.rko@gmail.com",
        password: "abc",
      });
      expect(actual.status).toBe(404);
    });
  });

  describe("TestCase for Creation of User", () => {
    // afterAll(() => {
    //   sequelize.close();
    // });

    it("should return a token if a valid user tries to log in", async () => {
      const actual = await request(app).post("/user/validateUser").send({
        email: "harikrishnanv.rko@gmail.com",
        password: "abc",
      });
      expect(actual.status).toBe(200);
      console.log(actual.body);
      expect(actual.body.token).toBe("123");
    });

    it("should return status 404 if an invalid user tries to log in", async () => {
      const actual1 = await request(app).post("/user/validateUser").send({
        password: "abc",
      });
      const actual2 = await request(app).post("/user/validateUser").send({
        email: "abc@gmail",
        password: "abc",
      });
      const actual3 = await request(app).post("/user/validateUser").send({
        email: "harikrishnanv.rko@gmail.com",
        password: "mnb",
      });
      expect(actual1.status).toBe(404);
      expect(actual2.status).toBe(404);
      expect(actual3.status).toBe(404);
    });
  });

  describe("Adding blogs", () => {
    it("should create a new blog", async () => {
      const res = await request(app)
        .post("/read/blogs")
        .set({ authorization: "abc" })
        .send({
          title: "New Blog",
          username: "Hari",
          description: "My First blog",
          content:
            "This is my first blog. I am now testing the post blog functionality of the app",
        });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body.title).toBe("New Blog");
    });
  });
  describe("Testing GET /blogs API", () => {
    it("should return list of blogs added", async () => {
      const res = await request(app)
        .get("/read/blogs")
        .set({ authorization: "abc" });
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe("Testing GET /blogs/:id API", () => {
    it("should return the blog with the given ID", async () => {
      const res = await request(app)
        .get("/read/blogs/1")
        .set({ authorization: "abc" });
      expect(res.status).toBe(200);
      expect(res.body.content).toBe(
        "This is my first blog. I am now testing the post blog functionality of the app"
      );
    });
  });
  describe("Testing PUT /blogs/:id API", () => {
    it("should update the blog with the given ID", async () => {
      const res = await request(app)
        .put("/read/blogs/1")
        .set({ authorization: "abc" })
        .send({
          title: "Second Blog",
          username: "Harikrishnan",
          description: "My Second blog",
          content:
            "This is my second blog. I am now testing the update functionality of the app",
        });
      console.log(res.body);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe("Second Blog");
    });
    it("should return 404 if the item is not found", async () => {
      const res = await request(app)
        .put("/read/blogs/999")
        .set({ authorization: "abc" })
        .send({ name: "Nonexistent Item" });
      expect(res.status).toBe(404);
    });
  });

  describe("Testing DELETE /blogs/:id API", () => {
    afterAll(() => {
      sequelize.close();
    });
    it("should delete the item with the given ID", async () => {
      const res = await request(app)
        .delete("/read/blogs/1")
        .set({ authorization: "abc" });
      expect(res.status).toBe(204);
    });
    it("should return 404 if the item is not found", async () => {
      const res = await request(app)
        .delete("/read/blogs/999")
        .set({ authorization: "abc" });
      expect(res.status).toBe(404);
    });
  });
});
