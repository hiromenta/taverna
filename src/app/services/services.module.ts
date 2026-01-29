import { NgModule } from "@angular/core";
import { ConfigService } from "./config.service";
import { ApiService } from "./api.service";
import { HttpClientModule } from "@angular/common/http";
import { FeaturesService } from "./features.service";
import { ThemesService } from "./themes.service";
import { TranslateService } from "./translate.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        ConfigService,
        ApiService,
        FeaturesService,
        ThemesService,
        TranslateService
    ]
})
export class ServicesModule {}