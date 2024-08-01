import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Navbar.scss";

import useValidateToken from "../hooks/useValidateToken";

export default function Navbar() {  

  const { user, error, validateToken } = useValidateToken();    //runs the localstore through the custom 

  useEffect(()=> {
      console.log(`Our decrypted data associated under localStorage is: `, user);
    } ,[user])

  return (
    <div className="nav-bar">
      <div className="nav-bar-logo">
        <img src="https://placehold.co/40x40"/>
      </div>

      <div className="nav-bar-link">
        <a href="/explore">Explore</a>
      </div> 

      <div className="nav-bar-user">
        <img src="https://placehold.co/40x40"/>
        <div className="nav-bar-user-dropdown">
          <a href="/my-gems">My Gems</a>
          <a href="/my-gems">Settings</a>
          <a href="/logout">Log out</a>
        </div>
      </div>

        {/* test for conditional rendering after reading stored token
        <h3>{user ? user.name : <></>}</h3>  

        <button onClick={() => validateToken(localStorage.getItem(`token`))}>Click me to check localstore</button>

        Reminder to set up conditional rendering when signed in later */}

    </div>
  );
}