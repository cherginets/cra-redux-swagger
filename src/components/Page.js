import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {bindActionCreators} from "redux"
import {connect} from 'react-redux'
import {GLOBAL_SET_STATE} from "../modules/global";
import Loading from "./Loading/Loading";

class Page extends React.Component {
    componentDidMount() {
        this.props.set_section(this.props.section);
    }

    render() {
        const {children, title, className, loading} = this.props;

        if (loading) return <Loading />;

        let classNames = [];
        if (className) classNames.push(className);

        return <div className={classNames.join(" ")}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </div>
    }
}

Page.defaultProps = {
    title: "Fusion App",
};

Page.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    section: PropTypes.string,
    loading: PropTypes.bool,
};

export const mapStateToProps = (state, ownProps) => ({
});

export const mapDispatchToProps = dispatch => bindActionCreators({
    set_section: (section) => dispatch({type: GLOBAL_SET_STATE, state: {section}}),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Page)

