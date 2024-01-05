import React from "react";
import { handleLogout } from "../helper/helper";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const history = useNavigate();
  return (
    <div className="bar">
      <h3>Logo</h3>
      <button onClick={() => handleLogout(history)}>Logout</button>
    </div>
  );
};
