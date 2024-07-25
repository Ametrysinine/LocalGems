import {APIProvider, Map} from '@vis.gl/react-google-maps';

const MapContainer = () => (
  <APIProvider apiKey='AIzaSyCKeEeSXzGoU1XqNhO8bZ58tvRn0cJ-8mA'>
    <Map zoom={10} center={{lat: 53.54992, lng: 10.00678}} />
  </APIProvider>
);

export default MapContainer;