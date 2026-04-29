export enum Role {
    GUEST,
    USER,
    ADMIN
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: Role;
}

export interface RegisterResponse {
    id: number;
}

export interface LoginResponse {
    user: User;
    token: string;
}
