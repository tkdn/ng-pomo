import { Component } from '@angular/core';

@Component({
  selector: 'ng-pomo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  count = 0;
  focus = true;
  break = false;

  toFocusTime(): void {
    this.count++;
    this.focus = true;
    this.break = false;
  }

  toBreakTime(): void {
    this.focus = false;
    this.break = true;
  }
}
