const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// signup route handler
exports.signUp = async (req, res) => {
  try {
    // get data from req.body

    const { name, email, password, role } = req.body;

    // check if fields are empty
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    // check if user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists...",
      });
    }

    // hash the password
    let hashedPassword;
    let salt = bcrypt.genSaltSync(10);
    try {
      hashedPassword = await bcrypt.hashSync(password, salt);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // create user in db
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    // return response
    return res.status(200).json({
      success: true,
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later...",
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    // get data from req.body
    const { email, password } = req.body;
    // validate fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }
    // user check in db
    let user = await User.findOne({ email });

    // if user not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not registered",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    // verify password and generate jwt token
    if (await bcrypt.compareSync(password, user.password)) {
      // password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;
      const options = {
        expiresIn: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Password Not match",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be logged in, please try again later...",
    });
  }
};
