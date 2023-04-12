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
import { Cal } from "./calbi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Bisection = () => {
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
    console.log("variable2 = ", variable[0]);
    console.log("eiei");
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
                  <tr>
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
        <Line data={dataxxx} />
      </div>
    );
  };

  const [token, setToken] = useState("");

  const gettoken = () => {
    try {
      let name = document.getElementById("nametoken").value;
      axios.get(`http://localhost:8800/gettoken/${name}`).then((res) => {
        console.log(res.data);
        try {
          axios
            .get("http://localhost:8800/equations", {
              headers: { authorization: `b ${res.data}` },
            })
            .then((res) => {
              console.log(res);
              setListback(res.data);
            });
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [listback, setListback] = useState([]);
  // useEffect(() => {
  //   const fetchAll = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8800/equations", {
  //         headers: { authorization: `${token}` },
  //       });
  //       console.log(res);
  //       setListback(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchAll();
  // }, [token]);

  const [fxadd, setFxadd] = useState();

  const [table, setTable] = useState();
  const [Equation, setEquation] = useState("");
  let N;
  const [XL, setXL] = useState(0);
  const [XR, setXR] = useState(0);
  let data = [];
  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;
  const regex = /[0-9 \-+*/^()]|sin|sqrt|cos|tan|sec|cosec|cot|pi|log/g;
  let variable = Equation.replace(regex, "");

  const gotoCal = () => {
    const xlnum = parseFloat(XL);
    const xrnum = parseFloat(XR);
    const { re_data, New_N } = Cal(xlnum, xrnum, Equation, variable);
    data = re_data;
    N = New_N;
    console.log("Input xl xr ", xlnum, xrnum);
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
    console.log(fxadd);
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
        <Headd>Bisection Method</Headd>
        <input type="text" id="nametoken" />
        <input type="button" value={"gen token"} onClick={gettoken} />
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
              {Array.isArray(listback) ? (
                listback.map((data) => {
                  return <option value={data.fx}>{data.fx}</option>;
                })
              ) : (
                <option>{"no data"}</option>
              )}
            </select>
          </Label>
          <Label>
            Input xl
            <Input type={"text"} onChange={inputXL}></Input>
          </Label>
          <Label>
            Input xr
            <Input type={"text"} onChange={inputXR} id="myInput"></Input>
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

export default Bisection;

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
