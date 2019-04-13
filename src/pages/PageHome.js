import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {tmp_count_plus} from '../modules/counter'
import Api from "../common/Api";

class PageHome extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                page home <Link to={"/test"}>go to page test</Link>
                <button onClick={this.props.tmp_count_plus}>count++</button>
                <button onClick={() => Api.getClaims().then((claims) => {console.log('claims', claims);})}>do query</button>
                <br/>
                count = {this.props.count}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    count: state.counter.count,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    tmp_count_plus,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageHome))