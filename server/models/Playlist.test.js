const { describe, it } = require('mocha');
const { expect } = require('chai');

const Playlist = require('./Playlist');

describe('Playlist', () => {
  it('should be invalid as required fields are empty', done => {
    const playlist = new Playlist();

    playlist.validate(err => {
      expect(err.errors.spotifyId).to.exist;
      expect(err.errors.playlistId).to.exist;
      expect(err.errors.imageUrl).to.exist;
      expect(err.errors.cacheSize).to.exist;
      done();
    });
  });

  it('should be valid as required fields exist', done => {
    const playlist = new Playlist();

    playlist.spotifyId = 'thatguyhughesy';
    playlist.playlistId = '73ShhRy2x6AQZYaT8eNqHq';
    playlist.imageUrl = 'https://mosaic.scdn.co/640/fe6d0393d8f8e6551edbfcdea1a4af3';
    playlist.cacheSize = 100;

    playlist.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
