import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const GemListItem = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.gem.name}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.gem.description}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.gem.city}
    </td>
    {/* <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.gem._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteGem(props.gem._id);
          }}
        >
          Delete
        </button>
      </div>
    </td> */}
  </tr>
);

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