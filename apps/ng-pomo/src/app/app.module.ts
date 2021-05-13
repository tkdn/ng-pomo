import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PomoMinutesAndSeconds } from './lib/time';
import { TimerComponent } from './view/timer.component';

@NgModule({
  declarations: [AppComponent, TimerComponent, PomoMinutesAndSeconds],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
