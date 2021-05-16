import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { PomoMinutesAndSeconds } from './lib/time';
import { rootReducer } from './store/rootReducer';
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
  imports: [BrowserModule, StoreModule.forRoot({ ...rootReducer })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
