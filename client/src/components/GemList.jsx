// import style
import GemListItem from "./GemListItem";

// props will be array of Gems from Gem db
const GemList = (props) => {
  return(
    <ul className="gem-list">
      {props.map(gem =>
        <GemListItem 
        data={gem}/>
      )}
    </ul>
  );
};

export default GemList;