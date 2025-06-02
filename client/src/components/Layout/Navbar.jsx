import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Navbar.css";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("todoapp");
    navigate("/login");
    toast.success("Logout Successful");
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("todoapp"));
    console.log("User Data:", userData && userData.user.username);
    setUsername(userData && userData.user.username);
  });
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <h4 className="navbar-brand">
              <i className="fa-solid fa-user" /> &nbsp;
              <i>Wecome </i> {username}!
            </h4>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  title="Logout"
                  onClick={logoutHandler}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
