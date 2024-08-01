import { NavLink } from "react-router-dom";
import { useEffect } from "react";

import useValidateToken from "../hooks/useValidateToken";

export default function Navbar() {  

  const { user, error, validateToken } = useValidateToken(localStorage.getItem(`token`)); 
 

  useEffect (() => {
    const checkToken = async () => { //run initially on page load
    if (!localStorage.getItem(`token`)) {
      console.log(`token doesnt exist`);
    }
    else {
      console.log(`----------------- token exists---------------------`); 
      await validateToken(localStorage.getItem(`token`));    
      console.log(`Our decrypted data associated under localStorage is: `, user);
       
      try {        
        let response = await fetch("http://localhost:5050/gems/posted_gems", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({user}),
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
  checkToken();
 } ,[])





  



  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img alt="LocalGems logo" className="h-10 inline" src="https://i.imgur.com/Awp6faW.png"></img>
        </NavLink>

        {/* test for conditional rendering after reading stored token*/}
        <h3>{user ? user.email : <></>}</h3>  

        <button onClick={() => validateToken(localStorage.getItem(`token`))}>Click me to check localstore</button>

        {/*Reminder to set up conditional rendering when signed in later */}

        <div>          
          <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/login">
            Login
          </NavLink>

          <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/sign-up">
            Sign up
          </NavLink>
        </div>
      </nav>
    </div>
  );
}