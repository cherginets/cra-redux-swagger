import React, {Component} from 'react';
import { withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
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
    count: state.global.count,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageTest))