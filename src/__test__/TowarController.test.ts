import application from "./app";
import request from "supertest";

describe("Test Klient controller", () => {
  it("Get all", async () => {
    const res = await request(application.app).get("/commodity");

    expect(res.statusCode).toEqual(200);
  });

  it("Get by id where id is 1", async () => {
    const res = await request(application.app).get("/commodity/1");

    expect(res.statusCode).toEqual(404);
  });
});
