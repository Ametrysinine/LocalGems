import { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export default function TokenProvider({children}) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  
    const validateToken = async (token) => {
      try {
        const response = await fetch(`/api/api/user-verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_token: token }),
        });
  
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error('Bad Request: Please check the provided token.');
          } else if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token.');
          } else if (response.status === 404) {
            throw new Error('Not Found: API endpoint not found.');
          } else {
            throw new Error(`An error occurred: ${response.statusText}`);
          }
        }
  
        const data = await response.json();
        setUser(data);
        return data;
      } catch (error) {
        if (error.name === 'TypeError') {
          setError('Network error: Please check your connection.');
        } else {
          setError(error.message);
        }
        console.error(error.message);
      }
    }
 

  return ( 
    <TokenContext.Provider value={{ user, error, validateToken}}>
      {children}
    </TokenContext.Provider>
  );
}

export const useTokenContext = () => {
  return useContext(TokenContext)
}