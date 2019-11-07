import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import AuthService from "src/services/Auth/AuthService";

class InitLayout extends React.Component {
    render() {
        return <AuthService>
            {this.props.children}
        </AuthService>;
    }
}

export const mapStateToProps = (state, ownProps) => ({
});

export default connect(
    mapStateToProps,
)(withRouter(InitLayout))
