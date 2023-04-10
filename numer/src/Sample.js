import React, { useState } from "react";

const Sample = () => {
  const datamatrix = [];
  const [displaymatrix, setDisplaymatrix] = useState();

  const numgen = (event) => {
    let num = event.target.value;
    create_table(num);
    setDisplaymatrix(Resultmatrix());
  };

  const create_table = (num) => {
    let array_a = [];
    let array_b = [];
    for (let i = 0; i < num; i++) {
      array_b.push(
        <div>
          <input id={"rowb" + i} size="1" style={{ textAlign: "center" }} />
        </div>
      );
      let eachinp_a = [];
      for (let j = 0; j < num; j++) {
        let rc = "rowa" + i + "columna" + j;
        eachinp_a.push(
          <input id={rc} size="1" style={{ textAlign: "center" }} />
        );
      }
      array_a.push(<div>{eachinp_a}</div>);
    }
    datamatrix.push({ a: array_a, b: array_b });
  };

  const Resultmatrix = () => {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          matrix A ={" "}
          <div>
            {datamatrix.map((data) => {
              return <div>{data.a}</div>;
            })}
          </div>
          <div style={{ display: "flex", marginLeft: "50px" }}>
            matrix B ={" "}
            <div>
              {datamatrix.map((data) => {
                return <div id="myInput">{data.b}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      number = <input type="text" onChange={numgen} />
      {displaymatrix}
    </div>
  );
};

export default Sample;
