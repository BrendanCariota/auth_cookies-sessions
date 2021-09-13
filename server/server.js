import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const saltRounds = 10;

app.use(express.json());
app.use(cors());

// -- DB CONNECTION --
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "authentication",
});

// -- REGISTER --
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "INSERT INTO users (username, password) VALUES (?,?);",
        [username, hash],
        (err, result) => {
          if (err) {
            console.log(err);
            res.send({ message: "Username already exist. Choose Another." });
          }
          res.send(result);
        }
      );
    }
  });
});

// -- LOGIN --
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ?;", username, (err, result) => {
    if (err) {
      return res.send(err);
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          res.send(result);
        } else {
          res.send({ message: "Wrong username or password" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist!" });
    }
  });
});

app.listen(5000, () => console.log("Server running on PORT 5000"));
