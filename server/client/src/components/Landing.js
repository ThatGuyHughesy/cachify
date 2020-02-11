import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import * as actions from '../actions';

import AlertDismissible from './AlertDismissible';
import Header from './Header';
import Track from './Track';

class Landing extends Component {
  tracksInterval = 0;
  tracksTimeout = 0;

  constructor(props) {
    super(props);

    this.state = {
      showTracks: [],
      nextTrack: 3
    };
  }

  componentDidMount() {
    const { fetchTracks } = this.props;
    fetchTracks();
  }

  componentWillReceiveProps(newProps) {
    const { tracks } = newProps;

    if (tracks.error) {
      this.setState({ error: tracks.error });
    }

    if (Array.isArray(tracks) && tracks.length !== 0 && this.tracksInterval === 0) {
      this.setState(
        {
          showTracks: tracks.slice(0, 3)
        },
        () => {
          this.newTrack();
          this.tracksInterval = setInterval(() => this.newTrack(), 3000);
        }
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.tracksInterval);
    clearTimeout(this.tracksTimeout);
  }

  newTrack() {
    let { nextTrack } = this.state;
    const { showTracks } = this.state;
    const { tracks } = this.props;

    showTracks.push(tracks[nextTrack]);

    this.tracksTimeout = setTimeout(() => showTracks.shift(), 1000);

    nextTrack += 1;

    if (nextTrack === tracks.length) {
      nextTrack = 0;
    }

    this.setState({ nextTrack, showTracks });
  }

  renderTracks() {
    const { showTracks } = this.state;

    if (showTracks.length !== 0) {
      return (
        <ListGroup id="tracks" className="tracks">
          {showTracks.map((track, index) => {
            return (
              <Track
                key={track.title}
                title={track.title}
                artist={track.artist}
                image={track.image}
                added={3 - index}
              />
            );
          })}
        </ListGroup>
      );
    }
    return '';
  }

  renderError() {
    const { error } = this.props;

    if (error) {
      return (
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            right: '1rem',
            minWidth: '300px'
          }}
        >
          <AlertDismissible
            variant="danger"
            title={error}
            message="Please refresh the page or try again later!"
          />
        </div>
      );
    }
  }

  render() {
    const { auth } = this.props;

    return (
      <Container className="text-center">
        <Header auth={auth} route="/" />
        <Col className="mt-5">
          <h1 className="font-weight-bold">Stop your playlists from growing out of control!</h1>
          <h5 className="mt-3">
            Cachify ensures your playlists never fill up with old, stale tracks!
          </h5>
        </Col>
        <Col className="mt-4">
          <a className="btn btn-primary" href="/auth/spotify" rel="noopener noreferrer">
            Sign Into Spotify
          </a>
        </Col>
        <Col className="mt-5">{this.renderTracks()}</Col>
        {this.renderError()}
      </Container>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.oneOfType([() => null, PropTypes.shape({ spotifyId: PropTypes.string })]),
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ),
  fetchTracks: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([() => null, PropTypes.string.isRequired])
};

Landing.defaultProps = {
  auth: null,
  error: null,
  tracks: []
};

function mapStateToProps({ auth, tracks: { tracks, error } }) {
  return { auth, tracks, error };
}

export default connect(
  mapStateToProps,
  actions
)(Landing);
