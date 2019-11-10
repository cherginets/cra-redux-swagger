import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Page from "../components/Page";
import {sections_get} from "../constants/sections";

const section = sections_get("tables");

class PageTables extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <Page className="container" title={section.title} section={section.code}>
                <h1>Forms examples</h1>
                <pre>src/pages/PageTables.js</pre>

                {/*<Table columns={[*/}
                {/*    {Header: "ID", accessor: "id"},*/}
                {/*    {Header: "Name", accessor: "name"},*/}
                {/*    {Header: "Phone", accessor: "phone"},*/}
                {/*]}*/}
                {/*       data={[*/}
                {/*           {id: 1, name: "John Doe", phone: +79999999999},*/}
                {/*           {id: 2, name: "Anton Doe", phone: +78888888888},*/}
                {/*           {id: 3, name: "Max Doe", phone: +77777777777},*/}
                {/*           {id: 4, name: "Alexey Doe", phone: +77777777777},*/}
                {/*           {id: 5, name: "Alexandr Doe", phone: +77777777777},*/}
                {/*           {id: 6, name: "Joan Doe", phone: +77777777777},*/}
                {/*           {id: 7, name: "Mark Doe", phone: +77777777777},*/}
                {/*           {id: 8, name: "Pavel Doe", phone: +77777777777},*/}
                {/*           {id: 9, name: "Vladimir Doe", phone: +77777777777},*/}
                {/*           {id: 10, name: "Dick Doe", phone: +77777777777},*/}
                {/*           {id: 11, name: "Thomas Doe", phone: +77777777777},*/}
                {/*           {id: 12, name: "Tony Doe", phone: +77777777777},*/}
                {/*       ]}*/}
                {/*>*/}

                {/*</Table>*/}
                <pre>>> todo: Table (на базе react-table)</pre>
                <pre>>> todo: sorting</pre>
                <pre>>> todo: pagination</pre>
                {this.renderTable1()}
            </Page>
        );
    }

    renderTable1 = () => {
        return false;
    }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageTables))