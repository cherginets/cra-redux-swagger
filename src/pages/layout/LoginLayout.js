import React from 'react';
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from "redux"
import {connect} from 'react-redux'

import {permanent_clear} from 'src/modules/permanent';
import Loading from "src/common/components/Loading";
import Error from "src/common/components/Error";

class LoginLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        // TODO: Здесь очищаются все рабочие куки. Возврат к состоянию - "Зашёл впервые"
        this.props.permanent_clear();
        this.setState({loading: false})
    }

    render() {
        if(this.state.loading) return <Loading />;
        if(this.state.error) return <Error />;

        return this.props.children;
    }
}



export const mapStateToProps = (state, ownProps) => ({
    token: state.permanent.token,
});

export const mapDispatchToProps = dispatch => bindActionCreators({
    permanent_clear,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(LoginLayout))
