import { Injectable } from "@angular/core";
import { Observable, of, Subject, tap } from "rxjs";
import { ApiConfig } from "../config/api.config";
import { ErrorResponse } from "../models/api.model";
import { FavoritesResponse, LoginResponse, RegisterResponse, Role, User } from "../models/user.model";
import { FavoriteProduct } from "../models/product.model";

@Injectable()
export class UserService {

    authenticated = false;
    user?: User;
    favorites: number[] = [];

    roleChanged$: Subject<Role> = new Subject<Role>();

    constructor(private _apiConfig: ApiConfig) {}

    private _sanitizeUser() {
        if (!this.user) {
            return;
        }

        if (['null', 'undefined', null, undefined].includes(this.user.address)) {
            this.user.address = '';
        }
        if (['null', 'undefined', null, undefined].includes(this.user.avatarUrl)) {
            this.user.avatarUrl = '';
        }
        if (['null', 'undefined', null, undefined].includes(this.user.bio)) {
            this.user.bio = '';
        }
        if (['null', 'undefined', null, undefined].includes(this.user.phone)) {
            this.user.phone = '';
        }
        if (['null', 'undefined', null, undefined].includes(this.user.posterUrl)) {
            this.user.posterUrl = '';
        }
        if (['null', 'undefined', null, undefined].includes(this.user.subscriptionDate)) {
            this.user.subscriptionDate = '';
        }
    }

    login(body: { usermail: string, password: string }): Observable<LoginResponse | ErrorResponse> {
        return this._apiConfig.send('login', { body }).pipe(
            tap(res => {
                if ((res as LoginResponse)?.token) {
                    sessionStorage.setItem('token', (res as LoginResponse)?.token);

                    this.authenticated = true;
                    this.user = (res as LoginResponse)?.user;

                    this._sanitizeUser();

                    this.roleChanged$.next(this.user.role);
                }
            }
        ));
    }

    logout() {
        sessionStorage.setItem('token', '');

        this.authenticated = false;
        this.user = undefined;

        this.roleChanged$.next(Role.GUEST);
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

    getUserData() {
        const token = sessionStorage.getItem('token');

        if (!token) {
            return of(null);
        }

        return this._apiConfig.send('user').pipe(
            tap(res => {
                this.authenticated = true;
                this.user = (res as LoginResponse)?.user;

                this._sanitizeUser();

                this.roleChanged$.next(this.user.role);
            }
        ));
    }

    uploadAvatar(file: File) {
        const formData = new FormData();

        formData.append('avatar', file);

        return this._apiConfig.send('avatar', { body: formData } );
    }

    uploadPoster(file: File) {
        const formData = new FormData();

        formData.append('poster', file);

        return this._apiConfig.send('poster', { body: formData } );
    }

    updateUser(data: { username?: string, email?: string, phone?: string, bio?: string, address?: string }) {
        const token = sessionStorage.getItem('token');

        if (!token) {
            return of(null);
        }

        const sanified = {
            username: data.username || this.user?.username,
            email: data.email || this.user?.email,
            phone: data.phone?.replaceAll(' ', '').replaceAll('-', '') || this.user?.phone,
            bio: data.bio || this.user?.bio,
            address: data.address || this.user?.address
        };

        return this._apiConfig.send('updateUser', { body: { ...sanified } } );
    }

    getOrders() {
        return this._apiConfig.send('getOrders');
    }

}