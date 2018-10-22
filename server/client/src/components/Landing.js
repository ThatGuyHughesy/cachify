import React, { Component } from "react";
import Track from "./Track";
import "./Landing.css";

const allTracks = [
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    image: "https://i.scdn.co/image/72f9e56dae8188fc62fcdc9b081a9c11ad2d00ef"
  },
  {
    title: "God's Plan",
    artist: "Drake",
    image: "https://i.scdn.co/image/20a42bcb7da46adb3f62cb2ff9df347cb4c3249f"
  },
  {
    title: "We Found Love",
    artist: "Rihanna",
    image: "https://i.scdn.co/image/925158e8534d4e76e787b4cea8114c8a0ff78891"
  },
  {
    title: "Happy",
    artist: "Pharrell Williams",
    image: "https://i.scdn.co/image/9e194b2cf18bc27fe678e84bc8232da62357979f"
  },
  {
    title: "Hello",
    artist: "Adele",
    image: "https://i.scdn.co/image/e2227261266297e6532ededd25fee51a14f1b24a"
  },
  {
    title: "One Dance",
    artist: "Drake",
    image: "https://i.scdn.co/image/3cc13a8c1fc2fb71a178d2ad7e6e812b27ac913f"
  },
  {
    title: "Despacito",
    artist: "Luis Fonsi and Daddy Yankee",
    image: "https://i.scdn.co/image/692aa79e2c4ceaf067f8ee072b9beebce28bd920"
  },
  {
    title: "Uptown Funk",
    artist: "Mark Ronson",
    image: "https://i.scdn.co/image/96865e85577ae3b82523b0e8caa3fcd158e5ffaa"
  },
  {
    title: "Blurred Lines",
    artist: "Robin Thicke",
    image: "https://i.scdn.co/image/211f63744aa2bf30a231d46dc1d1d0e8f0ded284"
  },
  {
    title: "See You Again",
    artist: "Wiz Khalifa",
    image: "https://i.scdn.co/image/43209904884ed685f8c01a553c9a0faa85ea0b8e"
  },
  {
    title: "Closer",
    artist: "The Chainsmokers",
    image: "https://i.scdn.co/image/57ba46d39d710e99ae524b279cae3a3981ace43f"
  }
];

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTracks: allTracks.slice(0, 5),
      nextNum: 5
    };
  }

  newTrack() {
    let { nextNum, showTracks } = this.state;

    showTracks.unshift(allTracks[nextNum]);

    setTimeout(() => showTracks.pop(), 1000);

    nextNum += 1;

    if (nextNum === 11) {
      nextNum = 0;
    }

    this.setState({ nextNum, showTracks });
  }

  componentDidMount() {
    this.newTrack();
    this.interval = setInterval(() => this.newTrack(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="landing">
        <div className="heading">
          <div className="container">
            <div>
              <h1>Cachify</h1>
              <h2>Turn Your Spotify Playlist Into A Cache</h2>
              <div className="login">
                <a href="/auth/spotify" rel="noopener noreferrer">
                  Sign Into Spotify
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="tracks">
          <div className="container">
            <div>
              <h3>
                Stop hoarding tracks and letting your playlists grow out of
                control!
              </h3>
              <h4>
                No more skipping tracks... It is time to do some spring
                cleaning!
              </h4>
              <ul id="tracks" className="list-group">
                {this.state.showTracks.map(function(track, index) {
                  return (
                    <Track
                      key={track.title}
                      title={track.title}
                      artist={track.artist}
                      image={track.image}
                      added={index}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
