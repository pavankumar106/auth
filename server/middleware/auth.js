const jwt = require("jsonwebtoken");
require("dotenv").config90;

exports.auth = (req, res, next) => {
  try {
    // extract jwt token
    const { token } = req.body;
    // validate token
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token missing",
      });
    }
    // verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Token invalid",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong while verifying the Token",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for students",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "User role not matching to access this route",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admins",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "User role not matching to access this route",
    });
  }
};
