const router = require('express').Router();
const playlistController = require('../controllers/playlistController');
const requireLogin = require('../middlewares/requireLogin');

router
  .route('/')
  .get(requireLogin, playlistController.findAll)
  .post(requireLogin, playlistController.create);

router
  .route('/:id')
  .get(requireLogin, playlistController.findById)
  .put(requireLogin, playlistController.update)
  .delete(requireLogin, playlistController.remove);

module.exports = router;
