import React from 'react';
import {render} from 'react-dom';
import './index.scss';
import store from './store'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PageTest from './pages/PageTest';
import PageHome from './pages/PageHome';
import Page404 from './pages/Page404';
import registerServiceWorker from './registerServiceWorker';
import Api from "./common/Api";

Api.init().then(() => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/test"} component={PageTest} />
                    <Route exact path={"/"} component={PageHome}/>
                    <Route path={"*"} component={Page404}/>
                </Switch>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );

    registerServiceWorker();
});
