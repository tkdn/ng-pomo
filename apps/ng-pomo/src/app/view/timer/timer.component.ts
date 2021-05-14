import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimerService } from '../../service/timer-service.service';

@Component({
  selector: 'ng-pomo-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  providers: [TimerService],
})
export class TimerComponent implements OnInit {
  @Input()
  active: boolean;
  @Input()
  minutes: number;
  @Input()
  type: 'pomo' | 'break';
  @Output()
  completed = new EventEmitter<boolean>();

  constructor(private pomoTimerService: TimerService) {}

  get percentage() {
    return this.pomoTimerService.percentage;
  }

  get timer$() {
    return this.pomoTimerService.state$;
  }

  ngOnInit(): void {
    this.pomoTimerService.minutes = this.minutes;
    this.pomoTimerService.completed = this.completed;
  }

  start(): void {
    this.pomoTimerService.startOrPause();
  }
}
