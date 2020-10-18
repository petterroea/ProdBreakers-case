import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { NavigationElement } from './NavigationElement';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../state/reducers';

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
    const authSelector = useSelector((state: RootStateType) => state.authentication);
    // On click function for the navigation elements to change location
    const onClick = (location: string) => {
        history.push(location);
    };

    return (
        <Nav>
            {authSelector && authSelector.user ? (
                <>
                    <NavigationElement
                        text={'New Lecture'}
                        location={'/new/stream'}
                        selected={history.location.pathname === '/new/stream'}
                        onClick={onClick}
                    />
                    <NavigationElement
                        text={'Lectures'}
                        location={'/lectures'}
                        selected={history.location.pathname === '/lectures'}
                        onClick={onClick}
                    />
                    <NavigationElement
                        text={'Join Lecture'}
                        location={'/join/stream'}
                        selected={history.location.pathname === '/join/stream'}
                        onClick={onClick}
                    />
                </>
            ) : (
                <>
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
                </>
            )}
        </Nav>
    );
};
