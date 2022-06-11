import React from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import helpGif from "../images/help.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";

function Help() {
  return (
    <div>
      <h1> Welcome to NBudget</h1>
      <div className="home-page">
        <div className="text-center">
          <img src={logo} className="rounded home-logo" alt="nbudget logo" />
        </div>
        <h2>How you can use it?</h2>
        <p>
          Simple! Just register, login to the service and open your Dashboard.
          Start control your money adding transactions and savings' goals
        </p>
        <h2>You can have a look at the video below</h2>
        <img className="" src={helpGif} alt="helping video" />
        <p>You can add and delete any of transactions and goals</p>
        <h2>Coming soon...</h2>
        <p>Our app is developing and improving. Future features: </p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Month report</li>
          <li className="list-group-item">Pie diagrams with percentage</li>
          <li className="list-group-item">
            Financial advice to help improve your money flow
          </li>
        </ul>
        <p className="helptext">
          Won't take long <FontAwesomeIcon icon={faCircleDollarToSlot} />
        </p>
        <h4>
          Have ideas or questions?
          <Link className="small home-link" to="">
            Contact us
          </Link>
        </h4>
      </div>
    </div>
  );
}

export default Help;
