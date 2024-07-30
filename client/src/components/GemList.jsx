import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import GemListItem from "./GemListItem";


export default function GemList(props) {

  function display() {
    if (!props.gems.length) {
      return "No Gems found.";
    }
    return props.gems.map(gem =>
      <GemListItem
        key={gem.id}
        gem={gem} />
    );
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">The GemList component</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <ul className="gem-list">
            {display()}
            </ul>
        </div>
      </div>
    </>
  );
}