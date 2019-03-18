const { describe, it } = require('mocha');
const { expect } = require('chai');

const Token = require('./Token');

describe('Token', () => {
  it('should be invalid as required fields are empty', done => {
    const token = new Token();

    token.validate(err => {
      expect(err.errors.spotifyId).to.exist;
      expect(err.errors.accessToken).to.exist;
      expect(err.errors.refreshToken).to.exist;
      expect(err.errors.expiresIn).to.exist;
      done();
    });
  });

  it('should be valid as required fields exist', done => {
    const token = new Token();

    token.spotifyId = 'thatguyhughesy';
    token.accessToken = '73ShhRy2x6Afe6d0393d8f8e655';
    token.refreshToken = 'edbfcdea1a4af3393d8f8e6551';
    token.expiresIn = 60000;

    token.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
