import {Component} from '@angular/core';
import {TranslatorService} from '../services/translator.service';
import {Techniques} from '../dictionaries/techniques';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-techniques',
    templateUrl: 'techniques.component.html'
})
export class TechniquesComponent {
    public source: any;
    private changeLang = Subscription;
    constructor(public ts: TranslatorService) {
        this.changeLang = ts.changeLang$.subscribe(data => {
            this.setSource(data['lang']);
        });
        this.source = Techniques[ts.currentLang];
    }
    setSource(lang: string) {
        this.source = Techniques[lang];
    }
}
