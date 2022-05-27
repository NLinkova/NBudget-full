import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllUsers from "./pages/AllUsers";
import AddUser from "./pages/AddUser";

function App() {
  const [isDarkMode, setDarkMode] = useState(false);

  //dark/light mode functions
  useEffect(() => {
    let darkTheme = localStorage.getItem("DarkMode");
    if (darkTheme === true) {
      setDarkMode(darkTheme);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    let theme = document.getElementsByTagName("link")[1];
    if (isDarkMode === true) {
      theme.setAttribute("href", "./css/bootstrap-night.min.css");
    } else {
      theme.setAttribute("href", "./css/bootstrap.min.css");
    }
  }, [isDarkMode]);

  function onThemeSwitch(e) {
    if (e.target.checked) {
      setDarkMode(true);
      localStorage.setItem("DarkMode", "true");
    } else {
      localStorage.setItem("DarkMode", "false");
      setDarkMode(false);
    }
  }

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="App">
      <Router>
        <Header SwitchTheme={onThemeSwitch} />
        <div className="AppBody">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/dashboard" element={<Dashboard />} />

            <Route exact path="*" element={<PageNotFound />} />
            {user && user.usertype === "admin" ? (
              <Route exact path="/admin" element={<AllUsers />} />
            ) : (
              <Route exact path="/dashboard" element={<Dashboard />} />
            )}

            {user && user.usertype === "admin" ? (
              <Route exact path="/adduser" element={<AddUser />} />
            ) : (
              <Route exact path="/dashboard" element={<Dashboard />} />
            )}
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
