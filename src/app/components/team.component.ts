import {Component} from '@angular/core';
import {Team} from '../dictionaries/team';
import {Subscription} from 'rxjs';
import {TranslatorService} from '../services/translator.service';

@Component({
    selector: 'app-team',
    templateUrl: 'team.component.html'
})
export class TeamComponent {
    public source: any;
    private changeLang = Subscription;
    constructor(public ts: TranslatorService) {
        this.changeLang = ts.changeLang$.subscribe(data => {
            this.setSource(data['lang']);
        });
        this.source = Team[ts.currentLang];
    }
    setSource(lang: string) {
        this.source = Team[lang];
    }
}