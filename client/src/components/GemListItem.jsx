// import styles

const GemList = (props) => {
  const { title, desc, city, location, owner, date_shared, images, score } = props;

  return (
    <div className="gem-list__item">
      <div className="gem-list__title-score">
        {title}
        {score}
      </div>

      <div className="gem-list__user-details">
        <img className="gem-list__user-profile" />
        <p className="gem-list__user-name"> {owner} </p>
      </div>

      <div className="gem-list__images">
      {/* map list of image to img tag */}
      </div>

      <div className="gem-list__description">
        <p>{date_shared}</p>
        <p>{desc}</p>
      </div>

      <div className="gem-list__location">
        <p>{city}</p>
        {/* Need to change MapContainer to accept lat/long */}
        <MapContainer data={location}/> 
      </div>
    </div>
  );
};

export default GemList;