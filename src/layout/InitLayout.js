import React from 'react';
import {withRouter} from 'react-router-dom'
import Loading from "../common/components/Loading";
import Error from "../common/components/Error";

class InitLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        // Здесь например проверяется авторизация
        this.setState({loading: true}, () => {
            setTimeout(() => {
                this.setState({loading: false})
            }, 500);
        });
    }

    render() {
        if(this.state.loading) return <Loading />;
        if(this.state.error) return <Error />;

        return this.props.children;
    }
}

export default withRouter(InitLayout)
