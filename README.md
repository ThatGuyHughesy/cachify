# Cachify

Turn your Spotify playlist into a cache.

[![Build Status](https://travis-ci.org/ThatGuyHughesy/cachify.svg?branch=master)](https://travis-ci.org/ThatGuyHughesy/cachify)

### Who is this for?

For people, who like me, have playlists with 100s of tracks in them (and growing!) but only listen to a small percentage of them.

Instead of your playlists growing out of control you can now set the max number of tracks in a playlist so as you add new tracks, older tracks will be removed.

### Plans

Currently the only cache implemented is FIFO (First In First Out).

The hope is Spotify will eventually add a play count or last played to tracks in a playlist so a LRU (Least Recently Used) or LFU (Least Frequently Used) cache can be implemented.

## Installation

Requires NodeJS & NPM.

Once installed, clone the repository and install its dependencies running.

Server:

    $ cd server
    $ npm install

Client:

    $ cd client
    $ npm install

## Development

Go to [My Applications on Spotify Developer](https://developer.spotify.com/my-applications) and create your application. Register this Redirect URI:

- http://localhost:5000/auth/spotify/callback

Once you have your your application credentials, create `.env` with the following:

```bash
SPOTIFY_CLIENT_ID=<SPOTIFY_CLIENT_ID_GOES_HERE>
SPOTIFY_CLIENT_SECRET=<SPOTIFY_CLIENT_SECRET_GOES_HERE>
SPOTIFY_REDIRECT_URI=<SPOTIFY_REDIRECT_URI_GOES_HERE>
MONGO_URI=<MONGO_URI_GOES_HERE>
COOKIE_KEY=<COOKIE_KEY_GOES_HERE>
```

Then run:

    $ npm run dev

## Testing

For ESLint run:

    $ npm run lint

For Mocha tests run:

    $ npm run test

## Build

To build the client:

    $ cd client
    $ npm run build

## Contributing

Want to become a Cachify [contributor](https://github.com/ThatGuyHughesy/cachify/blob/master/CONTRIBUTORS.md)?
Then checkout our [code of conduct](https://github.com/ThatGuyHughesy/cachify/blob/master/CODE_OF_CONDUCT.md) and [contributing guidelines](https://github.com/ThatGuyHughesy/cachify/blob/master/CONTRIBUTING.md).

## Copyright & License

Copyright (c) 2019 Conor Hughes - Released under the MIT license.
