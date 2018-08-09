import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MenuComponent,
    StartComponent,
    AboutComponent
} from './components';
import {MatButtonModule, MatTabsModule} from '@angular/material';
import {TranslatorService} from './services/translator.service';


@NgModule({
  declarations: [
    AppComponent,
      MenuComponent,
      StartComponent,
      AboutComponent
  ],
  imports: [
    BrowserModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatTabsModule
  ],
  providers: [
      TranslatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
