import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { connect } from "react-redux";
import Playlist from "./Playlist";
import "./Playlists.css";
import * as actions from "../actions";

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedPlaylist: {}
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlaylists();
  }

  renderUser() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <h1>You are logged out!</h1>;
      default:
        return <h1>Welcome, {this.props.auth.name}!</h1>;
    }
  }

  renderPlaylists() {
    return this.props.playlists.map(playlist => {
      return (
        <Playlist
          key={playlist.id}
          id={playlist.id}
          title={playlist.name}
          tracks={playlist.tracks.total}
          image={playlist.images[0].url}
          toggle={this.selectPlaylist}
        />
      );
    });
  }

  selectPlaylist = playlist => {
    this.setState({
      modal: true,
      selectedPlaylist: playlist,
      cacheSize: 10
    });
  };

  toggle(playlist) {
    this.setState({
      modal: !this.state.modal
    });
  }

  updateCacheSize = event => {
    this.setState({ cacheSize: event.target.value });
  };

  render() {
    return (
      <div className="playlists">
        <div className="container">
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>
              {this.state.selectedPlaylist.title}
            </ModalHeader>
            <Form>
              <ModalBody>
                <FormGroup>
                  <Label for="playlistId">Playlist ID</Label>
                  <Input
                    type="text"
                    name="playlistId"
                    id="playlistId"
                    value={this.state.selectedPlaylist.id}
                    readOnly={true}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="cacheSize">Max Playlist Size</Label>
                  <Input
                    type="select"
                    name="cacheSize"
                    id="cacheSize"
                    value={this.state.cacheSize}
                    onChange={this.updateCacheSize}
                  >
                    <option>10</option>
                    <option>50</option>
                    <option>100</option>
                    <option>200</option>
                  </Input>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() =>
                    this.props.submitPlaylist({
                      playlistId: this.state.selectedPlaylist.id,
                      cacheSize: this.state.cacheSize
                    })
                  }
                >
                  Submit
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
          <div>
            {this.renderUser()}
            <ul id="playlists" className="list-group">
              {this.renderPlaylists()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, playlists }) {
  return { auth, playlists };
}

export default connect(
  mapStateToProps,
  actions
)(Playlists);
