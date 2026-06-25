import { FavoriteProduct } from "./product.model";

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
    avatarUrl?: string;
    posterUrl?: string;
    subscriptionDate?: string;
    bio?: string;
    phone?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    firstName?: string;
    lastName?: string;
}

export interface RegisterResponse {
    id: number;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface FavoritesResponse {
    favorites: FavoriteProduct[];
}