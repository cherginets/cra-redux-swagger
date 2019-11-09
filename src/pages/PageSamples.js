import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Form from "../forms/Form";
import Page from "../common/components/Page";
import {n_error, n_info, n_success, n_warning} from "../actions/NotificationActions";

class PageSamples extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Page className="container" title={"Samples"}>
                <h1>Samples</h1>
                <pre>src/pages/PageSamples.js</pre>

                <pre>>> todo: modal</pre>
                <pre>>> todo: alert modal</pre>
                <pre>>> todo: confirm modal</pre>
                {this.renderNotifications()}
            </Page>
        );
    }
    renderNotifications = () => {
        return <div>
            <h2>Notifications</h2>

            <button className={"btn mr-1 btn-primary"} onClick={() => {n_success("success", "title")}}>success</button>
            <button className={"btn mr-1 btn-info"} onClick={() => {n_info("info", "title")}}>info</button>
            <button className={"btn mr-1 btn-light"} onClick={() => {n_warning("warning", "title")}}>warning</button>
            <button className={"btn mr-1 btn-warning"} onClick={() => {n_error("error", "title")}}>error</button>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageSamples))