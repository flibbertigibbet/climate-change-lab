import { Component, EventEmitter, Input, OnChanges, Output, HostListener } from '@angular/core';

import { Chart, ChartData } from '../models/chart';
import { City } from '../models/city';
import { ClimateModel } from '../models/climate-model';
import { Scenario } from '../models/scenario';

import { ChartService } from '../services/chart.service';
import { IndicatorService } from '../services/indicator.service';
import { CSVService } from '../services/csv.service';

/*
 * Chart component
 * Container for each individual chart plus controls
 */
@Component({
  selector: 'chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnChanges {

    @Output() onRemoveChart = new EventEmitter<Chart>();
    @Output() onChartSettingChanged = new EventEmitter<Chart>();

    @Input() chart: Chart;
    @Input() scenario: Scenario;
    @Input() models: ClimateModel[];
    @Input() city: City;

    private chartData: ChartData[];
    private isHover: Boolean = false;

    // Mousemove event must be at this level to listen to mousing over rect#overlay
    // Should be configurable to make a cross-chart scrubber
    @HostListener('mouseover', ['$event'])
    onMouseOver(event) {
        this.isHover = event.target.id === 'overlay' ? true : false;
    }

    constructor(private chartService: ChartService,
                private indicatorService: IndicatorService,
                private csvService: CSVService) {}

    ngOnChanges() {
        if (!this.scenario || !this.city || !this.models) { return; }
        this.chartData = [];
        this.indicatorService.getData({
            indicator: this.chart.indicator,
            scenario: this.scenario,
            city: this.city,
            climateModels: this.models
        }).subscribe(data => this.chartData = this.chartService.convertChartData([data]));
    }

    onSettingsToggleClicked() {
        this.chart.showSettings = !this.chart.showSettings;
        this.onChartSettingChanged.emit(this.chart);
    }

    onSettingChange() {
        this.onChartSettingChanged.emit(this.chart);
    }

    onExportClicked() {
        this.csvService.downloadAsCSV(this.chartData);
    }

    removeChart(chart: Chart) {
        this.onRemoveChart.emit(chart);
    }
}
