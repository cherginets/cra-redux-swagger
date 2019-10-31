import React from 'react';
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from "redux"
import {connect} from 'react-redux'

import Loading from "src/common/components/Loading";
import Error from "src/common/components/Error";

class InitLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        // Здесь например проверяется авторизация
        const authorized = this.props.authorized;

        if(authorized) {
            this.setState({loading: true}, () => {
                setTimeout(() => {
                    this.setState({loading: false})
                }, 500);
            });
        } else {
            this.props.history.push("/login");
        }

    }

    render() {
        if(this.state.loading) return <Loading />;
        if(this.state.error) return <Error />;

        return this.props.children;
    }
}

export const mapStateToProps = (state, ownProps) => ({
    authorized: state.global.authorized,
});

export default connect(
    mapStateToProps,
)(withRouter(InitLayout))
