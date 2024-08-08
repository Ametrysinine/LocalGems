import { createContext, useContext, useState } from 'react';
import { useTokenContext } from './TokenContext';

const UserContext = createContext();

export default function UserProvider({children}) {

  const [userFromDB, setUserFromDB] = useState({});
  const [error, setError] = useState(null);

  const {user} = useTokenContext();

  
  const getUserOBJfromDB = async () => {
    
    //Implement useEFfect in here rather than nav
    console.log(` We're in the USER CONTEXT!!`);
    console.log(`Our user.user_id is: `, user.user_id);
    
      try {
        const response = await fetch(`http://localhost:5050/api/user/?user_id=${user.user_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
  
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error('Bad Request: Please check the provided user_id.');
          } else if (response.status === 401) {
            throw new Error('Unauthorized: Invalid user_id.');
          } else if (response.status === 404) {
            throw new Error('API endpoint not found.');
          } else {
            throw new Error(`An error occurred: ${response.statusText}`);
          }
        }
        
        const data = await response.json();
        console.log(`YAY! We got back our userOBJ from DB!`, data);
        setUserFromDB(data);
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
    <UserContext.Provider value={{ userFromDB, setUserFromDB, error, getUserOBJfromDB}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext)
}