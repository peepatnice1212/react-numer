import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GaussJor = () => {
  const Resultmatrix = () => {
    console.log("1matrix", datamatrix);
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          matrix A ={" "}
          <TaBle>
            {datamatrix.map((data) => {
              return <div>{data.a}</div>;
            })}
          </TaBle>
          <div style={{ display: "flex", marginLeft: "50px" }}>
            matrix B ={" "}
            <TaBle>
              {datamatrix.map((data) => {
                return <div id="myInput">{data.b}</div>;
              })}
            </TaBle>
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
      </div>
    );
  };

  const Resulttable = () => {
    return (
      <Main style={{ textAlign: "center" }}>
        {solution.map((data, index) => {
          return (
            <Answer>
              X{index + 1} = {data.toPrecision(7)}{" "}
            </Answer>
          );
        })}
      </Main>
    );
  };

  const [table, setTable] = useState();
  const [displaymatrix, setDisplaymatrix] = useState();
  const datamatrix = [];
  let numtable2;
  let solution = [];

  const createtable = (numtable2) => {
    console.log("nice");
    let array_a = [];
    let array_b = [];

    for (let i = 0; i < numtable2; i++) {
      // array_a[i] = [];
      array_b.push(
        <div>
          <input id={"rowb" + i} size="1" style={{ textAlign: "center" }} />
        </div>
      );
      let eachinp_a = [];
      for (let j = 0; j < numtable2; j++) {
        let rc = "rowa" + i + "columna" + j;
        eachinp_a.push(
          <input id={rc} size="1" style={{ textAlign: "center" }} />
        );
        console.log("eachinp_a", eachinp_a);
      }
      array_a.push(<div>{eachinp_a}</div>);
      console.log("array_a[i]", array_a);
    }
    datamatrix.push({ a: array_a, b: array_b });
  };

  const Cal = () => {
    console.log("niceeiei");
    let matrix = [];
    let matrix_a = [];
    let matrix_b = [];
    for (let i = 0; i < numtable2; i++) {
      matrix[i] = [];
      matrix_a[i] = [];
      for (let j = 0; j < numtable2; j++) {
        matrix[i].push(
          parseFloat(document.getElementById("rowa" + i + "columna" + j).value)
        );
        matrix_a[i].push(
          parseFloat(document.getElementById("rowa" + i + "columna" + j).value)
        );
      }
      matrix[i].push(parseFloat(document.getElementById("rowb" + i).value));
      matrix_b.push(parseFloat(document.getElementById("rowb" + i).value));
    }
    console.log("allarray", matrix);
    console.log("allarray_a", matrix_a);
    console.log("allarray_b", matrix_b);

    for (let i = 0; i < matrix.length; i++) {
      for (let j = i + 1; j < matrix.length; j++) {
        let multi = matrix[j][i] / matrix[i][i];
        console.log("multi", multi);
        for (let k = i; k < matrix[j].length; k++) {
          matrix[j][k] -= matrix[i][k] * multi;
          console.log(matrix[j][k]);
          console.log("-----------");
        }
      }
    }
    console.log("matrix", matrix);

    for (let i = 0; i < matrix.length; i++) {
      let divided = matrix[i][i];
      for (let j = i; j < matrix[i].length; j++) {
        matrix[i][j] /= divided;
      }
    }
    console.log("matrix_1", matrix);

    for (let i = matrix.length - 1; i >= 0; i--) {
      for (let j = i - 1; j >= 0; j--) {
        let multi2 = matrix[j][i];
        for (let k = i; k < matrix[j].length; k++) {
          console.log("i,j,k", i, j, k);
          console.log("matrix[j][k]", matrix[j][k]);
          matrix[j][k] -= matrix[i][k] * multi2;
          console.log("matrix[j][k]2", matrix[j][k]);
          console.log("multi2", multi2);
          console.log("matrix[i][k]", matrix[i][k]);
        }
        console.log("-----------------------");
      }
    }
    console.log("matrix_2", matrix);
    solution = [];
    for (let i = 0; i < matrix.length; i++) {
      solution.push(matrix[i][matrix.length]);
    }
    console.log("solution", solution);
  };

  const gotoCal = () => {
    Cal();
    setTable(Resulttable());
  };

  const inputnumtable = (event) => {
    console.log(event.target.value);
    numtable2 = event.target.value;
    createtable(numtable2);
    setDisplaymatrix(Resultmatrix());
  };
  return (
    <Main>
      <Form>
        <Headd>Gauss Jordan Method</Headd>
        <Textinput>
          <Label>
            Input size matrix N*N
            <Input
              type={"text"}
              onChange={inputnumtable}
              id="myInputnum"
              placeholder="N"
            ></Input>
          </Label>
        </Textinput>
        {displaymatrix}
      </Form>
      {table}
    </Main>
  );
};

export default GaussJor;

const Headd = styled.div`
  font-size: xx-large;
  text-align: center;
  margin-top: 30px;
`;

const Main = styled.div`
  font-size: larger;
  font-weight: bold;
`;

const Input = styled.input`
  width: 200px;
  margin-left: 50px;
`;

const Label = styled.div`
  margin-top: 50px;
`;

const Textinput = styled.div`
  text-align: center;
  margin-bottom: 80px;
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

const TaBle = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;
