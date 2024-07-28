import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import GemListItem from "./GemListItem";


export default function GemList() {
  const [gems, setGems] = useState([]);

  // This method fetches the gems from the database.
  useEffect(() => {
    async function getGems() {
      const response = await fetch(`http://localhost:5050/gems/`);
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
  }, [gems.length]);

  // // This method will delete a gem
  // async function deleteGem(id) {
  //   await fetch(`http://localhost:5050/gems/${id}`, {
  //     method: "DELETE",
  //   });
  //   const newGems = gems.filter((el) => el._id !== id);
  //   setGems(newGems);
  // }

  // This following section will display the table with the gems of individuals.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Gems</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <ul className="photo-list">
            {gems.map(gem =>
              <GemListItem
                key={gem.id}
                gem={gem} />
            )}
            </ul>
        </div>
      </div>
    </>
  );
}