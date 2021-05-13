import { Component } from '@angular/core';

@Component({
  selector: 'ng-pomo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  count = [];
  focus = true;
  break = false;

  toFocusTime(): void {
    this.focus = true;
    this.break = false;
  }

  toBreakTime(): void {
    this.count.push('pomo');
    this.focus = false;
    this.break = true;
  }
}
