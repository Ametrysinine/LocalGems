// import style


const GemListItem = (props) => {
  return(
    <ul className="photo-list">
      {props.photos.map(photo =>
        <PhotoListItem 
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

export default GemListItem;