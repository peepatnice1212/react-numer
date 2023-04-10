import { inv, multiply } from "mathjs";
import React, { useState } from "react";
import styled from "styled-components";

const Test = () => {
  let arr_x = [];
  let arr_y = [];
  let answer = 0;
  let giventable = [];
  const [table, setTable] = useState();
  const [answerall, setAnswerall] = useState();

  const inputnum = (e) => {
    let numgen = e.target.value;
    console.log(`numgen: ${numgen}`);
    createtable(numgen);
    setTable(result_table());
  };

  const createtable = (numgen) => {
    let table_x = [];
    let table_y = [];
    for (let i = 0; i < numgen; i++) {
      table_x.push(
        <div>
          <input type="text" placeholder={"x" + (i + 1)} id={"rowx" + i} />
        </div>
      );
      table_y.push(
        <div>
          <input type="text" placeholder={"fx" + (i + 1)} id={"rowy" + i} />
        </div>
      );
    }
    giventable.push({ x: table_x, y: table_y });
  };

  const result_table = () => {
    console.log(giventable);
    return (
      <MAIN>
        {giventable.map((data) => {
          return (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>{data.x}</div>
              <div>{data.y}</div>
            </div>
          );
        })}
        <input type="button" value={"calculate"} onClick={gotocal} />
      </MAIN>
    );
  };

  const gotocal = () => {
    let numgen = parseInt(document.getElementById("N").value);
    let m = parseInt(document.getElementById("M").value);
    let X = parseInt(document.getElementById("X").value);
    cal(numgen, m, X);
    setAnswerall(showresult());
  };

  const cal = (numgen, m, X) => {
    console.log(numgen);
    console.log(m + 1);
    let sumx = new Array(2 * m).fill(0);
    let sumy = new Array(m + 1).fill(0);
    let matrix_x = new Array(m + 1);
    let matrix_y = new Array(m + 1);
    let matrix_ans = [];

    for (let i = 0; i < numgen; i++) {
      arr_x[i] = document.getElementById("rowx" + i).value;
      arr_y[i] = document.getElementById("rowy" + i).value;
      for (let j = 1; j <= sumx.length; j++) {
        sumx[j - 1] += Math.pow(arr_x[i], j);
      }
      for (let k = 0; k < sumy.length; k++) {
        sumy[k] += arr_y[i] * Math.pow(arr_x[i], k);
      }
    }
    console.log(sumx);
    console.log(sumy);

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
    console.log(matrix_x, matrix_y);

    matrix_x = inv(matrix_x);
    console.log(matrix_x);
    matrix_ans = multiply(matrix_x, matrix_y);
    console.log(matrix_ans);

    if (answer === 0) {
      for (let i = 0; i < matrix_ans.length; i++) {
        answer += matrix_ans[i] * Math.pow(X, i);
      }
    }

    console.log(answer);
  };

  const showresult = () => {
    return (
      <MAIN>
        <Answer>Answer = {answer}</Answer>
      </MAIN>
    );
  };

  return (
    <MAIN>
      M = <Input placeholder="0" id="M" />
      <br />
      X = <Input placeholder="0" id="X" />
      <br />
      Numer of given = <Input placeholder="0" onChange={inputnum} id="N" />
      {table}
      {answerall}
    </MAIN>
  );
};

export default Test;

const MAIN = styled.div`
  text-align: center;
  font-size: x-large;
  margin-top: 30px;
`;

const Input = styled.input`
  font-size: large;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const Answer = styled.div`
  font-size: xx-large;
  color: red;
  font-weight: bold;
`;
