const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user");
const quotesRouter = require("./routes/quotes");

const errorHandler = require("./utils/errhandler");

const auth = require("./utils/auth");

const app = express();

// Middlewares
app.use(cors());
// app.use("/images", express.static("images"));
app.use(express.json());
app.use(auth);

// Testing
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("hello req: ", req);
  // console.log("res: ", res);
});

// Routes
app.use("/user", userRouter);
app.use("/quotes", quotesRouter);
// app.use("/foods", foodRouter);
// app.use("/orders", orderRouter);

// Error handling middleware must be last
app.use(errorHandler);

app.listen(4000, "localhost", () => {
  console.log("Server started at port 4000");
});
