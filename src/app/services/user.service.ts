import { Injectable } from "@angular/core";
import { Observable, of, Subject, tap } from "rxjs";
import { ApiConfig } from "../config/api.config";
import { ErrorResponse } from "../models/api.model";
import { FavoritesResponse, LoginResponse, RegisterResponse, Role, User } from "../models/user.model";
import { FavoriteProduct, Product } from "../models/product.model";

@Injectable()
export class UserService {

    authenticated = false;
    user?: User;
    favorites: number[] = [];

    roleChanged$: Subject<Role> = new Subject<Role>();

    constructor(private _apiConfig: ApiConfig) {}

    login(body: { usermail: string, password: string }): Observable<LoginResponse | ErrorResponse> {
        return this._apiConfig.send('login', { body }).pipe(tap(res => {
            if ((res as LoginResponse)?.token) {
                sessionStorage.setItem('token', (res as LoginResponse)?.token);

                this.authenticated = true;
                this.user = (res as LoginResponse)?.user;

                this.roleChanged$.next(this.user.role);
            }
        }));
    }

    register(body: { username?: string; email: string; password: string }): Observable<RegisterResponse | ErrorResponse> {
        return this._apiConfig.send('register', { body });
    }

    getFavorites(): Observable<FavoritesResponse | ErrorResponse> {
        return this._apiConfig.send('favorites', { queryParams: { userId: this.user?.id || -1 } }).pipe(tap(res => {
            if ((res as FavoritesResponse)?.favorites?.length) {
                this.favorites = (res as FavoritesResponse)?.favorites?.map(f => f.productId);
            }
        }));
    }

    addFavorite(productId: number): Observable<FavoriteProduct | ErrorResponse> {
        return this._apiConfig.send('addFavorite', { body: { userId: this.user?.id || -1, productId } } );
    }

    removeFavorite(productId: number): Observable<FavoriteProduct | ErrorResponse> {
        return this._apiConfig.send('removeFavorite', { queryParams: { userId: this.user?.id || -1, productId } } );
    }

}