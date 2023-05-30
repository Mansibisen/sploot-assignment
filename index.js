

require("dotenv").config({ path: "./src/env/.env" });
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app  = express();
require('./src/database/setup.js');
app.use(bodyParser.raw());

const apiRouter = require("./src/api/api");

// connections
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);
global.appRoot = path.resolve(__dirname);
const port = process.env.PORT;



app.listen(port, () => console.log(`server started at port ${port}`));