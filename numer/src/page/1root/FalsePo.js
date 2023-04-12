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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FalsePo = () => {
  const Resulttable = () => {
    console.log("NNNN", N);
    console.log(data);
    const labels = [];
    const datanice = [];
    const data_Xm = [];

    for (let i = 0; i < data.length; i++) {
      labels.push(i + 1);
      datanice.push([i + 1, data[i].err]);
      data_Xm.push([i + 1, data[i].Xm]);
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
          label: "xm",
          data: data_Xm,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    console.log("dataxxx", dataxxx);
    return (
      <div>
        <Helmet>
          <style>
            {
              "table, th, td{border: 1px solid black;text-align: center;width: 1000px;}table.center{margin-left: auto; margin-right: auto;margin-bottom: 50px;}"
            }
          </style>
        </Helmet>
        <Answer data-testid="ans">Answer = {N.toPrecision(7)}</Answer>
        <table className="center">
          <thead>
            <tr>
              <th>Iteration</th>
              <th>{variable[0] + "l"}</th>
              <th>{variable[0] + "m"}</th>
              <th>{variable[0] + "r"}</th>
              <th style={{ color: "rgb(255, 99, 132)" }}>Error</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              if (index < 100) {
                return (
                  <tr key={index}>
                    <td>{data.iteration}</td>
                    <td>{data.Xl}</td>
                    <td>{data.Xm}</td>
                    <td>{data.Xr}</td>
                    <td style={{ color: "rgb(255, 99, 132)" }}>{data.err}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        {/* <Line data={dataxxx} /> */}
      </div>
    );
  };

  const [table, setTable] = useState();
  const [Equation, setEquation] = useState("");
  let N;
  const [XL, setXL] = useState(0);
  const [XR, setXR] = useState(0);
  const data = [];
  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;
  const regex = /[0-9 \-+*/^()]|sin|sqrt|cos|tan|sec|cosec|cot|pi|log/g;
  let variable = Equation.replace(regex, "");

  const Cal = (xl, xr) => {
    let fXm, fXr, ea, xm, fXl;
    let iter = 0;
    const e = 0.00001;
    let obj = {};

    console.log("variable", variable[0]);
    do {
      let valuexl = xl.toString();
      let valuexr = xr.toString();
      fXl = evaluate([variable[0] + "=" + valuexl, Equation]);
      fXr = evaluate([variable[0] + "=" + valuexr, Equation]);
      if (typeof fXl[fXl.length - 1] === "object") {
        fXl[fXl.length - 1] = fXl[fXl.length - 1].im;
      }
      if (typeof fXr[fXr.length - 1] === "object") {
        fXr[fXr.length - 1] = fXr[fXr.length - 1].im;
      }
      xm =
        (xl * fXr[fXr.length - 1] - xr * fXl[fXl.length - 1]) /
        (fXr[fXr.length - 1] - fXl[fXl.length - 1]);
      let valuexm = xm.toString();
      fXm = evaluate([variable[0] + "=" + valuexm, Equation]);
      if (typeof fXm[fXm.length - 1] === "object") {
        fXm[fXm.length - 1] = fXm[fXm.length - 1].im;
      }
      iter++;
      console.log("FXM", fXm);
      console.log("FXL", fXl);
      console.log("FXR", fXr);
      console.log("fxm", typeof fXm[fXm.length - 1].im);

      if (fXm[fXm.length - 1] * fXr[fXr.length - 1] > 0) {
        ea = error(xr, xm);
        obj = {
          iteration: iter,
          Xl: xl,
          Xm: xm,
          Xr: xr,
          err: ea,
        };
        data.push(obj);
        xr = xm;
      } else if (fXm[fXm.length - 1] * fXr[fXr.length - 1] <= 0) {
        ea = error(xl, xm);
        obj = {
          iteration: iter,
          Xl: xl,
          Xm: xm,
          Xr: xr,
          err: ea,
        };
        data.push(obj);
        xl = xm;
      }
      console.log(iter, " ea = ", ea);
      console.log("xxx", xr, xl, xm);
    } while (ea > e);
    N = xm;
    console.log("obj=", obj);
    console.log("data = ", data);
  };
  const gotoCal = () => {
    const xlnum = parseFloat(XL);
    const xrnum = parseFloat(XR);
    Cal(xlnum, xrnum);
    console.log("Input xl xr ", xlnum, xrnum);
    setTable(Resulttable());
  };
  const inputEquation = (event) => {
    console.log(event.target.value);
    setEquation(event.target.value);
  };

  const inputXL = (event) => {
    console.log(event.target.value);
    setXL(event.target.value);
  };

  const inputXR = (event) => {
    console.log(event.target.value);
    setXR(event.target.value);
  };

  const handlefx = (event) => {
    console.log(`Equation = ${Equation}`);
    setEquation(event.target.value);
  };

  return (
    <Main>
      <Form>
        <Headd>False Position Method</Headd>
        <Textinput>
          <Label>
            Input f(x)
            <Input
              type={"text"}
              value={Equation}
              id="Equation"
              data-testid="Equation"
              onChange={inputEquation}
            ></Input>
          </Label>
          <Label>
            Input xl
            <Input
              type={"text"}
              onChange={inputXL}
              id="XL"
              data-testid="XL"
            ></Input>
          </Label>
          <Label>
            Input xr
            <Input
              type={"text"}
              onChange={inputXR}
              id="XR"
              data-testid="XR"
            ></Input>
          </Label>
        </Textinput>
        <input
          type="button"
          value={"Calculate"}
          onClick={gotoCal}
          id="myBtn"
          data-testid="myBtn"
        />
      </Form>
      {table}
    </Main>
  );
};

export default FalsePo;

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
