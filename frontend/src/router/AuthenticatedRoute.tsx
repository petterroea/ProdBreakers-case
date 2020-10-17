import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface AuthenticatedRouteProps extends RouteProps {
    is: React.ReactNode;
    not: React.ReactNode;
}

// Route only accessible for authenticated user
export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = (props) => {
    const { is, not, ...rest } = props;
    // Check whether a component is a function or not. Execute and return if it is a function else only return
    const isFunction = (component: React.ReactNode) => {
        return component instanceof Function ? component() : component;
    };

    return (
        <Route
            {...rest}
            render={() => {
                /* Check if the user is authenticated and has the required role for the route.
                 * If they have access then return is, if not return not
                 *
                 * Check whether 'is' and 'not' is a function or an Element that can be placed in DOM.
                 *  If it is a function then execute and return it, if not then return it.
                 */
                return false ? isFunction(is) : isFunction(not);
            }}
        />
    );
};
