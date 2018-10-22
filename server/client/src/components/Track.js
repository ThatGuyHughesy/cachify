import React from "react";

export default props => {
  return (
    <div className="track list-group-item">
      <img className="item-image" alt="artist" src={props.image} />
      <div className="item-details">
        <div className="item-title">{props.title}</div>
        <div className="item-subtitle">{props.artist}</div>
      </div>
      <div className="item-added">Added {props.added} minutes ago.</div>
    </div>
  );
};
