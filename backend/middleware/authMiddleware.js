const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1]; // turn to the array

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Grant access to specific roles
const authAdmin = (...usertypes) => {
  return (req, res, next) => {
    if (!usertypes.includes(req.user.usertype)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.usertype} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

const protectAdmin = asyncHandler(async (req, res, next) => {
  try {
    // Get user from the token
    req.user = await User.find({ usertype: "admin" });
    console.log(usertype);
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect, authAdmin, protectAdmin };
