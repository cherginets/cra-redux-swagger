import React from "react";
import {withFormsy} from "formsy-react";
import RichTextEditor from 'react-rte';
import {COMPONENT_EDITOR_DEFAULT_CONFIG} from "src/constants/components";
import FBase from "src/forms/components/FBase";

class FEditor extends FBase {
    changeValue(value) {
        value = {
            state: value,
            value: value.toString('html'),
        };
        this.props.setValue(value);
        this.props.onChange(value);
    }
    renderField() {
        let value = this.getValue();
        value = typeof value === 'string' ? {state: RichTextEditor.createValueFromString(value || '', 'html'), value} : value;

        return <RichTextEditor
            value={value.state}
            onChange={this.changeValue}
            className={['pab-editor'].join(' ')}
            toolbarClassName='pab-editor__toolbar'
            toolbarConfig={COMPONENT_EDITOR_DEFAULT_CONFIG}
            editorClassName='pab-editor__editor'
            rootStyle={this.props.style}
        />;
    }
}

FEditor.defaultProps = {
    ...FBase.defaultProps,
};

FEditor.propTypes = {
    ...FBase.propTypes,
};

export default withFormsy(FEditor);
