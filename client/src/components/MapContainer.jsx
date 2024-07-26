import {APIProvider, Map} from '@vis.gl/react-google-maps';

const MapContainer = () => (
  <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
    <Map zoom={10} center={{lat: 53.54992, lng: 10.00678}} />
  </APIProvider>
);

export default MapContainer;