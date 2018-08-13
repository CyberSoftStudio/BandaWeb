import {Component, OnInit} from '@angular/core';
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
        this.menuLinks.push('about');
        this.menuLinks.push('features');
        this.menuLinks.push('services');
        this.menuLinks.push('portfolio');
        this.menuLinks.push('team');
        this.menuLinks.push('contact');
        this.activeLink = this.menuLinks[0];
        this.config = config().app;
    }
}
