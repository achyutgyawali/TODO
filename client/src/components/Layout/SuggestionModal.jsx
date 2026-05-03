import React from "react";
import "./PopModal.css";

const SuggestionModal = ({ suggestion, setShowModal, taskTitle }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">AI Suggestion for "{taskTitle}"</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="suggestion-box" style={{ 
                backgroundColor: "#f0f9ff", 
                padding: "20px", 
                borderRadius: "12px", 
                borderLeft: "5px solid #0ea5e9",
                lineHeight: "1.6",
                fontSize: "1.05rem",
                color: "#0c4a6e"
            }}>
                <i className="fa-solid fa-lightbulb" style={{ color: "#0ea5e9", marginRight: "10px" }}></i>
                {suggestion}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionModal;
