import React, {Component} from 'react'
import PropTypes from "prop-types"
import './ContextMenu.scss'
import Tooltip from "../Tooltip/Tooltip";

class ContextMenu extends Component {
    render() {
        let {options, onClick} = this.props;

        return <Tooltip content={<div className='contextMenu'>
            <div className='contextMenu__list'>
                {options.map((row, i) => <div
                        key={i}
                        className='contextMenu__item'
                        onClick={() => onClick(row)}
                    >
                        {row.label}
                    </div>
                )}
            </div>
        </div>}>
            {this.props.children}
        </Tooltip>
    }

}

ContextMenu.defaultProps = {

};

ContextMenu.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })).isRequired, // Массив с [label, value]
    onClick: PropTypes.func.isRequired, // Функция нажатия на элемент списка, возвращает нажатый элемент
};

export default ContextMenu;