import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="not-found">
      <h3 className="not-found__title">
        <span>404</span> - Page not found
      </h3>
      <Link className="button button_type_to-main" to="/">
        Try Main Page
      </Link>
    </div>
  );
}

export default PageNotFound;
