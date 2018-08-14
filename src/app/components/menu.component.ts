import {Component, EventEmitter, OnInit} from '@angular/core';
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
    public target$ = new EventEmitter<{
        height: number
    }>();
    constructor(public ts: TranslatorService) {
        this.menuLinks = [];
        this.menuLinks.push('home');
        this.menuLinks.push('projects');
        this.menuLinks.push('features');
        this.menuLinks.push('team');
        this.menuLinks.push('job');
        this.menuLinks.push('contact');
        this.activeLink = this.menuLinks[0];
        this.config = config().app;
    }
    select (ev: Event, ln: string) {
        ev.preventDefault();
        const target = document.getElementById(ln);
        target.scrollIntoView({ behavior: 'smooth' });
        this.activeLink = ln;
        console.log(ln);
    }
}
