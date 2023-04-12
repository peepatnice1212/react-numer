import { det } from "mathjs";

export const Calcra = (allarray_a, allarray_b, numtable2) => {
  console.log("niceeiei");
  console.log("numtable", numtable2);
  console.log("allarray_a", allarray_a);
  console.log("allarray_b", allarray_b);
  let valuedetA = det(allarray_a);
  console.log("valuedetA", valuedetA);

  let temp = [];
  let answer = [];
  for (let i = 0; i < numtable2; i++) {
    temp = [];
    for (let j = 0; j < numtable2; j++) {
      temp.push(allarray_a[j][i]);
      allarray_a[j][i] = allarray_b[j];
    }
    answer.push({ I: i, answer: det(allarray_a) / valuedetA });
    for (let j = 0; j < numtable2; j++) {
      allarray_a[j][i] = temp[j];
    }
  }
  console.log("answer = ", answer);
  return { new_answer: answer };
};
