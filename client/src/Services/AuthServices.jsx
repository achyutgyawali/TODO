import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7000/api/v1",
});

const registerUser = (data) => {
  return API.post("/user/register", data);
};

const loginUser = (data) => {
  return API.post("/user/login", data);
};

const AuthServices = { registerUser, loginUser };

export default AuthServices;
