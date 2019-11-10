import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {sections} from "../../constants/sections";

class Header extends React.Component {
    render() {
        return <div className={"container d-flex justify-content-around p-3 mb-2"}>
            {sections.map((section, i) => {
                const active = this.props.section === section.code;

                return <Link
                    to={section.path} key={i}
                    className={active ? "text-danger" : ""}
                >{section.name}</Link>;
            })}
            <Link to={"/login"}>Logout</Link>
        </div>;
    }
}

export default connect((state, ownProps) => ({
    section: state.global.section,
}),)(Header)
