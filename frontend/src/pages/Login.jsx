import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/Spinner";

export default function Login() {
  //state for input data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  //states for invalid inout errors
  const [error, setError] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //effect to handle error, navigate, reset
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  function style(error) {
    if (error) {
      return {
        backgroundColor: "rgba(94, 128, 197, 0.89)",
      };
    }
  }

  //onchange input fields
  const onChange = (e) => {
    const newValueIsValid = !e.target.validity.patternMismatch;
    if (error) {
      if (newValueIsValid) {
        setError(false);
        setShowErrorText(false);
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //show/hide error messages
  const handleBlur = (event) => {
    if (!error) {
      if (event.target.validity.patternMismatch) {
        ref.current.focus();
        setError(true);
        setShowErrorText(true);
      }
    }
    if (error) {
      setShowErrorText(false);
    }
  };

  const handleFocus = () => {
    if (error) {
      setShowErrorText(true);
    }
  };

  //submit function
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div className="card shadow-lg o-hidden border-0 my-5">
        <section className="heading">
          <h1>Welcome back to NBudget</h1>
          <p>Login and start control your money</p>
        </section>
        <section className="form">
          <form className="user" name="login" onSubmit={onSubmit}>
            <div className="form-group m-2">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Please enter your email"
                onChange={onChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                style={style(error)}
                ref={ref}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
                title="Must be a valid email"
              />
              {showErrorText && (
                <p role="alert" style={{ color: "rgba(94, 128, 197, 0.89)" }}>
                  Please make sure you've entered a valid <em>email</em>
                </p>
              )}
            </div>
            <div className="form-group m-2">
              <label htmlFor="password">
                <FontAwesomeIcon icon={faKey} /> Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Please enter your password"
                onChange={onChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                style={style(error)}
                ref={ref}
                pattern="(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$"
                title="Please use 8 more symbols, uppercase and lowercase characters and special symbol"
                required
              />
              {showErrorText && (
                <p role="alert" style={{ color: "rgba(94, 128, 197, 0.89)" }}>
                  Please make sure you've entered 8 more symbols, uppercase and
                  lowercase characters and special symbol
                </p>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary m-4">
                Login
              </button>
            </div>
          </form>
          <div className="text-center m-2">
            <Link className="small" to="/register">
              Create an Account!
            </Link>
          </div>
        </section>
      </div>
    );
  }
}
