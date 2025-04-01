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
});
