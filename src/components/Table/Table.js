import React from 'react';
import PropTypes from 'prop-types';

class Table extends React.Component {

    render() {
        return false;
    }
}

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
};

export default Table;