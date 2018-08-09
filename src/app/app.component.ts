import { Component } from '@angular/core';
import {TranslatorService} from './services/translator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private ts: TranslatorService){
    ts.set('EN');
  }
}
