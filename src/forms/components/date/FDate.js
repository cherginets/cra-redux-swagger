import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import {withFormsy} from "formsy-react";
import FBase from "src/forms/components/FBase";

import "react-datepicker/dist/react-datepicker.css";
import "./FDate.scss";

class FDate extends FBase {
    getValue() {
        const value = this.props.getValue();
        return value ? moment(value, this.props.format).toDate() : value;
    }
    changeValue(date) {
        const value = date ? moment(date).format(this.props.format) : date;
        this.props.setValue(value);
        this.props.onChange(value);
    }
    renderField() {
        return  <DatePicker
            name={this.props.name}
            placeholderText={this.props.placeholder}
            selected={this.getValue()}
            onChange={this.changeValue}

            autoComplete="off"

            {...(this.props.type === 'datetime' ? {
                timeInputLabel: "Time:",
                showTimeInput: true,
                dateFormat: "dd/MM/yyyy H:mm",
            } : {})}
        />;
    }
}

FDate.defaultProps = {
    ...FBase.defaultProps,
};

FDate.propTypes = {
    ...FBase.propTypes,
    format: PropTypes.string.isRequired, // Формат принимаемой и отдаваемой даты
};

export default withFormsy(FDate);
