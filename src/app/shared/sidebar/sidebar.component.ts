import { Component, OnInit } from "@angular/core";
import { Sidebar, SidebarService } from "../../services/sidebar.service";
import { Product } from "../../models/product.model";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'my-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    showing?: Sidebar;
    closing = false;

    products: { product: Product; quantity: number }[] = [];

    constructor(private _sidebarService: SidebarService, private _userService: UserService) {}

    ngOnInit(): void {
        this._sidebarService.changeSidebar$.subscribe(res => {
            if (!res) {
                this._close();
            } else {
                this._open(res);
            }
        });
    }

    close() {
        this._sidebarService.close();
    }

    remove(id: number) {
        switch (this.showing) {
            case 'cart':
                this._removeCart(id);
                break
            case 'favorites':
                this._removeFavorite(id);
                break
        }
    }

    private _removeFavorite(id: number) {}

    private _removeCart(id: number) {
        const product = this.products.find(p => p.product.id === id);

        if (product) {
            product.quantity--;
        }

        if (product!.quantity <= 0) {
            const idx = this.products.findIndex(p => p.product.id === id);
            this.products.splice(idx, 1);
        }

        localStorage.setItem('cart', JSON.stringify(this.products));
    }

    private _close() {
        this.closing = true;

        setTimeout(() => {
            this.showing = undefined;
            this.closing = false;
        }, 501);
    }

    private _open(type: Sidebar) {
        this.showing = type;

        switch (type) {
            case 'cart':
                this.products = JSON.parse(localStorage.getItem('cart') || '[]');
                break
            case 'favorites':
                // this.products = this._userService.favorites;
                break
        }
    }

}