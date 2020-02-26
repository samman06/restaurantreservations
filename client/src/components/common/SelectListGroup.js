import React from 'react';
import classnames from "classnames";

const SelectListGroup = ({name, value, error, onChange, options}) => {
    const selectOption = options.map(hour => (
        <option key={hour} value={hour}>
            {hour}
        </option>
    ));
    return (
        <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">{name}</label>
            <select
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                name={name}
                value={value}
                onChange={onChange}>
                {selectOption}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};


export default SelectListGroup
