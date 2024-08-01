import { useState } from "react";
import "../styles/SearchForm.scss";

const SearchForm = (props) => {
  const [city, setCity] = useState('');
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('');

  const onSearch = props.onSearch;

  return (
    <>
      {/* The search form for /explore page */}

      <div className="searchFormContainer">
        <div>
          <label>Search by city:</label>
          <input
            className='inputBox'
            placeholder="e.g. Toronto"
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
          />
        </div>

        <div>
          <label>Search by keyword:</label>
          <input
            className='inputBox'
            placeholder="e.g. pizza"
            value={keyword}
            onChange={(ev) => setKeyword(ev.target.value)}
          />
        </div>

        <div>
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
      </div>
    </>
  );
};

export default SearchForm;
