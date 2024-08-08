"use client";

import { Button, Modal, Carousel } from "flowbite-react";
import { useState } from "react";
import MapContainer from "./MapContainer";
import "../styles/Modal.scss";
import upvote from "../assets/icon_upvote.svg";
import downvote from "../assets/icon_downvote.svg";
import heart from "../assets/icon_heart.svg";

export default function Component(props) {
  const [openModal, setOpenModal] = useState(false);

  const gemImage = () => {
    switch (props.gem.type) {
      case 'food':
        return <img src="/assets/flaticons/gem_ruby.png" alt="Ruby - Food" title="Ruby - Food" className="gem-currency-image" />;
      case 'entertainment':
        return <img src="/assets/flaticons/gem_sapphire.png" alt="Sapphire - Entertainment" title="Sapphire - Entertainment" className="gem-currency-image" />;
      case 'outdoors':
        return <img src="/assets/flaticons/gem_emerald.png" alt="Emerald - Outdoor Activity" title="Emerald - Outdoor Activity" className="gem-currency-image" />;
      case 'shopping':
        return <img src="/assets/flaticons/gem_topaz.png" alt="Topaz - Shopping" title="Topaz - Shopping" className="gem-currency-image" />;
      case 'nightlife':
        return <img src="/assets/flaticons/gem_amethyst.png" alt="Amethyst - Nightlife" title="Amethyst - Nightlife" className="gem-currency-image" />;
      case 'services':
        return <img src="/assets/flaticons/gem_citrine.png" alt="Citrine - Services" title="Citrine - Services" className="gem-currency-image" />;
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>View</Button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size={"6xl"}>

          <Modal.Body className="modal-container">
            <div className="modal-gem-img"> {gemImage()} </div>
            
            <divleft className="modal-info">
                <section className="details">
                  <span className="name"> 
                    {props.gem.name} 
                  </span>
                  <span className="description"> {props.gem.description} </span>
                </section>

                <div className="zig-zag-line"></div>

                {/* <section className="h-80 w-full">
                  <Carousel slide={false} indicators={false}>
                    {props.gem.images.map((URL, index) => (
                      <img key={index} 
                        src={URL} 
                        className="gem-carousel-img" 
                        loading="lazy"/>
                    ))}
                  </Carousel>
                </section> */}
                
                <section className="review">
                  <b>What's great about it? 
                  <i> {props.gem.created_by}</i> says:</b> <br/>
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
                  <Button onClick={() => setOpenModal(false)}>CLOSE</Button>
                  <img src={upvote} alt="Upvote" />
                  <img src={downvote} alt="Downvote" />
                  <img className="heart" src={heart} alt="Add to favorites" />
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