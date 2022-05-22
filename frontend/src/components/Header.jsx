import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCreditCard,
  faUser,
  faPencil,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import headerLogo from "../logo.png";

function Header({ SwitchTheme }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-between">
          <div className="d-flex justify-content-start">
            <Link className="navbar-brand nav-link" to="/">
              <img
                className="header__logo"
                src={headerLogo}
                alt="логотип страницы место"
              />
              NBudget
            </Link>
          </div>
          <p className="header__email align-self-center m-auto">
            {user && user.email}
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
              </li>
              <li className="nav-item m-auto navbar-light">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    onChange={SwitchTheme}
                  />
                  <label
                    className="form-check-label nav-link active"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Light/Dark mode
                  </label>
                </div>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      <FontAwesomeIcon icon={faCreditCard} /> Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn" onClick={onLogout}>
                      <FontAwesomeIcon icon={faUser} /> Sing out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      <FontAwesomeIcon icon={faUserAlt} /> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      <FontAwesomeIcon icon={faPencil} /> Register
                    </Link>
                  </li>
                </>
              )}
              {user && user.usertype === "admin" && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">
                    <FontAwesomeIcon icon={faPencil} /> All users
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
