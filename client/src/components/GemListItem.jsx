import Modal from "./Modal";
import { dateConversion, xssSanitize } from "./helpers/helperFunctions";
import "../styles/GemListItem.scss";
import { useEffect , useState } from "react";
import { useTokenContext } from "../contexts/TokenContext";
import { useUserContext } from "../contexts/UserContext";
import UnlockModal from "./UnlockModal";



// takes in a single Gem as props
const GemListItem = (props) => {

  const { userFromDB, setUserFromDB } = useUserContext();
  const { user, error, validateToken } = useTokenContext();
  const [ unlockModalVisibility, setUnlockModalVisibility] = useState(false);

  useEffect(() => {
    if (!userFromDB) {
      console.log(`GemListItem.jsx: no info yet for user`);
    }
    console.log(`GemListItem.jsx has set a user: `, userFromDB);
  }, [userFromDB]);

  useEffect(() => {
    if (!user) {
      validateToken(localStorage.getItem(`token`));
    }
  }, [user]);


  /* ---------------------------------------------------------

  Functions to check three states of GemListItem
  Owned, unlocked, locked

  --------------------------------------------------------- */


  // returns true if the gem is NOT UNLOCKED or NOT OWNED
  const isLocked = () => {
    return !isOwned() && !isUnlocked();
  };

  // returns true if the gem is OWNED
  const isOwned = () => {
    return user.user_id === props.gem.owner_id;
  };

  // returns true if the gem is UNLOCKED
  const isUnlocked = () => {
    return userFromDB.unlocked_gems.includes(props.gem.gem_id);
  };


  /* ---------------------------------------------------------

  Other conditional rendering

  ---------------------------------------------------------*/

  // COND. REND returns the correct gem currency image based on gem type
  const gemImage = () => {
    switch (props.gem.type) {
      case 'food':
        return <img src="/assets/flaticons/gem_ruby.png" alt="Ruby - Food" className="gem-currency-image" />;
      case 'entertainment':
        return <img src="/assets/flaticons/gem_sapphire.png" alt="Sapphire - Entertainment" className="gem-currency-image" />;
      case 'outdoors':
        return <img src="/assets/flaticons/gem_emerald.png" alt="Emerald - Outdoor Activity" className="gem-currency-image" />;
      case 'shopping':
        return <img src="/assets/flaticons/gem_topaz.png" alt="Topaz - Shopping" className="gem-currency-image" />;
      case 'nightlife':
        return <img src="/assets/flaticons/gem_amethyst.png" alt="Amethyst - Nightlife" className="gem-currency-image" />;
      case 'services':
        return <img src="/assets/flaticons/gem_citrine.png" alt="Citrine - Services" className="gem-currency-image" />;
    }
  };

  // CURRENCY BLOCK
  const updateCurrency = async (key) => {
    await fetch (`/api/currency/${key}/-1`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userFromDB),
    }).then(response => {if (response.status === 200) {
      const clone = {...userFromDB};
      
      // Update currency
      clone.currency[key] -= 1;
      setUserFromDB(clone);
    }});
  }

  let key;
  switch (props.gem.type) {
    case "food":
      key = "rubies"
      break;
    case "entertainment":
      key = "sapphires"
      break;
    case "outdoors":
      key = "emeralds"
      break;
    case "shopping":
      key = "topazs"
      break;
    case "nightlife":
      key = "amethysts"
      break;
    case "services":
      key = "citrines"
      break;
  }
  // CURRENCY BLOCK END

  // COND. REND returns gem type if locked, otherwise gem name
  const nameOfGem = () => {
    // if unlocked
    if (!isLocked()) {
      return (
        <div className="type-location">
          {props.gem.name} | {props.gem.city}
        </div>
      )
      //if locked
    } else if (isLocked()) {
      return (
        <div className="type-location">
          {props.gem.type[0].toUpperCase() + props.gem.type.slice(1)} Gem | {props.gem.city}
        </div>
      )
    }
  }

  // COND. REND: buttons for 1. posted_gems, 2. unlocked_gems, 3. locked gems (not posted_gems OR unlocked_gems)
  const bottomRowRight = () => {
    // if user OWNS the gem
    if (isOwned()) {
      return (
        <div className="bottom-row-right">
          <div className="edit-button">
            Edit
          </div>
          <div className="delete-button" onClick={handleDelete}>
            Delete
          </div>
        </div>
      );
    }
    // if user UNLOCKED the gem
    else if (isUnlocked()) {
      return (
        <div className="bottom-row-right">
          <div className="upvote-counter">
            <img src="thumbs-up-white.png" alt="thumbs up" className="thumbs-image" />
            {props.gem.total_score}
          </div>
          <div className="view-button">View</div>
        </div>
      );
    }
    // if user does not OWN OR UNLOCKED the gem
    else if (isLocked()) {
      return (
        <div className="bottom-row-right">
          <div className="upvote-counter">
            <img src="thumbs-up-white.png" alt="thumbs up" className="thumbs-image" />
            {props.gem.total_score}
          </div>
          <div className="reveal-button" onClick={() => handleRevealButton()}>
            Reveal {gemImage()}
          </div>
        </div>
      );
    }

  };


  /* ---------------------------------------------------------

  handle Functions
  
  ---------------------------------------------------------*/

  const handleDelete = async () => {
    await props.onDelete(props.gem._id)

    setTimeout(updateCurrency(key), 5000);
  };

  const handleRevealButton = function() {
    console.log(`clicked reveal for:`, props.gem._id);
    setUnlockModalVisibility(true);  	
  };

  return (

    <div className="gem-list__item">
      <div className="gem-left-container">
        {props.gem.images && props.gem.images.length > 0 ? (
          <img
            src={props.gem.images[0]}
            className={`gem-image ${isLocked() ? 'blurred' : ''}`}
            alt="Gem image"
            onClick={<Modal gem={props.gem} />}
          />
        ) : (
          <div className="placeholder-image">No image available</div>
        )}
      </div>

      <div className="gem-right-container">
        <div>
          {nameOfGem()}
        </div>

        {props.gem.tags && (
          <div className="gem-tags">
            {props.gem.tags.map((tag, index) => (
              <span key={index} className="gem-tag">#{tag} </span>
            ))}
          </div>
        )}

        <br />
        <div className="bottom-row">
          Posted: {dateConversion(props.gem.date_shared)}
          {bottomRowRight()}
        </div>

        <Modal gem={props.gem} />
        
        { unlockModalVisibility? <UnlockModal gemData={props.gem} setUnlockModalVisibility={setUnlockModalVisibility} /> : <></> }

      </div>


    </div>
  )
};

export default GemListItem;

{/* 
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
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