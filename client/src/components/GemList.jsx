// import style
import GemListItem from "./GemListItem";

const GemList = (props) => {
  return(
    <ul className="gem-list">
      {props.photos.map(photo =>
        <GemListItem 
        key={photo.id} 
        photo={photo} 
        toggleFavourite={props.toggleFavourite} 
        favourites={props.favourites} 
        toggleModal={props.toggleModal}
        updateModalPhoto={props.updateModalPhoto}/>
      )}
    </ul>
  );
};

export default GemList;