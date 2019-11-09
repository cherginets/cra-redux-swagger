import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Formsy from 'formsy-react'
import {bindActionCreators} from 'redux'
import Form from "../forms/Form";
import FInput from "../forms/FInput";

class PageSamples extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.form = React.createRef();
        this.submit = this.submit.bind(this);
    }

    submit(fields) {
        console.log('fields', fields);
    }

    render() {
        let values = {age: 5};

        // console.log('this.form', this.form);

        const form = this.form;
        console.log('form', form);

        return (
            <div className="container login-container">
                <h1>Samples</h1>
                <h2>Form</h2>
                <p>Form with formsy</p>
                <Formsy
                    className="d-flex flex-column"
                    style={{width: 400}}

                    onValidSubmit={this.submit}
                    ref={this.form}
                >
                    <FInput label={"age"} name={"age"} placeholder={"age"} value={0} required form={this.form}/>
                    <FInput label={"pornosite"} name={"pornosite"} placeholder={"pornosite"} required hidden={(values) => values.age < 18} form={this.form}/>
                    <button>submit</button>
                </Formsy>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageSamples))