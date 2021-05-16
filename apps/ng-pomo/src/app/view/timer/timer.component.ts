import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ng-pomo-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent {
  @Input()
  minutes: number;
  @Input()
  type: 'pomo' | 'break';
  @Input()
  percentage: number;
  @Input()
  pause: boolean;
  @Output()
  clickHandler = new EventEmitter<void>();

  start() {
    this.clickHandler.emit();
  }
}
