import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'src';
  chargers: any = [];

  constructor() {
    this.chargers = Array(18)
      .fill(0)
      .map((x, i) => i);
  }
}
