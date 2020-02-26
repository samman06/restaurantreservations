const isEmpty = require('./is-empty');

module.exports = validateGetReservationInput = reserveDate => {
    let errors = {};
    const datePattern = /^((20[2-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
    if (reserveDate.match(datePattern) === null)
        errors.reserveDate = "date should be in yyyy-mm-dd format and not less than 2020 or bigger than 2099";

    return {
        errors,
        isValid: isEmpty(errors),
    }
};
