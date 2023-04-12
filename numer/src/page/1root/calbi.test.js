import { Cal } from "./calbi";
import { Calcra } from "../2linear/calcra";
import { Calli } from "../3regression/calli";

test("testcal_bi", () => {
  let cal = Cal(1.5, 2, "x^4-13", "x");
  expect(cal.New_N).toBe(1.8988288640975952);
});

test("testcal_cramer", () => {
  let cal = Calcra(
    [
      [2, 3, 5],
      [3, 1, -2],
      [1, 3, 4],
    ],
    [0, -2, -3],
    3
  );
  expect(cal.new_answer).toStrictEqual([
    { I: 0, answer: 1.5 },
    { I: 1, answer: -3.5 },
    { I: 2, answer: 1.5 },
  ]);
});

test("testcal_li", () => {
  let cal = Calli(
    65,
    9,
    [10, 15, 20, 30, 40, 50, 60, 70, 80],
    [5, 9, 15, 18, 22, 30, 35, 38, 43]
  );
  expect(cal.newanswer).toBe(36.24);
});
