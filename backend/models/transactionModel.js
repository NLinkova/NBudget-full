const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //to connect 2 collections
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      trim: true,
      required: [true, "Please add some text for a transaction"],
    },
    amount: {
      type: Number,
      required: [
        true,
        "Please add a positive number for income or negative number for expenses",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
