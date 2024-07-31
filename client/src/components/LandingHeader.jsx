import { useEffect, useState } from "react";


const landingHeader = function() {

useEffect(() => {
  async function landingGET() {
    const expressFetch = await fetch(`http://localhost:5050/landing-page`);          //route has to end in /landing-page as per definition in server.js
    if (!expressFetch.ok) {
      const message = `An error occurred: ${expressFetch.statusText}`;
      console.error(message);
      return;
    }
    const expressResponse = await expressFetch.json();
    console.log(`Our get response is: `, expressResponse);
  }  
  landingGET();
  return;
}, []);

  
    return (
    <>
      <h1 className="text-lg font-semibold text-blue-600 italic text-2xl p-4 ">Landing Page</h1>
      <p>this file is in /client/src/components/LandingHeader.jsx</p>

    </>
  );
  
};

export default landingHeader;
