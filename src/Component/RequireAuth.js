import React, { component } from "react";
import "../CSS/Login.css";
import usericon from "../Images/user-icon.png";
import lockicon from "../Images/lock-icon.png";
import { Link, useNavigate  ,useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function RequireAuth({ children }) {
  let Navigate =useNavigate();
  const location = useLocation();
   const authed = false;
   
  return authed === true
    ? children
    : <Navigate to="/homepage"  replace state={{ path: location.pathname }}  />;
}
export default RequireAuth;
