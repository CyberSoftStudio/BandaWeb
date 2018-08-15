import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {anim} from '../utils/animations';
import {TranslatorService} from '../services/translator.service';

@Component({
    selector: 'app-gototop',
    template: `<div id="goToTop"
                    (click)="goToTop($event)"
                    [@goHide]="state"
                    title="{{ts.translate('labels.go_to_top')}}">
        <mat-icon>expand_less</mat-icon>
    </div>`,
    animations: [
        trigger('goHide', [
            state('false', style({opacity: 0, display: 'none'})),
            state('true', style({opacity: 1, display: 'block'})),
            transition('false => true', useAnimation(anim.fadeIn,
                {params: {
                        time: 1000
                    }})),
            transition('true => false', useAnimation(anim.fadeOut,
                {params: {
                        time: 1000
                    }}))
            // transition('false => true', animate('1s')),
            // transition('true => false', animate('1s'))
        ])
    ]
})
export class GoToTopComponent implements AfterViewChecked {
    public state: boolean;
    constructor(public ts: TranslatorService) {
        this.state = false;
    }
    ngAfterViewChecked () {
        const self = this;
        setTimeout(() => {
            self.state = window.scrollY > 300;
        }, 100);
    }
    goToTop (ev: Event) {
        ev.preventDefault();
        console.log('goToTop');
        document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
