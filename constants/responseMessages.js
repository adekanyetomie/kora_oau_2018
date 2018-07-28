const {PIN_LENGTH} = require('./constants');

module.exports = {
    ALL_FIELDS_REQUIRED: 'All fields are required. Kindly fill all',
    APP_NAME: 'Tranzact',

    ERROR_OCCURRED: 'We\'re sorry. An error occurred. Kindly try again.',

    INVALID_EMAIL: 'The email is invalid. Kindly enter a valid email',
    INVALID_PHONE: 'The phone number is invalid. Kindly enter a valid Nigerian phone number',
    INVALID_NAME_CHARACTER: 'Names can contain only letters. Not special characters e.g. @, #, *...',

    PIN_LENGTH: `Pin can not be less than ${PIN_LENGTH} characters`,
    PIN_SHOULD_CONTAIN: 'Pin can only contain numbers',
    PINS_DONT_MATCH: 'The two pins do not match. Kindly try again',
};