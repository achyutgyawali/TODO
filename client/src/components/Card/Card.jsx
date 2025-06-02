import React, { useState } from "react";
import "./Card.css";
import EditTodo from "../Layout/EditTodo";
import TodoServices from "../../Services/TodoServices";

const Card = ({ allTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDelete = (taskId) => {
    TodoServices.deleteTodo(taskId);
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
        <EditTodo task={selectedTask} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default Card;
