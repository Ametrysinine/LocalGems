import { useState, useEffect } from "react";
import { useToken } from "../contexts/TokenContext";


export default function NavGemCounter(props) {  
  console.log(`Our props in NavGemCounter: `, props);
  const { user, error, validateToken } = useToken();
  const [currency, setCurrency] = useState({});

  useEffect(() => {
    if (!user) {
      validateToken(localStorage.getItem(`token`));
    }
  }, [user]);

  // console.log('user' + user.user_id);
   // This method fetches the currencies from the database.
   useEffect(() => {
    async function getCurrency() {
      if (user) {
        const response = await fetch(`http://localhost:5050/currency?user=${user.user_id}`);
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
  }, []);

  return(
    <div className="nav-currency-bar">
      <div className="nav-currency">
        <img src="assets/flaticons/gem_ruby.png" alt="Ruby - Food" />
        <p>Rubies: <b>{currency?.rubies}</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Food</b> category to earn Rubies</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_sapphire.png" alt="Sapphire - Entertainment"/>
        <p>Sapphires: <b>{currency?.sapphires}</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Entertainment</b> category to earn Sapphires</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_emerald.png" alt="Emerald - Outdoor Activity"/>
        <p>Emeralds: <b>{currency?.emeralds}</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Nature</b> category to earn Emeralds</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_topaz.png" alt="Topaz - Shopping"/>
        <p>Topazs: <b>{currency?.topazs}</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Shopping</b> category to earn Topazs</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_amethyst.png" alt="Amethyst - Nightlife"/>
        <p>Amethysts: <b>{currency?.amethysts}</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Nightlife</b> category to earn Amethysts</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_citrine.png" alt="Citrine - Services"/>
        <p>Citrines: <b>{currency?.citrines}</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Services</b> category to earn Citrines</p>
        </div>
      </div>
    </div> 
  )
}
