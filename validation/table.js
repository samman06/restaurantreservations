const isEmpty = require('./is-empty');

module.exports = validateTableInput = ({tableNumber, numberOfPerson}) => {
    let errors = {};
    if (numberOfPerson.match(/^[0-9]+$/g) === null)
        errors.numberOfPerson = "number of person should be number";
    if (Number(numberOfPerson) < 2 || Number(numberOfPerson) > 10)
        errors.numberOfPerson = "number of person should be 2 at least and 10 for max";

    if (tableNumber.match(/^[0-9]+$/) === null)
        errors.tableNumber = "the number of table should be number";
    if (Number(tableNumber) < 1)
        errors.tableNumber = "the number of table should be more than 0";

    return {
        errors,
        isValid: isEmpty(errors),
    }
};
