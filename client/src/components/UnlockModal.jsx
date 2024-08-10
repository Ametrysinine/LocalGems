"use client";

// import { Button, Modal } from "flowbite-react";
import "../styles/UnlockModal.scss"
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import spinner from "../assets/spinner.svg";


export default function UnlockModal({gemData, setUnlockModalVisibility}) {

  //for tracking and cond-rend which part of the transaction youre on
  const [areYouSureWindow, setAreYouSureWindow] = useState(true);
  const [spinnyCircle, setSpinnyCircle] = useState(false);
  const [successWindow, setSuccessWindow] = useState(false);
  const [errorWindow, setErrorWindow] = useState(false);

  //state for userObject
  const { userFromDB, setUserFromDB } = useUserContext(); 

  // console.log(`\nGemData coming into UnlockModal:`, gemData);
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
  
    // Very WET but i needed to get names, returns an array containing 2 names
    // - index 0 is for React rendering
    // - index 1 is for sending to server to check against DB]
    const gemName = (type) => {
      switch (type) {
        case 'food':
          return ["Ruby", "rubies"];
        case 'entertainment':
          return ["Sapphire", "sapphires"];
        case 'outdoors':
          return ["Emerald", "emeralds"];
        case 'shopping':
          return ["Topaz", "topazs"];
        case 'nightlife':
          return ["Amethyst", "amethysts"];
        case 'services':
          return ["Citrine", "citrines"];
      }
    };

    const checkCurrencyAmount = async () => {
      const gemStoneType = gemName(gemData?.type)[1]
    	console.log(`checkCurrencyAmount - checking if we have any ${gemStoneType} on server`);
      
      await fetch (`/api/currency/${gemStoneType}/-1`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userFromDB),
    })
    .then(response => {      
      if (response.status === 200) {  
        setAreYouSureWindow(false);      
        setSpinnyCircle(true);  
        validTransaction(response);
      }
      else{
        setAreYouSureWindow(false); 
        setSpinnyCircle(true);
        failTransaction(response);
      }    
    })
  };
  

  
  const validTransaction = function(response) {   
    console.log(`Transaction went through`);
    
    setTimeout(() => {      
      setSpinnyCircle(false); 
      setSuccessWindow(true);

      // Update currency in state
      const cloneOfUser = {...userFromDB};  
      cloneOfUser.currency[gemStoneType] -= 1;
      setUserFromDB(cloneOfUser); 
      
      //--------------------------------
      //do a second await POST here that adds this entry to users unlocked gems list




      //--------------------------------
      
    }, 2500);
    };

    const failTransaction = function(response) { 
      console.log(`Transaction didnt go through`);
      setTimeout(() => {
        setSpinnyCircle(false);  
        setErrorWindow(true);
      }, 2500);  
    };



    const resetStatesAndCloseModal = function() {       
    	setUnlockModalVisibility(false);
      setAreYouSureWindow(true);
      setSpinnyCircle(false);
      setSuccessWindow(false);
      setErrorWindow(false);
      console.log(`modal closed and states reset`);
    };
    
  return (
    <>
    <div className="unlockModal-screen-space">
      <div className="unlockModal-container" onClick={() => console.log(`clicked unlock container`)}>  

      {areYouSureWindow ? 
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
              <button className="close" onClick={resetStatesAndCloseModal}> Maybe Later </button>
            </div>
        </div>
      : <></>}

      {spinnyCircle ? 
        <div className="unlockModal-processing-window"> 
          <div className="unlockModal-message">
            <h3>Processing...</h3>
            <img className="spinner-container" src={spinner}  alt="Processing wheel"/>
          </div>
        </div>
      : <></>}


      {successWindow ? 
        <div className="unlockModal-success-window"> 
          <div className="unlockModal-message">
            <h3>Order went thru! yay</h3>
          </div>
       </div>
      : <></>}

      {errorWindow ? 
        <div className="unlockModal-success-window"> 
          <div className="unlockModal-message">
            <h3>Didnt have enough of x gem, create a new gem in the --- category</h3>
          </div>
          <div  className="unlockModal-button">
            <button className="success"> Take me there </button>
            <button className="close" onClick={resetStatesAndCloseModal}> Close </button>
          </div>
       </div>
      : <></>}


      </div>
    <div className="unlockModal-negative-space" onClick={resetStatesAndCloseModal}> </div>
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