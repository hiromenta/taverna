import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ShowcaseElement } from "../models/showcase.model";
import { ApiConfig } from "../config/api.config";
import { Product } from "../models/product.model";
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

    getProducts(): Observable<{ products: Product[]; size: number } | ErrorResponse> {
        return this._apiConfig.send('products');
    }

}