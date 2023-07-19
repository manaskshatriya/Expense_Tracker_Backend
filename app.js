require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
      console.log(`MongoDB connected...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
