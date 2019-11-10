import React from "react";
import {withRouter} from "react-router-dom";
import Page from "./Page";

class ErrorBoundary extends React.Component {
    initState = {error: null, errorInfo: null};

    constructor(props) {
        super(props);
        this.state = this.initState;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setState(this.initState)
        }
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return <Page className={"container"} title={"Something JS error"}>
                <h1 className={'ml-10 mt-10 mb-20'}>Something went wrong.</h1>
                <div className={"p-20"} style={{whiteSpace: 'pre-wrap'}}>
                    {this.state.error && this.state.error.toString()}
                    <br/>
                    {this.state.errorInfo.componentStack}
                </div>
            </Page>;
        }
        // Normally, just render children
        return this.props.children;
    }
}


export default withRouter(ErrorBoundary);