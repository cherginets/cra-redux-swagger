import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import Page from "../common/components/Page";

class PageHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            throw_err: false,
        };
    }

    render() {
        return (
            <Page className={"container"} title={"Home"}>
                <h1>Home page</h1>
                <p>some info
                    <br/>
                    <button className={"btn btn-primary"}
                        onClick={() => this.setState({throw_err: true})}
                    >Throw JS error</button>
                </p>
                {this.state.throw_err && undefined.map()}
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    count: state.global.count,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageHome))