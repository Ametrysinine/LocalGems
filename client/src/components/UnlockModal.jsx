"use client";

// import { Button, Modal } from "flowbite-react";
import "../styles/UnlockModal.scss"
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";


export default function UnlockModal({gemData, setUnlockModalVisibility}) {
  const { userFromDB, setUserFromDB } = useUserContext(); 

  console.log(`\n!!!! GemData coming into UnlockModal:`, gemData);  
  console.log(`\n!!!!! setUnlockModalVisibility UnlockModal:`, setUnlockModalVisibility);  
  console.log(`\n!!!!!! Unlock modal has access to userFromDB:`, userFromDB);


  return (
    <>
    <div className="unlockModal-negative-space" onClick={() => setUnlockModalVisibility(false)}>
    <div className="unlockModal-container">
      <div>
         <p>We've got gem id: {gemData?._id}</p> 
         <p>Current user is: {userFromDB?.user_id}</p> 
      </div>

    </div>

    </div>
    </>

/*   <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size={"6xl"}>
      <Button onClick={() => setOpenModal(false)} className="modal-close-button">Close</Button>
        
          <Modal.Body className="modal-container">
        
            <p>Hello, unlock modal rendered</p>

          </Modal.Body>
      </Modal>
    </>  */
  );
}