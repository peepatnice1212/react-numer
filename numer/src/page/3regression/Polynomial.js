import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { inv, multiply } from "mathjs";
import Plot from "react-plotly.js";
import axios from "axios";

const Polynomial = () => {
  let numgen;
  let answer = 0;
  let answer1 = 0;
  const giventable = [];
  const [table, setTable] = useState();
  const [answerall, setAnswerall] = useState();
  let X = 0;
  let arr_x = [];
  let arr_y = [];
  let cal_y = [];
  let cal_y1 = [];

  const createtable = (numgen) => {
    let tablex = [];
    let tabley = [];
    for (let i = 0; i < numgen; i++) {
      tablex.push(
        <div>
          <input
            style={{ marginLeft: "30px" }}
            placeholder={"value x" + (i + 1)}
            id={"rowx" + i}
          />
        </div>
      );
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
    answer1 = 0;
    arr_x = [];
    arr_y = [];
    cal_y = [];
    cal_y1 = [];
    let m = parseInt(document.getElementById("M").value);
    let sumx = new Array(2 * m).fill(0);
    let sumy = new Array(m + 1).fill(0);
    let matrix_x1 = new Array(1 + 1);
    let matrix_x = new Array(m + 1);
    let matrix_y1 = new Array(1 + 1);
    let matrix_y = new Array(m + 1);
    let solution = [];
    let solution1 = [];

    for (let i = 0; i < numgen; i++) {
      arr_x.push(parseFloat(document.getElementById("rowx" + i).value));
      arr_y.push(parseFloat(document.getElementById("rowy" + i).value));
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
    for (let i = 0; i < 1 + 1; i++) {
      matrix_x1[i] = new Array(1 + 1);
    }
    console.log(matrix_x1);
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
    for (let i = 0; i < 1 + 1; i++) {
      if (i === 0) {
        matrix_x1[i][i] = numgen;
      }
      for (let j = 0; j < i + 1; j++) {
        if (i === 0) {
          continue;
        } else {
          matrix_x1[i][j] = sumx[j + i - 1];
          matrix_x1[j][i] = sumx[j + i - 1];
        }
      }
      matrix_y1[i] = sumy[i];
    }
    console.log(matrix_x);
    console.log(matrix_y);
    console.log(sumx, sumy);
    console.log(matrix_x1);
    console.log(matrix_y1);

    matrix_x = inv(matrix_x);
    matrix_x1 = inv(matrix_x1);
    solution = multiply(matrix_x, matrix_y);
    solution1 = multiply(matrix_x1, matrix_y1);
    console.log(solution);
    console.log(solution1);

    X = parseFloat(document.getElementById("X").value);
    console.log(X);
    for (let i = 0; i < solution.length; i++) {
      answer += solution[i] * Math.pow(X, i);
    }
    for (let i = 0; i < solution1.length; i++) {
      answer1 += solution1[i] * Math.pow(X, i);
    }

    console.log(answer);
    console.log(answer1);

    for (let i = 0; i < numgen; i++) {
      cal_y[i] = 0;
      cal_y1[i] = 0;
      for (let j = 0; j < solution.length; j++) {
        cal_y[i] += solution[j] * Math.pow(arr_x[i], j);
      }
      for (let j = 0; j < solution1.length; j++) {
        cal_y1[i] += solution1[j] * Math.pow(arr_x[i], j);
      }
    }
    console.log(cal_y);
    console.log(cal_y1);

    console.log(arr_x);
    console.log(arr_y);
    try {
      axios.post("http://localhost:8800/data", {
        numgen: numgen,
        x: arr_x,
        y: arr_y,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const guideInp = () => {
    console.log("guideInp");
    try {
      axios
        .post("http://localhost:8800/getdata", {
          numgen: numgen,
        })
        .then((res) => {
          console.log(res);
          if (res.data === "") {
            alert("no have data");
          } else {
            let jsons = JSON.parse(res.data.polycol);
            for (let i = 0; i < numgen; i++) {
              document.getElementById("rowx" + i).value = jsons.x[i];
              document.getElementById("rowy" + i).value = jsons.y[i];
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const resultttable = () => {
    console.log(giventable);
    return (
      <Main>
        <div style={{ display: "flex", justifyContent: "center" }}>
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
        <input type="button" value={"guide input"} onClick={guideInp} />
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
    console.log(arr_x);
    console.log(cal_y);
    console.log(cal_y1);
    let actual_value = {
      x: arr_x,
      y: arr_y,
      mode: "markers",
      type: "scatter",
      name: "actual value",
    };

    let cal_value = {
      x: arr_x,
      y: cal_y,
      mode: "lines+markers",
      type: "scatter",
      name: "poly",
    };

    let cal_value1 = {
      x: arr_x,
      y: cal_y1,
      mode: "lines+markers",
      type: "scatter",
      name: "Linear",
    };

    let X_value1 = {
      x: [X],
      y: [answer],
      mode: "markers",
      type: "scatter",
      name: "X value linear",
      marker: {
        size: 20,
      },
    };

    let X_value = {
      x: [X],
      y: [answer],
      mode: "markers",
      type: "scatter",
      name: "X value ploy",
      marker: {
        size: 10,
      },
    };
    let data = [actual_value, cal_value1, cal_value, X_value1, X_value];
    return (
      <Main>
        <Answer>Answer Linear = {answer1.toPrecision(4)}</Answer>
        <Answer>Answer Ploy = {answer.toPrecision(4)}</Answer>
        <Plot
          data={data}
          layout={{
            width: 1000,
            height: 500,
            title: "Graph Polynomial Regression",
          }}
        />
      </Main>
    );
  };

  const inputnumtable = (event) => {
    numgen = parseInt(event.target.value);
    console.log(numgen);
    createtable(numgen);
    setTable(resultttable());
  };

  const gotoCal = () => {
    Cal();
    setAnswerall(result());
  };

  return (
    <Main>
      <Headd>Polynomial Regression</Headd>
      <Label>
        M
        <Input id="M" />
      </Label>
      <Label>
        X
        <Input id="X" />
      </Label>
      <Label>
        Number of given
        <Input placeholder="0" onChange={inputnumtable} />
      </Label>
      {table}
      {answerall}
    </Main>
  );
};

export default Polynomial;

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
