import { useEffect, useState } from "react";
import { useToken } from "../contexts/TokenContext";
import SearchForm from "./SearchForm";
import GemList from "./GemList";

const Explore = function() {

  const { user, error, validateToken } = useToken();

  useEffect(() => {
    if (!user) {
      validateToken(localStorage.getItem(`token`));
    }
  }, [user]);

  console.log("Explore.jsx user was set: ", user);
  

  const [gems, setGems] = useState([]);
  const [filter, setFilter] = useState('');

  // This method fetches the gems from the database.
  useEffect(() => {
    async function getGems() {
      if (user) {
        console.log("userid from Explore.jsx is: ", user.user_id);
        
        const response = await fetch(`http://localhost:5050/explore?user=${user.user_id}&${filter}`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const gems = await response.json();
        console.log("gems: ", gems);
        setGems(gems);
      }
    }
    getGems();
    return;
  }, [filter, user]);

  const handleSearch = (city, keyword, type) => {
    const query = [];
    if (city) query.push(`city=${city}`);
    if (keyword) query.push(`keyword=${keyword}`);
    if (type) query.push(`type=${type}`);
    setFilter(query.join('&'));
  };

  return (
    <>
      {/* The entire explore page component */}
      <article className="page-body">
        <section className="page-body-content">
          <SearchForm onSearch={handleSearch} />
          <GemList gems={gems} />
        </section>
      </article>
    </>
  );
};

export default Explore;
