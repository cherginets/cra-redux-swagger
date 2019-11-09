import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';

class Page extends React.Component {
    render() {
        const {children, title, className} = this.props;
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
};

export default Page;