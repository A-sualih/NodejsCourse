const request = require("supertest");
const app = require("../../app");
describe("Test Get / lauches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/lauches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
describe("Test POST /lauches", () => {
  test("it should respond with 201 created", async () => {
    const response = await request(app).post("/lauches")
    .send({
      mission: "KELALa Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-186",
      LaunchDate: "january 4 2030",
    })
     .set('Content-Type', 'application/json')
      .expect(201);
  });
  test("it should catch missing required properties ", () => {});
});
