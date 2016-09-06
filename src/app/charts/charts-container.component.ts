import { Component, OnInit } from '@angular/core';

import { ChartService } from '../services/chart.service';
import { ChartComponent } from './chart.component';

/*
 * Charts container component
 * Holds all the charts
 */
@Component({
  selector: 'charts',
  directives: [ChartComponent],
  template: `<div class="chart" *ngFor="let chart of chartList">
                <chart [indicator]="chart" [chartData]="chartData"></chart>
            </div>`
})
export class ChartsContainerComponent extends OnInit {
    private chartList: Array<String>;
    private chartData;

    constructor(private chartService: ChartService) {
      super();
    }

    makeCharts() {
      this.chartService.loadChartData();
      this.chartService.getChartData().subscribe(data=> {
        this.chartData = data;
      });
    }

    ngOnInit() {
      // First, subscribe to chartList observable
      this.chartList = this.chartService.get();
      this.makeCharts();
    }
}
