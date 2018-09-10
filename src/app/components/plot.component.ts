import {Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { PlotService } from '../services/plot.service';
import * as Plotly from 'plotly.js';
import { Config, Data, Layout } from '../../../node_modules/plotly.js';


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html'
})
export class PlotComponent implements OnInit {

  constructor(private plotService: PlotService) { }

  private blocks: any[] = [];
  private maxBlocksCount = 15;
  @Input() currencyCode = 'ETH';

  xaxisStyle = {
    showticklabels: true,
    tickangle: 45,
    tickfont: {
      family: 'Old Standard TT, serif',
      size: 14,
      color: 'black'
    }
  };

  public plot1 = {
    data: [],
    layout: { autosize: true, title: 'Transactions' },
    xaxis: this.xaxisStyle,
    exponentformat: 'e',
    showexponent: 'all'
  };

  public plot2 = {
    data: [],
    layout: { autosize: true, title: 'Output values' },
    xaxis: this.xaxisStyle,
    exponentformat: 'e',
    showexponent: 'all'
  };


  ngOnInit() {
    this.plotService.getObservable(this.currencyCode.toLowerCase()).subscribe(nextBlockArray => {
      this.processNextBlock(nextBlockArray);
    });
  }

  processNextBlock(nextBlockArray) {

    if (this.blocks.length === 0) {
      //TODO: refactoring
      for (let i = nextBlockArray.length - 1; i >= 0; i--) {
        this.blocks.push(nextBlockArray[i]);
      }
      while (this.blocks.length > this.maxBlocksCount) {
        this.blocks.shift();
      }
      this.updatePlots();
      return;
    }

    for (let i = nextBlockArray.length - 1; i >= 0; i--) {
      console.log(this.blocks[this.blocks.length - 1].time);
      if (this.blocks[this.blocks.length - 1].time < nextBlockArray[i].time
        && nextBlockArray[i]["tx_count"] > 0
        && nextBlockArray[i]["tx_sum"] > 0) {

        this.blocks.push(nextBlockArray[i]);

        while (this.blocks.length > this.maxBlocksCount) {
          this.blocks.shift();
        }
      }
    }
    this.updatePlots();
  }

  updatePlots() {
    let x_vals = []
    let count_vals = []
    let sum_vals = []
    for (let i = 0; i < this.blocks.length; ++i) {
      x_vals.push('№' + this.blocks[i]["height"]);
      count_vals.push(this.blocks[i]["tx_count"]);
      sum_vals.push(this.blocks[i]["tx_sum"]);
    }

    let tx_count = {
      x: x_vals,
      y: count_vals,
      type: 'bar',
      marker: { color: "rgb(55, 83, 109)" }
    }
    let tx_sum = {
      x: x_vals,
      y: sum_vals,
      type: 'bar',
      marker: { color: "rgb(75,0,130)" }
    }


    this.plot1.data = [tx_count];
    this.plot2.data = [tx_sum];
  }
}
