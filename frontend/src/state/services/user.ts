import { UserRequest } from '../../types';

export const userService = {
    login,
    register,
    logout,
};

async function login(user: UserRequest) {
    return {
        username: 'Test',
        token: 'test',
    };
}

async function register(user: UserRequest) {
    return {
        username: 'Test',
        token: 'test',
    };
}

async function logout() {
    console.log('Done');
}
