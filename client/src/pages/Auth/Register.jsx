import React, { useState } from "react";
import "./AuthStyles.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthServices from "../../Services/AuthServices";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const registerHanlder = async (e) => {
    try {
      e.preventDefault();
      const data = { username, email, password };
      const res = await AuthServices.registerUser(data);
      toast.success(res.data.message);
      navigate("/login");
      console.log(res.data);
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.log(err);
    }
  };
  return (
    <div className="container">
      <div className="register-container mx-auto mt-5 p-4 shadow-sm bg-white rounded-4">
        <h2 className="text-center mb-2">Register</h2>

        <form onSubmit={registerHanlder}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="example_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="your strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-orange">
              Register
            </button>
          </div>
        </form>
        <div className="text-center mt-2">
          <span className="text-muted">Already a user?</span>{" "}
          <Link to="/login" className="text-decoration-none text-orange">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
