import {Component} from '@angular/core';
import {TranslatorService} from '../services/translator.service';
import {config} from '../config';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent {
    public menuLinks: any;
    public activeLink: string;
    public config: any;
    constructor(public ts: TranslatorService) {
        this.menuLinks = [];
        this.menuLinks.push('home');
        this.menuLinks.push('projects');
        this.menuLinks.push('techniques');
        this.menuLinks.push('team');
        // this.menuLinks.push('job');
        this.menuLinks.push('contact');
        this.activeLink = this.menuLinks[0];
        this.config = config().app;
    }
    select (ev: Event, ln: string) {
        ev.preventDefault();
        setTimeout(() => {
            const target = document.getElementById(ln);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 30);
        this.activeLink = ln;
        // console.log(ln);
        // // console.dir(target);
        // // target.scrollIntoView();
    }
}
