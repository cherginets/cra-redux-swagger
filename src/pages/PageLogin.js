import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import Page from "../common/components/Page";
import {GLOBAL_SET_STATE} from "../modules/global";
import AuthService from "../services/Auth/AuthService";

class PageLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };

        this.login = this.login.bind(this);
    }
    login() {
        AuthService.login(1, 2);
        this.props.history.push("/");
    }
    render() {
        return <Page title={"Login"}>
            <div className="container">
                <form className={"mt-2"}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="name@example.com" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="********" />
                    </div>
                    <button className="btn btn-primary" onClick={this.login}>Login</button>
                </form>
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