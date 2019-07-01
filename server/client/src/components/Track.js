import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Media from 'react-bootstrap/Media';

export default function Track({ image, title, artist, added }) {
  return (
    <ListGroup.Item className="track">
      <Media className="track-inner">
        <img width={50} height={50} src={image} alt="playlist" />
        <Media.Body className="text-left pl-3 pt-1">
          <h5>{title}</h5>
          <p>{artist}</p>
          <small>Added {added} minutes ago.</small>
        </Media.Body>
      </Media>
    </ListGroup.Item>
  );
}

Track.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  added: PropTypes.number.isRequired
};
