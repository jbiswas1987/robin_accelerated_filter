import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Input, Output, EventEmitter } from "@angular/core";
import { DashboardService } from "../../dashboard/dashboard.service";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { Breakdown, BreakdownInt } from "src/app/common/common";
import { ActivatedRoute } from "@angular/router"
import { Observable, of, throwError } from "rxjs";
import { MatTableDataSource, MatTableModule } from '@angular/material';
@Component({
  selector: 'app-kits-in-out-line',
  templateUrl: './kits-in-out-line.component.html',
  styleUrls: ['./kits-in-out-line.component.less']
})
export class KitsInOutLineComponent implements OnInit {

  showLoading: boolean = false;
  echartsIntance: any;
  barInformationresponse: any;
  yearXAxisInformation: any = [];
  barInformationKitsIn: any = [];
  barInformationKitsOut :any =[];
  kitsINOutDate: any = []
  level : any;
  rows = new Array<any>();
  dataSource: any;
  displayedColumns = [];
  constructor(private router: Router,
    private dashService: DashboardService,
    private route: ActivatedRoute) {
    
    this.level = 'Kits-In/Kits-Out'  
      
  }

  ngOnInit() {
    this.yearXAxisInformation = []
    this.barInformationKitsIn = [];
    this.barInformationKitsOut =[];

    this.getKitsINOUTBarInformation();

  }

  onChartInit($event) {

    this.echartsIntance = $event;

  }

  getKitsINOUTBarInformation(): any {
    this.dashService.getBarGraphKitsInOut('').subscribe((dataRows) => {

      this.barInformationresponse = dataRows;
      for (let i = 0; i < this.barInformationresponse.forecastMonth.length; i++) {
        this.yearXAxisInformation.push({
          forCastMonth: this.barInformationresponse.forecastMonth[i].ForecastMonth,
          value: this.barInformationresponse.forecastMonth[i].ForecastMonthDisplayName
        })

        this.kitsINOutDate.push({
          forCastMonth: this.barInformationresponse.forecastMonth[i].ForecastMonth,
          forCaseMonthDisplay: this.barInformationresponse.forecastMonth[i].ForecastMonthDisplayName
        })
      }     

      //------------

//     this.dashService.forCastDate(this.kitsINOutDate)

      for (let j = 0; j < this.barInformationresponse.KitsIn.length; j++) {

        var date = new Date();
        let currentDateForMate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + '01'
        let forCastMonth = this.formatDate(this.barInformationresponse.KitsIn[j].ForecastMonth)

          this.barInformationKitsIn.push({
            value: this.barInformationresponse.KitsIn[j].KitsInForecastRunmonth,
            forCastMonth: this.barInformationresponse.KitsIn[j].ForecastMonth,
            forcastKitsInForecastRunmonth:this.formatNumber(this.barInformationresponse.KitsIn[j].KitsInForecastRunmonth),
            forcastKitsInForecastPrevmonth: this.formatNumber(this.barInformationresponse.KitsIn[j].KitsInForecastPrevmonth),
            forcastKitsInPercentageVariance: this.formatNumber(this.barInformationresponse.KitsIn[j].PercentageVariance),
            
            type:'kitsIn'
          })
       
      }

      //------------
      
     for(let j=0; j<this.barInformationresponse.KitsOut.length;j++){
      var date = new Date();
      let currentDateForMate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + '01'
      let forCastMonth = this.formatDate(this.barInformationresponse.KitsOut[j].ForecastMonth)


        this.barInformationKitsOut.push({
          value: this.barInformationresponse.KitsOut[j].KitsOutForecastRunmonth,
          forCastMonth : this.barInformationresponse.KitsOut[j].ForecastMonth,
          forcastKitsOutForecastRunvmonth:this.formatNumber(this.barInformationresponse.KitsOut[j].KitsOutForecastRunmonth),
          forcastKitsOutForecastPrevmonth:this.formatNumber(this.barInformationresponse.KitsOut[j].KitsOutForecastPrevmonth),
          forcastKitsOutPercentageVariance:this.barInformationresponse.KitsOut[j].PercentageVariance,
         
          type:'kitsOut'
         });
      // }

      }

      //--------------


      this.chartOption.xAxis.data = this.yearXAxisInformation;
      this.chartOption.series[0].data = this.barInformationKitsIn;
      this.chartOption.series[1].data = this.barInformationKitsOut;
      this.echartsIntance.setOption(this.chartOption);

      this.showLoading = false;

    });

  }

  TabledataPopulation(input) {
    this.rows = input; // Update your model
    this.displayedColumns = this.rows.length > 0 ? Object.keys(this.rows[0]) : [];
    this.dataSource = new MatTableDataSource(this.rows);
    this.showLoading = false;
  }

 formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

  onpieselected($event) {
    let date = new Date($event.data.forCastMonth).toLocaleDateString();
    let dataFormart = this.formatDate(date)
    let type;
    console.log($event)
    if($event.data.type == 'kitsIn'){
      type = 'KitsIn'
    }else if($event.data.type == 'kitsOut'){
      type = 'KitsOut'
    }
    let navUrl: string = dataFormart +'/'+type;
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl = currentAbsoluteUrl.substring(0, index);
  
    const url = this.router.serializeUrl(this.router.createUrlTree([navUrl]));
    window.open(baseUrl +"/"+ 'kitsInOutScattered' + "/" +navUrl, "_blank");
   
  //  this.router.navigate(["kitsInOutScattered", dataFormart, type]);
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
      show: true,
      feature: {
        dataView: {
          title: "Data View",
          readOnly: false,
          lang: ["Data View", "Close", "Refresh"],
        },
        magicType: {
          show: true,
          type: ["line", "bar"],
          title: {
            line: "Line",
            bar: "Bar",
          },
        },
        saveAsImage: { show: true, title: "save" },
      },
      textStyle: {
        fontSize: 13,
      },
      

      formatter: function (params) {

        console.log(params)

        let returnType;

        returnType =  `
        <b style="margin-left:35%;"> ${params[0].axisValue}</b><br/><br/>
        Kits-In (Run Month): ${params[0].data.forcastKitsInForecastRunmonth}<br />
        Kits-In (Pre Month): ${params[0].data.forcastKitsInForecastPrevmonth}<br />
        % Deviation from the last month (Kits-In): ${params[0].data.forcastKitsInPercentageVariance}%<br />
        ----------------------------------------------------<br />
        Kits-Out (Run Month): ${params[1].data.forcastKitsOutForecastRunvmonth}<br />
        Kits-Out (Pre  Month): ${params[1].data.forcastKitsOutForecastPrevmonth}<br />
        % Deviation from the last month (Kits-Out): ${params[1].data.forcastKitsOutPercentageVariance}%
        `
       
        return returnType;
      },
 
     
    },
    legend: {
      orient: 'horizontal',
      data: ["Kits-In","Kits-Out"],
      // selectedMode: 'onlyHover',
      selectedMode: false,
      // x: 'left',
      padding :16
    },
    grid: {
      left: "3%",
      right: "8%",
      bottom: "8%",
      top : "17%",
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: [],
      reverse: true,
            axisLabel: {
        interval: 0,
        
},

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
        name: 'Kits-In',
        type: 'line',
        barGap: 0,
        data: [],
        itemStyle: {
          color: '#692A01'
        },
      },
      {
        name: 'Kits-Out',
        type: 'line',
        data: [],
        itemStyle: {
          color: '#003B00'
        },
      
      },


    ]
  };

}
