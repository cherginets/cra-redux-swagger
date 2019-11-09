import React from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter, Switch} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react'
import store from 'src/store'

import AppRoute from "src/pages/layout/AppRoute";
import InitLayout from "src/pages/layout/InitLayout";
import LoginLayout from "src/pages/layout/LoginLayout";

import PageLogin from 'src/pages/PageLogin';
import PageSamples from 'src/pages/PageSamples';
import PageHome from 'src/pages/PageHome';
import Page404 from 'src/pages/Page404';
import {persistor} from "./persistor";
import PageForms from "./pages/PageForms";

const Routes = <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <Switch>
                {/* Авторизация */}
                <AppRoute layout={LoginLayout} exact path={"/login"} component={PageLogin}/>

                {/* Рабочий интерфейс */}
                <AppRoute layout={InitLayout} exact path={"/"} component={PageHome}/>
                <AppRoute layout={InitLayout} exact path={"/samples"} component={PageSamples}/>
                <AppRoute layout={InitLayout} exact path={"/forms"} component={PageForms}/>

                <AppRoute layout={InitLayout} path={"*"} component={Page404}/>
            </Switch>
        </BrowserRouter>
    </PersistGate>
</Provider>;

export default Routes;

// Небольшой костыль что бы избавиться от надоедливого варнинга
// https://github.com/nfl/react-helmet/issues/426#issuecomment-547583689
if (process.env.NODE_ENV === 'development') {
    const ignorePatterns = [
        'Warning: componentWillMount',
        'Warning: componentWillReceiveProps',
        'Warning: componentWillUpdate ',
        'SideEffect(NullComponent)',
    ];

    const { warn } = console;

    console.warn = function (...labels) {
        if (ignorePatterns.every((i) => !labels[0].includes(i))) {
            warn(...labels);
        }
    };
}