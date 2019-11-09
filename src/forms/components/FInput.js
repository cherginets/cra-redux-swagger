import {withFormsy} from "formsy-react";
import FBase from "src/forms/components/FBase";

class FInput extends FBase {}

FInput.defaultProps = {
    ...FBase.defaultProps,
};

FInput.propTypes = {
    ...FBase.propTypes,
};

export default withFormsy(FInput);
