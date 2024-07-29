const SearchForm = function() {
  return (
    <>
      <h1 className="text-lg font-semibold text-blue-600 italic text-2xl p-4 ">The search form for /explore page</h1>

      <div className="searchFormContainer">
        <form className="searchForm">
          <label>Search by city:</label>
          <input
            className='inputBox'
            placeholder="Toronto"
          // onChange={(ev) => setEmail(ev.target.value)}
          />
          <br/>
          <label>Search by keyword:</label>
          <input
            className='inputBox'
            placeholder="Pizza"
          // onChange={(ev) => setEmail(ev.target.value)}
          />
          <p>Dropdown for Gem type here</p>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
