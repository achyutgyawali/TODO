const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoutes");

dotenv.config();
connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/todo", todoRoute);
app.use("/api/v1/test", require("./routes/testRoutes"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
