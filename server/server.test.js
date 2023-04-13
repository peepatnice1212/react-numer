const request = require("supertest");
const app = require("./page/index.js");
const jwt = require("jsonwebtoken");

const secretKeys = "peepatnice";

describe("GET /gettoken/:name", () => {
  test("should return a JWT token", async () => {
    const res = await request(app).get("/gettoken/nice").expect(200);
    console.log(res.text);
    const decoded = jwt.verify(res.text, secretKeys);
    expect(decoded.user).toBe("nice");
  });
});

// test("Querry", async () => {
//   const response = await request(app).get("/equation");
//   expect(response.statusCode).toBe(200);
//   expect(response.text).toBe(
//     '[{"idequations":16,"fx":"o^6"},{"idequations":15,"fx":"o^5"},{"idequations":14,"fx":"x^1"},{"idequations":13,"fx":"z^4-13"},{"idequations":12,"fx":"y^4-13"},{"idequations":11,"fx":"x^5-6"},{"idequations":10,"fx":"x^3-4x-9"},{"idequations":9,"fx":"1/4+x/2"},{"idequations":8,"fx":"x^5-5"},{"idequations":7,"fx":"x^2-3"},{"idequations":6,"fx":"5x-5"},{"idequations":5,"fx":"3x^2+5x+2"},{"idequations":4,"fx":"x^2-7"},{"idequations":3,"fx":"log(x)"},{"idequations":2,"fx":"1/4-x/2"},{"idequations":1,"fx":"x^4-13"}]'
//   );
// });
