import React, {useState} from 'react';
import {AdvancedMarker, InfoWindow, useAdvancedMarkerRef, Pin} from '@vis.gl/react-google-maps';

export const MapGem = (gem) => {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const {position, description, name, type, icon, image} = gem;
  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={position}
        options={{icon: type}}
        title={'AdvancedMarker that opens an Infowindow when clicked.'}>
          <img src='./assets/bar.svg' height='20px' width='20px'/>
        </AdvancedMarker>
      

      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={'20px'}
          onCloseClick={() => setInfowindowOpen(false)}>
                <img
        src={type}
        height="30px" width="30px"/>
            <div>{name}</div>
          <div>{description}</div>
        </InfoWindow>
      )}
    </>
  );
};