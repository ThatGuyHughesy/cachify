const router = require('express').Router();

const authController = require('../controllers/authController');

router.route('/spotify').get(authController.signup);

router.route('/spotify/callback').get(authController.login);

router.route('/user').get(authController.user);

router.route('/logout').get(authController.logout);

module.exports = router;
