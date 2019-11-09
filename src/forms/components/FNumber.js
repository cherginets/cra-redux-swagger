import {withFormsy} from "formsy-react";
import FBase from "src/forms/components/FBase";

class FNumber extends FBase {
    changeValue(event) {
        let value = event.target.value || "";
        if(value !== '') value = Number(value);

        this.props.setValue(value);
        this.props.onChange(value);
    }
}

FNumber.defaultProps = {
    ...FBase.defaultProps,
};

FNumber.propTypes = {
    ...FBase.propTypes,
};


export default withFormsy(FNumber);
