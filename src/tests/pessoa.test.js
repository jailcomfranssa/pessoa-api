const request = require("supertest");
const app = require("../../src/app");

describe("Pessoas API", () => {
    it("GET /health deve retornar 200", async () => {
        const res = await request(app).get("/health");
        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
    });

    it("POST /pessoas valida payload inválido", async () => {
        const res = await request(app).post("/pessoas").send({ nome: "A" });
        expect(res.statusCode).toBe(400);
    });
});
