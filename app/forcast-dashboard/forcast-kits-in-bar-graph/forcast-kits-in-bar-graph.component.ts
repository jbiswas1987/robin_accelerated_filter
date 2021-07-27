import { Component, OnInit ,AfterViewInit,OnDestroy} from '@angular/core';
import { Router } from "@angular/router";
import { Input, Output, EventEmitter } from "@angular/core";
import { DashboardService } from "../../dashboard/dashboard.service";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { Breakdown, BreakdownInt } from "src/app/common/common";
import { ActivatedRoute } from "@angular/router"
import { Observable, of, throwError } from "rxjs";
import { MatTableDataSource, MatTableModule } from '@angular/material';
import {DataService} from '../../common/data.service'
import {ExcelService} from '../excel.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import {Location} from '@angular/common'
 import {InfoDetailsComponent} from '../../common/info-details/info-details.component'

@Component({
  selector: 'app-forcast-kits-in-bar-graph',
  templateUrl: './forcast-kits-in-bar-graph.component.html',
  styleUrls: ['./forcast-kits-in-bar-graph.component.less']
})
export class ForcastKitsInBarGraphComponent implements OnInit, AfterViewInit,OnDestroy {
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
  kitsInOurBar = []
  _sponsorName :any
  _sponsorNameResponse:any
  sponsor:any;
  sponsorSelect :any
  batchResponseLoad :any = 'false'
  download: any = this.getBaseUrl() + "/assets/icon/download.png";
  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/Kits_In_Out_Performance.pdf"
  constructor(private router: Router,
    private dashService: DashboardService,
    private route: ActivatedRoute,private excelService:ExcelService,
    private dataShareServices :DataService, public dialog: MatDialog) {
    this._sponsorNameResponse ='ROCHE'
    this.yearXAxisInformation = []
    this.barInformationKitsIn = [];
    this.barInformationKitsOut =[];
    this.kitsInOurBar =[]
    this.level = 'Kits-In/Kits-Out'  
      
  }

  ngOnInit() {
    this.yearXAxisInformation = []
    this.barInformationKitsIn = [];
    this.barInformationKitsOut =[];
    this.kitsInOurBar =[]
    this.showLoading=true;

   // this.getKitsINOUTBarInformation();

  }

  ngAfterViewInit() {
    // this._sponsorName = this.dashService.sponsorNameRestDashB.subscribe((response) =>{
      this._sponsorName = this.dashService.batchoneLoadWidget.subscribe((response) =>{
    //  this._sponsorNameResponse = localStorage.getItem('selectedSponsor');
      this.batchResponseLoad = response;
      this._sponsorNameResponse = this.dataShareServices.get_city_protocolID();
      if(this._sponsorNameResponse == "ALL"){
        this._sponsorNameResponse =[]
      }else{
        this._sponsorNameResponse = this._sponsorNameResponse
      }
      this.sponsor={
        ctprotocolId :this._sponsorNameResponse
      }
      if(this.batchResponseLoad == 'true'){
        this.yearXAxisInformation = []
        this.barInformationKitsIn = [];
        this.barInformationKitsOut =[];
        this.kitsInOurBar =[]
        this.showLoading = true;

      //  this.chartOption.toolbox.feature[1].magicType.type =['bar','line'];
        this.batchResponseLoad == 'false'  
        this.getKitsINOUTBarInformation();
        
    }
    });
  
     
   }
  

  onChartInit($event) {
   
    this.echartsIntance = $event;

  }

  getKitsINOUTBarInformation(): any {
    this.sponsor={
      ctprotocolId :this._sponsorNameResponse
    }
    this.dashService.getBarGraphKitsInOut(this.sponsor).subscribe((dataRows) => {
      this.kitsINOutDate =[];
      this.barInformationresponse = dataRows;
      let barClick = this.dataShareServices.getBarGridClick();
      console.log('IS click' + barClick)
      // for (let i = 0; i < this.barInformationresponse.forecastMonth.length; i++) {
        for (let i = 0; i < this.barInformationresponse.KitsOut.length; i++) {
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

     if(barClick == true){
      this.dashService.forCastDate(this.kitsINOutDate)
      this.dataShareServices.setBarGridClick(true)
     } 

     this.dataShareServices.setBarGridClick(true)

    //  this.dashService.forCastDate(this.kitsINOutDate)
     for (let j = 0; j < this.barInformationresponse.KitsOut.length; j++) {

      // for (let j = 0; j < this.barInformationresponse.KitsIn.length; j++) {

        var date = new Date();
        let currentDateForMate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + '01'
        let forCastMonth = this.formatDate(this.barInformationresponse.KitsIn[j].ForecastMonth)


        if (j == 0) {
          this.barInformationKitsIn.push({
            value: this.barInformationresponse.KitsIn[j].KitsInForecastRunmonth,
            forCastMonth: this.barInformationresponse.KitsIn[j].ForecastMonth,
            forcastKitsInForecastRunmonth:this.formatNumber(this.barInformationresponse.KitsIn[j].KitsInForecastRunmonth),
            forcastKitsInForecastPrevmonth: this.formatNumber(this.barInformationresponse.KitsIn[j].KitsInForecastPrevmonth),
            forcastKitsInPercentageVariance: this.formatNumber(this.barInformationresponse.KitsIn[j].PercentageVariance),
            // itemStyle: {
            //   color: '#692A01'
            // },
            type:'kitsIn'
          })
        }else{
          this.barInformationKitsIn.push({
            value: this.barInformationresponse.KitsIn[j].KitsInForecastRunmonth,
            forCastMonth: this.barInformationresponse.KitsIn[j].ForecastMonth,
            forcastKitsInForecastRunmonth:this.formatNumber(this.barInformationresponse.KitsIn[j].KitsInForecastRunmonth),
            forcastKitsInForecastPrevmonth: this.formatNumber(this.barInformationresponse.KitsIn[j].KitsInForecastPrevmonth),
            forcastKitsInPercentageVariance: this.formatNumber(this.barInformationresponse.KitsIn[j].PercentageVariance),
            // itemStyle: {
            //   color: '#ffa771'
            // },
            type:'kitsIn'
          })
        }


      }

      //------------
      for(let j=0; j<this.barInformationresponse.KitsOut.length;j++){
      
    //  for(let j=0; j<this.barInformationresponse.KitsOut.length;j++){
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
          // itemStyle: {
          //   color: '#003B00'
          // },
          type:'kitsOut'
        });
        
      }else{
        this.barInformationKitsOut.push({
          value: this.barInformationresponse.KitsOut[j].KitsOutForecastRunmonth,
          forCastMonth : this.barInformationresponse.KitsOut[j].ForecastMonth,
          forcastKitsOutForecastRunvmonth:this.formatNumber(this.barInformationresponse.KitsOut[j].KitsOutForecastRunmonth),
          forcastKitsOutForecastPrevmonth:this.formatNumber(this.barInformationresponse.KitsOut[j].KitsOutForecastPrevmonth),
          forcastKitsOutPercentageVariance:this.barInformationresponse.KitsOut[j].PercentageVariance,
          // itemStyle: {
          //   color: '#85af78'
          // },
          type:'kitsOut'
         });
      }

      }

      //--------------


      this.chartOption.xAxis.data = this.yearXAxisInformation;
      this.chartOption.series[0].data = this.barInformationKitsIn;
      this.chartOption.series[1].data = this.barInformationKitsOut;
     // this.chartOption.toolbox.feature[1].magicType.type = ["bar", "line"]
    //  this.chartOption.toolbox.feature[1].restore.show = 'true'
      this.echartsIntance.setOption(this.chartOption);

      for(const kitsIn of this.barInformationresponse.KitsIn){
        this.kitsInOurBar.push(kitsIn)
      }
      for(const kitsOut of this.barInformationresponse.KitsOut){
        this.kitsInOurBar.push(kitsOut)
      }
      
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
    let sponsorName = this._sponsorNameResponse
    localStorage.setItem('sponsorName',sponsorName)
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
    window.open(baseUrl +"/"+ 'kitsInOutScattered' + "/" +navUrl, "_blank", 'noreferrer');
    window.focus();
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
      trigger: "axis",

      formatter: function (params) {

        console.log(params)

        let returnType;
        if(params.length ==1){
          if(params[0].seriesName == 'Kits-Out'){
            returnType =  `
            <b style="margin-left:35%;"> ${params[0].axisValue}</b><br/><br/>
            ${params[0].seriesName} (Run Month): ${params[0].data.forcastKitsOutForecastRunvmonth}<br />
            ${params[0].seriesName} (Pre Month): ${params[0].data.forcastKitsOutForecastPrevmonth}<br />
            % Deviation from the last month (${params[0].seriesName}): ${params[0].data.forcastKitsOutPercentageVariance}%<br />
            `
          }else if(params[0].seriesName == 'Kits-In'){
            returnType =  `
            <b style="margin-left:35%;"> ${params[0].axisValue}</b><br/><br/>
            ${params[0].seriesName} (Run Month): ${params[0].data.forcastKitsInForecastRunmonth}<br />
            ${params[0].seriesName} (Pre Month): ${params[0].data.forcastKitsInForecastPrevmonth}<br />
            % Deviation from the last month (${params[0].seriesName}): ${params[0].data.forcastKitsInPercentageVariance}%<br />
            `
          }
         
        }else if(params.length ==2){
          returnType =  `
          <b style="margin-left:35%;"> ${params[0].axisValue}</b><br/><br/>
          ${params[1].seriesName} (Run Month): ${params[1].data.forcastKitsOutForecastRunvmonth}<br />
          ${params[1].seriesName} (Pre  Month): ${params[1].data.forcastKitsOutForecastPrevmonth}<br />
          % Deviation from the last month (${params[1].seriesName}): ${params[1].data.forcastKitsOutPercentageVariance}%<br />
          ----------------------------------------------------<br />
          
          ${params[0].seriesName} (Run Month): ${params[0].data.forcastKitsInForecastRunmonth}<br />
          ${params[0].seriesName} (Pre Month): ${params[0].data.forcastKitsInForecastPrevmonth}<br />
          % Deviation from the last month (${params[0].seriesName}): ${params[0].data.forcastKitsInPercentageVariance}%<br />

          `
        }

        // returnType =  `
        // <b style="margin-left:35%;"> ${params[0].axisValue}</b><br/><br/>
        // Kits-In (Run Month): ${params[0].data.forcastKitsInForecastRunmonth}<br />
        // Kits-In (Pre Month): ${params[0].data.forcastKitsInForecastPrevmonth}<br />
        // % Deviation from the last month (Kits-In): ${params[0].data.forcastKitsInPercentageVariance}%<br />
        // ----------------------------------------------------<br />
        // Kits-Out (Run Month): ${params[1].data.forcastKitsOutForecastRunvmonth}<br />
        // Kits-Out (Pre  Month): ${params[1].data.forcastKitsOutForecastPrevmonth}<br />
        // % Deviation from the last month (Kits-Out): ${params[1].data.forcastKitsOutPercentageVariance}%
        // `
       
        
        return returnType;
      },

    },
    legend: {
      data: [ "Kits-Out","Kits-In"],
      // selectedMode: false,
    },
    
    grid: {
      left: "3%",
      right: "6%",
      bottom: "6%",
      top: "13%",
      containLabel: true,
    },
    toolbox: {
      language: "en",
      right: "6%",
      show: true,
      feature: {
        // dataView: {
        //   title: "Data View",
        //   readOnly: false,
        //   lang: ["Data View", "Close", "Refresh"],
        // },
        magicType: {
          margin: 50,
          show: true,
        //  type: [],
          type: ["bar", "line"],
          title: {
            bar: "Bar",
            line: "Line"
           
          },
        },
        restore : {show: true, title: "Restore"},
        saveAsImage: { show: false, title: "save" },
      },
    },
  
    calculable: true,

    xAxis: {
      type: 'category',
      data: [],
      reverse: true,
            axisLabel: {
        interval: 0,
        nameGap :10
       },
       boundaryGap: true,
    },
    yAxis: {
      type: 'value',
      axisTick: {
        alignWithLabel: true
      },
      // axisLabel: {
      //   interval: 0,
      //   rotate: 20 //If the label names are too long you can manage this by rotating the label.
      // },
      // position: "right",

    },
    series: [
      {
        name: 'Kits-In',
        type: 'bar',
        barGap: 0,
        data: [],
        itemStyle: {
              color: '#ffa771'
            },
      
      },
      {
        name: 'Kits-Out',
        type: 'bar',
        data: [],
      itemStyle: {
            color: '#85af78'
          },
      },


    ]
    
  };
  infoDetails(content){
    // this._infoDisplay = true
    const dialogRef = this.dialog.open(InfoDetailsComponent, {       
      disableClose: true,
      data: { message: this.info_dispay},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
    });
    
        }
  downloadexcel(){
    this.excelService.exportAsExcelFile( this.kitsInOurBar,  'kits-In/Out performance');
  }

  ngOnDestroy() {
   if(this._sponsorName != undefined)
    this._sponsorName.unsubscribe();
  }

  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }

}
