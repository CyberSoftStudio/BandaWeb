import {Component, OnInit} from '@angular/core';
import {TranslatorService} from '../services/translator.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-start',
    templateUrl: 'start.component.html',
    animations: [
        trigger('moveImg', [
            state('false', style({marginLeft: '-50%'})),
            state('true', style({marginLeft: 0})),
            transition('false => true', animate('50s')),
            transition('true => false', animate('50s'))
        ])
    ]
})
export class StartComponent implements OnInit {
    public move: boolean;
    public langList: any;
    public activeLang: string;
    constructor(
        public ts: TranslatorService) {
        this.move = false;
        this.langList = ts.langList;
        this.activeLang = 'EN';
    }
    ngOnInit() {
        const self = this;
        setTimeout(() => {
            self.move = true;
        }, 1);
        setInterval(() => {
            self.move = !this.move;
        }, 50000);
        // this.es.scan()
        //     .then(() => console.log('Etherscan scan proccess start...'))
        //     .catch(error => console.log(error));
    }
    setLang(ev: Event, lang: string) {
        ev.preventDefault();
        this.activeLang = lang;
        this.ts.set(this.activeLang);
    }
}
