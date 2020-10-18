import React from 'react';
import logo from '../../assets/logo.svg';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
    text-align: center;
    width: 100%;
`;

const Header = styled.header`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const AppLogoSpin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const Logo = styled.img`
    height: 40vmin;
    pointer-events: none;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${AppLogoSpin} infinite 20s linear;
    }
`;

const Link = styled.a`
    color: #61dafb;
`;

export const Splash = () => {
    return (
        <Wrapper>
            <Header>
                <Logo src={logo} alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <Link href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </Link>
            </Header>
        </Wrapper>
    );
};
