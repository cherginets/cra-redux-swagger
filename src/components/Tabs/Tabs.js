import React from 'react';
import {Link} from 'react-router-dom';

class Tabs extends React.Component {
    static Link = ({children, code, active, to, onClick, ...props}) => {
        return <li className={"nav-item " + (active ? "active" : "")}>
            <Link className={"nav-link " + (active ? "active" : "")} to={to || "/"} onClick={(e) => {
                if(onClick) e.preventDefault();
                onClick(code);
            }}>{children}</Link>
        </li>
    };
    static Header = ({children, ...props}) => {
        return <ul className="nav nav-tabs mt-2">
            {children}
        </ul>
    };
    static Body = ({children, ...props}) => {
        return <div>
            {children}
        </div>
    };

    render() {
        return <div className={"d-flex flex-column"}>
            {this.props.children}
        </div>
    }
}

export default Tabs;