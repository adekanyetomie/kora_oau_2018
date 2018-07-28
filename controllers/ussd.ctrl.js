const Ussd = require('../models/Ussd');
const {proceedInteraction, endInteraction} = require('./base.ctrl');
const ResponseMessages = require('../constants/responseMessages');

const requestHandler = (req, res) => {
    let response;
    let {sessionId, serviceCode, phoneNumber, text} = req.body;
    text = text.toString();
    // const validatePhone = Ussd.validatePhone(phoneNumber);
    // if (!validatePhone.status) {
    //     response = `${validatePhone.message}`;
    //     return endInteraction(res, response);
    // }
    // const userData = validatePhone.data && validatePhone.data.length > 0 ? validatePhone.data : null;

    if (text = '') {
        response = `Welcome to Tranzact.
        1. Check wallet balance
        2. Transfer to other custimer
        3. Transfer to bank
        4. Buy airtime
        5. Pay GOTV/DSTV subscription`;

        proceedInteraction(res, response);
    }
    else if (text === '1') {
        //Confirm getting the wallet from Belle
        response = `Your Tranzact wallet balance is ${userData.wallet[0].standard}`;
        endInteraction(res, response);
    }
    else if (text[0] === '2') {
        //Transfer to other customer
        transferToOtherCustomer(res, text, phoneNumber)
    }
    else if (text[0] === '3') {
        //Transfer to bank
        transferToBank(res, text);
    }
    else if (text[0] === '4') {
        //Buy airtime
        return endInteraction(`Under construction`);
    }
    else if (text[0] === '5') {
        //Pay DSTV/GOTV
        return endInteraction(`Under Construction`);
    }
    else {
        response = ResponseMessages.INVALID_ENTRY;
        endInteraction(res, response)
    }
};

module.exports = requestHandler;

let forTransfer = [];


const transferToOtherCustomer = (res, text, phone) => {
    let response, recipientPhone, amount, pin;
    if (text === '2') {
        response = `Kindly enter user's phone number:`;
        return proceedInteraction(res, response);
    }
    else if (text.length === 13) {
        recipientPhone = text.slice(3);
        forTransfer.push(recipientPhone);
        response = `Kindly enter amount. Maximum of #100,000:`;
        return proceedInteraction(res, response)
    }
    else if (text.length > 14 && text.length <= 20 && text.slice(14).indexOf('*') === -1) {
        amount = text.slice(14);
        forTransfer.push(amount);
        response = `Kindly enter your pin:`;
        return proceedInteraction(res, response);
    }
    else if (text.slice(-5)[0] === '*') {
        pin = text.slice(-4);
        const isPinValid = Ussd.validatePin(pin).status;
        if (!isPinValid) {
            response = ResponseMessages.INVALID_PIN;
            return endInteraction(res, response);
        }
        const sender_id = Ussd.validatePhone(phone).data._id;
        const transfer = Ussd.transferToOtherCustomer(sender_id, phone, forTransfer[0], forTransfer[1], pin);
        const isTransferSuccessful = transfer.status;
        if (!isTransferSuccessful) {
            response = transfer.message;
            return endInteraction(res, response);
        }
        else {
            response = `Your transfer to ${transfer.data.receiver_phone} was successful`;
            endInteraction(res, response);
            forTransfer = [];
            return;
        }
    }
    else {
        return endInteraction(res, ResponseMessages.INVALID_ENTRY);
    }
};

const transferToBank = (res, text) => {
    let response;

    if (text === '3') {
        response = `Transfer to:
        1. My bank
        2. Other bank`;
        proceedInteraction(res, response);
    }
    if (text === '3*1') {
        transferToMyBank();
    }
    else if (text === '3*2') {
        return endInteraction('Under construction')
    }
    else {
        return endInteraction(res, ResponseMessages.INVALID_ENTRY);
    }
};

const transferToMyBank = (res, text) => {
    let response, amount, pin;

    if (text === '3*1') {
        response = `Enter amount (Maximum of #100,000)`;
        return proceedInteraction(res, response);
    }
    if (text.length > 4) {
        amount = text.slice(4);
        forTransfer.push(amount);
        response = `Enter pin:`;
        return proceedInteraction(res, response);
    }
    if (text.slice(-5)[0] === '*' && text.length >= 7) {
        pin = text.slice(-4);

        const isPinValid = Ussd.validatePin(pin).status;
        if (!isPinValid) {
            response = ResponseMessages.INVALID_PIN;
            return endInteraction(res, response);
        }

        const sender_id = Ussd.validatePhone(phone).data._id;
        const payout = Ussd.transferToMyBank(sender_id, pin);
        const payoutStatus = payout.status;

        if (!payoutStatus) {
            response = payout.message;
            return endInteraction(res, response);
        }
        else {
            response = `Transfer successful`;
            return endInteraction(res, response);
        }
    }
};