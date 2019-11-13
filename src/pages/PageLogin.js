import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import Page from "../components/Page";
import {GLOBAL_SET_STATE} from "../modules/global";
import AuthService from "../services/AuthService";
import Form from "../forms/Form";

class PageLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };

        this.login = this.login.bind(this);
    }
    login(fields) {
        console.log('fields', fields);
        AuthService.login(fields.email, fields.password);
        this.props.history.push("/");
    }
    render() {
        return <Page title={"Login"}>
            <div className="container">
                <Form name={"test"} className={"mt-2"} onValidSubmit={this.login}>
                    <Form.Fields>
                        {[
                            {type: "email", name: "email", label: "Email", placeholder: "name@example.com", value: "name@example.com", required: true},
                            {name: "password", label: "Password", placeholder: "********", required: true},
                        ]}
                    </Form.Fields>
                    <button className="btn btn-primary">Login</button>
                </Form>
            </div>
        </Page>;
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
    set_authorized: () => dispatch({type: GLOBAL_SET_STATE, state: {authorized: true}}),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageLogin))