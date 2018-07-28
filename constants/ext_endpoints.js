const BASE_URL = require('../constants/constants').BASE_URL;

module.exports = {
    //Index
    REGISTER_USER: `${BASE_URL}/register`,
    LOGIN: `${BASE_URL}/login`,
    LOGOUT: `${BASE_URL}/logout`,

    //ussd
    VALIDATE_PHONE: `${BASE_URL}/ussd/validate_phone`,
    VALIDATE_PIN: `${BASE_URL}/ussd/validate_pin`,
    GET_ACCOUNT: `${BASE_URL}/ussd/get_account`,

    //Transfer
    TRANSFER_TO_OTHER_CUSTOMER: `${BASE_URL}/transfer/`

};