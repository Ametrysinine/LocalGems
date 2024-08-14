import React, {useState, useEffect} from 'react';
import {AdvancedMarker, InfoWindow, useAdvancedMarkerRef, Pin} from '@vis.gl/react-google-maps';
import { Carousel } from 'flowbite-react';
import "../styles/MapGem.scss";

export const MapGem = (props) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [img, setImg] = useState();
  const [markerRef, marker] = useAdvancedMarkerRef();

  const {city, location, description, name, type, images} = props;
  let icon = {};

    switch (type) {
      case 'food':
        icon.src = "/assets/flaticons_svg/gem_ruby.svg"; 
        icon.alt = "Food - ruby";
        break;
      case 'entertainment':
        icon.src = "/assets/flaticons_svg/gem_sapphire.svg"; 
        icon.alt = "Entertainment - sapphire";
        break;

      case 'outdoors':
        icon.src = "/assets/flaticons_svg/gem_emerald.svg"; 
        icon.alt = "Outdoors - emerald";
        break;

      case 'shopping':
        icon.src = "/assets/flaticons_svg/gem_topaz.svg"; 
        icon.alt = "Shopping - topaz";
        break;

      case 'nightlife':
        icon.src = "/assets/flaticons_svg/gem_amethyst.svg"; 
        icon.alt = "Nightlife - amethyst";
        break;

      case 'services':
        icon.src = "/assets/flaticons_svg/gem_citrine.svg"; 
        icon.alt = "Services - citrine";
        break;
    
      default:
        break;
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{lat: parseFloat(location.latitude.$numberDecimal), lng: parseFloat(location.longitude.$numberDecimal)}}
        title={name}>
          <img src={icon.src} alt={icon.alt} height="32px" width="32px"></img>
      </AdvancedMarker>
      

      {infowindowOpen && (
        <InfoWindow
          className="size-full flex flex-row"
          anchor={marker}
          onCloseClick={() => setInfowindowOpen(false)}>
          
          <div className="gem-map-container">
            {/* <img src={images[0]} alt="location image" className="size-48"></img> */}

            <section className="gem-map-carousel">
              <Carousel slide={false} indicators={false}>
                {props.images.map((URL, index) => (
                  <img key={index} 
                    src={URL} 
                    className="gem-carousel-img" 
                    loading="lazy"/>
                ))}
              </Carousel>
            </section>

            {/* <div className="p-1 self-center">{name}</div> */}

            <div className="gem-map-details">
              <div className="name">{name}</div>
              <div className="address">{location.address}, {city}</div>
              <div className="description">{description}</div>
            </div>

          </div>

        </InfoWindow>
      )}
    </>
  );
};