const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const playlistController = require('../controllers/playlistController');
const requireLogin = require('../middlewares/requireLogin');

router
  .route('/')
  .get(requireLogin, playlistController.findAll)
  .post(
    requireLogin,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        playlistId: Joi.string().required(),
        cacheSize: Joi.number()
          .integer()
          .required()
      })
    }),
    playlistController.create
  );

router
  .route('/:id')
  .get(requireLogin, playlistController.findById)
  .put(
    requireLogin,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        playlistId: Joi.string().required(),
        cacheSize: Joi.number()
          .integer()
          .required()
      })
    }),
    playlistController.update
  )
  .delete(requireLogin, playlistController.remove);

module.exports = router;
