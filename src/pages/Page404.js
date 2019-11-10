import React, {Component} from 'react';
import { withRouter, Link} from 'react-router-dom'
import Page from "../components/Page";

class Page404 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Page className="container" title={"404 Not found"}>
                <h1>404 Not found</h1>
                <p><Link to={"/"}>go to home</Link></p>
            </Page>
        );
    }
}

export default withRouter(Page404);