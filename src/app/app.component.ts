import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'la-taverna-del-carrettiere';

  constructor(private _userService: UserService) {
    // TODO: handle session token decoding
  }

}
