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
        this.isHidden = this.isHidden.bind(this);
        this.renderLabel = this.renderLabel.bind(this);
        this.renderField = this.renderField.bind(this);
        this.renderValidation = this.renderValidation.bind(this);
    }

    changeValue(value) {
        this.props.setValue(value);
        this.props.onChange(value);
    }

    getValue() {
        return this.props.getValue();
    }

    isHidden() {
        const form = this.props.form.current;
        if (!form) return false;

        const values = form.getModel(),
            {hidden} = this.props;

        if(typeof hidden === 'function') return hidden(values);
        else return !!hidden;
    }

    render() {
        const isHidden = this.isHidden();

        if (isHidden) return false;

        return <div className={"d-flex flex-column pb-2"}>
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
            // value={this.getValue()}
            onChange={this.changeValue}
            type={this.props.type || 'text'}
            placeholder={this.props.placeholder}
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
    onChange: value => {
    },
};

FBase.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    hidden: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
};

export default FBase;
