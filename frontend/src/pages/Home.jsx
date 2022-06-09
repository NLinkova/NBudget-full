import React from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <h1> Welcome to NBudget</h1>
      <div className="home-page">
        <div className="text-center">
          <img src={logo} className="rounded home-logo" alt="nbudget logo" />
        </div>
        <h2>Purpose</h2>
        <p>
          NBudget is a new user-friendly service that allows to control your
          budget. This control budget system collects information about users’
          transactions and savings goal and prepares a visual report and diagram for the
          user. The service is created to provide the best possible user
          experience for money management. It will be a mobile-friendly web app,
          which could be accessible at any time.
        </p>
        <h2>Why?</h2>
        <p>
          This system is designed to supply financial observe and advice for
          those who desire to control their budget. The system allows users to
          add their expenses and savings. This allows users to visually estimate
          their budget and check categories that could be reduced or increased.
          Manual typing money amount in different categories gives a possibility
          to actually understand and think it over. Which makes users more
          conscious about money flow.
        </p>
        <h2>
          Interesting?{" "}
          <Link className="small home-link" to="/register">
            Register now!
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default Home;
