import React from "react";
import { Link } from "react-router-dom";
import pic1 from "../../assets/images/Designer.jpeg";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="hero">
      <div className="intro-text">
  <h1>
    <span className="tagline1">Organize</span>
    <br />
    <span className="tagline2">Simplify your life.</span>
  </h1>
  <p>
    Stay on top of your day with our intuitive and elegant task manager —  
    designed to help you focus, achieve, and unwind.
  </p>
  <div className="btn-group">
    <Link className="btn red" to="/register">
      Get Started
    </Link>
    <Link className="btn blue" to="/login">
      Already a member? Login
    </Link>
  </div>
</div>

      <div className="">
        <img src={pic1} alt="heroimage" width={"100%"} height={515} />
      </div>
    </div>
  );
};

export default Landing;
