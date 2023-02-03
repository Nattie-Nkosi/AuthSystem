const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const { registerRouter } = require("./routes/register");
const { loginRouter } = require("./routes/login");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error"));
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(registerRouter);
app.use(loginRouter);

app.use("/", (req, res) => {
  res.send("Welcome to the authentication system");
});

app.use("*", (req, res) => {
  res.status(404).send({ error: "Route not found" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}.`));
