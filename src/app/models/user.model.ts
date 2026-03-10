export enum Role {
    GUEST,
    USER,
    ADMIN
}

export interface User {
    nickname: string;
    email: string;
    role: Role;
}