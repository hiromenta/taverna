import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { LoaderService } from './services/loader.service';
import { NotificationsService } from './services/notification.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'la-taverna-del-carrettiere';

  constructor(private _userService: UserService, private _loaderService: LoaderService, private _notificationsService: NotificationsService, private _router: Router) {}

  ngOnInit(): void {
    const path = location.pathname?.slice(1)?.split('/');

    this._loaderService.show();

    this._userService.getUserData()
      .pipe(
        untilDestroyed(this),
        switchMap((data) => {
          if (data) {
            return this._userService.getFavorites();
          }

          return of(null);
        })
      )
      .subscribe({
        next: (res) => {
          this._loaderService.hide();

          if (path.length) {
            this._router.navigate(path);
          }
        },
        error: (err) => {
          this._loaderService.hide();
          this._notificationsService.addNotification('warning', 'error.' + err.error);

          this._userService.logout();
        }
      });
  }

}
