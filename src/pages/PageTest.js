import React, {Component} from 'react';
import { withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {tmp_count_plus} from '../modules/counter'
import {bindActionCreators} from 'redux'

class PageTest extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container login-container">
                page test <Link to={"/"}>go to page home</Link>
                <button onClick={this.props.tmp_count_plus}>count++</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageTest))