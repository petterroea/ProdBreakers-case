import { UserRequest, UserResponse, User } from '../../types';

export const userService = {
    login,
    register,
    logout,
};

async function login(user: UserRequest): Promise<User> {
    const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!res.ok) {
        throw new Error(`The server responded with an error code of ${res.status} (${res.statusText})`);
    }
    const resObj = await res.json();
    const resultUser: UserResponse = resObj.user;
    const resultToken: string = resObj.token;
    return {
        ...resultUser,
        token: resultToken,
    };
}

async function register(user: UserRequest): Promise<User> {
    const res = await fetch('/api/user/register', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...user,
            fullName: user.username,
        }),
    });
    if (!res.ok) {
        throw new Error(`The server responded with an error code of ${res.status} (${res.statusText})`);
    }
    const resObj = await res.json();
    const resultUser: UserResponse = resObj.user;
    const resultToken: string = resObj.token;
    return {
        ...resultUser,
        token: resultToken,
    };
}

async function logout() {
    console.log('Done');
}
