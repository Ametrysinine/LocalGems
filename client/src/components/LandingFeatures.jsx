import { useEffect, useState } from "react";
import "../styles/Main.scss";
import "../styles/LandingFeatures.scss";
import search from "../assets/index_search.svg";
import hands from "../assets/index_hands.svg";
import unlock from "../assets/index_unlock.svg";


const landingFeatures = function() {
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

      <article className="features-signup">
        Experience your destination like a true local — no tourists allowed! <br />
        <u>Join now</u>!
      </article>
    </>
  );
};

export default landingFeatures;
