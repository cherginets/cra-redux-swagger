import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import Page from "../common/components/Page";

class PageLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };

        this.login = this.login.bind(this);
    }
    login() {
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
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageLogin))