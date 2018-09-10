import {Component} from '@angular/core';
import {TranslatorService} from '../services/translator.service';

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html'
})
export class FooterComponent {
    menuList: any;
    constructor(
        public ts: TranslatorService
    ) {
        this.menuList = [];
        this.menuList.push('home');
        this.menuList.push('projects');
        this.menuList.push('techniques');
        this.menuList.push('team');
        this.menuList.push('contact');
    }
    select (ev: Event, item: string) {
        ev.preventDefault();
        setTimeout(() => {
            const target = document.getElementById(item);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 30);
    }
}