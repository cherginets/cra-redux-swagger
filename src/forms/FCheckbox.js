import {withFormsy} from "formsy-react";
import FBase from "src/forms/FBase";
import React from "react";

class FCheckbox extends FBase {
    getValue() {
        return !!this.props.getValue();
    }
    changeValue(event) {
        let checked = event.target.checked;

        this.props.setValue(checked);
        this.props.onChange(checked);
    }

    renderLabel() {
        return  false;
    }
    renderField() {
        const {label} = this.props;

        return <label className={"pl-2"}>{label}<input
            className={"ml-2"}
            name={this.props.name}
            checked={this.getValue()}
            onChange={this.changeValue}
            type={"checkbox"}
            placeholder={this.props.placeholder}
        /></label>;
    }
}

FCheckbox.defaultProps = {
    ...FBase.defaultProps,
};

FCheckbox.propTypes = {
    ...FBase.propTypes,
};

export default withFormsy(FCheckbox);
