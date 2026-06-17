export enum ProductTypes {
    BUNDLE,
    BOX,
    SET,
    COLLECTION,
    TIN,
    PACK
}

export enum Games {
    POKEMON
}

export enum ProductLanguages {
    IT,
    EN
}

export enum OrderStatuses {
    PENDING,
    PAID,
    CANCELLED,
    FAILED,
    SHIPPED,
    COMPLETED
}

export interface Order {
    id: number;
    userId: number;
    total: number;
    status: OrderStatuses;
    createdAt: string;
    sessionId: string;
}

export interface Product {
    id: number;
    brand: string;
    name: string;
    price: number;
    description: string;
    availability: number;
    type: ProductTypes;
    game: Games;
    language: ProductLanguages;
    image_name: string;
}

export interface FavoriteProduct {
    id: number;
    userId: number;
    productId: number;
}

export interface ForcedFilters {
    games: Games[];
    types: ProductTypes[];
    languages: ProductLanguages[];
    ids: number[]
}

export interface Filters {
    games?: Games[];
    types?: ProductTypes[];
    languages?: ProductLanguages[];
    ids?: number[]
}