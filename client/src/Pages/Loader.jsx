import React from "react";
import "./Styles/loader.css";

const Loader = () => {
  return (
    <>
      <div className="overelay">
        <div class="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  );
};

export default Loader;
