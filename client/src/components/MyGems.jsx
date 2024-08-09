import GemList from "./GemList";
import CreateGemForm from "./CreateGemForm";
import { useEffect, useState } from "react";
import { useTokenContext } from "../contexts/TokenContext";
import "../styles/MyGems.scss";

const MyGems = () => {
  const [gems, setGems] = useState([]);
  const [filter, setFilter] = useState('posted_gems');
  const [showCreateGem, setShowCreateGem] = useState(false);

  const { user, error, validateToken } = useTokenContext();

  const toggleCreateGemForm = () => {
    setShowCreateGem(!showCreateGem);
  }

  useEffect(() => {
    if (!user) {
      validateToken(localStorage.getItem(`token`));
    }
  }, [user]);

  // This method fetches the gems from the database.
  useEffect(() => {
    async function getGems() {
      if (user) {
        const response = await fetch(`/api/gems/${filter}?user=${user.user_id}`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const results = await response.json();
        setGems(results);
      }
    }
    getGems();
    return;
  }, [filter, user, gems.length, showCreateGem]);

  const handleCreateGemSuccess = (newGem) => {
    setShowCreateGem(false);
  };

  const deleteGem = async (gemId) => {
    try {
      const response = await fetch(`/api/gems/delete/${gemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setGems(gems.filter(gem => gem._id !== gemId)); // Update the state to remove the deleted gem
    } catch (error) {
      console.error('There was an error deleting the gem!', error);
    }
  };

  const getButtonClass = (filterType) => {
    return filterType === filter ? "filter-button active" : "filter-button";
  };

  return (
    <>
      <article className="page-body">
        <section className="page-body-content">
          <div className="create-a-gem">
            <button onClick={toggleCreateGemForm}>Create a Gem +</button>
          </div>
          <div className="create-gem-form">
            {showCreateGem && <CreateGemForm onSuccess={handleCreateGemSuccess} isFormVisible={showCreateGem} />}
          </div>
            <hr />
          <div className="my-gems-navbar">
            <br />
            <button onClick={() => setFilter("posted_gems")} className={getButtonClass("posted_gems")}>My Gems</button>
            <br />
            <button onClick={() => setFilter("favourited_gems")} className={getButtonClass("favourited_gems")}>Favourited Gems</button>
            <br />
            <button onClick={() => setFilter("unlocked_gems")} className={getButtonClass("unlocked_gems")}>Unlocked Gems</button>
          </div>
          <GemList gems={gems} deleteGem={deleteGem} />
        </section>
      </article>
    </>
  );
};

export default MyGems;

//change db to include all properties of 3 filters