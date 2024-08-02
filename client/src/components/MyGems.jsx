import GemList from "./GemList";
import CreateGemForm from "./CreateGemForm";
import { useEffect, useState } from "react";
import { useToken } from "../contexts/TokenContext";

const MyGems = () => {
  const [gems, setGems] = useState([]);
  const [filter, setFilter] = useState('posted_gems');
  const [showCreateGem, setShowCreateGem] = useState(false);

  const { user, error, validateToken } = useToken();

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
        const gems = await response.json();
        setGems(gems);
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
          <h1 className="text-lg font-semibold text-blue-600 italic text-2xl p-4 ">The entire my-gem page component</h1>
          {showCreateGem && <CreateGemForm onSuccess={handleCreateGemSuccess}/>}
          <br />
          <button onClick={toggleCreateGemForm}>Create a Gem</button>
          <br />
          <button onClick={() => setFilter("posted_gems")}>My Gems</button>
          <br />
          <button onClick={() => setFilter("favourited_gems")}>Favourited Gems</button>
          <br />
          <button onClick={() => setFilter("unlocked_gems")}>Unlocked Gems</button>
          <GemList gems={gems}/>
        </section>
      </article>
    </>
  );
};

export default MyGems;

//change db to include all properties of 3 filters