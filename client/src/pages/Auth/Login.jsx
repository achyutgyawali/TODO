import React, { useState } from "react";
import "./AuthStyles.css";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const loginHanlder = async (e) => {
    try {
      e.preventDefault();
      const data = { email, password };
      const res = await AuthServices.loginUser(data);
      toast.success(res.data.message);
      navigate("/home");
      localStorage.setItem("todoapp", JSON.stringify(res.data));
      console.log(res.data);
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.log(err);
    }
  };
  return (
    <div className="container">
      <div className="login-container mx-auto mt-5 p-4 shadow-sm bg-white rounded-4">
        <h2 className="text-center mb-2">Login</h2>

        <form onSubmit={loginHanlder}>
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
              required
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
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-orange">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none">
            Forgot password?
          </a>
        </div>
        <div className="text-center mt-2">
          <span className="text-muted">New here?</span>{" "}
          <Link to="/register" className="text-decoration-none text-orange">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
