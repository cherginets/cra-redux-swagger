import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import store from 'src/store'
import AppRoute from "src/layout/AppRoute";
import 'src/index.scss';

import PageTest from 'src/pages/PageTest';
import PageHome from 'src/pages/PageHome';
import Page404 from 'src/pages/Page404';
import InitLayout from "./layout/InitLayout";

render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <AppRoute layout={InitLayout} exact path={"/test"} component={PageTest}/>
                <AppRoute layout={InitLayout} exact path={"/"} component={PageHome}/>
                <AppRoute layout={InitLayout} path={"*"} component={Page404}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
