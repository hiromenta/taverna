import { NgModule } from "@angular/core";
import { ConfigService } from "./config.service";
import { UtilsService } from "./utils.service";
import { HttpClientModule } from "@angular/common/http";
import { FeaturesService } from "./features.service";
import { ThemesService } from "./themes.service";
import { TranslateService } from "./translate.service";
import { LoaderService } from "./loader.service";
import { AuthService } from "./auth.service";
import { ProductsService } from "./products.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        ConfigService,
        UtilsService,
        FeaturesService,
        ThemesService,
        TranslateService,
        LoaderService,
        AuthService,
        ProductsService
    ]
})
export class ServicesModule {}