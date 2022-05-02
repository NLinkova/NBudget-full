const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //to connect 2 collections
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text value for your goal"],
    },
    amount: {
      type: Number,
      required: [true, "Please add a positive number or negative number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
