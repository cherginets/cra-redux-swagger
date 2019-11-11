import React from 'react';
import PropTypes from 'prop-types';
import "./Loading.scss";

/**
 * Растягивается на всю ширину родительского контейнера (с position: relative)
 */
class Loading extends React.Component {
    render() {
        const {minHeight, place, text} = this.props;

        let classNames = ["loading"];
        if(place === 'block') classNames.push("loading_block");
        if(place === 'window') classNames.push("loading_window");

        return <div className={classNames.join(" ")} style={{minHeight}}>
            {text}
        </div>;
    }
}

Loading.defaultProps = {
    text: "Loading...",
    place: "as_is",
};

Loading.propTypes = {
    minHeight: PropTypes.number,
    text: PropTypes.string,
    // as_is - (по умолчанию) отображается как компонент среди верстки
    // block - абсолютное позиционирование на странице
    // window - отображается на всю страницу
    place: PropTypes.oneOf(["as_is", "block", "window"]),
};

export default Loading;
