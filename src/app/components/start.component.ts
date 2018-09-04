import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {TranslatorService} from '../services/translator.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {StartSlides} from '../dictionaries/startslides';
import {Subscription} from 'rxjs';
import {st} from '@angular/core/src/render3';

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
export class StartComponent implements OnInit, AfterViewChecked {
    public move: boolean;
    public langList: any;
    public activeLang: string;
    public source: any;
    public graphics: any;
    private changeLang = Subscription;
    constructor(
        public ts: TranslatorService) {
        this.move = false;
        this.langList = ts.langList;
        this.activeLang = 'EN';
        this.source = StartSlides[ts.currentLang];
        this.changeLang = ts.changeLang$.subscribe(data => {
            this.setSource(data['lang']);
        });
        this.graphics = [
          {
            header: 'Header 1'
          },
          {
            header: 'Header 2'
          },
          {
            header: 'Header 3'
          }
        ];
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
    setSource(lang: string) {
        this.source = StartSlides[lang];
    }
    ngAfterViewChecked() {
      const startFrame = document.getElementById('start-frame');
      if(startFrame.clientHeight !== window.outerHeight) {
        startFrame.style.height = window.outerHeight + 'px';console.log('set.........................');
      }
    }
}
