import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Page from "../components/Page";
import {n_error, n_info, n_success, n_warning} from "../actions/NotificationActions";
import Modal from "../components/Modal/Modal";
import {m_alert, m_confirm} from "../actions/ModalActions";
import {sections_get} from "../constants/sections";

const section = sections_get("samples");

class PageSamples extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Page className="container" title={section.title} section={section.code}>
                <h1>Samples</h1>
                <pre>src/pages/PageSamples.js</pre>
                {this.renderModals()}
                {this.renderNotifications()}
            </Page>
        );
    }
    renderModals = () => {
        return <div className={"pb-2"}>
            <h2>Modals</h2>

            {/* Модал с управлением в родителе */}
            <a href={"/"} onClick={(e) => {
                e.preventDefault();
                this.setState({modal_show: true})
            }}>Модал с управлением в родителе</a>
            <Modal show={this.state.modal_show} onClose={() => this.setState({modal_show: false})} >
                <Modal.Header>Header</Modal.Header>
                <Modal.Content>Content</Modal.Content>
                <Modal.Footer>Footer</Modal.Footer>
            </Modal>
            <br/>

            {/* Модал с управлением внутри */}
            <Modal
                clickContent={<a href={"/"} onClick={e => e.preventDefault()}>Модал с управлением внутри</a>}
            >
                <Modal.Header>Header</Modal.Header>
                <Modal.Content>Content</Modal.Content>
                <Modal.Footer>Footer</Modal.Footer>
            </Modal>

            {/* Модал - аналог 'alert' */}
            <a href={"/"} onClick={(e) => {
                e.preventDefault();
                m_alert(<div>Alert message!</div>)
                    .then(() => this.setState({modal_alert_response: "Отработано"}))
            }}>Модал - аналог 'alert'</a> {this.state.modal_alert_response}
            <br/>

            {/* Модал - аналог 'confirm' */}
            <a href={"/"} onClick={(e) => {
                e.preventDefault();
                m_confirm("Are you sure?")
                    .then(() => this.setState({modal_response: "Да"}))
                    .catch(() => this.setState({modal_response: "Нет"}));
            }}>Модал - аналог 'confirm'</a> {this.state.modal_response && `Ответ: ${this.state.modal_response}` }
        </div>
    };
    renderNotifications = () => {
        return <div>
            <h2>Notifications</h2>

            <button className={"btn mr-1 btn-primary"} onClick={() => {n_success("success", "title")}}>success</button>
            <button className={"btn mr-1 btn-info"} onClick={() => {n_info("info", "title")}}>info</button>
            <button className={"btn mr-1 btn-light"} onClick={() => {n_warning("warning", "title")}}>warning</button>
            <button className={"btn mr-1 btn-warning"} onClick={() => {n_error("error", "title")}}>error</button>
        </div>
    };
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageSamples))