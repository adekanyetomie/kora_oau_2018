const proceedInteraction = (res, response) => {
    res.send('CON ' + response);
};

const endInteraction = (res, response) => {
    res.send('END ' + response);
};

module.exports = {
    proceedInteraction,
    endInteraction
};