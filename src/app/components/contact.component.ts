import {Component} from '@angular/core';

@Component({
    selector: 'app-contact',
    templateUrl: 'contact.component.html'
})
export class ContactComponent {
    constructor() {}

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