import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {TranslatorService} from '../services/translator.service';
import {Techniques} from '../dictionaries/techniques';
import {Subscription} from 'rxjs';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';
import {anim} from '../utils/animations';

@Component({
    selector: 'app-techniques',
    templateUrl: 'techniques.component.html',
    animations: [
        trigger('showArrow', [
            state('false', style({opacity: 0, display: 'none'})),
            state('true', style({opacity: 1, display: 'block'})),
            transition('false => true', useAnimation(anim.fadeIn,
                {params: {
                        time: 500
                    }})),
            transition('true => false', useAnimation(anim.fadeOut,
                {params: {
                        time: 500
                    }}))
            // transition('false => true', animate('1s')),
            // transition('true => false', animate('1s'))
        ])
    ]
})
export class TechniquesComponent implements OnInit{
    public source: any;
    public currentSource: number;
    private changeLang = Subscription;
    constructor(public ts: TranslatorService) {
        this.changeLang = ts.changeLang$.subscribe(data => {
            this.setSource(data['lang']);
        });
        this.source = Techniques[ts.currentLang];
        this.source.map((src, ind) => {
            src.show = (ind === 0);
        });
        this.currentSource = 0;
    }
    ngOnInit () {
        // this.source.map((src, ind) => {console.log(ind);
        //     const element = document.getElementById('card-0' + ind);
        //     element.style.display = ind === 0 ? 'block' : 'none';
        // });
    }
    setSource(lang: string) {
        this.source = Techniques[lang];
    }
    // prev() {
    //     if (this.currentSource > 0)     {
    //         // let element = document.getElementById('card-0' + this.currentSource);
    //         // if (element.className.indexOf('bt-slide-in') >= 0) {
    //         //     element.className = element.className.replace('bt-slide-in', 'bt-slide-out');
    //         // } else {
    //         //     element.className += ' bt-slide-out';
    //         // }
    //         this.source[this.currentSource].show = false;
    //         this.currentSource -= 1;
    //         this.source[this.currentSource].show = true;
    //     //     element = document.getElementById('card-0' + this.currentSource);
    //     //     if (element.className.indexOf('bt-slide-out') >= 0) {
    //     //         element.className = element.className.replace('bt-slide-out', 'bt-slide-in');
    //     //     } else {
    //     //         element.className += ' bt-slide-in';
    //     //     }
    //     }
    // }
    // next() {
    //     if (this.currentSource < this.source.length - 1) {
    //         // let element = document.getElementById('card-0' + this.currentSource);
    //         // if (element.className.indexOf('bt-slide-in') >= 0) {
    //         //     element.className = element.className.replace('bt-slide-in', 'bt-slide-out');
    //         // } else {
    //         //     element.className += ' bt-slide-out';
    //         // }
    //         this.source[this.currentSource].show = false;
    //         this.currentSource += 1;
    //         this.source[this.currentSource].show = true;
    //         // element = document.getElementById('card-0' + this.currentSource);
    //         // if (element.className.indexOf('bt-slide-out') >= 0) {
    //         //     element.className = element.className.replace('bt-slide-out', 'bt-slide-in');
    //         // } else {
    //         //     element.className += ' bt-slide-in';
    //         // }
    //     }
    // }
}
