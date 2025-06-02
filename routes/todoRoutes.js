const express = require("express");
const {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
} = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .post("/create", authMiddleware, createTodoController)
  .post("/getAll/:userId", authMiddleware, getTodoController)
  .delete("/delete/:id", authMiddleware, deleteTodoController)
  .patch("/update/:id", authMiddleware, updateTodoController);

module.exports = router;
