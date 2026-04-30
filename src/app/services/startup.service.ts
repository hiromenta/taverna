import { Injectable } from "@angular/core";
import { firstValueFrom, forkJoin } from "rxjs";
import { Themes } from "../models/themes.model";
import { ThemesService } from "./themes.service";
import { TranslateService } from "./translate.service";
import { UtilsService } from "./utils.service";

@Injectable({ providedIn: 'root' })
export class StartupService {

    constructor(private _utilsService: UtilsService, private _themesService: ThemesService, private _translateService: TranslateService) {}

    loadAll(): Promise<void> {
        return firstValueFrom(
            forkJoin([
                this._themesService.changeTheme(this._themesService.getCurrentTheme().name as Themes),
                this._translateService.setLanguage(this._translateService.getCurrentLanguageCode())
            ])
        ).then(res => {
            this._utilsService.allServicesLoaded = true;
        });
    }

}