import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react';
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
        return (
            <div className="container login-container">
                <h1>Samples</h1>
                <h2>Form</h2>
                <p>Form with formsy</p>
                <Form
                    className="d-flex flex-column"
                    style={{width: 400}}

                    ref={"form"}
                >
                    {(values) => {
                        console.log('values111', values);
                        return <>
                            <FInput label={"age"} name={"age"} placeholder={"age"} value={0} required/>
                            {values.age > 0 && <FInput label={"name"} name={"name"} placeholder={"name"} required/>}
                            <button>submit</button>
                        </>
                    }}
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageSamples))