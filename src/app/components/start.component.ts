import {Component} from '@angular/core';
import {TranslatorService} from '../services/translator.service';

@Component({
    selector: 'app-start',
    templateUrl: 'start.component.html'
})
export class StartComponent {
    constructor(public ts: TranslatorService) {}
}
