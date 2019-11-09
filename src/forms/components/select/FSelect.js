import React from "react";
import Select from "react-select";
import {withFormsy} from "formsy-react";
import FBase from "src/forms/components/FBase";

class FSelect extends FBase {
    getValue() {
        const map = this.props.options_map,
            options = this.props.options,
            value = this.props.getValue();

        if(value in map) return options[map[value]];
        return null;
    }
    changeValue(opt) {
        const value = opt ? opt.value : opt;
        this.props.setValue(value);
        this.props.onChange(value);
    }
    renderField() {
        return <Select
            name={this.props.name}
            value={this.getValue()}
            onChange={this.changeValue}
            type={this.props.type || 'text'}
            placeholder={this.props.placeholder}

            options={this.props.options}

            isClearable={this.props.isClearable}
        />;
    }
}

FSelect.defaultProps = {
    ...FBase.defaultProps,
    options: [],
    options_map: {},
};

FSelect.propTypes = {
    ...FBase.propTypes,
    ...Select.propTypes,
};

export default withFormsy(FSelect);
