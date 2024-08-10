import { useEffect, useState } from "react";
import { useTokenContext } from "../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import "../styles/Main.scss";
import "../styles/LoginForm.scss";


const login = function() {  
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const { validateToken } = useTokenContext()
  const navigate = useNavigate();

  useEffect(() => {
    async function loginGET() {
      const expressFetch = await fetch(`/api/login`);
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
      let response = await fetch("/api/login", {
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
        <section className="page-body-content login-container">
          <h1>Log in</h1>
          <div className="divider"></div>

          <article className="login-form">
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
              <button type="submit" className="btn btn-primary">Log in</button>
              <sub><i>Forgot your password?</i></sub>
            </form>
          </article>
        </section>
      </article>
    </>
  );  
  
};

export default login;
