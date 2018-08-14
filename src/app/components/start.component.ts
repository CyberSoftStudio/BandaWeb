import {Component, OnInit} from '@angular/core';
import {TranslatorService} from '../services/translator.service';
import {animate, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {anim} from '../utils/animations';
import {EtherscanService} from '../services/etherscan.service';

@Component({
    selector: 'app-start',
    templateUrl: 'start.component.html',
    animations: [
        trigger('moveImg', [
            state('false', style({marginLeft: 0})),
            state('true', style({marginLeft: '-50%'})),
            // transition('false => true', useAnimation(anim.moveLeft,
            //     {params: {
            //             time: 50000
            //         }})),
            transition('false => true', animate('50s')),
            transition('true => false', animate('50s')),
            // transition('true => false', useAnimation(anim.moveRight,
            //     {params: {
            //             time: 50000
            //         }}))
        ])
    ]
})
export class StartComponent implements OnInit {
    public move: boolean;
    constructor(
        public ts: TranslatorService,
        private es: EtherscanService) {
        this.move = false;
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
}
