import { NgModule } from "@angular/core";
import { ConfigService } from "./config.service";
import { UtilsService } from "./utils.service";
import { HttpClientModule } from "@angular/common/http";
import { FeaturesService } from "./features.service";
import { ThemesService } from "./themes.service";
import { TranslateService } from "./translate.service";
import { LoaderService } from "./loader.service";
import { ProductsService } from "./products.service";
import { NotificationsService } from "./notification.service";
import { UserService } from "./user.service";
import { SidebarService } from "./sidebar.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        ConfigService,
        UtilsService,
        FeaturesService,
        ThemesService,
        TranslateService,
        LoaderService,
        UserService,
        ProductsService,
        NotificationsService,
        SidebarService
    ]
})
export class ServicesModule {}