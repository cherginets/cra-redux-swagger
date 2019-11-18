import React, {Component} from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Tooltip.scss"

window.tooltip_last_zindex = 0;

class Tooltip extends Component {

    state = {
        show: false,
        clientX: 0,
        clientY: 0,
        zindex: 100,
    };

    handleClickOutside = (e) => {
        if(this.refs.tooltip && !e.path.includes(this.refs.tooltip)) {
            this.close();
        }
    };
    handleClick({clientX, clientY}) {
        if(this.state.show) this.close();
        else this.setState({clientX, clientY}, this.open);
    }
    open = () => {
        window.tooltip_last_zindex = window.tooltip_last_zindex + 1;

        if (this.props.closeOnOutClick) document.addEventListener('click', this.handleClickOutside, false);
        this.setState({show: true, zindex: window.tooltip_last_zindex + this.state.zindex})
    };
    close = () => {
        if (this.props.closeOnOutClick) document.removeEventListener('click', this.handleClickOutside, false);
        this.setState({show: false})
    };

    render() {
        const trigger = this.props.children,
            content = this.props.content;

        const {show, clientX, clientY} = this.state;

        let childrenWithProps = React.Children.map(trigger, child =>
            React.cloneElement(trigger, {
                onClick: (...args) => {
                    if(child.props.onClick) child.props.onClick(...args);
                    if(this.state.show) return false;
                    this.handleClick(...args)
                }
            })
        );

        let style = {
            zIndex: this.state.zindex,
            top: clientY,
            left: "auto",
            right: "auto",
        };

        if(window.innerWidth / 2 > clientX) style.left = clientX;
        else style.right = window.innerWidth - clientX;

        return <>
            {childrenWithProps}
            {show && <div className='crs-tooltip' ref='tooltip' style={style}>
                {!this.props.closeOnOutClick && <FontAwesomeIcon className={"crs-tooltip__close"} icon={"times"} size={"lg"} onClick={this.close} /> }
                {typeof content === 'function' ? content({close: this.close}) : content}
            </div>}
        </>
    }

}

Tooltip.defaultProps = {
    closeOnOutClick: true,
};

Tooltip.propTypes = {
    content: PropTypes.any,
    closeOnOutClick: PropTypes.bool,
};

export default Tooltip;