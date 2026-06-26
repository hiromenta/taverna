import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";

@Injectable()
export class UtilsService {

    allServicesLoaded = false;

    constructor() {}

    addToCart(item: Product, quantity: number) {
        const cart: { product: Product; quantity: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');

        if (cart.map(items => items.product.id).includes(item.id)) {
            if (item.availability !== -1 && cart.find(items => items.product.id === item.id)!.quantity + quantity > item.availability) {
                throw { id: item.id, error: 'ER_NO_AVAILABILITY' };
            }

            cart.find(items => items.product.id === item.id)!.quantity += quantity;
        } else {
            cart.push({ product: item, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        return cart;
    }

    removeFromCart(id: number) {
        const cart: { product: Product; quantity: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');

        if (cart.map(items => items.product.id).includes(id)) {
            cart.find(items => items.product.id === id)!.quantity--;
        } else {
            throw { id, error: 'ER_NO_ELEMENT' };
        }

        localStorage.setItem('cart', JSON.stringify(cart.filter(items => !!items.quantity)));

        return cart.filter(items => !!items.quantity);
    }

}