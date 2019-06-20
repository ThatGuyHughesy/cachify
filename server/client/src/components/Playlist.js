import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

export default function Playlist({ image, title, tracks }) {
  return (
    <ListGroup.Item>
      <Media>
        <Image src={image} style={{ height: '70px', width: '70px' }} rounded />
        <Media.Body className="ml-4">
          <h5>{title}</h5>
          <p>
            {tracks}
            &nbsp;tracks
          </p>
        </Media.Body>
      </Media>
    </ListGroup.Item>
  );
}

Playlist.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tracks: PropTypes.number.isRequired
};
