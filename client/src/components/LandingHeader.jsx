import { useEffect, useState } from "react";
import "../styles/Main.scss";
import "../styles/LandingHeader.scss";


const landingHeader = function() {
    return (
    <>
      <h1 className="text-lg font-semibold text-blue-600 italic text-2xl p-4 ">Landing Page</h1>
      <p>this file is in /client/src/components/LandingHeader.jsx</p>

    </>
  );
  
};

export default landingHeader;
