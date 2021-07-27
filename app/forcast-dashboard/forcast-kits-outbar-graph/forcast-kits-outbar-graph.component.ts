import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Input, Output, EventEmitter } from "@angular/core";
import { DashboardService } from "../../dashboard/dashboard.service";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { Breakdown, BreakdownInt } from "src/app/common/common";
import { ActivatedRoute } from "@angular/router"
import { Observable, of, throwError } from "rxjs";
import { MatTableDataSource, MatTableModule, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-forcast-kits-outbar-graph',
  templateUrl: './forcast-kits-outbar-graph.component.html',
  styleUrls: ['./forcast-kits-outbar-graph.component.less']
})
export class ForcastKitsOutbarGraphComponent implements OnInit {
  showLoading: boolean = false;
  echartsIntance: any;
  echartsIntanceKitsOut : any;
  yearXAxisInformation : any=[];
  barInformationresponse : any;
  barInformationKitsOut : any=[]
  barInformationKitsTable : any =[]
  level : any;
  rows = new Array<any>();
  dataSource: any;
  displayedColumns = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router,   
    private dashService: DashboardService,
    private route: ActivatedRoute) {
      this.level ='Kits-Out'
     }

  ngOnInit() {
    this.yearXAxisInformation =[]
    this.barInformationKitsOut =[];    
    this.barInformationKitsTable =[];
    this.getKitsINOUTBarInformation();
  }

  onChartInit($event) {
    
    this.echartsIntance = $event;
   
  }
  getKitsINOUTBarInformation():any{
    // getBarGraphKitsInOut
    this.dashService.getBarGraphKitsInOut('').subscribe((dataRows) => {
      this.showLoading = true;
      this.barInformationresponse = dataRows;

      for(let i=0; i<this.barInformationresponse.KitsIn.length; i++){
        this.barInformationKitsTable.push({
          'Month':this.barInformationresponse.KitsIn[i].ForecastMonthDisplayName,
          'Kits- In  Current':this.formatNumber(this.barInformationresponse.KitsIn[i].KitsInForecastRunmonth),
          'Kits-In Previous':this.formatNumber(this.barInformationresponse.KitsIn[i].KitsInForecastPrevmonth),
          '(%) Variance Kits-In':this.barInformationresponse.KitsIn[i].PercentageVariance,
          'Kits-Out Current':this.formatNumber(this.barInformationresponse.KitsOut[i].KitsOutForecastRunmonth),
          'Kits-Out Previous':this.formatNumber(this.barInformationresponse.KitsOut[i].KitsOutForecastPrevmonth),
          '(%) Variance Kits-Out':this.barInformationresponse.KitsOut[i].PercentageVariance,
        })
      }
     this.showLoading = true;
      

      console.log('@@@@@@@@@@@@@@@@@' + JSON.stringify(this.barInformationKitsTable))

      for(let i=0; i< this.barInformationresponse.forecastMonth.length; i++){
        this.yearXAxisInformation.push({
               forCastMonth: this.barInformationresponse.forecastMonth[i].ForecastMonth,
               value:this.barInformationresponse.forecastMonth[i].ForecastMonthDisplayName})
      }

     for(let j=0; j<this.barInformationresponse.KitsOut.length;j++){
      var date = new Date();
      let currentDateForMate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + '01'
      let forCastMonth = this.formatDate(this.barInformationresponse.KitsOut[j].ForecastMonth)


      if (j ==0 ) {
        this.barInformationKitsOut.push({
          value: this.barInformationresponse.KitsOut[j].KitsOutForecastRunmonth,
          forCastMonth : this.barInformationresponse.KitsOut[j].ForecastMonth,
          forcastKitsOutForecastRunvmonth:this.formatNumber(this.barInformationresponse.KitsOut[j].KitsOutForecastRunmonth),
          forcastKitsOutForecastPrevmonth:this.formatNumber(this.barInformationresponse.KitsOut[j].KitsOutForecastPrevmonth),
          forcastKitsOutPercentageVariance:this.barInformationresponse.KitsOut[j].PercentageVariance,
          itemStyle: {
            color: '#005D78'
          }});
        
      }else{
        this.barInformationKitsOut.push({
          value: this.barInformationresponse.KitsOut[j].KitsOutForecastRunmonth,
          forCastMonth : this.barInformationresponse.KitsOut[j].ForecastMonth,
          forcastKitsOutForecastRunvmonth:this.formatNumber(this.barInformationresponse.KitsOut[j].KitsOutForecastRunmonth),
          forcastKitsOutForecastPrevmonth:this.formatNumber(this.barInformationresponse.KitsOut[j].KitsOutForecastPrevmonth),
          forcastKitsOutPercentageVariance:this.barInformationresponse.KitsOut[j].PercentageVariance,
          itemStyle: {
            color: '#A9A9A9'
          }
         });
      }

      }
      this.TabledataPopulation(this.barInformationKitsTable)
      this.chartOption.xAxis.data = this.yearXAxisInformation;
      this.chartOption.series[0].data = this.barInformationKitsOut;
      this.echartsIntance.setOption(this.chartOption);    
      this.showLoading = false;
      
    });
   
  }

  formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

TabledataPopulation(input) {
  this.rows = input; // Update your model
  this.displayedColumns = this.rows.length > 0 ? Object.keys(this.rows[0]) : [];
  this.dataSource = new MatTableDataSource(this.rows);
  this.dataSource.paginator = this.paginator;
  this.showLoading = false;
}


  onpieselected($event){
    console.log($event)
    let date = new Date($event.data.forCastMonth).toLocaleDateString();
    let dataFormart = this.formatDate(date)
    console.log(dataFormart)
    let type ='KitsOut'
    this.router.navigate(["kitsInOutScattered",dataFormart,type]);
 }

 formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

  chartOption = {
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontSize: 13,
      },
      type:'shadow',
      // position: function (pos, params, dom, rect, size) {
      //   let txt: string = dom.innerText;
      //   txt = txt.replace(new RegExp(",", "g"), "\r\n");
      //   dom.innerText = txt;
      //   return [120, pos[1] - 50];
      //   //return [pos[0], pos[1]];
      // },
      formatter: function (params) {
        
        return `Kits-Out(Run Month): ${params[0].data.forcastKitsOutForecastRunvmonth}<br />
                Kits-Out(Pre  Month): ${params[0].data.forcastKitsOutForecastPrevmonth}<br />
                % Deviation from the last month (Kits Out): ${params[0].data.forcastKitsOutPercentageVariance}%
                `;
      },
      axisPointer: {
        type: 'shadow'
    }
    
      // formatter: 'params.seriesData[0].data.forcastKitsOutForecastPrevmonth <br/>Kits Out(Run Month Forecast): {forcastKitsOutForecastPrevmonth} <br/>{name1} : {value1} ',
      // axisPointer: {
      //   type: "shadow",
      //   label: {
      //     formatter: function (params) {
           
      //       let tooltipValue ="Kits Out(Pre Month Forecast):" + params.seriesData[0].data.forcastKitsOutForecastPrevmonth;
      //       return tooltipValue;
      //     },
      //   },
      // },
//       axisPointer: {
//           type: 'shadow'
//       }
  },
  grid: {
    left: "9%",
    right: "8%",
    bottom: "9%",
    top : "7%",
    containLabel: true,
  },
    xAxis: {
        type: 'category',
        data: [],
        reverse: true
    },
    yAxis: {
        type: 'value',
        axisTick: {
          alignWithLabel: true
      }, 
      // position: "right",
      
    },
    series: [
      {
        name: 'Kits Out(Run Month Forecast)',
        type: 'bar',
        barGap: 0,
        data: [],
        // itemStyle: { color: "#A9A9A9" }
    },


  ]
};


}
