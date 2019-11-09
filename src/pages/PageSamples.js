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
                <Form className="d-flex flex-column"
                      style={{width: 400}}
                      onValidSubmit={this.submit}
                >
                    <Form.Fields fields={[
                        {type: "text", label: "age", name: "age", placeholder: "age", value: 17},
                        {type: "text", label: "pornosite", name: "pornosite", placeholder: "pornosite", value: "test"},
                    ]} />
                    <button>submit</button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageSamples))