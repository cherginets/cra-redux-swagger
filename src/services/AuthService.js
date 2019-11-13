import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import Loading from "src/components/Loading/Loading";
import Error from "src/components/Error/Error";
import store from "src/store";
import {PERMANENT_SET_STATE} from "src/modules/permanent";

class AuthService extends React.Component {
    state = {
        authorized: false,
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.setState({loading: true}, () => {
            // TODO: Впишите сюда свою проверку авторизации
            // this.setState({loading: false, error: "Some error"}); return false;
            if(this.props.token) {
                this.setState({authorized: true, loading: false});
            } else {
                this.props.history.push("/login");
            }
        })
    }

    static login = (login, password) => new Promise((resolve) => {
        // TODO: Впишите сюда Функцию авторизации в интерфейсе
        store.dispatch({type: PERMANENT_SET_STATE, state: {token: login + password}});
    });

    render() {
        const {loading, error, authorized} = this.state;

        if (loading) return <Loading place={"window"} text={"Authorization..."}/>;
        if (error) return <Error text={error}/>;
        if (!authorized) return <Redirect to={this.props.login_page_url}/>;

        return this.props.children;
    }
}

AuthService.defaultProps = {
    login_page_url: "/login",
    checkAuth: Promise.resolve(),
};

AuthService.propTypes = {
    login_page_url: PropTypes.string, // URL на который произойдёт редирект при разлогине
};

export const mapStateToProps = (state, ownProps) => ({
    token: state.permanent.token,
    state: state,
});

export default connect(
    mapStateToProps,
)(withRouter(AuthService))