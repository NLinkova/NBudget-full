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
      navigate("/");
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
                id="email"
                className="form-control"
                type="email"
                placeholder="Please enter your email"
                value={email}
                onChange={onChange}
                // {...register("email", {
                //   required: true,
                //   pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                // })}
              />
              {/* <span className="text-primary">
                {errors.email && "Invalid email. Please try again"}
              </span> */}
            </div>
            <div className="form-group m-2">
              <label>
                <FontAwesomeIcon icon={faKey} /> Password
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                placeholder="Please enter your password"
                onChange={onChange}
                value={password}
                // {...register("password", {
                //   required: true,
                //   pattern: /^[\w-\.].{4,}$/,
                // })}
              />
              {/* <span className="text-primary">
                {errors.password &&
                  "Invalid password. Please try more than 4 characters"}
              </span> */}
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
