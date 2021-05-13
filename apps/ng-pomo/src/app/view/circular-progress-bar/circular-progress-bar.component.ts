import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-pomo-circular-progress-bar',
  templateUrl: './circular-progress-bar.component.html',
  styleUrls: ['./circular-progress-bar.component.css'],
})
export class CircularProgressBarComponent {
  @Input()
  percentage: number;
  @Input()
  type: 'pomo' | 'break';
}
