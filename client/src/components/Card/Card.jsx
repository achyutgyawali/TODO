import React, { useState } from "react";
import "./Card.css";
import EditTodo from "../Layout/EditTodo";
import SuggestionModal from "../Layout/SuggestionModal";
import TodoServices from "../../Services/TodoServices";
import toast from "react-hot-toast";

const Card = ({ allTask, fetchTasks }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [suggestionContent, setSuggestionContent] = useState("");
  const [suggestedTaskTitle, setSuggestedTaskTitle] = useState("");

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDelete = async (taskId) => {
    await TodoServices.deleteTodo(taskId);
    fetchTasks();
  };

  const handleSuggestion = async (task) => {
  try {
    const data = await TodoServices.getSuggestion(task.title, task.description);
    setSuggestionContent(data.suggestion);
    setSuggestedTaskTitle(task.title);
    setShowSuggestionModal(true);
  } catch (err) {
    console.error("Suggestion error:", err.response?.data || err.message);
    toast.error("Failed to get suggestion. Please try again later.");
  }
};

  return (
    <>
      <div className="card-grid">
        {allTask?.map((task, i) => (
          <div className="todo-card" key={i}>
            <div className="card-top">
              <span className="task-title">{task?.title}</span>
              <span className={`status ${task?.isCompleted ? "completed" : "incomplete"}`}>
                {task?.isCompleted ? "Completed" : "Incomplete"}
              </span>
            </div>
            <p className="task-desc">{task?.description}</p>
            <p className="task-date">📅 {task?.createdAt.substring(0, 10)}</p>
            <div className="card-actions">
              <button className="delete-btn" onClick={() => handleSuggestion(task)} title="Suggestion">
                🩺
              </button>
              <button className="edit-btn" onClick={() => handleEdit(task)} title="Edit">
                ✏️
              </button>
              <button className="delete-btn" onClick={() => handleDelete(task._id)} title="Delete">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedTask && (
        <EditTodo task={selectedTask} setShowModal={setShowModal} fetchTasks={fetchTasks} />
      )}

      {showSuggestionModal && (
        <SuggestionModal
          suggestion={suggestionContent}
          setShowModal={setShowSuggestionModal}
          taskTitle={suggestedTaskTitle}
        />
      )}
    </>
  );
};

export default Card;
