import express from "express";
import mongoose from "mongoose";
import bodyParser, { json } from "body-parser";
import routes from "./src/routes/crmRoutes.js";
import { decode } from "jsonwebtoken";
import jsonwebtoken from "jsonwebtoken";

const app = express();
const port = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb");

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT setup
app.use((req, res, next) => {
  const auth = req.headers.authorization || req.query.Authorization;
  if (auth && auth.split(" ")[0] === "JWT") {
    jsonwebtoken.verify(auth.split(" ")[1], "RESTFULAPIs", (err, decode) => {
      req.user = err ? undefined : decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

//serving static files
app.use(express.static("public"));

// register routes defined in ./src/routes/crmRoutes.js
routes(app);

app.get("/", (req, res) =>
  res.send(`Hello World ......running over Node and express on port ${port}`),
);

app.listen(port, () => console.log(`Your server is running on port ${port}`));
