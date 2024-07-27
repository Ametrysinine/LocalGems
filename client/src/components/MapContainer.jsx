import {APIProvider, Map} from '@vis.gl/react-google-maps';
import {MapGem} from './MapGem';

import bar from '../assets/bar.svg';
import entertainment from '../assets/entertainment.svg';
import food from '../assets/food.svg';
import nature from '../assets/nature.svg';
import services from '../assets/services.svg';
import shopping from '../assets/shopping.svg';

const MapContainer = () => {
  const gems = [{
    position: {lat: 29.5, lng: -81.2},
    description: 'Food gem',
    type: food,
    name: 'PlaceA',
  }, {
    position: {lat: 29.55, lng: -81.25},
    description: 'Nature gem',
    type: nature,
    name: "PlaceB"
  }]

const DisplayedGems = gems.map(gem => <MapGem position={gem.position} description={gem.description} type={gem.type} name={gem.name}>
</MapGem>)
  const mapStartingPosition = gems[0].position

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map defaultCenter={mapStartingPosition} defaultZoom={12} mapId='2e8b760e6bb005ff' libraries={['marker']}>
        {DisplayedGems}
      </Map>
    </APIProvider>
  )
};

export default MapContainer;