import { userConstants, Error } from '../constants/user';
import { userService } from '../services/user';
import { User, UserRequest } from '../../types';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

export const userActions = {
    login,
    register,
    logout,
};

function login(user: UserRequest): ThunkAction<void, unknown, unknown, Action<string>> {
    return (dispatch) => {
        dispatch(request());

        userService
            .login(user)
            .then((user: User) => {
                dispatch(success(user));
            })
            .catch((error) => {
                dispatch(failure(error));
            });
    };

    function request() {
        return { type: userConstants.LOGIN_REQUEST };
    }
    function success(user: User) {
        return { type: userConstants.LOGIN_SUCCESS, payload: { user } };
    }
    function failure(error: Error) {
        return { type: userConstants.LOGIN_FAILURE, error };
    }
}

function register(user: UserRequest): ThunkAction<void, unknown, unknown, Action<string>> {
    return (dispatch) => {
        dispatch(request());

        userService
            .register(user)
            .then((user: User) => {
                dispatch(success(user));
            })
            .catch((error) => {
                dispatch(failure(error));
            });
    };

    function request() {
        return { type: userConstants.REGISTER_REQUEST };
    }
    function success(user: User) {
        return { type: userConstants.REGISTER_SUCCESS, payload: { user } };
    }
    function failure(error: Error) {
        return { type: userConstants.REGISTER_FAILURE, error };
    }
}

function logout(): ThunkAction<void, unknown, unknown, Action<string>> {
    return (dispatch) => {
        dispatch(request());

        userService
            .logout()
            .then(() => {
                dispatch(success());
            })
            .catch((error) => {
                dispatch(failure(error));
            });
    };

    function request() {
        return { type: userConstants.LOGOUT_REQUEST };
    }
    function success() {
        return { type: userConstants.LOGOUT_SUCCESS };
    }
    function failure(error: Error) {
        return { type: userConstants.LOGOUT_FAILURE, error };
    }
}
