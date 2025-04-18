import { beforeEach, describe, expect, it } from "vitest";
import { app } from "..";
import request from "supertest";
import resetDb from "./helpers/reset-db";

// before each - run before every call ✅
// describe("POST /sum", () => {
//     beforeEach(async () => {
//         console.log("clearing db");
//         await resetDb();
//     });

//     it("should sum add 2 numbers", async () => {
//         const { status, body } = await request(app).post('/sum').send({
//             a: 1,
//             b: 2
//         })
//         expect(status).toBe(200);
//         expect(body).toEqual({ answer: 3, id: expect.any(Number) });
//     });

//     it("should sum add 2 negative numbers", async () => {
//         const { status, body } = await request(app).post('/sum').send({
//             a: -1,
//             b: -2
//         })
//         expect(status).toBe(200);
//         expect(body).toEqual({ answer: -3, id: expect.any(Number) });
//     });
// })

// beforeAll - run before all the test ✅
describe("POST /sum", () => {
    beforeEach(async () => {
        console.log("clearing db");
        await resetDb();
    });

    it("should sum add 2 numbers", async () => {
        const { status, body } = await request(app).post('/sum').send({
            a: 1,
            b: 2
        })
        expect(status).toBe(200);
        expect(body).toEqual({ answer: 3, id: expect.any(Number) });
    });

    it("should sum add 2 negative numbers", async () => {
        const { status, body } = await request(app).post('/sum').send({
            a: -1,
            b: -2
        })
        expect(status).toBe(200);
        expect(body).toEqual({ answer: -3, id: expect.any(Number) });
    });
})