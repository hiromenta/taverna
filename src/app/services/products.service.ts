import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ShowcaseElement } from "../models/showcase.model";
import { ApiConfig } from "../config/api.config";
import { Filters, ForcedFilters, Product } from "../models/product.model";
import { ErrorResponse } from "../models/api.model";

@Injectable()
export class ProductsService {

    constructor(private _apiConfig: ApiConfig) {}

    getShowcaseElements(): Observable<ShowcaseElement[] | ErrorResponse> {
        return of([
            { id: 0, name: 'gcc-pokemon-ascesa-eroica.png', redirectUrl: '' },
            { id: 1, name: 'magic.png', redirectUrl: '' },
            { id: 2, name: 'gcc-pokemon-ascesa-eroica.png', redirectUrl: '' },
            { id: 3, name: 'magic.png', redirectUrl: '' },
            { id: 4, name: 'gcc-pokemon-ascesa-eroica.png', redirectUrl: '' },
            { id: 5, name: 'magic.png', redirectUrl: '' }
        ]);
        return this._apiConfig.send('getShowcaseElements');
    }

    getProduct(id: number): Observable<Product | ErrorResponse> {
        return this._apiConfig.send('product', { queryParams: { id } });
    }

    getProducts(filters?: Filters): Observable<{ products: Product[]; size: number } | ErrorResponse> {
        const parsedFilters = filters || { games: [], types: [], languages: [], ids: [] };

        if (!parsedFilters.games) {
            parsedFilters.games = [];
        }

        if (!parsedFilters.types) {
            parsedFilters.types = [];
        }

        if (!parsedFilters.languages) {
            parsedFilters.languages = [];
        }

        if (!parsedFilters.ids) {
            parsedFilters.ids = [];
        }

        return this._getProducts(parsedFilters as ForcedFilters);
    }

    private _getProducts(filters: ForcedFilters): Observable<{ products: Product[]; size: number } | ErrorResponse> {
        return this._apiConfig.send('products', { body: filters });
    }

    getFeaturedProducts(): Observable<{ products: Product[]; size: number } | ErrorResponse> {
        return this._apiConfig.send('featuredProducts');
    }

    getGames(): Observable<{ games: { id: number; description: string }[] } | ErrorResponse> {
        return this._apiConfig.send('games');
    }

    getGameTypes(): Observable<{ types: { id: number; description: string }[] } | ErrorResponse> {
        return this._apiConfig.send('types');
    }

    getGameLanguages(): Observable<{ languages: { id: number; description: string }[] } | ErrorResponse> {
        return this._apiConfig.send('languages');
    }

    createCheckoutSession(products: { product: Product, quantity: number }[]) {
        return this._apiConfig.send('createCheckout', { body: { products } });
    }

}