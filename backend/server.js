require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/auth");
const port = process.env.PORT || 5000;

// connection with database
connectDB();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", require("./routes/user"));
app.use("/api/posts", require("./routes/post"));

app.listen(port, () => console.log(`server running on port ${port}`));
