import React from 'react';
import {withRouter} from 'react-router-dom'
import Loading from "../common/components/Loading";
import Error from "../common/components/Error";

class LoginLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        // Здесь очищаются все рабочие куки. Возврат к состоянию - "Зашёл впервые"
        this.setState({loading: false})
    }

    render() {
        if(this.state.loading) return <Loading />;
        if(this.state.error) return <Error />;

        return this.props.children;
    }
}

export default withRouter(LoginLayout)
