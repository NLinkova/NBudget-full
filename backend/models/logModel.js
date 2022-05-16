const mongoose = require("mongoose");

const logSchema = mongoose.Schema(
  {
    ip: {
      type: String,
    },
    user: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    usertype: {
      type: String,
    },
    action: {
      type: String,
    },
    endpoint: {
      type: String,
    },
  },
  {
    timestamps: true, //auto time for edit or create
  }
);

module.exports = mongoose.model("Log", logSchema);
