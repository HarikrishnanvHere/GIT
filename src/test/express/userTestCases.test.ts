import request from "supertest";
import app from "../../app/express/express";

jest.mock("uuid", () => ({
  v4: () => {
    return "123";
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

  it("should return a token if a valid user tries to log in", async () => {
    const actual = await request(app).post("/user/validateUser").send({
      email: "harikrishnanv.rko@gmail.com",
      password: "abc",
    });
    expect(actual.status).toBe(200);
    console.log(actual.body);
    expect(actual.body).toBe("123");
  });

  it("should return status 400 if an ivalid user tries to log in", async () => {
    const actual1 = await request(app).post("/user/validateUser").send({
      password: "abc",
    });
    const actual2 = await request(app).post("/user/validateUser").send({
      email: "abc@gmail",
      password: "abc",
    });
    expect(actual1.status).toBe(404);
    expect(actual2.status).toBe(404);
  });
});
