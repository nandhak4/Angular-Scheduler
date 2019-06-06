import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'personal';

  showAlert() {
    alert((new Date(2019, 5, 9)).getDay());
  }

}
