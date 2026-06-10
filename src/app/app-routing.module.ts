import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { FeatureGuard } from './guards/feature.guard';
import { ProductComponent } from './pages/shop/product/product.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ShopMenuComponent } from './pages/shop/shop-menu/shop-menu.component';
import { LiveComponent } from './pages/live/live.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/user.model';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { EditProfileComponent } from './pages/user/edit-profile/edit-profile.component';

export enum Paths {
  HOME = 'home',
  LOGIN = 'login',
  REGISTER = 'register',
  SHOP = 'shop',
  PRODUCT = 'product',
  SHOP_MENU = 'shop-menu',
  LIVE = 'live',
  USER = 'user',
  PROFILE = 'profile',
  EDIT_PROFILE = 'edit-profile',
  NOT_FOUND = '404'
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [FeatureGuard],
    data: {
      grantAll: true,
      breadcrumbs: [Paths.HOME]
    }
  },
  {
    path: Paths.LOGIN,
    component: LoginComponent,
    canActivate: [FeatureGuard],
    data: {
      grant: [Role.GUEST],
      breadcrumbs: [Paths.LOGIN]
    }
  },
  {
    path: Paths.REGISTER,
    component: RegisterComponent,
    canActivate: [FeatureGuard],
    data: {
      grant: [Role.GUEST],
      breadcrumbs: [Paths.REGISTER]
    }
  },
  {
    path: Paths.SHOP,
    component: ShopComponent,
    canActivate: [FeatureGuard],
    data: {
      grantAll: true,
      breadcrumbs: [Paths.SHOP]
    }
  },
  {
    path: Paths.SHOP + '/' + Paths.PRODUCT,
    component: ProductComponent,
    canActivate: [FeatureGuard],
    data: {
      grantAll: true,
      breadcrumbs: [Paths.SHOP, Paths.PRODUCT]
    }
  },
  {
    path: Paths.SHOP_MENU,
    component: ShopMenuComponent,
    canActivate: [FeatureGuard],
    data: {
      grantAll: true,
      breadcrumbs: [Paths.SHOP, Paths.SHOP_MENU]
    }
  },
  {
    path: Paths.LIVE,
    component: LiveComponent,
    canActivate: [FeatureGuard],
    data: {
      grantAll: true,
      breadcrumbs: [Paths.LIVE]
    }
  },
  {
    path: Paths.USER,
    component: UserComponent,
    canActivate: [FeatureGuard, AuthGuard],
    data: {
      grant: [Role.USER, Role.ADMIN],
      breadcrumbs: [Paths.USER]
    },
    children: [
      {
        path: Paths.PROFILE,
        component: ProfileComponent,
        canActivate: [FeatureGuard, AuthGuard],
        data: {
          grant: [Role.USER, Role.ADMIN],
          breadcrumbs: [Paths.USER, Paths.PROFILE]
        }
      },
      {
        path: Paths.EDIT_PROFILE,
        component: EditProfileComponent,
        canActivate: [FeatureGuard, AuthGuard],
        data: {
          grant: [Role.USER, Role.ADMIN],
          breadcrumbs: [Paths.USER, Paths.EDIT_PROFILE]
        }
      }
    ]
  },
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
