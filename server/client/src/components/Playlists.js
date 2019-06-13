import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Playlist from './Playlist';
import './Playlists.css';

class Playlists extends Component {
  componentDidMount() {
    const { fetchPlaylists } = this.props;
    fetchPlaylists();
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
            tracks={playlist.tracks}
            image={playlist.imageUrl}
          />
        );
      });
    }
    return <div>No playlists found!</div>;
  }

  render() {
    return (
      <div>
        <header className="site-header site-header-bg">
          <div className="container">
            <div className="site-header-inner">
              <div className="brand header-brand">
                <strong>
                  <a href="/">cachify</a>
                </strong>
              </div>
              <div className="header-menu">
                <ul className="header-links">
                  <li>
                    <a href="/auth/logout" rel="noopener noreferrer">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="container">
            <div>
              <ul id="playlists" className="list-group">
                {this.renderPlaylists()}
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Playlists.propTypes = {
  fetchPlaylists: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      tracks: PropTypes.number.isRequired
    })
  )
};

Playlists.defaultProps = {
  playlists: []
};

function mapStateToProps({ auth, playlists }) {
  return { auth, playlists };
}

export default connect(
  mapStateToProps,
  actions
)(Playlists);
