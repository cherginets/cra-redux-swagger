import {withFormsy} from "formsy-react";
import FBase from "./FBase";
import Form from "./Form";

class FInput extends FBase {
    getValue() {
        return this.props.getValue() || "";
    }
    changeValue(event) {
        const value = event.target.value || "";

        this.props.setValue(value);
        this.props.onChange(value);
    }
}

FInput.defaultProps = {
    ...FBase.defaultProps,
};

FInput.propTypes = {
    ...FBase.propTypes,
};


export default withFormsy(FInput);
