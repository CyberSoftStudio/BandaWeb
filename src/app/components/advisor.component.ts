import {Component} from '@angular/core';
import {Advisor} from '../dictionaries/advisor';
import {Subscription} from 'rxjs';
import {TranslatorService} from '../services/translator.service';

@Component({
  selector: 'app-advisor',
  templateUrl: 'advisor.component.html'
})
export class AdvisorComponent {
  public source: any;
  private changeLang = Subscription;
  constructor(public ts: TranslatorService) {
    this.changeLang = ts.changeLang$.subscribe(data => {
      this.setSource(data['lang']);
    });
    this.source = Advisor[ts.currentLang];
  }
  setSource(lang: string) {
    this.source = Advisor[lang];
  }
}
