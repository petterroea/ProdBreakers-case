import * as React from 'react';
import styled from 'styled-components';
import { Navigation } from './Navigation';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    background-color: #171717;
`;

const LogoWrapper = styled(Link)`
    height: 100%;
    margin-right: 115px;
    margin-left: 10px;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        display: none;
    }
`;

const Logo = styled.h1`
    margin: 0;
`;

/**
 * Header component for the Dashboard
 */
export const Header: React.FC = () => {
    return (
        <StyledHeader>
            <LogoWrapper to="/">
                <Logo>Placeholder</Logo>
            </LogoWrapper>
            <Navigation />
        </StyledHeader>
    );
};
