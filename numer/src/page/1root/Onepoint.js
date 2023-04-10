import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { evaluate } from "mathjs";
import { Helmet } from "react-helmet";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Line } from "react-chartjs-2";
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
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Onepoint = () => {
  const Resulttable = () => {
    console.log("NNNN", N);
    console.log(data);
    const labels = [];
    const datanice = [];
    const data_Xnew = [];

    for (let i = 0; i < data.length; i++) {
      labels.push(i + 1);
      datanice.push([i + 1, data[i].err]);
      data_Xnew.push([i + 1, data[i].xnew]);
    }
    console.log("datanice", datanice);

    const dataxxx = {
      labels,
      datasets: [
        {
          label: "Error",
          data: datanice,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "x new",
          data: data_Xnew,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    console.log("dataxxx", dataxxx);
    console.log("variable2 = ", variable[0]);
    return (
      <div>
        <Helmet>
          <style>
            {
              "table, th, td{border: 1px solid black;text-align: center;width: 1000px;}table.center{margin-left: auto; margin-right: auto;margin-bottom: 50px;}"
            }
          </style>
        </Helmet>
        <Answer>Answer = {N.toPrecision(7)}</Answer>
        <table class="center">
          <thead>
            <tr>
              <th>Iteration</th>
              <th>{variable[0] + " " + "old"}</th>
              <th>{variable[0] + " " + "new"}</th>
              <th style={{ color: "rgb(255, 99, 132)" }}>Error</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              if (index < 100) {
                return (
                  <tr>
                    <td>{data.iteration + 1}</td>
                    <td>{data.xold}</td>
                    <td>{data.xnew}</td>
                    <td style={{ color: "rgb(255, 99, 132)" }}>{data.err}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <Line data={dataxxx} />
      </div>
    );
  };

  const [listback, setListback] = useState([]);
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("http://localhost:8800/equations");
        console.log(res);
        setListback(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, []);

  const [fxadd, setFxadd] = useState();

  const [table, setTable] = useState();
  const [Equation, setEquation] = useState("");
  let N;
  const [X, setX] = useState(0);
  const data = [];
  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;
  const regex = /[0-9 \-+*/^()]|sin|sqrt|cos|tan|sec|cosec|cot|pi|log/g;
  let variable = Equation.replace(regex, "");

  const Cal = (x) => {
    let ea, xo;
    let iter = 0;
    const e = 0.00001;
    let obj = {};
    let valuex;
    do {
      xo = x;
      valuex = xo.toString();
      console.log("valuex = ", valuex);
      x = evaluate([variable[0] + "=" + valuex, Equation]);
      console.log("X=", x[x.length - 1]);
      console.log("Xo = ", xo);
      ea = error(xo, x[x.length - 1]);
      obj = {
        iteration: iter,
        xold: xo,
        xnew: x[x.length - 1],
        err: ea,
      };
      x = x[x.length - 1];
      console.log("valuex2 = ", x);
      data.push(obj);
      console.log("obj=", obj);
      iter++;
    } while (ea > e);
    N = x;
    console.log("data = ", data);
  };
  const gotoCal = () => {
    const x = parseFloat(X);
    Cal(x);
    setTable(Resulttable());
    try {
      axios.post("http://localhost:8800/equations", fxadd);
    } catch (err) {
      console.log(err);
    }
  };
  const inputEquation = (event) => {
    console.log(event.target.value);
    setEquation(event.target.value);
    setFxadd({ fx: event.target.value });
  };

  const inputX = (event) => {
    console.log(event.target.value);
    setX(event.target.value);
  };

  const handlefx = (event) => {
    console.log(`Equation = ${Equation}`);
    setEquation(event.target.value);
  };

  return (
    <Main>
      <Form>
        <Headd>One Point Iteration Method</Headd>
        <Textinput>
          <Label>
            Input f(x)
            <Input
              type={"text"}
              value={Equation}
              onChange={inputEquation}
            ></Input>
            Guide f(x)
            <select style={{ marginLeft: "10px" }} onChange={handlefx}>
              {listback.map((data) => {
                return <option value={data.fx}>{data.fx}</option>;
              })}
            </select>
          </Label>
          <Label>
            Input x<Input type={"text"} onChange={inputX} id="myInput"></Input>
          </Label>
        </Textinput>
        <ButTon onClick={gotoCal} id="myBtn">
          <CaretRightOutlined />
          Calculate
          <CaretLeftOutlined />
        </ButTon>
      </Form>
      <Helmet>
        <script>
          {
            "var input = document.getElementById('myInput');input.addEventListener('keypress', function (event) {if (event.key === 'Enter') {event.preventDefault();document.getElementById('myBtn').click();}});"
          }
        </script>
      </Helmet>
      {table}
    </Main>
  );
};

export default Onepoint;

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
  margin-right: 50px;
`;

const Label = styled.div`
  margin-top: 50px;
`;

const Textinput = styled.div`
  text-align: center;
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
  margin-top: 40px;
  margin-bottom: 20px;
  color: red;
`;
