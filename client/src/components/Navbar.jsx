import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Navbar.scss";
import { useToken } from "../contexts/TokenContext";

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
      <div className="nav-bar-logo">
        <a href="/"><img src="https://placehold.co/40x40"/></a>
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

        {/* test for conditional rendering after reading stored token*/}
        <h3>{user ? user.email : <></>}</h3>  

        <button onClick={() => validateToken(localStorage.getItem(`token`))}>Click me to check localstore</button>

        {/*Reminder to set up conditional rendering when signed in later */}

    </div>
  );
}