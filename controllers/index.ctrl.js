const validator = require('validator');
const Constants = require('../constants/constants');
const ResponseMessages = require('../constants/responseMessages');
const User = require('../models/User');

/**
 * Handle user registration
 * @param req
 * @param res
 * @returns {*}
 */
const registerHandler = (req, res) => {
    const firstName = req.body.first_name,
        lastName = req.body.last_name,
        phone = req.body.phone,
        email = req.body.email,
        pin = req.body.pin,
        pin2 = req.body.pin_2;

    if (!(firstName || lastName || phone || email || pin))
        return res.render('index', {error_message: req.flash('error', ResponseMessages.ALL_FIELDS_REQUIRED)});

    if (!(validator.isAlpha(firstName || lastName)))
        return res.render('index', {error_message: req.flash('error', ResponseMessages.INVALID_NAME_CHARACTER)});

    if (!validator.isEmail(email))
        return res.render('index', {error_message: req.flash('error', ResponseMessages.INVALID_EMAIL)});

    if (pin !== pin2)
        return res.render('index', {error_message: req.flash('error', ResponseMessages.PINS_DONT_MATCH)});

    if (pin < Constants.PIN_LENGTH)
        return res.render('index', {error_message: req.flash('error', ResponseMessages.PIN_LENGTH)});

    if (!validator.isNumeric(pin))
        return res.render('index', {error_message: req.flash('error', ResponseMessages.INVALID_PHONE)});

    if (phone.length !== 11)
        return res.render('index', {error_message: req.flash('error', ResponseMessages.INVALID_PHONE)});

    const params = {
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        pin
    };

    const userObj = User.registerUser(params);

    if (userObj.status !== Constants.TRUE)
        return res.render('index', {error_message: req.flash('error', ResponseMessages.ERROR_OCCURRED)});


    //Render template
    req.session.userId = userObj.data._id;
    return res.render('dashboard', userObj.data);
};

/**
 * Handle user login
 * @param req
 * @param res
 */
const loginHandler = (req, res) => {
    const phone = req.body.phone,
        pin = req.body.pin;

    const userObj = User.loginUser({phone, pin});

    if (userObj.status !== Constants.TRUE)
        return res.render('index', {error_message: req.flash('error', ResponseMessages.ERROR_OCCURRED)})

    req.session.userId = userObj.data._id;
    return res.render('dashboard', userObj.data);
};

/**
 * Handle logout
 * @param req
 * @param res
 */
const logoutHandler = (req, res) => {
    const logout = User.logout();
    if (logout.status === Constants.TRUE)
        res.render('index');
};

module.exports = {
    registerHandler,
    loginHandler,
    logoutHandler
};