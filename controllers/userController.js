const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(500)
        .send({ sucess: false, message: "All fields required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res
      .status(201)
      .send({ success: true, message: "User registered sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Register API", error });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Login unsuccessful" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(500)
        .send({ success: false, message: "Invalid Credentials" });
    }

    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.log("error");
    res.status(500).send({ success: false, message: "Login API", error });
  }
};
module.exports = { registerController, loginController };
