import React from "react";

function Spinner() {
  return (
    <div
      className="spinner-border mb-5 mt-5"
      style={{
        width: "8rem",
        height: "8rem",
        justifyContent: "center",
        alignItems: "center",
      }}
      role="status"
    ></div>
  );
}

export default Spinner;
