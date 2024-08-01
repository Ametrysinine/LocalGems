import {APIProvider, Map} from '@vis.gl/react-google-maps';
import {MapGem} from './MapGem';

const MapContainer = (props) => {
  const DisplayedGems = props.gems?.map(gem => <MapGem key={gem._id} location={gem.location} description={gem.description} type={gem.type} name={gem.name}>
    </MapGem>)
  const firstGemPosition = props.gems[0].location;
  const mapStartingPosition = {lat: parseFloat(firstGemPosition.latitude.$numberDecimal), lng: parseFloat(firstGemPosition.longitude.$numberDecimal)}

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map defaultCenter={mapStartingPosition} defaultZoom={12} mapId='2e8b760e6bb005ff' libraries={['marker'] }>
        {DisplayedGems}
      </Map>
    </APIProvider>
  )
};

export default MapContainer;