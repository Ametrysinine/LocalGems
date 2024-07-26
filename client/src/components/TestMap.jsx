import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';

const TestMap = () => {
  return (
    <APIProvider
      apiKey={'AIzaSyCKeEeSXzGoU1XqNhO8bZ58tvRn0cJ-8mA'}
      onLoad={() => console.log('Maps API has loaded.')}>
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        onCameraChanged={(ev) => console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}
      >
      </Map>
    </APIProvider>
  );
};
export default TestMap;
