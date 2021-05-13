import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PomoMinutesAndSeconds } from './lib/time';
import { CircularProgressBarComponent } from './view/circular-progress-bar/circular-progress-bar.component';
import { TimerComponent } from './view/timer/timer.component';
import { TomatoComponent } from './view/tomato/tomato.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    PomoMinutesAndSeconds,
    CircularProgressBarComponent,
    TomatoComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
