"use client";

// import { Button, Modal } from "flowbite-react";
import "../styles/UnlockModal.scss"
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";


export default function UnlockModal({gemData, setUnlockModalVisibility}) {
  const { userFromDB, setUserFromDB } = useUserContext(); 
  console.log(`\nGemData coming into UnlockModal:`, gemData);


    const gemImage = (type) => {
      switch (type) {
        case 'food':
          return <div className="gem-type">
          <img src="/assets/flaticons/gem_ruby.png" alt="Ruby - Food" className="gem-currency-image" />
          <h2 className="gem-type_ruby">-1</h2>
        </div> 
        case 'entertainment':
          return <div className="gem-type">
          <img src="/assets/flaticons/gem_sapphire.png" alt="Sapphire - Entertainment" className="gem-currency-image" />
          <h2 className="gem-type_sapphire">-1</h2>
        </div>          
        case 'outdoors':
          return <div className="gem-type">
          <img src="/assets/flaticons/gem_emerald.png" alt="Emerald - Outdoor Activity" className="gem-currency-image" />
          <h2 className="gem-type_emerald">-1</h2>
        </div>
        case 'shopping':
          return <div className="gem-type">
          <img src="/assets/flaticons/gem_topaz.png" alt="Topaz - Shopping" className="gem-currency-image" />
          <h2 className="gem-type_topaz">-1</h2>
        </div>
        case 'nightlife':
          return <div className="gem-type">
          <img src="/assets/flaticons/gem_amethyst.png" alt="Amethyst - Nightlife" className="gem-currency-image" />
          <h2 className="gem-type_amethyst">-1</h2>
        </div>
        case 'services':
          return <div className="gem-type">
          <img src="/assets/flaticons/gem_citrine.png" alt="Citrine - Services" className="gem-currency-image" />
          <h2 className="gem-type_citrine">-1</h2>
        </div>
      }
    };
  
    //Very WET but i needed to get the name
    const gemName = (type) => {
      switch (type) {
        case 'food':
          return "Ruby";
        case 'entertainment':
          return "Sapphire";
        case 'outdoors':
          return "Emerald";
        case 'shopping':
          return "Topaz";
        case 'nightlife':
          return "Amethyst";
        case 'services':
          return "Citrine";
      }
    };

    const checkCurrencyAmount = function() {            
    	console.log(`checkCurrencyAmount - checking if we have a stored ${gemName(gemData?.type)} on server`);
      
      //post data to /currency here

    };

  return (
    <>
    <div className="unlockModal-screen-space">
      <div className="unlockModal-container" onClick={() => console.log(`clicked unlock container`)}>  

        <div className="unlock-step-1_are-you-sure"> 

          <div className="unlockModal-message">
            <h3>
              {`Are you sure you want to reveal this gem at the cost of a ${gemName(gemData?.type)}?`}
            </h3>
            <div className="unlockModal-gemstone">
            {gemImage(gemData?.type)}
            </div>
          </div>                    
            <div  className="unlockModal-button">
              <button className="success" onClick={checkCurrencyAmount}> Unlock! </button>
              <button className="close" onClick={()=> setUnlockModalVisibility(false)}> Maybe Later </button>
            </div>
        </div>

      </div>
    <div className="unlockModal-negative-space" onClick={() => setUnlockModalVisibility(false)}> </div>
    </div>
    </>
  );

  /*  
    01 - render the container and negative space onClick of the reveal button
    02 - populate form with data, ask user if theyre sure to reveal
      a - if no close modal on button -> update state
      b - if yes go to /currency route and perform logic
    03 - Create a little spinny circle to show the server is "thinking" lol
    04 - Depending on server return, wipe the previous container contents and cond-render the next window
      a - if NO, show a prompt saying user doesnt have enough of X gemstone. include a button to close modal
      b - if YES, show a success message, letting the user know to goto /mygems and favourites. include a button that closes the modal that lets user keep shopping    
  */
}