import React from 'react';
import PropTypes from 'prop-types';

export default function Playlist({ image, title, tracks }) {
  return (
    <div className="playlist">
      <div className="playlist-inner">
        <img className="playlist-image" alt="artist" src={image} />
        <div className="playlist-details">
          <div className="playlist-title">{title}</div>
          <div className="playlist-subtitle">
            {tracks}
            &nbsp;tracks
          </div>
        </div>
      </div>
    </div>
  );
}

Playlist.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tracks: PropTypes.number.isRequired
};
