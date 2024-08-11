import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.scss";
import NavGemCounter from "./NavGemCounter";
import { useTokenContext } from "../contexts/TokenContext";
import { useUserContext } from "../contexts/UserContext";

// import useValidateToken from "../hooks/useValidateToken";

export default function Navbar() {  
  
  const { user, error, validateToken } = useTokenContext(); 
  const { getUserOBJfromDB } = useUserContext();
  
  
  useEffect (() => {
    const checkToken = async () => { //run initially on page load
      if (!localStorage.getItem(`token`)) {
        console.log(`token doesnt exist`);
      }
      else {
        console.log(`- token exists in localstorage -`); 
        if (user) {
          console.log(`Our decrypted token data is:`, user);
        }       
      }       
    } 
    checkToken();
  } ,[user])
  
  let timesUseEffectFired = 0;
  
  useEffect(() => {
    if (!user) {
      validateToken(localStorage.getItem(`token`))
    }
    getUserOBJfromDB();          //gets our userObject from the DB and sets its state in userContext.jsx
    timesUseEffectFired ++;
    console.log(`total timesUseEffectFired in Navbar: `, timesUseEffectFired);
  }, [user])

  return (
    <div className="nav-bar">
        <a href="/"><img className="nav-bar-logo" src="assets/nav_logo.png"/></a>

      {user ?
        <div className="nav-bar-signed-in">   

          <div className="nav-bar-main">
            <div className="nav-bar-buttons">
              {/* <div className="nav-bar-link">
                <a href="/">Friends</a>
              </div>  */}
              <div className="nav-bar-link">
                <a href="/my-gems">My Gems</a>
              </div> 
              <div className="nav-bar-link">
                <a href="/explore">Explore</a>
              </div> 
            </div>
            
            <div className="nav-bar-currency-container">
            <NavGemCounter />
            </div>

            <div className="nav-bar-user">
              <div className="nav-bar-user-dropdown" role="button" tabindex="0" aria-pressed="false">
                <img className="nav-bar-user-pfp"  src={user.pfp}/>
                <div className="nav-bar-user-dropdown-content">
                  <div className="nav-bar-user-info">
                    <p>Signed in as: <b>{user.name}</b></p>
                    <p>A true local of <b>{user.city_name}</b></p>
                 </div>

                  <a href="/my-gems">                    
                    <img src="/icon_settings_thicc.svg" alt="settings"/>
                    <p>Settings</p>
                  </a>
                  <a href="/" onClick={()=>localStorage.clear()}>
                    <img src="/icon_logout_thicc.svg" alt="logout" />
                    <p>Log out</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>      
        : 
        <div className="nav-bar-logged-out">
          <div className="nav-bar-link">
            <a href="/login">Log In</a>
          </div>      
          <div className="nav-bar-link">
            <a href="/sign-up">Sign Up</a>
          </div>     
        </div>

      }
    </div>
  );
}
