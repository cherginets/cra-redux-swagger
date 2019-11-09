import React from 'react';

const FormContext = React.createContext({
    values: {},
    getValue: () => {},
    setValue: () => {},
});

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.setValue = (name, value) => {
            this.setState({
                values: {
                    ...this.state.values,
                    [name]: value,
                }
            })
        };

        this.state = {
            values: {},
            setValue: this.setValue,
        };
    }

    render() {
        console.log('this.props', this.props);

        return <FormContext.Provider value={this.state}>
            {this.props.children(this.state.values)}
        </FormContext.Provider>
    }

    static withForm = (WrappedComponent, selectData) => {
        return class extends React.Component {
            constructor(props) {
                super(props);
                // this.handleChange = this.handleChange.bind(this);
                console.log('this', this);
                this.state = {
                    // data: selectData(DataSource, props)
                };

                const formContextValue = React.useContext(FormContext);
                console.log('formContextValue', formContextValue);
            }

            componentWillUnmount() {
                // const formContextValue = React.useContext(FormContext);
                // console.log('formContextValue', formContextValue);
            }

            render() {
                return <FormContext.Consumer>
                    {(context) => {
                        console.log('context2', context);
                        return <WrappedComponent
                            setValue={(value) => {context.setValue(this.props.name, value)}}
                            {...this.props}
                        />
                    }}
                </FormContext.Consumer>;
            }
        };
    }
}

export default Form;