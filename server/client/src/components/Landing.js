import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import * as actions from '../actions';

class Landing extends Component {
  renderNav() {
    const { auth } = this.props;

    if (auth && auth.spotifyId) {
      return (
        <Nav>
          <Nav.Link href="/playlists" rel="noopener noreferrer">
            Go To Dashboard
          </Nav.Link>
          <Nav.Link href="/auth/logout" rel="noopener noreferrer">
            Logout
          </Nav.Link>
        </Nav>
      );
    }

    return (
      <Nav>
        <Nav.Link href="/auth/spotify" rel="noopener noreferrer">
          Sign Into Spotify
        </Nav.Link>
      </Nav>
    );
  }

  render() {
    return (
      <Container>
        <Navbar bg="white" expand="lg" className="px-0">
          <Navbar.Brand href="/" className="font-weight-bold">
            Cachify
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto" />
            {this.renderNav()}
          </Navbar.Collapse>
        </Navbar>
      </Container>
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
