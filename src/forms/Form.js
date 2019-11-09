import React from 'react';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import FInput from "./FInput";

class Form extends React.Component {
    static propTypes = Formsy.propTypes;

    constructor(props) {
        super(props);

        this.state = {};

        this.form = React.createRef();
    }

    render() {
        return <Formsy {...this.props} ref={this.form}>
            {this.props.children}
        </Formsy>
    }
}

Form.Fields = class extends React.Component {
    render() {
        const {fields} = this.props;
        return fields.map(({type, ...field}, key) => {
           let Component = FInput;
            switch (type) {
                case "text":
                default:
                    break;
            }

            return <Component key={key} {...field} />;
        });
    }
};

Form.Fields.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({

    })),
};

export default Form;