const axios = require('axios');
const {VALIDATE_PHONE, VALIDATE_PIN, TRANSFER_TO_OTHER_CUSTOMER} = require('../constants/ext_endpoints');
const POST = axios.post;

const validatePhone = (phone) => {
    return POST(VALIDATE_PHONE, phone)
        .then((response) => {
            let resp = response == undefined ? {
                status: false,
                message: 'Looks like you do not have an account with us. Kindly register online.'
            } : response;

            return resp;
        })
        .catch((err) => console.log('1', err));
};

const validatePin = (phone, pin) => {
    return POST(VALIDATE_PIN, {phone, pin})
        .then((response) => {
            let resp = response == undefined ? {
                status: false,
                message: 'Looks like you do not have an account with us. Kindly register online.'
            } : response;

            return resp;
        })
        .catch((err) => console.log('2', err));
};

const transferToOtherCustomer = (sender_id, sender, recipient, amount, pin) => {
    if (!validatePin(pin).status) {
        return {status: false, message: 'Incorrect pin'}
    }

    if (validatePhone(recipient).status === true) {
        POST(TRANSFER_TO_OTHER_CUSTOMER, {
            sender_id,
            amount,
            receiver_phone: recipient,
            sender_phone: sender
        })
    }
    else {
        return {status: false, message: 'The owner of this phone number is not a customer'};
    }
};

const transferToMyBank = (sender_id, pin) => {
    if (!validatePin(pin).status) {
        return {status: false, message: 'Incorrect pin'}
    }
    // Fetch transaction

};


module.exports = {
    validatePhone,
    validatePin,
    transferToOtherCustomer,
    transferToMyBank
};