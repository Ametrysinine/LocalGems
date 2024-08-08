import { useUserContext } from "../contexts/UserContext";
import { useEffect } from "react";

export default function NavGemCounter() {  

  const { userFromDB, error } = useUserContext(); 
  
  useEffect(() => {
    if (!userFromDB) {
      console.log(`no info yet for gem counter`);
    }
    console.log(`Our Currency count is NOW: `, userFromDB.currency);    
  }, [userFromDB])


  return(
    <div className="nav-currency-bar">
      <div className="nav-currency">
        <img src="assets/flaticons/gem_ruby.png" alt="Ruby - Food" />
        <p>Rubies: <b></b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Food</b> category to earn Rubies</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_sapphire.png" alt="Sapphire - Entertainment"/>
        <p>Sapphires: <b>0</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Entertainment</b> category to earn Sapphires</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_emerald.png" alt="Emerald - Outdoor Activity"/>
        <p>Emeralds: <b>1</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Nature</b> category to earn Emeralds</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_topaz.png" alt="Topaz - Shopping"/>
        <p>Topazs: <b>2</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Shopping</b> category to earn Topazs</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_amethyst.png" alt="Amethyst - Nightlife"/>
        <p>Amethysts: <b>1</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Nightlife</b> category to earn Amethysts</p>
        </div>
      </div>
      <div className="nav-currency">
        <img src="assets/flaticons/gem_citrine.png" alt="Citrine - Services"/>
        <p>Citrines: <b>1</b></p>
        <div className="nav-currency-content">
          <p>Create entries in the <b>Services</b> category to earn Citrines</p>
        </div>
      </div>
    </div> 
  )
}
