import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import MapContainer from "./components/MapContainer"; 

const App = () => {
  return (
    <div className="w-full p-6">
      <Navbar />
      <article className="page-body">
        <section className="page-body-content">
          <Outlet />
        </section>
      </article>
      <MapContainer /> {/*Note: Current height is height of container (i.e. 0 px)*/}
    </div>
  );
};
export default App
