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
    this.selectcacheSize = this.selectcacheSize.bind(this);
    this.submitPlaylist = this.submitPlaylist.bind(this);
    this.submitPlaylist = this.submitPlaylist.bind(this);

    this.state = {
      selectedPlaylist: null,
      cacheSize: { value: 10, label: '10 Tracks' }
    };
  }

  componentDidMount() {
    const { fetchPlaylists, fetchSpotifyPlaylists } = this.props;

    fetchPlaylists();
    fetchSpotifyPlaylists();
  }

  selectPlaylist(event) {
    this.setState({ selectedPlaylist: event });
  }

  selectcacheSize(event) {
    this.setState({ cacheSize: event });
  }

  submitPlaylist(event) {
    event.preventDefault();

    const { submitPlaylist } = this.props;
    const { selectedPlaylist, cacheSize } = this.state;

    if (selectedPlaylist && cacheSize) {
      submitPlaylist({
        playlistId: selectedPlaylist.value,
        cacheSize: cacheSize.value
      }).then(() => {
        this.setState({ selectedPlaylist: null });
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
            tracks={playlist.cacheSize}
            image={playlist.imageUrl}
          />
        );
      });
    }
    return <div>No playlists found!</div>;
  }

  render() {
    const { auth, spotifyPlaylists } = this.props;
    const { selectedPlaylist, cacheSize } = this.state;

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
                      value={selectedPlaylist}
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
                      value={cacheSize}
                      onChange={this.selectcacheSize}
                      options={[
                        { value: 10, label: '10 Tracks' },
                        { value: 25, label: '25 Tracks' },
                        { value: 50, label: '50 Tracks' },
                        { value: 100, label: '100 Tracks' }
                      ]}
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
        <Card className="my-4">
          <Card.Header>Playlists</Card.Header>
          <ListGroup variant="flush">{this.renderPlaylists()}</ListGroup>
        </Card>
      </Container>
    );
  }
}

Playlists.propTypes = {
  auth: PropTypes.oneOfType([() => null, PropTypes.shape({ spotifyId: PropTypes.string })]),
  fetchPlaylists: PropTypes.func.isRequired,
  fetchSpotifyPlaylists: PropTypes.func.isRequired,
  submitPlaylist: PropTypes.func.isRequired,
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
