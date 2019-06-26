import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import * as actions from '../actions';

import Playlist from './Playlist';
import './Playlists.css';

class Playlists extends Component {
  constructor(props) {
    super(props);

    this.selectPlaylist = this.selectPlaylist.bind(this);
    this.selectCacheSize = this.selectCacheSize.bind(this);
    this.updateCacheSize = this.updateCacheSize.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);
    this.submitPlaylist = this.submitPlaylist.bind(this);
    this.removePlaylist = this.removePlaylist.bind(this);
    this.showPlaylistModal = this.showPlaylistModal.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      update: { title: null, playlist: null, cacheSize: 10 },
      create: { playlist: null, cacheSize: 10 }
    };
  }

  componentDidMount() {
    const { fetchPlaylists, fetchSpotifyPlaylists } = this.props;

    fetchPlaylists();
    fetchSpotifyPlaylists();
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  selectPlaylist(event) {
    const { create } = this.state;
    create.playlist = event.value;
    this.setState({ create });
  }

  selectCacheSize(event) {
    const { create } = this.state;
    create.cacheSize = event.value;
    this.setState({ create });
  }

  updateCacheSize(event) {
    const { update } = this.state;
    update.cacheSize = event.value;
    this.setState({ update });
  }

  showPlaylistModal(title, playlist, cacheSize) {
    this.setState({ update: { title, playlist, cacheSize } });
    this.handleShow();
  }

  removePlaylist(event, id) {
    event.preventDefault();
    event.stopPropagation();

    const { removePlaylist } = this.props;

    if (id) {
      removePlaylist(id);
    }
  }

  updatePlaylist(event) {
    event.preventDefault();

    const { updatePlaylist } = this.props;
    const { update } = this.state;

    if (update.playlist && update.cacheSize) {
      updatePlaylist({
        playlistId: update.playlist,
        cacheSize: update.cacheSize
      }).then(() => {
        this.setState({ update: { playlist: null, cacheSize: 10 } });
        this.handleClose();
      });
    }
  }

  submitPlaylist(event) {
    event.preventDefault();

    const { createPlaylist } = this.props;
    const { create } = this.state;

    if (create.playlist && create.cacheSize) {
      createPlaylist({
        playlistId: create.playlist,
        cacheSize: create.cacheSize
      }).then(() => {
        this.setState({ create: { playlist: null, cacheSize: 10 } });
      });
    }
  }

  renderPlaylists() {
    const { playlists } = this.props;
    if (playlists) {
      return playlists.map(playlist => {
        return (
          <Playlist
            key={playlist.id}
            id={playlist.id}
            title={playlist.name}
            cacheSize={playlist.cacheSize}
            image={playlist.imageUrl}
            showPlaylist={this.showPlaylistModal}
            removePlaylist={this.removePlaylist}
          />
        );
      });
    }
    return <div>No playlists found!</div>;
  }

  render() {
    const { auth, spotifyPlaylists, cacheSizeOptions } = this.props;
    const { show, update, create } = this.state;

    if (auth === false) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    return (
      <Container>
        <Navbar bg="white" expand="lg" className="px-0">
          <Navbar.Brand href="/" className="font-weight-bold">
            Cachify
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto" />
            <Nav>
              <Nav.Link href="/auth/logout" rel="noopener noreferrer">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Card>
          <Card.Body>
            <Card.Title>Add Playlist</Card.Title>
            <Form onSubmit={this.submitPlaylist}>
              <Form.Row>
                <Col>
                  <Form.Group className="mb-0">
                    <Select
                      value={spotifyPlaylists.find(option => option.value === create.playlist)}
                      onChange={this.selectPlaylist}
                      options={spotifyPlaylists.map(playlist => ({
                        value: playlist.id,
                        label: (
                          <div className="option-playlist">
                            <img
                              className="option-playlist-img"
                              src={playlist.imageUrl}
                              alt="playlist"
                            />
                            <span className="option-playlist-name">{playlist.name}</span>
                          </div>
                        )
                      }))}
                    />
                  </Form.Group>
                </Col>
                <Col md="3">
                  <Form.Group className="mb-0">
                    <Select
                      value={cacheSizeOptions.find(option => option.value === create.cacheSize)}
                      onChange={this.selectCacheSize}
                      options={cacheSizeOptions}
                    />
                  </Form.Group>
                </Col>
                <Col md="auto">
                  <Button variant="primary" type="submit">
                    Add Playlist
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
        <Card className="my-4" style={{ zIndex: 0 }}>
          <Card.Header>Playlists</Card.Header>
          <ListGroup variant="flush">{this.renderPlaylists()}</ListGroup>
        </Card>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>update Playlist</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.updatePlaylist}>
            <Modal.Body>
              <Form.Group>
                <h6>{update.title}</h6>
              </Form.Group>
              <Form.Group className="mb-0">
                <Select
                  value={cacheSizeOptions.find(option => option.value === update.cacheSize)}
                  onChange={this.updateCacheSize}
                  options={cacheSizeOptions}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    );
  }
}

Playlists.propTypes = {
  auth: PropTypes.oneOfType([() => null, PropTypes.shape({ spotifyId: PropTypes.string })]),
  fetchPlaylists: PropTypes.func.isRequired,
  fetchSpotifyPlaylists: PropTypes.func.isRequired,
  createPlaylist: PropTypes.func.isRequired,
  updatePlaylist: PropTypes.func.isRequired,
  removePlaylist: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      spotifyId: PropTypes.string.isRequired,
      playlistId: PropTypes.string.isRequired,
      cacheSize: PropTypes.number.isRequired
    })
  ),
  spotifyPlaylists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      tracks: PropTypes.number.isRequired
    })
  ),
  cacheSizeOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired
    })
  )
};

Playlists.defaultProps = {
  auth: null,
  playlists: [],
  spotifyPlaylists: [],
  cacheSizeOptions: [
    { value: 10, label: '10 Tracks' },
    { value: 25, label: '25 Tracks' },
    { value: 50, label: '50 Tracks' },
    { value: 100, label: '100 Tracks' }
  ]
};

function mapStateToProps(state) {
  const playlists = _.intersectionWith(state.spotify, state.playlists, (a, b) => {
    return a.id === b.playlistId && _.assign(a, b);
  });

  const spotifyPlaylists = _.differenceWith(state.spotify, state.playlists, (a, b) => {
    return a.id === b.playlistId && a;
  });

  return {
    auth: state.auth,
    playlists: _.sortBy(playlists, ['name']),
    spotifyPlaylists: _.sortBy(spotifyPlaylists, ['name'])
  };
}

export default connect(
  mapStateToProps,
  actions
)(Playlists);
