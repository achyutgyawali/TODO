import { useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import PopModal from "../../components/Layout/PopModal";
import TodoServices from "../../Services/TodoServices";
import Card from "../../components/Card/Card";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);

  const openModalHandler = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("todoapp"));
    const id = userData && userData.user.id;
    const getUserTask = async () => {
      try {
        const { data } = await TodoServices.getAllTodo(id);
        setAllTask(data?.todos);
      } catch (error) {
        console.log(error);
      }
    };
    getUserTask();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="container-group">
        </div>
        <button className="btn btn-primary" onClick={openModalHandler}>
            Add Task
          </button>
      </div>
      {allTask && <Card allTask={allTask} />}
      <PopModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
    </>
  );
};

export default Home;
