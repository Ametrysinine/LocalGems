import { useState } from "react";

const SearchForm = (props) => {
  const [city, setCity] = useState('');
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('');

  const onSearch = props.onSearch;

  return (
    <>
      <h1 className="text-lg font-semibold text-blue-600 italic text-2xl p-4">The search form for /explore page</h1>

      <div className="searchFormContainer">
        <label>Search by city:</label>
        <input
          className='inputBox'
          placeholder="e.g. Toronto"
          value={city}
          onChange={(ev) => setCity(ev.target.value)}
        />

        <label>Search by keyword:</label>
        <input
          className='inputBox'
          placeholder="e.g. pizza"
          value={keyword}
          onChange={(ev) => setKeyword(ev.target.value)}
        />

        <label>Search by type:</label>
        <select
          className='inputDropdown'
          value={type}
          onChange={(e) => setType(e.target.value)}>
          <option value="">Select a type</option>
          <option value="food">Food</option>
          <option value="outdoors">Outdoors</option>
          <option value="shopping">Shopping</option>
          <option value="entertainment">Entertainment</option>
          <option value="nightlife">Nightlife</option>
          <option value="services">Services</option>
        </select>

        <button onClick={() => onSearch(city, keyword, type)}>Submit</button>
      </div>
    </>
  );
};

export default SearchForm;
