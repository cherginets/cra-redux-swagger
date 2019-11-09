import React from 'react';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import FInput from "./components/FInput";
import FNumber from "./components/FNumber";
import FCheckbox from "./components/FCheckbox";
import FTextarea from "./components/FTextarea";
import FSelect from "./components/FSelect";
import Helper from "../common/Helper";
import FDate from "./components/FDate";
import {DEFAULT_MOMENT_DATE_FORMAT, DEFAULT_MOMENT_DATETIME_FORMAT} from "../common/constants/defaults";
import FEditor from "./components/FEditor";

const FormContext = React.createContext(
    {current: {}}
);

class Form extends React.Component {
    static defaultProps = {
        onValidSubmit: (fields) => {},
        onlyChanged: false,
    };
    static propTypes = {
        ...Formsy.propTypes,
        onValidSubmit: PropTypes.func,
        onlyChanged: PropTypes.bool, // Если true, то в метод onValidSubmit передаются только измененные поля
    };

    map = {};
    constructor(props) {
        super(props);

        this.state = {};

        this.form = React.createRef();

        this.onValidSubmit = this.onValidSubmit.bind(this);
    }

    onValidSubmit(fields) {
        const map = this.map,
            {onlyChanged} = this.props;

        fields = Object.keys(fields).reduce((acc, name) => {
            let value = fields[name];

            if (onlyChanged && value === map[name]._start_value) return acc;

            // Приведение значения к типу поля
            // TODO: спорная часть с nullValue, изучить подробнее
            switch (map[name].type) {
                case "string":
                case "textarea":
                    if (!value && value !== "") {value = map[name].nullValue; break;}
                    value = String(value); break;
                case "number":
                    if (!value && value !== 0) {value = map[name].nullValue; break;}
                    value = Number(value);
                    break;
                case "checkbox":
                    if (!value && value !== false) {value = map[name].nullValue; break;}
                    value = Boolean(value);
                    break;
                case "editor":
                    value = Helper.is_object(value) ? value.value : value;
                    break;
                default: break;
            }

            return {
                ...acc,
                [name]: value,
            }
        }, {});

        this.props.onValidSubmit(fields);
    }

    render() {
        const {onlyChanged, ...props} = this.props;

        return <Formsy
            {...props}
            onValidSubmit={this.onValidSubmit}
            ref={this.form}
        >
            <FormContext.Provider value={{
                form: this.form,
                map: this.map,
            }}>
                {this.props.children}
            </FormContext.Provider>
        </Formsy>
    }
}

Form.Fields = class extends React.Component {
    render() {
        return <FormContext.Consumer>{({form, map}) => {
            form = form.current;
            if (!form) return false;

            const {fields} = this.props,
                values = form.getModel();

            return fields.map((field, key) => {
                field.type = field.type || "string";
                field._start_value = field.value;
                map[field.name] = field;

                let params = field,
                    Component = FInput;

                // region Обработка hidden/show
                let {hidden, show} = field;
                if (typeof params.hidden === 'function') hidden = hidden(values);
                if (hidden === undefined && show !== undefined) {
                    if (typeof show === 'function') hidden = !show(values);
                    else hidden = !show;
                }
                if (hidden) return false;
                // endregion

                // region Подготовка полей специфичных отдельным типам
                switch (field.type) {
                    case "textarea":
                        if (field.nullValue === undefined) field.nullValue = "";
                        Component = FTextarea;
                        break;
                    case "string":
                        if (field.nullValue === undefined) field.nullValue = "";
                        break;
                    case "number":
                        if (field.nullValue === undefined) field.nullValue = 0;
                        Component = FNumber;
                        break;
                    case "select":
                        Component = FSelect;
                        field.options = field.options || [];
                        field.options_map = Helper.create_map(field.options, 'value');
                        break;
                    case "checkbox":
                        Component = FCheckbox;
                        break;
                    case "date":
                        Component = FDate;
                        field.format = DEFAULT_MOMENT_DATE_FORMAT;
                        break;
                    case "datetime":
                        Component = FDate;
                        field.format = DEFAULT_MOMENT_DATETIME_FORMAT;
                        break;
                    case "editor":
                        Component = FEditor;
                        break;
                    default: break;
                }
                if (field.nullValue === undefined) field.nullValue = null;
                // endregion

                return <Component key={key} {...params} />;
            });
        }}</FormContext.Consumer>
    }
};

Form.Fields.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string, // Подпись поля
        name: PropTypes.string, // Уникальный для формы текстовый идентификатор поля
        value: PropTypes.any, // Начальное значение поля
        hidden: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]), // Имеет приоритет перед show
        show: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
    })),
};

export default Form;