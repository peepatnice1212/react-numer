import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { inv, multiply } from "mathjs";
import Plot from "react-plotly.js";

const Mullinear = () => {
  let numgen;
  let num_x;
  let answer = 0;
  const giventable = [];
  const givenx = [];
  const [table, setTable] = useState();
  const [answerall, setAnswerall] = useState();
  const [countx, setCountx] = useState();
  let arr_x = [];
  let arr_y = [];
  let cal_y = [];

  const create_x = (count_x) => {
    let CX = [];
    for (let i = 0; i < count_x; i++) {
      CX.push(
        <div>
          <input id={"X" + i} placeholder={"X" + (i + 1)} />
        </div>
      );
    }
    givenx.push({ i: CX });
  };

  const createtable = (numgen, num_x) => {
    let tablex = [];
    let tabley = [];
    let tempx = [];
    let table_x = [];
    for (let i = 0; i < num_x; i++) {
      tempx = [];
      for (let j = 0; j < numgen; j++) {
        tempx.push(
          <div>
            <input
              placeholder={"value x" + (i + 1)}
              id={"rowx" + i + "item" + j}
            />
          </div>
        );
      }
      table_x.push(<div>{tempx}</div>);
    }
    tablex.push(<div style={{ display: "flex" }}>{table_x}</div>);
    for (let i = 0; i < numgen; i++) {
      tabley.push(
        <div>
          <input placeholder={"value f(x)" + (i + 1)} id={"rowy" + i} />
        </div>
      );
    }
    giventable.push({ x: tablex, y: tabley });
  };

  const Cal = () => {
    answer = 0;
    console.log("nice");
    arr_x = [];
    arr_y = [];
    cal_y = [];
    let solution = [];
    let sumx = new Array(num_x + (num_x * (num_x + 1)) / 2).fill(0);
    let sumy = new Array(num_x + 1).fill(0);
    let matrix_x = new Array(num_x + 1);
    let matrix_y = new Array(num_x + 1);

    for (let i = 0; i < num_x; i++) {
      arr_x[i] = [];
      for (let j = 0; j < numgen; j++) {
        arr_x[i].push(
          parseFloat(document.getElementById("rowx" + i + "item" + j).value)
        );
      }
    }
    for (let i = 0; i < numgen; i++) {
      arr_y.push(parseFloat(document.getElementById("rowy" + i).value));
    }
    console.log(arr_x, arr_y);

    for (let i = 0; i < num_x; i++) {
      for (let j = 0; j < numgen; j++) {
        sumx[i] += arr_x[i][j];
      }
    }

    let count = num_x;
    for (let i = 0; i < num_x; i++) {
      for (let j = i; j < num_x; j++) {
        for (let k = 0; k < numgen; k++) {
          sumx[count] += arr_x[i][k] * arr_x[j][k];
        }
        count++;
      }
    }

    for (let i = 0; i < num_x + 1; i++) {
      for (let j = 0; j < numgen; j++) {
        if (i === 0) {
          sumy[i] += arr_y[j];
        } else {
          sumy[i] += arr_x[i - 1][j] * arr_y[j];
        }
      }
    }
    console.log(sumx, sumy);

    for (let i = 0; i < num_x + 1; i++) {
      matrix_x[i] = new Array(num_x + 1).fill(0);
      matrix_y[i] = sumy[i];
    }
    for (let i = 0; i < num_x; i++) {
      for (let j = 0; j <= i; j++) {
        if (i === 0 && j === 0) {
          matrix_x[i][j] = numgen;
        }
        for (let k = 0; k < numgen; k++) {
          matrix_x[i + 1][j + 1] += arr_x[i][k] * arr_x[j][k];
          matrix_x[j + 1][i + 1] = matrix_x[i + 1][j + 1];
          if (j === 0) {
            matrix_x[i + 1][0] += arr_x[i][k];
            matrix_x[0][i + 1] = matrix_x[i + 1][0];
          }
        }
      }
    }

    console.log(matrix_x);
    console.log(matrix_y);
    matrix_x = inv(matrix_x);

    solution = multiply(matrix_x, matrix_y);
    solution = solution.map((num) => Math.round(num));
    console.log(solution);

    let x = [];
    for (let i = 0; i < num_x; i++) {
      x[i] = parseFloat(document.getElementById("X" + i).value);
      console.log(typeof x[i]);
    }
    for (let i = 0; i < solution.length; i++) {
      if (i === 0) {
        answer += solution[0];
      } else {
        answer += solution[i] * x[i - 1];
      }
      console.log(i + answer);
    }
    console.log(x);
    console.log(answer);
    for (let i = 0; i < numgen; i++) {
      cal_y[i] = 0;
      for (let j = 0; j < solution.length; j++) {
        if (j === 0) {
          cal_y[i] += solution[0];
        } else {
          cal_y[i] += solution[j] * arr_x[j - 1][i];
        }
      }
    }
    console.log(cal_y);
  };

  const resultcount_x = () => {
    console.log(givenx);
    return (
      <Main>
        <div>
          {givenx.map((data) => {
            return <div>{data.i}</div>;
          })}
        </div>
      </Main>
    );
  };

  const resultttable = () => {
    console.log(giventable);
    return (
      <Main>
        <div
          style={{
            display: "flex",
            overflowX: "scroll",
            marginLeft: "30px",
          }}
        >
          <div>
            {giventable.map((data) => {
              return <div>{data.x}</div>;
            })}
          </div>
          <div>
            {giventable.map((data) => {
              return <div id="myInput">{data.y}</div>;
            })}
          </div>
        </div>

        <ButTon onClick={gotoCal} id="myBtn">
          <CaretRightOutlined />
          Calculate
          <CaretLeftOutlined />
        </ButTon>
        <Helmet>
          <script>
            {
              "var input = document.getElementById('myInput');input.addEventListener('keypress', function (event) {if (event.key === 'Enter') {event.preventDefault();document.getElementById('myBtn').click();}});"
            }
          </script>
        </Helmet>
      </Main>
    );
  };

  const result = () => {
    let countofx = parseInt(document.getElementById("N").value);
    let actual_value = [];
    let cal_value = [];
    let X_value = [];
    let data = [];
    for (let i = 0; i < countofx; i++) {
      actual_value = {
        x: arr_x[i],
        y: arr_y,
        mode: "markers",
        type: "scatter",
        name: "actual value",
      };

      cal_value = {
        x: arr_x[i],
        y: cal_y,
        mode: "lines+markers",
        type: "scatter",
        name: "cal value",
      };
    }
    data = [actual_value, cal_value, X_value];

    return (
      <Main>
        <Answer>Answer = {answer.toPrecision(4)}</Answer>
        <Plot
          data={data}
          layout={{
            width: 1000,
            height: 500,
            title: "Graph Multiple Linear Regression",
          }}
        />
      </Main>
    );
  };

  const inputnumtable = (event) => {
    numgen = parseInt(event.target.value);
    console.log("numgen", numgen);
    num_x = parseInt(document.getElementById("N").value);
    console.log(num_x);
    createtable(numgen, num_x);
    setTable(resultttable());
  };

  const inputcount_x = () => {
    let count_x = parseInt(document.getElementById("N").value);
    create_x(count_x);
    setCountx(resultcount_x());
  };

  const gotoCal = () => {
    Cal();
    setAnswerall(result());
  };

  return (
    <Main>
      <Headd>Multiple Linear Regression</Headd>
      <Label>
        N of X
        <Input id="N" onChange={inputcount_x} />
      </Label>
      {countx}
      <Label>
        Number of given
        <Input placeholder="0" onChange={inputnumtable} />
      </Label>
      {table}
      {answerall}
    </Main>
  );
};

export default Mullinear;

const Headd = styled.div`
  font-size: xx-large;
  margin-top: 30px;
`;

const Main = styled.div`
  font-size: larger;
  font-weight: bold;
  text-align: center;
`;

const Label = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 200px;
  margin-left: 50px;
`;

const ButTon = styled.div`
  font-size: xx-large;
  margin-top: 80px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 80px;
  :hover {
    color: red;
    font-weight: bolder;
    text-decoration: underline;
  }
`;

const Answer = styled.div`
  text-align: center;
  font-size: x-large;
  margin-top: 10px;
  margin-bottom: 10px;
  color: red;
`;
