"use client";

import "../styles/UnlockModal.scss"
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

// importing assests
import spinnyWheel from "../assets/transaction/flaticon_processing.png";
import gemPalLogo from "../assets/transaction/logo_gempal.png";
import emptyBag from "../assets/transaction/flaticon_empty_bag.png";
import dust2 from "../assets/transaction/flaticon_dust2.png";
import unlockBottom from "../assets/transaction/flaticon_unlock_top.png";
import unlockTop from "../assets/transaction/flaticon_unlock_bottom.png";

export default function UnlockModal({gemData, setUnlockModalVisibility}) {
  //for tracking and cond-rend which part of the transaction youre on
  const [areYouSureWindow, setAreYouSureWindow] = useState(true);
  const [spinnyCircle, setSpinnyCircle] = useState(false);  
  const [successWindow, setSuccessWindow] = useState(false);
  const [errorWindow, setErrorWindow] = useState(false);

  //How long the processing wheel stays for    //revert back to 3500 for demo
  const spinnyDuration = 3500 ;

  //state for userObject
  const { userFromDB, setUserFromDB } = useUserContext(); 

  const navigate = useNavigate();

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
  
    // Very WET but i needed to get names, returns an array containing 2 names
    // - index 0 is for React rendering
    // - index 1 is for sending to server to check against DB]
    // - index 2 is for inserting into errorWindow's message
    const gemName = (type) => {
      switch (type) {
        case 'food':
          return ["Ruby", "rubies", "Food"];
        case 'entertainment':
          return ["Sapphire", "sapphires", "Entertainment"];
        case 'outdoors':
          return ["Emerald", "emeralds", "Outdoors"];
        case 'shopping':
          return ["Topaz", "topazs", "Shopping"];
        case 'nightlife':
          return ["Amethyst", "amethysts", "Nightlife"];
        case 'services':
          return ["Citrine", "citrines", "Services"];
      }
    };
    const gemStoneType = gemName(gemData?.type)[1]

    const checkCurrencyAmount = async () => {
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
        setTimeout(() => {
          validTransaction(response)}
        ,spinnyDuration);
      }
      else{
        setAreYouSureWindow(false); 
        setSpinnyCircle(true);
        failTransaction(response);
      }    
    })
  };
  

  
  const validTransaction = async function(response) {   
    console.log(`Success, transaction went through!\nGot back;`, response.body);
    
      setSpinnyCircle(false); 
      setSuccessWindow(true);

      
      await fetch (`/api/gems/unlock_gem/${gemData.gem_id}/`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userFromDB),
      }).then(res => res.json())
        .then(obj => {
          const cloneOfUser2 = {...obj};
          console.log('SETTING USER TO: ', JSON.stringify(cloneOfUser2))
          setUserFromDB(cloneOfUser2);
        })
              
    };

    const failTransaction = function(response) { 
      console.log(`Transaction didn't go through!\nGot back:`, response.body);
      setTimeout(() => {
        setSpinnyCircle(false);  
        setErrorWindow(true);
      }, spinnyDuration);  
    };


    const resetStatesAndCloseModal = function() {       
    	setUnlockModalVisibility(false);
      setAreYouSureWindow(true);
      setSpinnyCircle(false);
      setSuccessWindow(false);
      setErrorWindow(false);
      // console.log(`modal closed and states reset`);
    };
    
  return (
    <>
    <div className="unlockModal-screen-space">
      <div className="unlockModal-container" onClick={() => console.log(`clicked unlock container`)}>  

      {areYouSureWindow ? 
        <div className="unlockModal-are-you-sure"> 
          <div className="unlockModal-message">
            <h3>
              {`To unlock this Hidden ${gemName(gemData?.type)[2]} Gem in ${gemData?.city} you need to spend the corresponding Gemstone.`}
            </h3>
            <div className="unlockModal-gemstone">
            {gemImage(gemData?.type)}
            </div>
            <h3>
              {`Are you sure you want to reveal this Hidden Gem at the cost of 1 ${gemName(gemData?.type)[0]}?`}
            </h3>
          </div>                    
            <div  className="unlockModal-button">
              <button className="success" onClick={checkCurrencyAmount}>Yes, Lets Go</button>
              <button className="close" onClick={resetStatesAndCloseModal}>Maybe Later</button>
            </div>
        </div>
      : <></>}

      {spinnyCircle ? 
        <div className="unlockModal-processing-window"> 
          <div className="unlockModal-message">
            <img className="gempal-logo" src={gemPalLogo}  alt="GemPal logo"/>
            <img className="processing-wheel" src={spinnyWheel}  alt="Order processing indicator"/>
            <h3>Processing Transaction...</h3>
          </div>
        </div>
      : <></>}


      {successWindow ? 
        <div className="unlockModal-success-window"> 
          <div className="unlockModal-message">
            <h3>Success, Hidden Gem Unlocked!</h3>
            <div className="success-animation">
              <div className="unlock-icon">

                <div className="unlock-bottom">
                  <img className="unlock-bottom-motion" src={unlockBottom}  alt="Success, hidden gem unlocked"/>
                </div>
                <div className="unlock-top">
                <img src={unlockTop}  alt="Success, hidden gem unlocked"/>
                </div>
              </div>
            </div>
            <h3>{`You can view your new discovery,\n or keep exploring hidden gems.`}</h3>
          </div>
          <div  className="unlockModal-button">
            <button className="success" onClick={()=>{navigate('/my-gems')}}>View My Discovery</button>
            <button className="close" onClick={resetStatesAndCloseModal}>Keep Exploring</button>
          </div>
       </div>
      : <></>}

      {errorWindow ? 
        <div className="unlockModal-error-window"> 
          <div className="unlockModal-message">
            <h3>Oops, Insufficient Gemstones! </h3>
            <div className="error-animation">
              <img className="empty-bag" src={emptyBag}  alt="Empty Bag Image, need more gemstones to unlock"/>
                <div className="dust-instances">
                  <div className="instance1">
                    <img className="dust1" src={dust2}  alt="Falling dust"/>
                  </div>
                  <div className="instance2">
                    <img className="dust2" src={dust2}  alt="Falling dust"/>
                  </div>
                  <div className="instance3">
                    <img className="dust3" src={dust2}  alt="Falling dust"/>
                  </div>
                  <div className="instance4">
                    <img className="dust4" src={dust2}  alt="Falling dust"/>
                  </div>
                  <div className="instance5">
                    <img className="dust5" src={dust2}  alt="Falling dust"/>
                  </div>            
                </div>
            </div>
            <h3 className="unlockModal-error-window_requirement">You need at least 1 {gemName(gemData?.type)[0]} to unlock this hidden Gem. Create a new Gem in the {gemName(gemData?.type)[2]} category to earn one</h3>
          </div>
          <div  className="unlockModal-button">
            <button className="success" onClick={()=>{navigate('/my-gems')}}>Take me there</button>
            <button className="close" onClick={resetStatesAndCloseModal}>Close</button>
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