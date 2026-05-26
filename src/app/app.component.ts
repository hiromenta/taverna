import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { LoaderService } from './services/loader.service';
import { NotificationsService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'la-taverna-del-carrettiere';

  constructor(private _userService: UserService, private _loaderService: LoaderService, private _notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this._loaderService.show();

    this._userService.getUserData().subscribe({
      next: (res) => {
        this._loaderService.hide();
      },
      error: (err) => {
        this._loaderService.hide();
        this._notificationsService.addNotification('warning', 'error.' + err.error.code);

        this._userService.logout();
      }
    });
  }

}
