import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
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
                    <br/>
                    <button className={"btn btn-primary"}
                        onClick={() => this.setState({throw_err: true})}
                    >Throw JS error</button>
                    <br/>
                    <br/>
                    <Link to={"/404"}>404</Link>
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