import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import AuthService from "src/services/Auth/AuthService";
import Header from "./Header";
import ErrorBoundary from "src/components/ErrorBoundary";
import ModalManager from "src/components/Modal/ModalManager";

class InitLayout extends React.Component {
    render() {
        return <AuthService>
            <Header/>
            <ErrorBoundary>
                {this.props.children}
            </ErrorBoundary>

            <NotificationContainer/>
            <ModalManager/>
        </AuthService>;
    }
}


export const mapStateToProps = (state, ownProps) => ({});

export default connect(
    mapStateToProps,
)(withRouter(InitLayout))
