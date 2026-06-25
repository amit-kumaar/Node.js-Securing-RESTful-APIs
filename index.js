import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/crmRoutes.js";

const app = express();
const port = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb");

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//serving static files
app.use(express.static('public'))

// register routes defined in ./src/routes/crmRoutes.js
routes(app);

app.get("/", (req, res) =>
  res.send(`Hello World ......running over Node and express on port ${port}`),
);

app.listen(port, () => console.log(`Your server is running on port ${port}`));
