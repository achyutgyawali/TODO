const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, required: true, default: false },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
