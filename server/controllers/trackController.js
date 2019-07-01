const Track = require('../models/Track');

const includeFields = { _id: 0, title: 1, artist: 1, image: 1 };

module.exports = {
  findAll: (req, res) => {
    Track.find({})
      .select(includeFields)
      .then(tracks => res.json(tracks))
      .catch(err => res.status(422).json(err));
  }
};
