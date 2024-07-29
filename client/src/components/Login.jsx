import { useEffect, useState } from "react";


const login = function() {  
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  useEffect(() => {
    async function loginGET() {
      const expressFetch = await fetch(`http://localhost:5050/login`);
      if (!expressFetch.ok) {
        const message = `An error occurred: ${expressFetch.statusText}`;
        console.error(message);
        return;
      }
      const expressResponse = await expressFetch.json();
      console.log(`Our get response is: `, expressResponse);
    }  
    loginGET();
    return;
  }, []);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login clicked!');
    console.log(`Our emailField is: `, emailField, `\nOur passwordField is: `, passwordField);
  };

  return (
    <>
      <h1 className="text-lg font-semibold text-green-600 italic text-2xl p-4">Login to your LocalGems Account Here!</h1>
      <p>this file is in /client/src/components/Login.jsx</p>

      <form method="POST" action="/login" onSubmit={handleSubmit}>
          <div>
              <label htmlFor="email"><b>E-mail</b> </label>
              <input type="email" 
                id="email" 
                name="email" required
                onChange={(e) => setEmailField(e.target.value)} />
          </div>
          <div>
              <label htmlFor="password"> <b>Password</b> </label>
              <input type="password" 
                id="password" 
                name="password" required 
                onChange={(p) => setPasswordField(p.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
      </form>

    </>
  );  
  
};

export default login;
