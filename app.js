require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const userRouter = require("./routes/userRouter/user.router");
const expenseRouter = require("./routes/expenseRouter/expense.router");
const authRouter = require("./routes/authRouter/auth.router");



app.use(express.json());
app.use("/api/", userRouter);
app.use("/api/expense", expenseRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {  
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;
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