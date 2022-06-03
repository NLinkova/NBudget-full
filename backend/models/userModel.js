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
      min: [
        8,
        "Please use 8 more symbols, uppercase and lowcase characters and special symbol",
      ],
    },
  },
  {
    timestamps: true, //auto time for edit or create
  }
);

module.exports = mongoose.model("User", userSchema);
