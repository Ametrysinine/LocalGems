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

  // This method will map out the gems on the table
  function gemList() {
    return gems.map((gem) => {
      return (
        <GemListItem
          gem={gem}
          // deleteGem={() => deleteGem(gem._id)}
          key={gem._id}
        />
      );
    });
  }

  // This following section will display the table with the gems of individuals.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Gems</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Description
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  City
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {gemList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}