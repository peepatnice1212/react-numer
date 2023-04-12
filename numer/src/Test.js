import { evaluate } from "mathjs";
import React, { useState } from "react";

const Test = () => {
  let giventable = [];
  const [Equation, setEquation] = useState("4x^2+5");
  let Num = 0;
  const [table, setTable] = useState();

  const inputequ = (e) => {
    setEquation(e.target.value);
  };

  const inputnum = (e) => {
    Num = parseInt(e.target.value);
    createtable(Num);
    setTable(resultttable());
  };

  const createtable = (Num) => {
    let tablex = [];
    let tabley = [];
    for (let i = 0; i < Num; i++) {
      tablex.push(
        <div>
          <input
            style={{ marginLeft: "30px" }}
            placeholder={"value x" + (i + 1)}
            id={"rowx" + i}
            value={i + 1}
          />
        </div>
      );
      tabley.push(
        <div>
          <input placeholder={"result" + (i + 1)} id={"rowy" + i} />
        </div>
      );
    }
    giventable.push({ x: tablex, y: tabley });
  };

  const resultttable = () => {
    console.log(giventable);
    return (
      <div>
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
      </div>
    );
  };

  const gotocal = () => {
    Num = parseInt(document.getElementById("Num").value);
    Cal(Num);
  };

  // let N = [];
  let ans = [];
  const Cal = (Num) => {
    console.log("CAL");
    // console.log(document.getElementById("rowx" + 2).value);
    // for (let i = 0; i < Num; i++) {
    //   N[i] = parseInt(document.getElementById("rowx" + i).value);
    // }
    // console.log(N);
    for (let i = 0; i < Num; i++) {
      let scope = {
        x: i + 1,
      };
      ans[i] = evaluate(Equation, scope);
    }
    console.log(ans);
    for (let i = 0; i < Num; i++) {
      document.getElementById("rowy" + i).value = ans[i];
    }
  };

  return (
    <div>
      input Equation
      <input type="text" onChange={inputequ} value={Equation} />
      <br />
      input num
      <input type="text" id="Num" onChange={inputnum} />
      <br />
      {table}
      <br />
      <input type="button" value={"cal"} onClick={gotocal} />
    </div>
  );
};

export default Test;
