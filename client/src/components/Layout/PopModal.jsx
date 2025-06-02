import "./PopModal.css";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";

const PopModal = ({
  title,
  setTitle,
  description,
  setDescription,
  showModal,
  setShowModal,
}) => {
  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData && userData.user.id;
      const data = { title, description, createdBy };

      if (!title || !description) {
        return toast("Please provide title and description");
      }

      const todo = await TodoServices.createTodo(data);
      setShowModal(false);
      toast.success("Task Created Successfully");
      console.log(todo);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="taskTitle" className="form-label">
                      Task Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      id="taskTitle"
                      placeholder="Enter task title"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="taskDesc" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      id="taskDesc"
                      rows="3"
                      placeholder="Enter description"
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  <i className="fa-solid fa-plus"></i> &nbsp; Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopModal;
