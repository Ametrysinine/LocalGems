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
    </div>
    </TokenProvider>
  );
};
export default App
