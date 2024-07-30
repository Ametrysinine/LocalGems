import { NavLink } from "react-router-dom";
import "../styles/Navbar.scss";

export default function Navbar() {  
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
    </div>

    // <div>
    //   <nav className="flex justify-between items-center mb-6">
    //     <NavLink to="/">
    //       <img alt="LocalGems logo" className="h-10 inline" src="https://i.imgur.com/Awp6faW.png"></img>
    //     </NavLink>


    //     {/*Reminder to set up conditional rendering when signed in later */}

    //     <div>          
    //       <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/login">
    //         Login
    //       </NavLink>

    //       <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/sign-up">
    //         Sign up
    //       </NavLink>
    //     </div>
    //   </nav>
    // </div>
  );
}