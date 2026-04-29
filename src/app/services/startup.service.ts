import { Injectable } from "@angular/core";
import { forkJoin } from "rxjs";
import { Themes } from "../models/themes.model";
import { ThemesService } from "./themes.service";
import { TranslateService } from "./translate.service";

@Injectable()
export class StartupService {

    constructor(private _themesService: ThemesService, private _translateService: TranslateService) {}

    loadAll() {
        forkJoin([
            this._themesService.changeTheme(this._themesService.getCurrentTheme().name as Themes),
            this._translateService.setLanguage(this._translateService.getCurrentLanguageCode())
        ]).subscribe();
    }

}