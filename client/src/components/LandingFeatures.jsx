import { useEffect, useState } from "react";
import "../styles/Main.scss";
import "../styles/LandingFeatures.scss";
import search from "../assets/index_search.svg";
import hands from "../assets/index_hands.svg";
import unlock from "../assets/index_unlock.svg";
import { useTokenContext } from "../contexts/TokenContext";

import featureMap2 from "../assets/redwood_v2.jpg";
import featureMap3 from "../assets/redwood_v3.jpg";
import LandingFeaturesMapGems from "./LandingFeaturesMapGems";

const landingFeatures = function() {

  const { user } = useTokenContext();

    return (
    <>
      <article className="features-container">
        <section className="one">
          <div className="features-box">
            Discover hidden Gems curated by the city’s finest!
          </div>

          <div className="features-image">
            <img src={search} width="300px" />
          </div>
        </section>

        <section className="two">
          <div className="features-box">
            Give to get — you'll earn 1 of 6 gemstones for every secret spot you share!
          </div>

          <div className="features-image">
            <img src={hands} width="300px" />
          </div>
        </section>

        <section className="three">
          <div className="features-box">
            Use your precious gemstones to unlock others' Gems!
          </div>

          <div className="features-image">
          <img src={unlock} width="300px" />
          </div>
        </section>
      </article>



      {user ?
      <></>
      : 
      <>
        <article className="features-signup">
          Join now!
        </article>

      </>
      }
        <section className="map-section">
          <div className="map-container">
            <div className="map-container-frame">
              <img src={featureMap3} alt="Map showing an illustration of hidden gems for users to uncover" />
            </div>
            <h2 className="map-container-tagline">
              Uncover Local Gems near you!
            </h2>            
            <LandingFeaturesMapGems />
          </div>
        </section>      
    </>
  );
};

export default landingFeatures;
