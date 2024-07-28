import GemList from "./GemList";
import { useEffect, useState } from "react";

const MyGems = () => {
  const [gems, setGems] = useState([]);
  const [filter, setFilter] = useState('');

  // This method fetches the gems from the database.
  useEffect(() => {
    async function getGems() {
      const response = await fetch(`http://localhost:5050/gems/${filter}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const gems = await response.json();
      setGems(gems);
    }
    getGems();
    return;
  }, [filter]);

  return (
    <>
      <h1 className="text-lg font-semibold text-blue-600 italic text-2xl p-4 ">The entire my-gem page component</h1>
      <br />
      {/* <p onClick={() => setFilter("my")}>My Gems (default)</p> */}
      MyGems
      <br />
      <button onClick={() => setFilter("posted_gems")}>Favourited Gems</button>
      {/* Favourited Gems */}
      <br />
      {/* <p onClick={() => setFilter("my")}>Unlocked Gems</p> */}
      Unlocked Gems
      <GemList gems={gems}
      />
    </>
  );
};

export default MyGems;

//change db to include all properties of 3 filters