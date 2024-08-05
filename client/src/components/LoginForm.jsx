import { useEffect, useState } from "react";
import { useToken } from "../contexts/TokenContext";
import { useNavigate } from "react-router-dom";


const login = function() {  
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const { validateToken } = useToken()
  const navigate = useNavigate();

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
  
  async function handleSubmit (event){
    event.preventDefault();
    console.log(`Our emailField is: `, emailField, `\nOur passwordField is: `, passwordField);

    try {
      let response = await fetch("http://localhost:5050/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailField, passwordField}),
        });    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (response.ok && data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        console.log('Token stored in localStorage:', data.token);
        validateToken(data.token)
        navigate('/my-gems')
      } else {
        setError('Invalid credentials');
      }
    } 
    
    catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    }
  };

  return (
    <>
      <article className="page-body">
        <section className="page-body-content">
          <h1 className="text-lg font-semibold text-green-600 italic text-2xl p-4">Login to your LocalGems Account Here!</h1>

          <form onSubmit={handleSubmit}>
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
              <p className="text-blue-400"><i>forgot your password?</i></p>
          </form>
        </section>
      </article>
    </>
  );  
  
};

export default login;
