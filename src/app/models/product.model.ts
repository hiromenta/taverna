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
}