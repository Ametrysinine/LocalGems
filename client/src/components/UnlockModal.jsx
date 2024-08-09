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
          return <img src="/assets/flaticons/gem_ruby.png" alt="Ruby - Food" className="gem-currency-image" />;
        case 'entertainment':
          return <img src="/assets/flaticons/gem_sapphire.png" alt="Sapphire - Entertainment" className="gem-currency-image" />;
        case 'outdoors':
          return <img src="/assets/flaticons/gem_emerald.png" alt="Emerald - Outdoor Activity" className="gem-currency-image" />;
        case 'shopping':
          return <img src="/assets/flaticons/gem_topaz.png" alt="Topaz - Shopping" className="gem-currency-image" />;
        case 'nightlife':
          return <img src="/assets/flaticons/gem_amethyst.png" alt="Amethyst - Nightlife" className="gem-currency-image" />;
        case 'services':
          return <img src="/assets/flaticons/gem_citrine.png" alt="Citrine - Services" className="gem-currency-image" />;
      }
    };
  
  return (
    <>
    <div className="unlockModal-screen-space">
      <div className="unlockModal-container" onClick={() => console.log(`clicked unlock container`)}>  

        <div className="unlockModal-container_are-you-sure"> 

          <h3>
            {`Are you sure you want to reveal this gem for  1 ${gemData?._id}`}
          </h3>
          
          
            <div  className="unlockModal-button">
              <button className="success">
                Unlock!
              </button>
              <button className="close" onClick={() => setUnlockModalVisibility(false)}>
                Maybe Later
              </button>
            </div>
          <p>We've got gem id: {gemData?._id}</p> 
          <p>Current user is: {userFromDB?.user_id}</p> 
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