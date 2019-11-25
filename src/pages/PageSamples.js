import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Page from "../components/Page";
import {n_error, n_info, n_success, n_warning} from "../actions/NotificationActions";
import Modal from "../components/Modal/Modal";
import {m_alert, m_confirm} from "../actions/ModalActions";
import {sections_get} from "../constants/sections";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from "../components/Loading/Loading";
import ContextMenu from "../components/ContextMenu/ContextMenu";
import ContextMenuSelect from "../components/ContextMenu/ContextMenuSelect";
import Tooltip from "../components/Tooltip/Tooltip";
import Tabs from "../components/Tabs/Tabs";

const section = sections_get("samples");

class PageSamples extends Component {
    state = {
        loading: false,
        loading_block: false,
        loading_window: false,
        selected_tab: "2",
    };

    render() {
        return (
            <Page className="container" title={section.title} section={section.code}>
                <h1>Samples</h1>
                <pre>src/pages/PageSamples.js</pre>
                {this.renderTabs()}
                {this.renderTooltips()}
                {this.renderLoading()}
                {this.renderModals()}
                {this.renderNotifications()}
                {this.renderIcons()}
            </Page>
        );
    }
    renderTabs = () => {
        return <div className={'d-flex flex-column'}>
            <h2>Tabs</h2>
            <Tabs>
            <Tabs.Header>
                <Tabs.Link code={"1"} active={this.state.selected_tab === '1'} onClick={(code) => this.setState({selected_tab: String(code)})}>1</Tabs.Link>
                <Tabs.Link code={"2"} active={this.state.selected_tab === '2'} onClick={(code) => this.setState({selected_tab: String(code)})}>2</Tabs.Link>
                <Tabs.Link code={"3"} active={this.state.selected_tab === '3'} onClick={(code) => this.setState({selected_tab: String(code)})}>3</Tabs.Link>
            </Tabs.Header>
            <Tabs.Body>
                body {this.state.selected_tab}
            </Tabs.Body>
        </Tabs>
        </div>
    }
    renderTooltips = () => {
        return <div className={'d-flex flex-column'}>
            <h2>Tooltips</h2>
            <ContextMenu options={[
                {label: 1, value: 1},
                {label: 2, value: 2},
            ]} onClick={() => {
            }}>
                <a href={"/"} onClick={(e) => e.preventDefault()}>
                    контекстное меню
                </a>
            </ContextMenu>
            <ContextMenuSelect options={[
                {label: 1, value: 1},
                {label: 2, value: 2},
            ]} onClick={() => {
            }}>
                <a href={"/"} onClick={(e) => e.preventDefault()}>контекстное меню с выбором элементов</a>
            </ContextMenuSelect>
            <Tooltip content={"content"}>
                <a href={"/"} onClick={(e) => e.preventDefault()}>тултип</a>
            </Tooltip>
            <Tooltip content={(tooltip) => <div className={"p-5"}>
                <button className={"btn btn-primary"} onClick={tooltip.close}>закрыть тултип</button>
            </div>}>
                <a href={"/"} onClick={(e) => e.preventDefault()}>тултип закрывающийся кнопкой внутри</a>
            </Tooltip>
            <ContextMenu options={[
                {label: 1, value: 1},
                {label: 2, value: 2},
            ]} onClick={() => {
            }}>
                <a className={"ml-auto"} href={"/"} onClick={(e) => e.preventDefault()}>
                    контекстное меню (откроется влево)
                </a>
            </ContextMenu>
            <Tooltip content={"some content"} closeOnOutClick={false}>
                <a className={"ml-auto"} href={"/"} onClick={(e) => e.preventDefault()}>
                    тултипчик (не закрывается при клике во вне)
                </a>
            </Tooltip>
        </div>
    };
    renderLoading = () => {
        return <div className={"pb-2"} style={{position: "relative"}}>
            <h2>Loading sample</h2>
            <button className={"btn btn-light"} onClick={() => {
                this.setState({loading: true}, () => {
                    setTimeout(() => this.setState({loading: false}), 1000);
                })
            }}>as_is loading</button>
            <button className={"btn btn-primary ml-2"} onClick={() => {
                this.setState({loading_block: true}, () => {
                    setTimeout(() => this.setState({loading_block: false}), 1000);
                })
            }}>block loading</button>
            <button className={"btn btn-danger ml-2"} onClick={() => {
                this.setState({loading_window: true}, () => {
                    setTimeout(() => this.setState({loading_window: false}), 1000);
                })
            }}>window loading</button>
            <br/>
            {this.state.loading && <Loading />}
            {this.state.loading_block && <Loading place={"block"}/>}
            {this.state.loading_window && <Loading place={"window"}/>}
        </div>
    };
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
    renderIcons = () => {
        if(!(library && library.definitions && library.definitions.fas)) return "undefined error, check method renderIcons()";

        const icons = Object.keys(library.definitions.fas);
        return <div style={{marginTop: 15}}>
            <h2>Icons (FA)</h2>
            <p>Списки иконок <a href={"https://fontawesome.ru/all-icons/"} target={"_blank"}>здесь</a> и <a href={"https://fontawesome.com/icons?d=gallery"} target={"_blank"}>здесь</a></p>
            <pre>Можно подключить ещё в src/fa.js</pre>

            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: 40}}>
                {icons.map((icon, i) => {
                    return <div key={i} style={{width: "20%", display: "flex", marginBottom: 20}}>
                        <FontAwesomeIcon icon={icon} size={"lg"} style={{marginRight: 5}}/> {icon}
                    </div>;
                })}
            </div>

        </div>
    };
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageSamples))