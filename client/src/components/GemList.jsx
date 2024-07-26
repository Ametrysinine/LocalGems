// import styles
import GemListItem from "./GemListItem";

const GemList = (props) => {
  const {title, desc, city, location, owner, date_shared, images, score} = props;

  return (
    <div className="gem-list__item">
      <img src={} className="gem-list__image"/>
      {/* need to map above line */}
      <div className="gem-list__user-details">
        <img src={} className="photo-list__user-profile" />
        <div className="gem-list__user-info">
          <p>{owner}</p>
          <div className="gem-list__user-location">
            <p>{location.city}, {location.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};