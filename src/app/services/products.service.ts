import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { ShowcaseElement } from "../models/showcase.model";

@Injectable()
export class ProductsService {

    constructor(private _apiService: ApiService) {}

    getShowcaseElements(): Observable<ShowcaseElement[]> {
        return this._apiService.getShowcaseElements();
    }

}