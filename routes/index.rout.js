const router = require('express').Router();
const {registerHandler, loginHandler, logoutHandler} = require('../controllers/index.ctrl');

// Route to landing page
router.get('/', res.send('Up'));

// Register user
router.post('/register', registerHandler);

// Login user
router.post('/login', loginHandler);

// Logout user
router.get('/logout', logoutHandler);


module.exports = router;