import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-pomo-tomato',
  templateUrl: './tomato.component.html',
  styleUrls: ['./tomato.component.css'],
})
export class TomatoComponent {
  @Input()
  tomatos = [];
}
