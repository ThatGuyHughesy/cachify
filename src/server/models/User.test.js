const { describe, it } = require('mocha');
const { expect } = require('chai');

const User = require('./User');

describe('User', () => {
  it('should be invalid if required fields are empty', done => {
    const user = new User();

    user.validate(err => {
      expect(err.errors.spotifyId).to.exist;
      done();
    });
  });

  it('should be valid as required fields exist', done => {
    const user = new User();

    user.spotifyId = 'thatguyhughesy';

    user.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
