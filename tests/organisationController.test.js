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

describe("Organisation Endpoints", () => {
  let token;
  let orgId;

  beforeAll(async () => {
    const userRes = await request(app).post("/auth/register").send({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@gmail.com",
      password: "password",
      phone: "1234567890",
    });
    token = userRes.body.data.accessToken;
  });

  it("should create a new organisation", async () => {
    const res = await request(app)
      .post("/api/organisations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "New Org",
        description: "A new organisation",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
    orgId = res.body.data.orgId;
  });

  it("should get user organisations", async () => {
    const res = await request(app)
      .get("/api/organisations")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should get a single organisation", async () => {
    const res = await request(app)
      .get(`/api/organisations/${orgId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should add a user to organisation", async () => {
    const res = await request(app)
      .post(`/api/organisations/${orgId}/users`)
      .set("Authorization", `Bearer ${token}`)
      .send({ userId: "7259dcd1-e8f4-44c2-87b6-2aeb577e5332" }); // Replace with actual user ID
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "User added to organisation successfully"
    );
  });
});
