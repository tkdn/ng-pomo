import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PomoMinutesAndSeconds } from './lib/time';
import { FocusComponent } from './view/focus/focus.component';

@NgModule({
  declarations: [AppComponent, FocusComponent, PomoMinutesAndSeconds],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
