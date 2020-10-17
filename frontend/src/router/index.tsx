import React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';

// History
import { historyObject } from './historyObject';
import { AuthenticatedRoute } from './AuthenticatedRoute';

// Pages
import { Splash } from '../pages/splash';
import { Login } from '../pages/login';
import { Register } from '../pages/register';
import { VideoPlayerPage } from '../pages/player';
import { ReadyStreamPage } from '../pages/stream';
import { LecturesPage } from '../pages/lectures';

export const RouterComponent: React.FC = () => {
    return (
        <Router history={historyObject}>
            <Switch>
                <Route exact path="/" component={Splash} />
                <AuthenticatedRoute exact path="/login" not={<Login />} is={<Redirect to="/" />} />
                <AuthenticatedRoute exact path="/register" not={<Register />} is={<Redirect to="/" />} />
                <Route exact path="/lectures" component={LecturesPage} />
                <Route exact path="/player/:uuid" component={VideoPlayerPage} />
                <Route exact path="/stream/:uuid" component={ReadyStreamPage} />
            </Switch>
        </Router>
    );
};
