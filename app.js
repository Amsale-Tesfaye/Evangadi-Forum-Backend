
require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;

const cors = require('cors')

app.use(cors())

//db dbConnection
const dbConnection = require("./db/dbConfig");

//user routes middleware file
const userRoutes = require("./routes/userRoute");

// question routes middleware file??
const questionRoutes = require("./routes/questionRoute");
// answer routes middleware file??
const answerRoutes = require("./routes/answerRoute");
//authentication middleware file
const authMiddleware = require("./middleware/authMiddleware");



//json middleware to exract json data
app.use(express.json());

//user routes middleware
app.use("/api/users", userRoutes);
// app.use("/api/users", authMiddleware, userRoutes);

//question routes middleware ??
app.use("/api/questions", authMiddleware, questionRoutes);

//answer routes middleware ??
app.use("/api/answers", authMiddleware, answerRoutes);


async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port} `);
  } catch (error) {
    console.log(error.message);
  }
}

start();
