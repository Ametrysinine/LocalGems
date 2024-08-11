import { useEffect, useState } from "react";
import "../styles/GemList.scss";
import GemListItem from "./GemListItem";


export default function GemList(props) {

  function display() {
    if (!props.gems.length) {
      return "No Gems found.";
    }
    return props.gems.map(gem =>
      <GemListItem
        key={gem._id}
        gem={gem} 
        onDelete={props.deleteGem}
        filter={props.filter}/>
    );
  }

  return (
    <div>
          <ul className="gem-list">
            {display()}
            </ul>
    </div>
  );
}