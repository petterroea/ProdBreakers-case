import React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import styled from 'styled-components';

// History
import { historyObject } from './historyObject';
import { AuthenticatedRoute } from './AuthenticatedRoute';

import { Header } from '../components/header';

// Pages
import { Splash } from '../pages/splash';
import { Login } from '../pages/login';
import { Register } from '../pages/register';
import { VideoPlayerPage } from '../pages/player';
import { ReadyStreamPage } from '../pages/stream';
import { LecturesPage } from '../pages/lectures';
import { NewStream } from '../pages/newStream';

const Body = styled.div`
    height: Calc(100% - 80px);
    width: 100%;
    display: flex;
    position: relative;
`;

export const RouterComponent: React.FC = () => {
    return (
        <Router history={historyObject}>
            <Switch>
                <Route
                    path="/"
                    render={(props) => (
                        <>
                            <Header />
                            <Body>
                                <Route exact path="/" component={Splash} />
                                <AuthenticatedRoute exact path="/login" not={<Login />} is={<Redirect to="/" />} />
                                <AuthenticatedRoute
                                    exact
                                    path="/register"
                                    not={<Register />}
                                    is={<Redirect to="/" />}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path="/new/stream"
                                    not={<Redirect to="/" />}
                                    is={<NewStream />}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path="/lectures"
                                    not={<Redirect to="/" />}
                                    is={<LecturesPage />}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path="/player/:uuid"
                                    not={<Redirect to="/" />}
                                    is={<VideoPlayerPage />}
                                />
                                <AuthenticatedRoute
                                    path="/stream/:uuid"
                                    not={<Redirect to="/" />}
                                    is={<ReadyStreamPage />}
                                />
                            </Body>
                        </>
                    )}
                />
            </Switch>
        </Router>
    );
};
