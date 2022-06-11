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
const logout = async () => {
  const response = await axios.post(API_URL + "logout");
  if (response.data) {
    localStorage.removeItem("user");
  }
  return response.data;
};

// Get users
const getUsers = async (token) => {
  const response = await axios.get(API_URL + "all");
  return response.data;
};

// Update user
const updateUser = async (userId, data) => {
  const response = await axios.patch(API_URL + userId, data);
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
  updateUser,
  getUsers,
  addUser,
};

export default authService;
