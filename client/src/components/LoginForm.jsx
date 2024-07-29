import { useEffect, useState } from "react";


const login = function() {
    return (
    <>
      <h1 className="text-lg font-semibold text-green-600 italic text-2xl p-4">Login to your LocalGems Account Here!</h1>
      <p>this file is in /client/src/components/LoginForm.jsx</p>
    <form action="/login" method="post">
      <div class="container">
        <label for="email">Email </label>
        <input type="email" placeholder="Enter Email" id="email" name="email" required/> 

        <label for="password">Password </label>
        <input type="password" placeholder="Enter Password" id="password" name="password" required/>
        <button type="submit">Login</button>
      </div>



  </form>
    </>
  );  
  
};

export default login;
