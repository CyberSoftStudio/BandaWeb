import {Component} from '@angular/core';
import {TranslatorService} from '../services/translator.service';

@Component({
    selector: 'app-contact',
    templateUrl: 'contact.component.html'
})
export class ContactComponent {
    constructor(public ts: TranslatorService) {}

    public message:any = {
        name: "",
        email: "",
        phoneNumber: "",
        text: ""
    };

    submitMessage(): void {
        //some actions
    }

}