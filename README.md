# Cachify

Turn your Spotify playlist into a cache.

### Who is this for?

For people, who like me, have playlists with 100s of tracks that they don't even listen to anymore but are too lazy to remove them.

### Why?

Simply put, pruning. Instead of a playlist growing exponentially you can now set a max playlist size and as you add new tracks, older tracks will be removed.

### Plans

Currently the only cache implemented is FIFO (First In First Out).

The hope is Spotify will eventually add a play count or last played to tracks in a playlist so a LRU (Least Recently Used) or LFU (Least Frequently Used) cache can be implemented.

## Installation

Requires NodeJS & NPM.

Once installed, clone the repository and install its dependencies running:

    $ npm install

## Run

Go to [My Applications on Spotify Developer](https://developer.spotify.com/my-applications) and create your application. For local development, register this Redirect URI:

- http://localhost:3000/auth/spotify/callback

Once you have your your application credentials, create `server/config/keys.js` with the following:

```javascript
module.exports = {
  spotifyClientID: "<CLIENT_ID_GOES_HERE>",
  spotifyClientSecret: "<CLIENT_SECRET_GOES_HERE>"
};
```

Then run:

    $ npm start

Then, open `http://localhost:3000` in a browser.

## How It Works

Simply pick a playlist and set a max size.
That's it! Let Cachify handle the rest!

## Contributing

Want to become a Cachify [contributor](https://github.com/ThatGuyHughesy/cachify/blob/master/CONTRIBUTORS.md)?
Then checkout our [code of conduct](https://github.com/ThatGuyHughesy/cachify/blob/master/CODE_OF_CONDUCT.md) and [contributing guidelines](https://github.com/ThatGuyHughesy/cachify/blob/master/CONTRIBUTING.md).

## Copyright & License

Copyright (c) 2018 Conor Hughes - Released under the MIT license.
