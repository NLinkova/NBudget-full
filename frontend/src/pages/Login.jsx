import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/Spinner";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    console.log(userData);
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
              <label>
                <FontAwesomeIcon icon={faEnvelope} /> Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
                title="Must be a valid email"
              />
            </div>
            <div className="form-group m-2">
              <label>
                <FontAwesomeIcon icon={faKey} /> Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
                pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,}"
                title="At least 4 or more characters"
                required
              />
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
