import { User } from "./user.model";

export interface Api {
    selector: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    delay?: number;
}

export interface ApiOptions {
    body?: any;
    headers?: { [header: string]: string | string[] };
    params?: { [param: string]: string | string[] };
    queryParams?: { [queryParam: string]: string | string[] };
}

export interface ErrorResponse {
    code: string;
    errno: number;
}

export interface RegisterResponse {
    id: number;
}

export interface LoginResponse {
    user: User;
    token: string;
}