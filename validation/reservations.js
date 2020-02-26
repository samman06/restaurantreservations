const isEmpty = require('./is-empty');

module.exports = validateReservationInput = ({reserveDate, from, to, tableId}) => {
    let errors = {};
    const hourTimePattern = /^([1-9]|10|1[1-9]|2[0-4])$/;
    const datePattern = /^((20[2-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;

    if (tableId === "")
        errors.table = "You Should Select Table ";
    if (reserveDate.match(datePattern) === null)
        errors.reserveDate = "date should be in yyyy-mm-dd format and not less than 2020 or bigger than 2099";

    if (from.match(hourTimePattern) === null)
        errors.from = "time should be between 1 and 24";

    if (to.match(hourTimePattern) === null) {
        errors.to = "time should be between 1 and 24";
    } else {
        if (Number(from) >= Number(to))
            errors.to = "the end of your reserve should be after the start";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
};
