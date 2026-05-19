import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { Subject } from "rxjs";

export type Sidebar = 'favorites' | 'cart';

@Injectable()
export class SidebarService {

    private _products: Product[] = [];

    changeSidebar$ = new Subject<Sidebar | null>();

    constructor() {}

    get products() {
        return this._products;
    }

    showFavorites() {
        this.changeSidebar$.next('favorites');
    }

    showCart() {
        this.changeSidebar$.next('cart');
    }

    close() {
        this.changeSidebar$.next(null);
    }

}