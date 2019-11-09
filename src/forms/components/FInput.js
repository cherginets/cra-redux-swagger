import {withFormsy} from "formsy-react";
import FBase from "./FBase";

class FInput extends FBase {}

FInput.defaultProps = {
    ...FBase.defaultProps,
};

FInput.propTypes = {
    ...FBase.propTypes,
};

export default withFormsy(FInput);
