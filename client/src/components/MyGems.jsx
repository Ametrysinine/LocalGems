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
        const response = await fetch(`http://localhost:5050/gems/${filter}?user=${user.user_id}`);
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
  }, [filter, user, gems.length]);

  const handleCreateGemSuccess = (newGem) => {
    setGems([...gems, newGem]);
    setShowCreateGem(false);
  };

  return (
    <>
      <article className="page-body">
        <section className="page-body-content">
          <div className="my-gems-navbar">
            <button onClick={toggleCreateGemForm}>Create a Gem</button>
            <br />
            <button onClick={() => setFilter("posted_gems")}>My Gems</button>
            <br />
            <button onClick={() => setFilter("favourited_gems")}>Favourited Gems</button>
            <br />
            <button onClick={() => setFilter("unlocked_gems")}>Unlocked Gems</button>
          </div>
          <div className="create-gem-form">
            {showCreateGem && <CreateGemForm onSuccess={handleCreateGemSuccess} />}
          </div>
          <GemList gems={gems} />
        </section>
      </article>
    </>
  );
};

export default MyGems;

//change db to include all properties of 3 filters