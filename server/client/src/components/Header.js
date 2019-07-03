import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const renderNav = (auth, route) => {
  if (!auth) {
    return (
      <Nav>
        <Nav.Link href="/auth/spotify" rel="noopener noreferrer" className="pr-0">
          Sign Into Spotify
        </Nav.Link>
      </Nav>
    );
  }

  return (
    <Nav>
      <Navbar.Text>
        Signed in as: <strong>{auth.spotifyId}</strong>
      </Navbar.Text>
      {route === '/' && (
        <Nav.Link href="/playlists" rel="noopener noreferrer" className="ml-2">
          Go To Dashboard
        </Nav.Link>
      )}
      <Nav.Link href="/auth/logout" rel="noopener noreferrer" className="ml-2 pr-0">
        Logout
      </Nav.Link>
    </Nav>
  );
};

export default function Header({ auth, route }) {
  return (
    <Navbar className="px-0 py-4" expand="md">
      <Navbar.Brand href="/">cachify</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto" />
        {renderNav(auth, route)}
      </Navbar.Collapse>
    </Navbar>
  );
}

Header.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({ spotifyId: PropTypes.string })]),
  route: PropTypes.string.isRequired
};

Header.defaultProps = {
  auth: null
};
