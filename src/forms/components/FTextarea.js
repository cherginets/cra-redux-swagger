import {withFormsy} from "formsy-react";
import FBase from "./FBase";
import React from "react";
import PropTypes from "prop-types";

class FTextarea extends FBase {
    renderField() {
        return <textarea
            name={this.props.name}
            value={this.getValue()}
            onChange={this.changeValue}
            placeholder={this.props.placeholder}
            rows={this.props.rows}
        />;
    }
}

FTextarea.defaultProps = {
    ...FBase.defaultProps,
    rows: 3,
};

FTextarea.propTypes = {
    ...FBase.propTypes,
    rows: PropTypes.number,
};

export default withFormsy(FTextarea);
