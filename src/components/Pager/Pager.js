import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Pager.scss';

class Pager extends React.Component {
    render() {
        const {className, showDetails, total, limit, offset, onNext, onPrev} = this.props;
        if (!(total > limit)) return false;

        const classNames = ["pager"];
        if(className) classNames.push(className);


        return <div className={classNames.join(" ")}>
            {showDetails &&
            <div className='pager__items'>
                {offset + 1}—{
                ((offset + limit) < total)
                    ? offset + limit
                    : total
            } of {total}
            </div>}
            <div className={"pager__buttons"}>
                <button className={"btn"}
                        disabled={((offset / limit) === 0)}
                        onClick={() => onPrev(offset - limit, limit)}
                >
                    <FontAwesomeIcon icon={"chevron-left"}/>
                </button>
                <div className='pager__pages'>
                    {offset / limit + 1}/{Math.ceil(total / limit)}
                </div>
                <button className={"btn"}
                        disabled={(offset / limit + 1) === Math.ceil(total / limit)}
                        onClick={() => onNext(offset + limit, limit)}
                >
                    <FontAwesomeIcon icon={"chevron-right"}/>
                </button>
            </div>
        </div>;
    }
}

Pager.defaultProps = {
    offset: 0,
    limit: 0,
    total: 0,
    onPrev: (offset, limit)=>{},
    onNext: (offset, limit)=>{},
    showDetails: true
};

Pager.propTypes = {
    className: PropTypes.string,
    offset: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    showDetails: PropTypes.bool
};

export default Pager;
