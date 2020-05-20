import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { Cases } from '../shared/models/cases';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Confirmed cases' },
    { data: [], label: 'Deaths' }
  ];

  confimed:any;
  deaths:any;
  loading = false;
  cases: Cases[];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('https://api.covid19api.com/total/dayone/country/mexico').subscribe((res:any) => {
      res.forEach(day => {
        this.barChartLabels.push(day.Date.substring(0, 10) );
        this.barChartData[0].data.push(day.Confirmed)
        this.barChartData[1].data.push(day.Deaths)
      });
      this.confimed = this.barChartData[0].data[this.barChartData[0].data.length -1]
      this.deaths = this.barChartData[1].data[this.barChartData[1].data.length -1]
      this.loading = false;
    }, error =>  console.log(error))
  }

}
