import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-protocol-metrics',
  templateUrl: './protocol-metrics.component.html',
  styleUrls: ['./protocol-metrics.component.less']
})
export class ProtocolMetricsComponent implements OnInit {
  reset(arg0: any): any {
   // throw new Error("Method not implemented.");
  }
  PFSA: string="PF-Site First Kit Sent"
  PFLPI: string = "PF-Patient In";
  receivedCount:string;
  constructor() { }
  ngOnInit() {
  }
  getMessage(message: string) {
    this.receivedCount = message;
  }

  chartOptionPFSA: EChartOption = {

    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Competition-Q1', 'Competition-Q2', 'Competition-Q3', 'Protocol']
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "14%",
      top : "25%",
      containLabel: true,
    },

    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']
    },
    series: [
      {
        name: 'Competition-Q1',
        type: 'line',
        stack: 'Competition-Q1',
        data: [0, 20.75, 22, 25.75, 29, 33, 33.5, 36.75, 38, 41, 43],
        itemStyle: { color: '#d5ceeb' }
      },
      {
        name: 'Competition-Q2',
        type: 'line',
        stack: 'Competition-Q2',
        data: [21.5, 26, 32.5, 37.5, 44.5, 47.5, 45, 52, 71, 77.5],
        itemStyle: { color: '#d5ceeb' }
      },
      {
        name: 'Competition-Q3',
        type: 'line',
        stack: 'Competition-Q3',
        data: [0, 21.5, 26, 33.5, 37.5, 46, 47, 50, 54, 72, 79],
        itemStyle: { color: '#d5ceeb' }
      },
      {
        name: 'Protocol',
        type: 'line',
        stack: 'Protocol',
        data: [23, 24, 24, 25, 25, 29, 31, 33, 36, 69]
      }
    ]
  };

}
