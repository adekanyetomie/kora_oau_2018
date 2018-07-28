const axios = require('axios');
const {REGISTER_USER, LOGIN, LOGOUT} = require('../constants/ext_endpoints');
const get = axios.get;
const post = axios.post;

/**
 * Register user
 * @param userObject
 * @returns {Promise.<TResult>}
 */
const registerUser = (userObject) => {
    return post(REGISTER_USER, userObject)
        .then((response) => response)
        .catch((err) => JSON.stringify(err));
};

/**
 * Login user
 * @param loginParams
 * @returns {Promise.<TResult>}
 */
const loginUser = (loginParams) => {
    return post(LOGIN, loginParams)
        .then((response) => response)
        .catch((err) => JSON.stringify(err));
};

/**
 * Log user out
 * @returns {Promise.<TResult>}
 */
const logout = () => {
    return get(LOGOUT)
        .then((response) => response)
        .catch((err) => JSON.stringify(err));
};


module.exports = {
    registerUser,
    loginUser,
    logout
};