import React, {useState} from 'react';
import {AdvancedMarker, InfoWindow, useAdvancedMarkerRef, Pin} from '@vis.gl/react-google-maps';

export const MapGem = (props) => {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
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

  console.log('im there')
  console.log('im far')
  console.log('fdjsaklfdjsakfldsa' + parseFloat(location.latitude.$numberDecimal), parseFloat(location.longitude.$numberDecimal))
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
          anchor={marker}
          maxWidth={'20px'}
          onCloseClick={() => setInfowindowOpen(false)}>
          <div>{name}</div>
          <div>{description}</div>
        </InfoWindow>
      )}
    </>
  );
};