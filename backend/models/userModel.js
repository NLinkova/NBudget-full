const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    usertype: {
      type: String,
      required: [true, "Please select usertype"],
      default: "user",
      enum: ["admin", "user"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      min: [4, "Please use 4 more symbols"],
    },
  },
  {
    timestamps: true, //auto time for edit or create
  }
);

module.exports = mongoose.model("User", userSchema);
