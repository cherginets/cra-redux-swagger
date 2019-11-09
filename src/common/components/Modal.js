import React from 'react';
import PropTypes from 'prop-types';
import "./Modal.scss";

class Modal extends React.Component {
    static Header = (props) => <div className={"fs-modal__header"}>{props.children}</div>;
    static Content = (props) => <div className={"fs-modal__content"}>{props.children}</div>;
    static Footer = (props) => <div className={"fs-modal__footer"}>{props.children}</div>;

    constructor(props) {
        super(props);

        this.state = {
            show: props.show,
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.renderClickContent = this.renderClickContent.bind(this);
        this.renderModal = this.renderModal.bind(this);
    }

    open() {
        this.setState({show: true}, this.props.onOpen);
    }
    close() {
        this.setState({show: false}, this.props.onClose);
    }

    render() {
        return <>
            {this.renderClickContent()}
            {this.renderModal()}
        </>;
    }
    renderClickContent() {
        const {clickContent} = this.props;
        if(!clickContent) return false;

        return <div className={"fs-modal__click-content"} onClick={this.open}>{clickContent}</div>
    }
    renderModal() {
        const show = this.props.show !== undefined ?
            this.props.show : this.state.show;

        if (!show) return false;

        return <div className={"fs-modal"}>
            <div className={"fs-modal__overlay"} onClick={this.close}>
                <div className={"fs-modal__window"} onClick={e => {
                    e.stopPropagation();
                }}>
                    {this.props.children}
                </div>
            </div>
        </div>
    }

}


Modal.defaultProps = {
    onOpen: () => {},
    onClose: () => {},
};

Modal.propTypes = {
    show: PropTypes.bool, // Если не задано, то должен быть задан clickContent
    clickContent: PropTypes.element, // При клике на этот элемент открывается модал

    onOpen: PropTypes.func,
    onClose: PropTypes.func,

    header: PropTypes.any,
    content: PropTypes.any,
    footer: PropTypes.any,
};

export default Modal;