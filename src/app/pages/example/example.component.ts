import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { FeaturesService } from "../../services/features.service";
import { Role } from "../../models/feature.model";
import { ThemesService } from "../../services/themes.service";
import { TranslateService } from "../../services/translate.service";
import { LanguageCode } from "../../models/language.model";

@Component({
    selector: 'my-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

    constructor(
        private _apiService: ApiService,
        private _featuresService: FeaturesService,
        private _themesService: ThemesService,
        private _translateService: TranslateService
    ) {}

    ngOnInit(): void {
        console.log(this._themesService.getCurrentTheme());
        setTimeout(() => {
            this._translateService.setLanguage(LanguageCode.ENGLISH).subscribe()
        }, 1000)
        setTimeout(() => {
            this._translateService.setLanguage(LanguageCode.ITALIAN).subscribe()
        }, 2000)
        this._apiService.test().subscribe(res => {
            console.log(res);
        });
        this._featuresService.isFeatureActive('example').subscribe(res => {
            console.log(res);
        });
        this._featuresService.isFeatureActive('example3').subscribe(res => {
            console.log(res);
        });
        this._featuresService.isFeatureActive('example2').subscribe(res => {
            console.log(res);
        });
        this._featuresService.isFeatureActive('example', Role.ADMIN).subscribe(res => {
            console.log(res);
        });
    }

}