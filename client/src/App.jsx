import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import TokenProvider from "./contexts/TokenContext";
import UserProvider from "./contexts/UserContext";
import { DarkModeToggle } from "./components/DarkMode";

const App = () => { 

  return (
    <TokenProvider>
      <UserProvider>
      <div className="w-full p-6">
        <Navbar />
        <Outlet />
        <DarkModeToggle />
      </div>
      </UserProvider>
    </TokenProvider>
  );
};
export default App
