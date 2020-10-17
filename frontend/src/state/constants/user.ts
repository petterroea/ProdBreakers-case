import { User } from '../../types';

export enum userConstants {
    LOGIN_REQUEST = 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE = 'USERS_LOGIN_FAILURE',
    REGISTER_REQUEST = 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE = 'USERS_REGISTER_FAILURE',
    LOGOUT_REQUEST = 'USERS_LOGOUT_REQUEST',
    LOGOUT_SUCCESS = 'USERS_LOGOUT_SUCCESS',
    LOGOUT_FAILURE = 'USERS_LOGOUT_FAILURE',
}

export interface UserState {
    loggingIn: boolean;
    loggedIn: boolean;
    registering: boolean;
    loggingOut: boolean;
    user?: User;
}

export interface Error {
    message: string;
}

interface LoginRequestAction {
    type: userConstants.LOGIN_REQUEST;
}

interface LoginSuccsessAction {
    type: userConstants.LOGIN_SUCCESS;
    payload: {
        user: User;
    };
}

interface LoginFailureAction {
    type: userConstants.LOGIN_FAILURE;
    error: Error;
}

interface RegisterRequestAction {
    type: userConstants.REGISTER_REQUEST;
}

interface RegisterSuccessAction {
    type: userConstants.REGISTER_SUCCESS;
    payload: {
        user: User;
    };
}

interface RegisterFailureAction {
    type: userConstants.REGISTER_FAILURE;
}

interface LogoutRequestAction {
    type: userConstants.LOGOUT_REQUEST;
}

interface LogoutSuccessAction {
    type: userConstants.LOGOUT_SUCCESS;
    payload: {
        user: User;
    };
}

interface LogoutFailureAction {
    type: userConstants.LOGOUT_FAILURE;
}

export type UserTypes =
    | LoginRequestAction
    | LoginSuccsessAction
    | LoginFailureAction
    | RegisterRequestAction
    | RegisterSuccessAction
    | RegisterFailureAction
    | LogoutRequestAction
    | LogoutSuccessAction
    | LogoutFailureAction;
