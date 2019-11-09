import React from 'react';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';

class FBase extends React.Component {
    mixins = [Formsy.Mixin];

    constructor(props) {
        super(props);

        this.state = {};

        this.changeValue = this.changeValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.renderLabel = this.renderLabel.bind(this);
        this.renderField = this.renderField.bind(this);
        this.renderValidation = this.renderValidation.bind(this);
    }

    getValue() {
        return this.props.getValue() || "";
    }
    changeValue(event) {
        let value = event.target.value || "";

        this.props.setValue(value);
        this.props.onChange(value);
    }

    render() {
        return <div className={"d-flex flex-column pb-3"}>
            {this.renderLabel()}
            {this.renderField()}
            {this.renderValidation()}
        </div>
    }
    renderLabel() {
        const {label} = this.props;
        if (!label) return false;
        return <label className={"pl-2"}>{label}</label>
    }
    renderField() {
        return <input
            name={this.props.name}
            value={this.getValue()}
            onChange={this.changeValue}
            type={this.props.type || 'text'}
            placeholder={this.props.placeholder}
            autoComplete="off"
        />;
    }
    renderValidation() {
        let errorMessage = !this.props.isValid() ? this.props.getErrorMessage() : false;
        // console.log('this.props.showRequired()', this.props.showRequired());
        if (this.props.showRequired()) errorMessage = true;

        return <div style={{color: "red"}}>{errorMessage}</div>
    }
}

FBase.defaultProps = {
    label: "",
    onChange: value => {},
};

FBase.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    hidden: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
};

export default FBase;
