import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "roote",
  host: "localhost",
  password: "Cariota1.",
  database: "authentication",
});

app.listen(5000, () => console.log("Server running on PORT 5000"));
