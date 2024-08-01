import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import MapContainer from "./components/MapContainer"; 
import TokenProvider from "./contexts/TokenContext";

const App = () => {
  return (
    <TokenProvider>
    <div className="w-full p-6">
      <Navbar />
      <Outlet />
      <MapContainer /> {/*Note: Current height is height of container (i.e. 0 px)*/}
    </div>
    </TokenProvider>
  );
};
export default App
