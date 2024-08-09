"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import MapContainer from "./MapContainer";
import "../styles/Modal.scss";
import upvote from "../assets/icon_upvote.svg";
import downvote from "../assets/icon_downvote.svg";
import heart from "../assets/icon_heart.svg";
import { useUserContext } from "../contexts/UserContext";

export default function Component(props) {
  const [openModal, setOpenModal] = useState(false);
  const { userFromDB } = useUserContext(); 

  const gemImage = () => {
    switch (props.gem.type) {
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

  const upvoteGem = async (gemId) => {
    await fetch (`/api/votes/${gemId}/upvote`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userFromDB),
    });
  }

  const downvoteGem = async (gemId) => {
    await fetch (`/api/votes/${gemId}/downvote`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userFromDB),
    });
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>View</Button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size={"6xl"}>
      <Button onClick={() => setOpenModal(false)} className="modal-close-button">Close</Button>
        
          <Modal.Body className="modal-container">
            <divleft className="modal-info">
                <section className="details">
                  <span className="name"> 
                    {gemImage()} 
                    {props.gem.name} 
                  </span>
                  <span className="description"> {props.gem.description} </span>
                </section>
                
                <section classname="review">
                  <b>What's great about it?</b> <br/>
                  UserName says: <br/>
                  {props.gem.whats_great_about_it}
                </section>

                <section className="tags">
                  <div className="gem-tags">
                    {props.gem.tags.map((tag, index) => (
                      <span key={index} className="gem-tag">#{tag} </span>
                    ))} 
                  </div>
                </section>

                <section class="bottom">
                  <img src={upvote} onClick={() => upvoteGem(props.gem.gem_id)} alt="Upvote" />
                  <img src={downvote} onClick={() => downvoteGem(props.gem.gem_id)} alt="Downvote" />
                  <img src={heart} alt="Add to favorites" />
                </section>
            </divleft>

            <divright className="modal-map">
              <MapContainer className="size-full" gems={[props.gem]}/>
            </divright>
          </Modal.Body>
      </Modal>
    </>
  );
}