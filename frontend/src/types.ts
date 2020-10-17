export interface UserRequest {
    username: string;
    password: string;
}

export interface UserResponse {
    username: string;
    fullName: string;
    userType: number;
    uuid: string;
}

export interface User {
    username: string;
    fullName: string;
    userType: number;
    uuid: string;
    token: string;
}
