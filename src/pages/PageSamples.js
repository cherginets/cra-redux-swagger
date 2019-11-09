import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Form from "../forms/Form";

class PageSamples extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container login-container">
                <h1>Samples</h1>
                <pre>src/pages/PageSamples.js</pre>
                {this.renderForm1()}
            </div>
        );
    }
    renderForm1 = () => {
        return <Form
            className="d-flex flex-column mb-5"
            onValidSubmit={(form1_response)  => this.setState({form1_response: JSON.stringify(form1_response, null, 2), form1_date: (+ new Date())})}
        >
            <h3>Form1</h3>
            <p>Отображены возможные типы полей</p>
            <div className={"row"}>
                <div className={"col-6"}>
                    <Form.Fields fields={[
                        {type: "number", label: "Type - 'number'", name: "number", placeholder: "0", value: 17,},
                        {type: "string", label: "Type - 'string'", name: "string", placeholder: "some string..."},
                        {type: "select", label: "Type - 'select'", name: "select", placeholder: "select",
                            options: [
                                {label: "First (number)", value: 1},
                                {label: "Second (string)", value: "2"},
                            ],
                            isClearable: true,
                        },
                        {type: "checkbox", label: "Type - 'checkbox'", name: "checkbox"},
                        {type: "textarea", label: "Type - 'textarea'", name: "textarea", placeholder: "some text..."},

                        // select
                        // select multi
                        // select radio
                        // date
                        // datetime
                    ]} />
                </div>
                <div className={"col-6"}>
                    <pre>{this.state.form1_date}
                    <br/>
                    {this.state.form1_response}</pre>
                </div>
            </div>

            {/*<Form.Fields fields={[*/}
            {/*    {label: "fio", name: "fio", placeholder: "fio", value: "john doe",},*/}
            {/*]} />*/}
            <button>submit</button>
        </Form>
    }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageSamples))