import React from 'react';
import Modal from "src/components/Modal/Modal";

class ModalManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            content: false,
            onClose: () => {},
        };

        this.alert = this.alert.bind(this);
        this.confirm = this.confirm.bind(this);
    }
    componentDidMount() {
        window.ModalManager = {
            alert: this.alert,
            confirm: this.confirm,
        }
    }
    componentWillUnmount() {
        delete window.ModalManager;
    }
    alert(content) {
        return new Promise((resolve) => {
            this.setState({
                show: true,
                onClose: resolve,
                content: <>
                    <Modal.Header>Info modal</Modal.Header>
                    <Modal.Content>{content}</Modal.Content>
                    <Modal.Footer>
                        <button
                            className={"btn btn-primary ml-a mr-a"}
                            onClick={() => this.setState({show: false}, resolve)}
                        >закрыть
                        </button>
                    </Modal.Footer>
                </>,
            })
        });
    }
    confirm(question) {
        return new Promise((resolve, reject) => {
            this.setState({
                show: true,
                onClose: reject,
                content: <>
                    <Modal.Header>Confirm modal</Modal.Header>
                    <Modal.Content>{question}</Modal.Content>
                    <Modal.Footer>
                        <button
                            className={"btn btn-primary ml-a mr-1"}
                            onClick={() => this.setState({show: false}, resolve)}
                        >OK
                        </button>
                        <button
                            className={"btn btn-light ml-1 mr-a"}
                            onClick={() => this.setState({show: false}, reject)}
                        >Отмена
                        </button>
                    </Modal.Footer>
                </>});

        });
    }

    render() {
        return <Modal show={this.state.show}
                      onClose={() => this.setState({show: false}, this.state.onClose)}>
            {this.state.content}
        </Modal>
    }
}

export default ModalManager;