import {Component, OnInit} from '@angular/core';
import {TranslatorService} from '../../services/translator.service';

@Component({
    selector: 'app-chart',
    templateUrl: 'chart.component.html'
})
export class ChartComponent implements OnInit {
    public x: any;
    public y: any;
    public z: any;
    constructor(public ts: TranslatorService) {
        this.x = [1, 2, 3, 4, 5];
        this.y = [5, 6, 9, 3, 1];
        this.z = [2, 5, 7, 6, 2];
    }
    ngOnInit () {
        const self = this;
        setInterval(function() {
            self.addChartItem([]);
        }, 5000);
    }
    addChartItem(data: any) {
        console.log('In... ' + new Date());
    }
}
