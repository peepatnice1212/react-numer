import { inv, multiply } from "mathjs";

export const Calli = (X, numgen, arr_x, arr_y) => {
  console.log(arr_x, arr_y);
  let answer = 0;
  let cal_y = [];
  let sumx = [0, 0];
  let sumy = [0, 0];
  let m = 1;
  let matrix_x = new Array(m + 1);
  let matrix_y = new Array(m + 1);
  let solution = [];

  for (let i = 0; i < numgen; i++) {
    // arr_x.push(parseFloat(document.getElementById("rowx" + i).value));
    // arr_y.push(parseFloat(document.getElementById("rowy" + i).value));
    for (let j = 1; j <= sumx.length; j++) {
      sumx[j - 1] += Math.pow(arr_x[i], j);
    }
    for (let k = 0; k < sumy.length; k++) {
      sumy[k] += arr_y[i] * Math.pow(arr_x[i], k);
    }
  }

  for (let i = 0; i < m + 1; i++) {
    matrix_x[i] = new Array(m + 1);
  }
  for (let i = 0; i < m + 1; i++) {
    if (i === 0) {
      matrix_x[i][i] = numgen;
    }
    for (let j = 0; j < i + 1; j++) {
      if (i === 0) {
        continue;
      } else {
        matrix_x[i][j] = sumx[j + i - 1];
        matrix_x[j][i] = sumx[j + i - 1];
      }
    }

    matrix_y[i] = sumy[i];
  }
  console.log(matrix_x);
  console.log(matrix_y);

  matrix_x = inv(matrix_x);
  solution = multiply(matrix_x, matrix_y);
  console.log(solution);

  for (let i = 0; i < solution.length; i++) {
    answer += solution[i] * Math.pow(X, i);
  }

  for (let i = 0; i < numgen; i++) {
    cal_y[i] = 0;
    for (let j = 0; j < solution.length; j++) {
      cal_y[i] += solution[j] * Math.pow(arr_x[i], j);
    }
  }
  console.log(cal_y);
  console.log(answer);
  return {
    newanswer: answer,
    new_cal_y: cal_y,
  };
};
