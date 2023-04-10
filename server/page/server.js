import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "peepatnice1212",
  database: "nicedb",
});

app.get("/", (req, res) => {
  console.log("save request");
  res.send({ m: 2, x: 65, num: 9 });
});

app.get("/data", (req, res) => {
  console.log("access data");
  res.send({
    valuex: [10, 15, 20, 30, 40, 50, 60, 70, 80],
    valuey: [5, 9, 15, 18, 22, 30, 35, 38, 43],
  });
});

app.listen(9000, () => {
  console.log(`connect! port 9000`);
});
