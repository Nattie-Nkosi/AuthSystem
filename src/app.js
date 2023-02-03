require("./models/User");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(authRoute);
app.use(cors());

try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.error(`Failed to connect to MongoDB: ${error}`);
}

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error"));
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.get("/", (req, res) => {
  res.send("Welcome to the authentication system");
});

app.all("*", (req, res) => {
  res.status(404).send({ error: "Route not found" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}.`));
