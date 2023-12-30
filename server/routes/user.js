const express = require("express");
const router = express.Router();

const { login, signUp } = require("../controllers/auth.js");
const { auth, isStudent, isAdmin } = require("../middleware/auth.js");

router.post("/login", login);
router.post("/signup", signUp);

// test route
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected routes for test",
  });
});

// Protected routes
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected routes for students",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected routes for admin",
  });
});

module.exports = router;
