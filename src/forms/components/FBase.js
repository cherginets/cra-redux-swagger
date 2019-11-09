/**
 * https://github.com/christianalfoni/formsy-react/blob/master/API.md - дока Formsy
 */
import React from 'react';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';

class FBase extends React.Component {
    mixins = [Formsy.Mixin];

    constructor(props) {
        super(props);

        this.state = {
            help_show: false,
        };

        this.changeValue = this.changeValue.bind(this);
        this.getValue = this.getValue.bind(this);

        this.isRequired = this.isRequired.bind(this);

        this.renderHelp = this.renderHelp.bind(this);
        this.renderLabel = this.renderLabel.bind(this);
        this.renderField = this.renderField.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    getValue() {
        return this.props.getValue() || "";
    }
    changeValue(event) {
        let value = event.target.value || "";

        this.props.setValue(value);
        this.props.onChange(value);
    }

    isRequired() {
        return this.props.isRequired();
    }

    render() {
        return <div className={"d-flex flex-column pb-3"}>
            {this.renderLabel()}
            {this.renderHelp()}
            {this.renderField()}
            {this.renderError()}
        </div>
    }
    renderLabel() {
        const {label} = this.props;
        if (!label) return false;
        return <label className={"pl-2"} style={this.props.help ? {textDecoration: "underline", cursor: "pointer"} : {}} onClick={() => {
            this.setState({help_show: !this.state.help_show})
        }}>
            {this.isRequired() && <span style={{color: "red"}}>* </span>}
            {label}
        </label>
    }
    renderHelp() {
        if (!this.props.help || !this.state.help_show) return false;

        return  <div style={{color: 'gray'}} className={"mb-1"}>{this.props.help}</div>
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
    renderError() {
        let errorMessage = !this.props.isValid() ? this.props.getErrorMessage() : false;
        if (this.props.showRequired()) errorMessage = `Поле '${this.props.label}' обязательно к заполнению!`;

        if (!errorMessage || !this.props.isFormSubmitted()) return false;

        if(this.props.name === 'email') {
            console.log('this', this);
        }

        return <div style={{color: "red", fontSize: 12}}>{errorMessage}</div>
    }
}

FBase.defaultProps = {
    label: "",
    onChange: value => {},
};

FBase.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    hidden: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
};

export default FBase;
