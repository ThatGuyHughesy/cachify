import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

export default function Playlist({ id, image, title, cacheSize, showPlaylist, removePlaylist }) {
  return (
    <ListGroup.Item action onClick={() => showPlaylist(title, id, cacheSize)}>
      <Media>
        <Image src={image} style={{ height: '52px', width: '52px' }} rounded />
        <Media.Body className="ml-4">
          <h5 className="mb-1">{title}</h5>
          <p className="mb-0">
            {cacheSize}
            &nbsp;tracks
          </p>
        </Media.Body>
        <a
          href="#removePlaylist"
          className="close"
          onClick={e => {
            e.preventDefault();
            removePlaylist(e, id);
          }}
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Delete</span>
        </a>
      </Media>
    </ListGroup.Item>
  );
}

Playlist.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cacheSize: PropTypes.number.isRequired,
  showPlaylist: PropTypes.func.isRequired,
  removePlaylist: PropTypes.func.isRequired
};
