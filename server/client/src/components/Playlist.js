import React from "react";

export default props => {
  return (
    <div
      className="playlist list-group-item"
      onClick={e => props.toggle(props)}
    >
      <img className="item-image" alt="artist" src={props.image} />
      <div className="item-details">
        <div className="item-title">{props.title}</div>
        <div className="item-subtitle">{props.tracks} tracks</div>
      </div>
    </div>
  );
};
