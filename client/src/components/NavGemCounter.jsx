import { useState, useEffect } from "react";
import { useTokenContext } from "../contexts/TokenContext";
import { useUserContext } from "../contexts/UserContext";

export default function NavGemCounter() {  

  const { userFromDB } = useUserContext(); 
  const { user, error } = useTokenContext();  
  const [currency, setCurrency] = useState({});
  
  // Chris' method - fetches the currencies from the database initially
  
/*   useEffect(() => {
    if (!userFromDB) {
      console.log(`No info yet for gem counter`);
    }
    console.log(`Our Currency count from useFromDB object: `, userFromDB.currency);  
    setCurrency(userFromDB.currency);  
    console.log(`currency state is: `, currency);      
  }, [userFromDB]); */

  // Jerimiah's method - fetches the currencies from the database initially

/*    useEffect(() => {
    async function getCurrency() {
      if (user) {
        const response = await fetch(`/api/currency?user=${user.user_id}`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const currency = await response.json();
        setCurrency(currency);
      }
    }
    getCurrency();
    return;
  }, []);  */

  return(
    <div className="nav-currency-bar">
      <div className="nav-currency">
        <img src="assets/flaticons/gem_ruby.png" alt="Ruby - Food" />
        <p>Rubies: <b>{userFromDB.currency?.rubies}</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Food</b> category to earn Rubies</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_sapphire.png" alt="Sapphire - Entertainment"/>
        <p>Sapphires: <b>{userFromDB?.currency?.sapphires}</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Entertainment</b> category to earn Sapphires</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_emerald.png" alt="Emerald - Outdoor Activity"/>
        <p>Emeralds: <b>{userFromDB.currency?.emeralds}</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Nature</b> category to earn Emeralds</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_topaz.png" alt="Topaz - Shopping"/>
        <p>Topazs: <b>{userFromDB.currency?.topazs}</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Shopping</b> category to earn Topazs</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_amethyst.png" alt="Amethyst - Nightlife"/>
        <p>Amethysts: <b>{userFromDB.currency?.amethysts}</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Nightlife</b> category to earn Amethysts</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_citrine.png" alt="Citrine - Services"/>
        <p>Citrines: <b>{userFromDB.currency?.citrines}</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Services</b> category to earn Citrines</p>
        </div>
      </div>
    </div> 
  )
}
