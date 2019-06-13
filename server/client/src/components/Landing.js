import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Landing extends Component {
  renderButtons() {
    const { auth } = this.props;

    if (auth && auth.spotifyId) {
      return (
        <ul className="header-links">
          <li>
            <a
              className="button button-primary button-block"
              href="/playlists"
              rel="noopener noreferrer"
            >
              Go To Dashboard
            </a>
          </li>
          <li>
            <a href="/auth/logout" rel="noopener noreferrer">
              Logout
            </a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="header-links">
        <li>
          <a
            className="button button-primary button-block"
            href="/auth/spotify"
            rel="noopener noreferrer"
          >
            Sign Into Spotify
          </a>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div>
        <div className="bg">
          <header className="site-header">
            <div className="container">
              <div className="site-header-inner">
                <div className="brand header-brand">
                  <strong>
                    <a href="/">cachify</a>
                  </strong>
                </div>
                <div className="header-menu">{this.renderButtons()}</div>
              </div>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.oneOfType([() => null, PropTypes.shape({ spotifyId: PropTypes.string })])
};

Landing.defaultProps = {
  auth: null
};

function mapStateToProps({ auth, tracks }) {
  return { auth, tracks };
}

export default connect(
  mapStateToProps,
  actions
)(Landing);
