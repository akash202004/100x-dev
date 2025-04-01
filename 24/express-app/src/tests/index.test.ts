import { describe, expect, test, it } from "@jest/globals";
import { app } from "../index";
import request from "supertest";

describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.Answer).toBe(3);
  });

  it("zod checks", async () => {
    const res = await request(app).post("/zsum").send({
      a: 1,
      b: 2,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.Answer).toBe(3);
  });

  it("zod safreparse error", async () => {
    const res = await request(app)
      .post("/zsum")
      .send({
        a: [1234],
        b: 2,
      });
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("Incorrect inputs");
  });

  it("headers input with zod", async () => {
    const res = await request(app)
      .get("/xsum")
      .set({
        c: "1",
        d: "2",
      })
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it("headers without input using zod", async () => {
    const res = await request(app).get("/xsum").send();
    expect(res.statusCode).toBe(411);
  });
});
