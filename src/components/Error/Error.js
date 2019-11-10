import React from 'react';
import PropTypes from 'prop-types';
import "./Error.scss";

/**
 * Растягивается на всю ширину родительского контейнера (с position: relative)
 */
class Error extends React.Component {
    render() {
        const {text} = this.props;

        return <div className={["error"].join(" ")}>
            {text}
        </div>;
    }
}

Error.defaultProps = {
    text: "Error",
};

Error.propTypes = {
    text: PropTypes.any,
};

export default Error;
