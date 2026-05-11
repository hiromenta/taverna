import { Component } from "@angular/core";
import { Games, Product, ProductLanguages, ProductTypes } from "../../models/product.model";
import { LoaderService } from "../../services/loader.service";
import { ProductsService } from "../../services/products.service";
import { NotificationsService } from "../../services/notification.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ControlType, MyForm } from "../../models/form.model";
import { switchMap } from "rxjs";

@UntilDestroy()
@Component({
    selector: 'my-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

    products: Product[] = [];

    gamesForm: MyForm = { controls: [] };
    typesForm: MyForm = { controls: [] };
    languagesForm: MyForm = { controls: [] };

    private _games: { id: Games; description: string }[] = [];
    private _types: { id: ProductTypes; description: string }[] = [];
    private _languages: { id: ProductLanguages; description: string }[] = [];

    constructor(private _loaderService: LoaderService, private _productsService: ProductsService, private _notificationsService: NotificationsService) {}

    ngOnInit(): void {
        this._loaderService.show();

        this._productsService.getGames()
            .pipe(
                switchMap((games) => {
                    this._games = (games as { games: { id: number; description: string }[] }).games || [];
                    this.gamesForm.controls.push(...(games as { games: { id: number; description: string }[] }).games.map((game) => ({ selector: game.description, type: ControlType.CHECKBOX, description: game.description, errors: [] })));
                    return this._productsService.getGameTypes();
                }),
                switchMap((types) => {
                    this._types = (types as { types: { id: number; description: string }[] }).types || [];
                    this.typesForm.controls.push(...(types as { types: { id: number; description: string }[] }).types.map((type) => ({ selector: type.description, type: ControlType.CHECKBOX, description: 'products.' + type.description, errors: [] })));
                    return this._productsService.getGameLanguages();
                }),
                switchMap((languages) => {
                    this._languages = (languages as { languages: { id: number; description: string }[] }).languages || [];
                    this.languagesForm.controls.push(...(languages as { languages: { id: number; description: string }[] }).languages.map((language) => ({ selector: language.description, type: ControlType.CHECKBOX, description: 'products.languages.' + language.description, errors: [] })));
                    return this._productsService.getProducts({ games: this._getFilters().gamesFilters, types: this._getFilters().typesFilters, languages: this._getFilters().languagesFilters });
                }),
                untilDestroyed(this)
            )
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    this.products = (res as { products: Product[], size: number })?.products || [];
                },
                error: (err) => {
                    this._loaderService.hide();

                    if (err.error.code !== 'ER_NO_ITEMS') {
                        this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                    } else {
                        this.products = [];
                    }
                }
            });
    }

    updateSearch() {
        this._loaderService.show();

        this._productsService.getProducts({ games: this._getFilters().gamesFilters, types: this._getFilters().typesFilters, languages: this._getFilters().languagesFilters })
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    this.products = (res as { products: Product[], size: number })?.products || [];
                },
                error: (err) => {
                    this._loaderService.hide();

                    if (err.error.code !== 'ER_NO_ITEMS') {
                        this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                    } else {
                        this.products = [];
                    }
                }
            });
    }

    private _getFilters() {
        const gamesFilters: Games[] = [];
        const typesFilters: ProductTypes[] = [];
        const languagesFilters: ProductLanguages[] = [];

        for (const [key, value] of Object.entries(this.gamesForm.value || {})) {
            if (value) {
                gamesFilters.push(this._games.find(g => g.description === key)!.id);
            }
        }

        for (const [key, value] of Object.entries(this.typesForm.value || {})) {
            if (value) {
                typesFilters.push(this._types.find(t => t.description === key)!.id);
            }
        }

        for (const [key, value] of Object.entries(this.languagesForm.value || {})) {
            if (value) {
                languagesFilters.push(this._languages.find(l => l.description === key)!.id);
            }
        }

        return { gamesFilters, typesFilters, languagesFilters };
    }

}