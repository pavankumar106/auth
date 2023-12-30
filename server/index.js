const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./controllers/auth");
const user = require("./routes/user.js");
const database = require("./config/database.js");

// configurations
dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.Router());

// Auth
app.use("/api/v1", user);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "sever running",
  });
});

database();
app.listen(port, () => console.log(`started ${port}`));
