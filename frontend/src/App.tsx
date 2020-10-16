import React from 'react';
import { RouterComponent as Router } from './router';
import { GlobalStyle } from './global-styles';

const App = () => {
    return (
        <>
            <Router />
            <GlobalStyle />
        </>
    );
};

export default App;
