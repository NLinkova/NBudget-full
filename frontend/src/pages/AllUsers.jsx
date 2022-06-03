import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, updateUser, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function AllUsers() {
  let user = JSON.parse(localStorage.getItem("user"));
  const { isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isError) {
      console.log(message);
      navigate("/");
    }
    if (users !== []) {
      setLoading(false);
    }
    return () => {
      dispatch(reset());
    };
  }, [users, dispatch]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/users/all", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + user.token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "The following error has occured: " + response.statusText
          );
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div>
        <div id="wrapper">
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <div className="container-fluid">
                <div className="d-sm-flex justify-content-between align-items-center mb-4">
                  <h3 className="text-dark mb-2">All users</h3>
                  <Link to="/adduser" className="btn btn-outline-info">
                    Add new user
                  </Link>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th>Email</th>
                            <th>Usertype</th>
                            <th>Change Usertype</th>
                            <th>Delete</th>
                          </tr>
                          {users.map((user, key) => {
                            return (
                              <tr key={key} user={user}>
                                <td>{user.email}</td>
                                <td>{user.usertype}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch(updateUser(user._id));
                                      debugger;
                                      window.location.reload();
                                    }}
                                    className="btn btn-outline-info"
                                  >
                                    v
                                  </button>
                                </td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch(deleteUser(user._id));
                                      window.location.reload();
                                    }}
                                    className="btn btn-outline-info"
                                  >
                                    x
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUsers;
