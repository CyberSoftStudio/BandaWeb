import {Component} from '@angular/core';
import {TranslatorService} from '../services/translator.service';
import {Subscription} from 'rxjs';
import {Projects} from '../dictionaries/projects';

@Component({
    selector: 'app-projects',
    templateUrl: 'projects.component.html'
})
export class ProjectsComponent {
    private changeLang: Subscription;
    private source: string;
    constructor(public ts: TranslatorService) {
        this.changeLang = ts.changeLang$.subscribe(data => {
            this.setSource(data.lang);
        });
        this.source = Projects[ts.currentLang];
    }
    public setSource (lang: string) {
        this.source = Projects[lang];
    }
}
