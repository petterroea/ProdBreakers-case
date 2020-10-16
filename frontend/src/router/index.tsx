import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

// History
import { historyObject } from './historyObject';

// Pages
import { Splash } from '../pages/splash';

export const RouterComponent: React.FC = () => {
    return (
        <Router history={historyObject}>
            <Switch>
                <Route exact path="/" component={Splash} />
            </Switch>
        </Router>
    );
};
