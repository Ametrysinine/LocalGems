import { useState } from "react";

const SearchForm = (props) => {
  const [city, setCity] = useState('');
  const [keyword, setKeyword] = useState('');

  const onSearch = props.onSearch;

  return (
    <>
      <h1 className="text-lg font-semibold text-blue-600 italic text-2xl p-4">The search form for /explore page</h1>

      <div className="searchFormContainer">
          <label>Search by city:</label>
          <input
            className='inputBox'
            placeholder="Toronto"
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
          />
          <br />
          <label>Search by keyword:</label>
          <input
            className='inputBox'
            placeholder="Pizza"
            value={keyword}
            onChange={(ev) => setKeyword(ev.target.value)}
          />
          <p>Dropdown for Gem type here</p>
          <button onClick={() => onSearch(city, keyword)}>Submit</button>
      </div>
    </>
  );
};

export default SearchForm;
