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
import { det } from "mathjs";
import { Calcra } from "./calcra";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CramerR = () => {
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
        {answer.map((data) => {
          return (
            <Answer>
              X{data.I + 1} = {data.answer.toPrecision(7)}
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
  let answer = [];

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

  // const Cal = (allarray_a, allarray_b) => {
  //   console.log("niceeiei");
  //   console.log("numtable", numtable2);
  //   console.log("allarray_a", allarray_a);
  //   console.log("allarray_b", allarray_b);
  //   let valuedetA = det(allarray_a);
  //   console.log("valuedetA", valuedetA);

  //   let temp = [];
  //   answer = [];
  //   for (let i = 0; i < numtable2; i++) {
  //     temp = [];
  //     for (let j = 0; j < numtable2; j++) {
  //       temp.push(allarray_a[j][i]);
  //       allarray_a[j][i] = allarray_b[j];
  //     }
  //     answer.push({ I: i, answer: det(allarray_a) / valuedetA });
  //     for (let j = 0; j < numtable2; j++) {
  //       allarray_a[j][i] = temp[j];
  //     }
  //   }
  //   console.log("answer = ", answer);
  // };

  const gotoCal = () => {
    let allarray_a = [];
    let allarray_b = [];

    for (let i = 0; i < numtable2; i++) {
      allarray_a[i] = [];
      allarray_b.push(parseFloat(document.getElementById("rowb" + i).value));
      for (let j = 0; j < numtable2; j++) {
        allarray_a[i].push(
          parseFloat(document.getElementById("rowa" + i + "columna" + j).value)
        );
      }
    }

    console.log(allarray_a, allarray_b);
    const { new_answer } = Calcra(allarray_a, allarray_b, numtable2);
    answer = new_answer;
    console.log("answer2 = ", answer);
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
        <Headd>Cramer's Rule</Headd>
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

export default CramerR;

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
