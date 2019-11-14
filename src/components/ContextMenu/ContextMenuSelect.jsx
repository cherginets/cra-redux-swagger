import React, {Component} from 'react'
import PropTypes from "prop-types"
import ContextMenu from './ContextMenu.jsx'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

export default class ContextMenuSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: props.selected,
        };

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(opt) {
        let {selected} = this.state;

        const index = selected.indexOf(opt.value);
        if(index > -1) {
            selected.splice(index, 1);
        } else {
            selected.push(opt.value);
        }

        this.setState({selected}, () => {
            this.props.onSelect(opt, selected);
        })
    }

    render() {
        const {options, selected} = this.props;
        const selectedOptions = options.map(({label, value}) => {
            let newLabel = label;
            if(selected.includes(value)) {
                newLabel = <div className='contextMenu__itemSelected'>{label}</div>
            } else if (selected.includes(value)) {
                newLabel = <><FontAwesomeIcon icon={faCheck} style={{marginRight: '6px'}} />{label}</>
            }
            return {label: newLabel, value}
        });

        return <ContextMenu
            {...this.props}
            options={selectedOptions}
            onClick={this.onSelect}
        />
    }

}

ContextMenuSelect.defaultProps = {
    selected: [],
    onSelect: (option, selected) => {}
};

ContextMenuSelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })).isRequired, // Массив с [label, value]
    // Массив с выбранными элементами ['value1', 'value2']
    selected: PropTypes.array,
    onSelect: PropTypes.func,
};