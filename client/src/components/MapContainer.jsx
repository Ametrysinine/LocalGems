import {APIProvider, Map} from '@vis.gl/react-google-maps';

const MapContainer = () => (
  <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
    <Map defaultCenter={{lat: 40.7, lng: -74}} defaultZoom={12}/>
  </APIProvider>
);

export default MapContainer;