const router = require('express').Router();
const requestHandler = require('../controllers/ussd.ctrl');

router.post('/*', requestHandler);

module.exports = router;