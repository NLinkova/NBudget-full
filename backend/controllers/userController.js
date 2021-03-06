const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, usertype, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // Check if user exists
  const userExists = await User.findOne({ email }); //method to check user existing

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    email,
    usertype,
    password: hashedPassword, //hashed password
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      usertype: user.usertype,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = {
      _id: user._id,
      usertype: user.usertype,
    };
    res.status(200).json({
      _id: user.id,
      email: user.email,
      usertype: user.usertype,
      token: generateToken({ _id: user._id, usertype: user.usertype }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Destroy session logout
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  req.session.destroy();
  res.status(200).json({ status: "Logged Out" });
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT token
const generateToken = (id, usertype) => {
  return jwt.sign({ id, usertype }, process.env.JWT_SECRET, {
    expiresIn: "10d", // 10 days expire time
  });
};

//Get all users
//GET /api/users
//access Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  await user.remove();
  res.status(200).json({ id: req.params.id });
});

// // @desc    Update user
// // @route   UPDATE /api/users/:id
// // @access  Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  await user.updateOne({ $set: { usertype: "admin" } });
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  getAllUsers,
  deleteUser,
  updateUser,
};
