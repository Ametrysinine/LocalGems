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
        <b>{userFromDB.currency?.rubies}</b>
        <img src="assets/flaticons/gem_ruby.png" alt="Ruby - Food" />

        <div className="nav-currency-content">
          <p>Create entries in the <b>Food</b> category to earn Rubies</p>
          <ul>
            <li>Restauraunts</li>
            <li>Mom N Pop Shops</li>
            <li>Unique Cuisine</li>
          </ul>
        </div>
      </div>

      <div className="nav-currency">
        <b>{userFromDB?.currency?.sapphires}</b>
        <img src="assets/flaticons/gem_sapphire.png" alt="Sapphire - Entertainment"/>

        <div className="nav-currency-content">
          <p>Create entries in the <b>Entertainment</b> category to earn Sapphires</p>
          <ul>
            <li>Escape Rooms</li>
            <li>Karaoke Lounges</li>
            <li>Live Music Venues</li>
          </ul>
        </div>
      </div>
      
      <div className="nav-currency">
        <b>{userFromDB.currency?.emeralds}</b>
        <img src="assets/flaticons/gem_emerald.png" alt="Emerald - Outdoor Activity"/>

        <div className="nav-currency-content">
          <p>Create entries in the <b>Outdoors</b> category to earn Emeralds</p>
          <ul>
            <li>Hiking Trails</li>
            <li>Camping Spots</li>
            <li>Scenic Spots</li>
          </ul>
        </div>
      </div>

      <div className="nav-currency">
        <b>{userFromDB.currency?.topazs}</b>
        <img src="assets/flaticons/gem_topaz.png" alt="Topaz - Shopping"/>

        <div className="nav-currency-content">
          <p>Create entries in the <b>Shopping</b> category to earn Topazs</p>
          <ul>
            <li>Specialty Shops</li>
            <li>Street Markets</li>
            <li>Boutique Stores</li>
          </ul>
        </div>
      </div>

      <div className="nav-currency">
        <b>{userFromDB.currency?.amethysts}</b>
        <img src="assets/flaticons/gem_amethyst.png" alt="Amethyst - Nightlife"/>

        <div className="nav-currency-content">
          <p>Create entries in the <b>Nightlife</b> category to earn Amethysts</p>
          <ul>
            <li>Nightclubs</li>
            <li>Bars and Pubs</li>
            <li>Rooftop Venues</li>
          </ul>
        </div>
      </div>

      <div className="nav-currency">
        <b>{userFromDB.currency?.citrines}</b>
        <img src="assets/flaticons/gem_citrine.png" alt="Citrine - Services"/>

        <div className="nav-currency-content">
          <p>Create entries in the <b>Services</b> category to earn Citrines</p>
          <ul>
            <li>Barbers and Stylists</li>
            <li>Beauty Salons</li>
            <li>Custom Tailoring</li>
          </ul>
        </div>
      </div>
    </div> 
  )
}
