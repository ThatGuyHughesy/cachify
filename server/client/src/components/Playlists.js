import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import * as actions from '../actions';

import Header from './Header';
import Playlist from './Playlist';

class Playlists extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);
    this.submitPlaylist = this.submitPlaylist.bind(this);
    this.removePlaylist = this.removePlaylist.bind(this);
    this.showPlaylistModal = this.showPlaylistModal.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      createPlaylistId: null,
      createCacheSize: 10,
      updateTitle: null,
      updatePlaylistId: null,
      updateCacheSize: 10
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

  handleChange(event) {
    const {
      target: { name, value, type }
    } = event;

    this.setState({ [name]: type === 'number' ? parseInt(value || 0) : value });
  }

  handleSelect(event, actionMeta) {
    const { name } = actionMeta;
    const { value, type } = event;

    this.setState({ [name]: type === 'number' ? parseInt(value) : value });
  }

  showPlaylistModal(updateTitle, updatePlaylistId, updateCacheSize) {
    this.setState({ updateTitle, updatePlaylistId, updateCacheSize });
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
    const { updatePlaylistId, updateCacheSize } = this.state;

    if (updatePlaylistId && updateCacheSize) {
      updatePlaylist({
        playlistId: updatePlaylistId,
        cacheSize: updateCacheSize
      }).then(() => {
        this.setState({ updatePlaylistId: null, updateCacheSize: 10 });
        this.handleClose();
      });
    }
  }

  submitPlaylist(event) {
    event.preventDefault();

    const { createPlaylist, fetchPlaylists, fetchSpotifyPlaylists } = this.props;
    const { createPlaylistId, createCacheSize } = this.state;

    if (createPlaylistId && createCacheSize) {
      createPlaylist({
        playlistId: createPlaylistId,
        cacheSize: createCacheSize
      }).then(() => {
        this.setState({ createPlaylistId: null, createCacheSize: 10 });
        fetchPlaylists();
        fetchSpotifyPlaylists();
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
    const { auth, spotifyPlaylists } = this.props;
    const { show, createPlaylistId, createCacheSize, updateTitle, updateCacheSize } = this.state;

    if (auth === false) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    return (
      <Container>
        <Header auth={auth} route="/playlists" light={false} />
        <Card>
          <Card.Body>
            <Card.Title>Add Playlist</Card.Title>
            <Form onSubmit={this.submitPlaylist}>
              <Form.Row>
                <Col>
                  <Form.Group className="mb-sm-3 mb-md-0">
                    <Select
                      name="createPlaylistId"
                      value={
                        createPlaylistId === null
                          ? null
                          : spotifyPlaylists.find(option => option.value === createPlaylistId)
                      }
                      onChange={this.handleSelect}
                      options={spotifyPlaylists.map(playlist => ({
                        value: playlist.id,
                        label: (
                          <div className="option-playlist">
                            <img
                              className="option-playlist-img mr-2"
                              src={playlist.imageUrl}
                              alt="playlist"
                            />
                            <span className="option-playlist-name">{playlist.name}</span>
                          </div>
                        )
                      }))}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="3">
                  <Form.Group className="mb-sm-3 mb-md-0">
                    <InputGroup>
                      <FormControl
                        aria-label="Max number of tracks"
                        type="number"
                        min="1"
                        max="500"
                        name="createCacheSize"
                        value={createCacheSize}
                        onChange={this.handleChange}
                        required
                      />
                      <InputGroup.Append>
                        <InputGroup.Text>Max Tracks</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
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
          <Card.Body className="p-0">
            <ListGroup className="playlists" variant="flush">
              {this.renderPlaylists()}
            </ListGroup>
          </Card.Body>
        </Card>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Playlist</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.updatePlaylist}>
            <Modal.Body>
              <Form.Group>
                <h5>{updateTitle}</h5>
              </Form.Group>
              <Form.Group className="mb-0">
                <InputGroup>
                  <FormControl
                    aria-label="Max number of tracks"
                    type="number"
                    min="1"
                    max="500"
                    name="updateCacheSize"
                    value={updateCacheSize}
                    onChange={this.handleChange}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>Max Tracks</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
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
  )
};

Playlists.defaultProps = {
  auth: null,
  playlists: [],
  spotifyPlaylists: []
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
