const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger.json");

const app = express();
app.use(cors());
app.use(express.json());

const secretKeys = "peepatnice";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "nicedb",
//   password: "peepatnice1212",
// });

app.get("/gettoken/:name", (req, res) => {
  console.log(req.params.name);
  const token = jwt.sign({ user: req.params.name }, secretKeys);
  console.log("get token successfully");
  res.send(token);
});

app.get("/", (req, res) => {
  console.log("save request");
  res.send({
    numgen: 8,
    x: [
      [1, 0, 2, 3, 4, 2, 1, 5],
      [0, 1, 4, 2, 1, 3, 6, 10],
      [1, 3, 1, 2, 5, 3, 4, 15],
    ],
    y: [4, -5, -6, 0, -1, -7, -20, 50],
  });
});

app.get("/equation", (req, res) => {
  console.log("auth passs");
  const q = "SELECT * FROM equations order by idequations desc LIMIT 20";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    console.log("datasucceeded");
    return res.json(data);
  });
});

app.get("/equations", authorization, (req, res) => {
  console.log("auth passs");
  const q = "SELECT * FROM equations order by idequations desc LIMIT 20";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    console.log("datasucceeded");
    return res.json(data);
  });
});

app.post("/equations", (req, res) => {
  console.log(req);
  const q1 = `SELECT * FROM equations where fx='${req.body.fx}'`;
  console.log(req.body.fx);
  if (req.body.fx !== "") {
    db.query(q1, (err, data) => {
      if (err) return res.json(err);
      console.log(data);
      if (data.length > 0) {
        console.log("have");
        res.send("success");
      } else {
        console.log("no have");
        const q = "INSERT INTO equations(fx) VALUES (?)";
        db.query(q, [req.body.fx], (err) => {
          if (err) return res.json(err);
          console.log("fxaddsucceeded");
          res.send("add success");
        });
      }
    });
  } else {
    console.log("no field");
  }
});

app.post("/data", (req, res) => {
  console.log(JSON.stringify(req.body));
  console.log(req.body);
  let d = JSON.stringify(req.body);
  const q = `SELECT * from poly where polycol='${JSON.stringify(req.body)}'`;
  db.query(q, (err, data) => {
    console.log("nice");
    if (err) return res.json(err);
    if (data.length > 0) {
      console.log("have data");
      res.send("polycol have data");
    } else {
      console.log("no have data");
      const q1 = `INSERT INTO poly(polycol,num) VALUES (?,?)`;
      db.query(q1, [d, req.body.numgen], (err) => {
        if (err) return res.json(err);
        console.log("add polycol");
        res.send("add polycol successfully");
      });
    }
  });
});

app.post("/getdata", (req, res) => {
  const q = `SELECT * FROM poly where num=${req.body.numgen}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    const n = Math.floor(Math.random() * data.length);
    res.send(data[n]);
  });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

function authorization(req, res, next) {
  let token = req.headers["authorization"];
  if (token === undefined) {
    res.send("don't have authorization");
  } else {
    try {
      console.log(`token1 = ${token}`);
      token = token.split(" ")[1];
      console.log(token);
      let decode = jwt.verify(token, secretKeys);
      console.log(decode);
      if (decode.user === "nice") {
        next();
      } else {
        res.send("pls authen");
      }
    } catch {
      res.send("no correct");
    }
  }
}

app.post("/test", (req, res) => {
  console.log(req.body);
  res.send("access");
});

app.listen(8800, () => {
  console.log(`connect! port`);
});

module.exports = app;
