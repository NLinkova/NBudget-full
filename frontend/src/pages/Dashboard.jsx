import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TransactionForm from "../components/TransactionForm";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
  return (
    <>
      <div>
        <div id="wrapper">
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <div className="container-fluid">
                <div className="d-sm-flex justify-content-between align-items-center mb-4">
                  <h3 className="text-dark mb-2">
                    Your financial report August
                  </h3>
                  <div className="btn-group">
                    <button className="btn btn-primary" type="button">
                      change month
                    </button>
                    <button
                      className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      type="button"
                    ></button>
                    <select className="dropdown-menu">
                      <option className="dropdown-item" href="#">
                        September
                      </option>
                      <option className="dropdown-item" href="#">
                        October
                      </option>
                      <option className="dropdown-item" href="#">
                        December
                      </option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div className="card shadow border-start-primary py-2">
                      <div className="card-body">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                              <span>Income</span>
                            </div>
                            <div className="text-dark fw-bold h5 mb-0">
                              <span>$5000,000</span>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div className="card shadow border-start-success py-2">
                      <div className="card-body">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <div className="text-uppercase text-success fw-bold text-xs mb-1">
                              <span>Goals</span>
                            </div>
                            <div className="text-dark fw-bold h5 mb-0">
                              <span>$1800,00</span>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                      <TransactionForm />
                      <GoalForm />
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

export default Dashboard;
