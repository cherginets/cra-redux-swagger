import React from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter, Switch} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react'
import store from 'src/store'

import AppRoute from "src/pages/layout/AppRoute";
import InitLayout from "src/pages/layout/InitLayout";
import LoginLayout from "src/pages/layout/LoginLayout";

import PageLogin from 'src/pages/PageLogin';
import PageTest from 'src/pages/PageTest';
import PageHome from 'src/pages/PageHome';
import Page404 from 'src/pages/Page404';
import {persistor} from "./persistor";

const Routes = <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <Switch>
                {/* Авторизация */}
                <AppRoute layout={LoginLayout} exact path={"/login"} component={PageLogin}/>

                {/* Рабочий интерфейс */}
                <AppRoute layout={InitLayout} exact path={"/"} component={PageHome}/>
                <AppRoute layout={InitLayout} exact path={"/test"} component={PageTest}/>

                <AppRoute layout={InitLayout} path={"*"} component={Page404}/>
            </Switch>
        </BrowserRouter>
    </PersistGate>
</Provider>;

export default Routes;