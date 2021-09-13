import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import jwt from "jsonwebtoken";

const app = express();
const saltRounds = 10;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    key: "user",
    secret: "bigolsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 3600000 * 24,
    },
  })
);

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

// AUTH MIDDLEWARE
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("No token, please get one");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed to Authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("Yo, you are authenticated Congrats!");
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
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
          // JWT
          const id = result[0].id;
          const token = jwt.sign({ id }, "jwtSecret", {
            expiresIn: 300,
          });

          // Session
          req.session.user = result;

          res.json({ auth: true, token: token, result: result });
        } else {
          res.json({ auth: false, message: "Wrong username or password" });
        }
      });
    } else {
      res.json({ auth: false, message: "User doesn't exist!" });
    }
  });
});

app.listen(5000, () => console.log("Server running on PORT 5000"));
