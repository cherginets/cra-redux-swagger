import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    render() {
        return <div className={"container d-flex justify-content-around p-3 mb-2"}>
            <Link to={"/"}>Home</Link>
            <Link to={"/samples"}>Samples</Link>
            <Link to={"/test"}>Test</Link>
            <Link to={"/404"}>404</Link>
            <Link to={"/login"} >Logout</Link>
        </div>;
    }
}

export default Header;