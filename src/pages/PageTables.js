import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Page from "../common/components/Page";

class PageTables extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Page className="container" title={"Tables examples"}>
                <h1>Forms examples</h1>
                <pre>src/pages/PageTables.js</pre>
                {this.renderTable1()}
            </Page>
        );
    }

    renderTable1 = () => {
        return false;
    }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageTables))