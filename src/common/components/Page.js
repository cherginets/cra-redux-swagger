import React from 'react';
import PropTypes from 'prop-types';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {BrowserRouter} from "react-router-dom";

class Page extends React.Component {
    render() {
        const {children, title, className} = this.props;
        let classNames = [];

        if (className) classNames.push(className);

        console.log('title', title);
        return <HelmetProvider>
            <div className={classNames.join(" ")}>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                {children}
            </div>
        </HelmetProvider>;
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