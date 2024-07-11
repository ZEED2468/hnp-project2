const request = require("supertest");
const app = require("../server"); // Your server file path
const db = require("../Model");
const { v4: uuidv4 } = require("uuid");

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("User Endpoints", () => {
  let token;

  it("should register a new user", async () => {
    const res = await request(app).post("/auth/register").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      password: "password",
      phone: "1234567890",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
    token = res.body.data.accessToken;
  });

  it("should login a user", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "john@gmail.com",
      password: "password",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    token = res.body.data.accessToken;
  });

  it("should get user details", async () => {
    const res = await request(app)
      .get("/auth/users/7259dcd1-e8f4-44c2-87b6-2aeb577e5332") // Replace with actual user ID
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});
