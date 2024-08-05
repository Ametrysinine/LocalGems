import React, {useState, useEffect} from 'react';
import {AdvancedMarker, InfoWindow, useAdvancedMarkerRef, Pin} from '@vis.gl/react-google-maps';

export const MapGem = (props) => {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [img, setImg] = useState();
  const [markerRef, marker] = useAdvancedMarkerRef();

  const {location, description, name, type, images} = props;
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
          className="size-full flex flex-row bg-blue-300"
          anchor={marker}
          onCloseClick={() => setInfowindowOpen(false)}>
          <div className="flex flex-col font-sans text-xl p-2">
            <img src={images[0]} alt="location image" className="size-48"></img>
            <div className="p-1 self-center">{name}</div>
          </div>
          <div className="flex flex-col font-sans bg-blue-200">
            <div className="font-serif text-base content-center text-right">{location.address}</div>
            <div className="font-sans text-lg content-center">{description}</div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};