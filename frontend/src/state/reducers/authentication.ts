import { userConstants, UserState, UserTypes } from '../constants/user';

const defaultState = {
    loggingIn: false,
    loggedIn: true,
    registering: false,
    loggingOut: false,
};

export function authentication(state: UserState = defaultState, action: UserTypes): UserState {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                loggedIn: false,
                registering: false,
                loggingOut: false,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggingIn: false,
                loggedIn: true,
                registering: false,
                loggingOut: false,
                user: action.payload.user,
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggingIn: false,
                loggedIn: false,
                registering: false,
                loggingOut: false,
            };
        case userConstants.REGISTER_REQUEST:
            return {
                loggingIn: false,
                loggedIn: false,
                registering: true,
                loggingOut: false,
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                loggedIn: true,
                loggingIn: false,
                registering: false,
                loggingOut: false,
                user: action.payload.user,
            };
        case userConstants.REGISTER_FAILURE:
            return {
                loggingIn: false,
                loggedIn: false,
                registering: false,
                loggingOut: false,
            };
        case userConstants.LOGOUT_REQUEST:
            return {
                loggingOut: true,
                loggingIn: false,
                loggedIn: false,
                registering: false,
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                loggingIn: false,
                loggedIn: false,
                registering: false,
                loggingOut: false,
            };
        case userConstants.LOGOUT_FAILURE:
            return {
                loggingIn: false,
                loggedIn: false,
                registering: false,
                loggingOut: false,
            };
        default:
            return state;
    }
}
