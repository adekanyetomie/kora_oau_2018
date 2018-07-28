const axios = require('axios');
const {VALIDATE_PHONE, VALIDATE_PIN, TRANSFER_TO_OTHER_CUSTOMER} = require('../constants/ext_endpoints');
const GET = axios.get;
const POST = axios.post;

const validatePhone = (phone) => {
    POST(VALIDATE_PHONE, phone)
        .then((response) => response)
        .catch((err) => JSON.stringify(err));
};

const validatePin = (phone, pin) => {
    POST(VALIDATE_PIN, {phone, pin})
        .then((response) => response)
        .catch((err) => JSON.stringify(err));
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