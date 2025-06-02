const todoModel = require("../models/todoModel");

const createTodoController = async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and description",
      });
    }
    const todo = new todoModel({ title, description, createdBy });
    const result = await todo.save();
    res
      .status(201)
      .send({ success: true, message: "Your task has been created", result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in create todo API", error });
  }
};

const getTodoController = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(404)
        .send({ success: false, message: "No user found with this Id" });
    }

    const todos = await todoModel.find({ createdBy: userId });
    if (!todos) {
      return res
        .status(404)
        .send({ success: true, message: "You have no todos" });
    }
    res.status(200).send({ success: true, message: "Your Todos", todos });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in todo API", error });
  }
};

const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .send({ success: false, message: "No todo found with this id" });
    }

    const todo = await todoModel.findByIdAndDelete({ _id: id });
    if (!todo) {
      return res.status(404).send({ success: false, message: "No task found" });
    }

    res
      .status(200)
      .send({ success: true, message: "Your task has been deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in delete Todo API" });
  }
};

const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .send({ success: false, message: "Please provide todo Id" });
    }

    const data = req.body;
    const todo = await todoModel.findByIdAndUpdate(
      id,
      { $set: data },
      { returnOriginal: false }
    );
    res
      .status(200)
      .send({ success: true, message: "Your task has been updated", todo });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in update Todo API" });
  }
};
module.exports = {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
};
