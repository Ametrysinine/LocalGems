import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Navbar.scss";
import { useToken } from "../contexts/TokenContext";
import NavGemCounter from "./NavGemCounter";

// import useValidateToken from "../hooks/useValidateToken";

export default function Navbar() {  

  const { user, error, validateToken } = useToken(); 

  useEffect(() => {
    if (!user) {
      validateToken(localStorage.getItem(`token`))
    }
  }, [user])
 

  useEffect (() => {
    const checkToken = async () => { //run initially on page load
      if (!localStorage.getItem(`token`)) {
        console.log(`token doesnt exist`);
      }
      else {
        console.log(`----------------- token exists---------------------`); 
        if (user) {
          console.log(`Our decrypted data associated under localStorage is: `, user);
          try {  
            console.log("In Try for Navbar.JSX")     
    
            let response = await fetch(`http://localhost:5050/gems/posted_gems?user=${user.name}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },              
              });    
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            else{
              console.log(`got something back from server!!!!!!!`);
              console.log(`Our in useEffect for navbar.jsx is: `, response.body);
            }    
          } catch (error) {
            console.error(`Error validating token: ${error}`);
          }
        }       
      }       
    } 
    checkToken();
  } ,[user])


  return (
    <div className="nav-bar">
        <a href="/"><img className="nav-bar-logo" src="assets/nav_logo.png"/></a>

      {user ?
        <div className="nav-bar-signed-in">   

          <NavGemCounter />

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

            <div className="nav-bar-user">
              <div className="nav-bar-user-info">
                <p>Signed in as: <b>{user.name}</b></p>
                <p>A true local of {}</p>
              </div>
              <div className="nav-bar-user-dropdown" role="button" tabindex="0" aria-pressed="false">
                <img className="nav-bar-user-pfp"  src={user.pfp}/>
                <div className="nav-bar-user-dropdown-content">
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
