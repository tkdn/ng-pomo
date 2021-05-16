import { Component } from '@angular/core';
import { TimerUsecase } from './usecase/timer';

@Component({
  selector: 'ng-pomo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  timer$ = this.timerUsecase.timer$;
  percentage$ = this.timerUsecase.percentage$;

  constructor(private timerUsecase: TimerUsecase) {}

  start() {
    this.timerUsecase.start();
  }

  debug() {
    console.log(this.timerUsecase.timer);
  }
}
