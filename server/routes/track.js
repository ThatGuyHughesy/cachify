const router = require('express').Router();
const trackController = require('../controllers/trackController');

router.route('/').get(trackController.findAll);

module.exports = router;
