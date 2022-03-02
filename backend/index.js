const { connectToMongo } = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/auth'));

app.listen(port, () => {
  console.log("Success");
});