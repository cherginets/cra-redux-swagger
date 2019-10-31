import React from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter, Switch} from 'react-router-dom';
import store from 'src/store'

import AppRoute from "src/layout/AppRoute";
import InitLayout from "src/layout/InitLayout";
import LoginLayout from "src/layout/LoginLayout";

import PageLogin from 'src/pages/PageLogin';
import PageTest from 'src/pages/PageTest';
import PageHome from 'src/pages/PageHome';
import Page404 from 'src/pages/Page404';

const Routes = <Provider store={store}>
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
</Provider>;

export default Routes;