import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import MapContainer from "./components/MapContainer"; // Note: CSS currently in MapContainer.jsx, use height 100% later

const App = () => {
  return (
    <div className="w-full p-6">
      <Navbar />
      <Outlet />
      <MapContainer /> 
    </div>
  );
};
export default App
