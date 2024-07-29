import { useEffect, useState } from "react";


const signUp = function() {
    return (
    <>
      <h1 className="text-lg font-semibold text-orange-600 text-2xl italic p-4">Sign Up for LocalGems Here!</h1>
      <p>this file is in /client/src/components/SignUpForm.jsx</p>

      <form action="sign-up/" method="post">
        <container>
          <label for="name">Name </label>
          <input type="text" id="name" placeholder="Enter Name" name="name" required/>

          <label for="email">Email </label>
          <input type="email" id="email" placeholder="Enter Email" name="email" required/>

          <label for="password">Password </label>
          <input type="password" id="password" placeholder="Enter Password" name="password" required/>

          <button type="submit">Sign Up</button>
        </container>

      </form>
    </>
  );  
  
};

export default signUp;
