"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import MapContainer from "./MapContainer";
import "../styles/Modal.scss";

export default function Component(props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>View</Button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size={"6xl"}>
      <Button onClick={() => setOpenModal(false)} className="modal-close-button">Close</Button>
        
          <Modal.Body className="modal-container">
            <divleft className="modal-info">
              <div className="modal-info-left">
                <div className="modal-gem-name" > {props.gem.name} </div>
                
                <div className="modal-gem-description"> {props.gem.description} </div>
                
                <div classname="modal-gem-review">
                  <b>What's great about it?</b> <br/>
                  UserName says: <br/>
                  {props.gem.whats_great_about_it}
                </div>

                <div class="modal-gem-bottom">
                  <img src="./assets/icon_upvote.svg" />
                  <img src="./assets/icon_downvote.svg" />
                  <img src="./assets/icon_heart.svg" />
                </div>
              </div>

              <div className="modal-info-right">
                <div className="modal-info-carousel">
                  <img src="{props.gems.images}"></img>
                </div>

                <div className="modal-gem-tags">
                  <div className="gem-tags">
                    {props.gem.tags.map((tag, index) => (
                      <span key={index} className="gem-tag">#{tag} </span>
                    ))} 
                  </div>
                </div>
              </div>
            </divleft>

            <divright className="modal-map">
              <MapContainer className="size-full" gems={[props.gem]}/>
            </divright>
          </Modal.Body>
      </Modal>
    </>
  );
}