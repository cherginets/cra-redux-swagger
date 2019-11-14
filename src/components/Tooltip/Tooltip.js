import React, {Component} from "react";
import PropTypes from 'prop-types';

class Tooltip extends Component {

    state = {
        show: false,
        clientX: 0,
        clientY: 0,
    };

    handleClickOutside = (e) => {
        if(this.refs.tooltip && !e.path.includes(this.refs.tooltip)) {
            document.removeEventListener('click', this.handleClickOutside, false);
            this.setState({show: false})
        }
    };
    handleClick({clientX, clientY}) {
        this.setState(({show}) => {
            document.addEventListener('click', this.handleClickOutside, false);
            return {
                show: !show,
                clientX, clientY,
            }
        })
    }
    close = () => {
        document.removeEventListener('click', this.handleClickOutside, false);
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
            top: clientY,
            left: "auto",
            right: "auto",
        };

        if(window.innerWidth / 2 > clientX) style.left = clientX;
        else style.right = window.innerWidth - clientX;

        return <>
            {childrenWithProps}
            {show && <div className='crs-tooltip' ref='tooltip' style={style}>
                {typeof content === 'function' ? content({close: this.close}) : content}
            </div>}
        </>
    }

}

Tooltip.propTypes = {
    content: PropTypes.any,
};

export default Tooltip;