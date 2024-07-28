import GemList from "./GemList";

const MyGems = (props) => {
  return(
    <>
    <h1 className="text-lg font-semibold text-blue-600 italic text-2xl p-4 ">The entire my-gem page component</h1>
    <br/>
    <a href="urlForOwnedQueryHere">My Gems (default)</a>
    <br/>
    <a href="urlForFavQueryHere">Favourited Gems</a>
    <br/>
    <a href="urlForUnlockedQueryHere">Unlocked Gems</a>
    <GemList/>
    </>
  );
};

export default MyGems;