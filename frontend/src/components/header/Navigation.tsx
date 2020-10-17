import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { NavigationElement } from './NavigationElement';

const Nav = styled.nav`
    display: flex;
    flex: 1;

    @media screen and (max-width: 1200px) {
        margin-left: 20px;
    }
`;

/**
 * Navigation bar for the header
 */
export const Navigation: React.FC = () => {
    // History instance
    const history = useHistory();
    // On click function for the navigation elements to change location
    const onClick = (location: string) => {
        history.push(location);
    };

    console.log(history.location.pathname);

    return (
        <Nav>
            <NavigationElement
                text={'New Stream'}
                location={'/stream/new'}
                selected={history.location.pathname === '/stream/new'}
                onClick={onClick}
            />
            <NavigationElement
                text={'Login'}
                location={'/login'}
                selected={history.location.pathname === '/login'}
                onClick={onClick}
            />
            <NavigationElement
                text={'Register'}
                location={'/register'}
                selected={history.location.pathname === '/register'}
                onClick={onClick}
            />
        </Nav>
    );
};
