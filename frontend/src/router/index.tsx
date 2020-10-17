import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

// History
import { historyObject } from './historyObject';

// Pages
import { Splash } from '../pages/splash';
import { Login } from '../pages/login';
import { Register } from '../pages/register';
import { VideoPlayerPage } from '../pages/player';
import { ReadyStreamPage } from '../pages/stream';

export const RouterComponent: React.FC = () => {
    return (
        <Router history={historyObject}>
            <Switch>
                <Route exact path="/" component={Splash} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/player/:uuid" component={VideoPlayerPage} />
                <Route exact path="/stream/:uuid" component={ReadyStreamPage} />
            </Switch>
        </Router>
    );
};
