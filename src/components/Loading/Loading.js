import React from 'react';
import PropTypes from 'prop-types';
import "./Loading.scss";

/**
 * Растягивается на всю ширину родительского контейнера (с position: relative)
 */
class Loading extends React.Component {
    render() {
        const {minHeight, text} = this.props;

        return <div className={["loading"].join(" ")} style={{minHeight}}>
            {text}
        </div>;
    }
}

Loading.defaultProps = {
    minHeight: 200,
    text: "Loading...",
};

Loading.propTypes = {
    minHeight: PropTypes.number,
    text: PropTypes.string,
};

export default Loading;
