import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(localStorage.getItem("user"));
  }
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.post(API_URL + "logout");
  if (response.data) {
    localStorage.removeItem("user");
  }
  return response.data;
};

// Get users
const getUsers = async (token) => {
  // let usertoken = JSON.parse(localStorage.getItem('user'));
  // console.log(localStorage.getItem('user'));
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },

  // };
  const response = await axios.get(API_URL + "all");
  return response.data;
};

// Delete user
const deleteUser = async (userId) => {
  const response = await axios.delete(API_URL + userId);
  return response.data;
};

// add user
const addUser = async (userData) => {
  const response = await axios.post(API_URL + "adduser", userData);
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  deleteUser,
  getUsers,
  addUser,
};

export default authService;
