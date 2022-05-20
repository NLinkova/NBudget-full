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
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

// Get users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "all", config);
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
