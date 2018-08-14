import {Component, OnInit} from '@angular/core';
import {TranslatorService} from '../../services/translator.service';
import {EtherscanService} from '../../services/etherscan.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-chart',
    templateUrl: 'chart.component.html'
})
export class ChartComponent implements OnInit {
    public items: any;
    private etherscan: Subscription;
    private trZ: number;
    constructor(
        public ts: TranslatorService,
        private es: EtherscanService
    ) {
        this.items = [];
        this.trZ = 0;
    }
    ngOnInit () {
        this.etherscan = this.es.newBlock$.subscribe(data => {
            this.addChartItem(data);
        });
        this.es.scan()
            .then(() => console.log('Etherscan proccess start...'))
            .catch(error => console.log(error));
    }
    addChartItem(data: any) {
        this.trZ++;
        const chart = document.getElementById('chart-01');
        if (this.items.length > 20) {
            this.items.shift();
        }
        this.items.push(document.createElement('div'));
        const cube = this.items[this.items.length - 1];
        cube.className = 'cube';
        cube.id = data['blockNumber'];
        let i = 0;
        while (i < 6) {
            const side = document.createElement('div');
            side.className = 'side';
            if (i === 3) {
                side.innerText = 'Ethereum Block: \n' + data['blockNumber'] + '\n'
                + 'Transactions count: ' + data['transactionsCount'];
            }
            cube.appendChild(side);
            i++;
        }
        // chart.style.transform = 'translateZ(-' + this.trZ * this.trZ * this.trZ * 60 + 'px)';
        i = 0;
        while (i < this.items.length) {
            this.items[i].style.transform = 'translateZ(-'
                + (this.items.length - 1 - i) * 160 + 'px)';
            i++;
        }
        // cube.style.transform = 'translateZ(' + this.trZ * 60 + 'px)';
        chart.appendChild(cube);
        // cube.style.transform = 'translateZ(-' + this.trZ * 60 + ')';
    }
}
