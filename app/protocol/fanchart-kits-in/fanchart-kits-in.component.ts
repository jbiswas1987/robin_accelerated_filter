import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Input, Output, EventEmitter } from "@angular/core";
import { DashboardService } from "../../dashboard/dashboard.service";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { Breakdown, BreakdownInt } from "src/app/common/common";
import { ActivatedRoute } from "@angular/router";
import { ChangeDetectorRef } from "@angular/core";
import {ExcelService} from '../../forcast-dashboard/excel.service';

@Component({
  selector: 'app-fanchart-kits-in',
  templateUrl: './fanchart-kits-in.component.html',
  styleUrls: ['./fanchart-kits-in.component.less']
})
export class FanchartKitsINComponent implements OnInit {
  showLoading: boolean = false;
  echartsIntance: any;
  protocolId: any;
  sponsorSub: any;
  _ProtocolPerfSub: any;
  _getEnrollmentTargetSub: any;
  _qryStrSponsor: any = "";
  _sponsorName: string;
  chartname : string;
  _fanKitsINOutSub:any
  xAxisMonth :any =[]
  responValue :any;
  actual:any =[]
  foreCast:any =[];
  comparator:any =[];
  upperFCBand :any =[];
  lowerFCBrand:any=[];
  LB:any=[];
  UB:any =[];
  month :any =[]
  UBMainValue : any =[]
  actualNumber:any =[]
  forecastNumber:any =[]
  level : any;
  values: any=[]
  download: any = this.getBaseUrl() + "/assets/icon/download.png";
  _downloadKitsIn : any;
  constructor(private dataService: ProtocolService,
    private dashService: DashboardService,
    private route: ActivatedRoute,private router: Router,private excelService:ExcelService,
    private cdRef: ChangeDetectorRef) { 
      localStorage.removeItem('actualnumberkitsIN')
      localStorage.removeItem('forecastnumberkitsIN')
    }

  ngOnInit() {
    // this.level = '% Cumulative Kits-In'
    this.level = 'Performance Kits-In'
    this.route.params.subscribe((params) => {
      this.protocolId = params["id"];
      

      if (params.hasOwnProperty("sponsor")) {
        this._qryStrSponsor = atob(params["sponsor"]);
       
      }
      console.log('ProtoCol ID'+ this.protocolId)
      console.log('Sponsor Name'+this._qryStrSponsor )
      this.getFanChartKitsInOut(this.protocolId,this._qryStrSponsor );
     // this.processData('');
     // this.reset(this.protocolId);
    });
  }
  getFanChartKitsInOut(protocolId,_qryStrSponsor){
    let requestBody ={      
        "protocolId" : protocolId,
        "sponsor": _qryStrSponsor    
    }

    this._fanKitsINOutSub =  this.dashService.getfanChartKitsInOut(requestBody).subscribe((dataRows) => {
      this.responValue = dataRows;
      this.performanceData(this.responValue);

    });


  }

  reset(protocolId) {
    //this.showLoading = true;
    this.cdRef.detectChanges();
    this.sponsorSub = this.dashService.sponsorName.subscribe((respdata) => {
      this.showLoading = true;
      this._qryStrSponsor != "" ? this._qryStrSponsor : respdata;
      protocolId = '17'
      this._getEnrollmentTargetSub = this.dataService
        .getEnrollmentTarget(protocolId, this._qryStrSponsor)
        .subscribe(
          (data: BreakdownInt) => {
            console.log(data);
            if (!(data || data.value || data.value > 0)) {
              data = new BreakdownInt();
              data.value = 100;
            }
            
            let enrollmentTarget = data.value;
            this._ProtocolPerfSub = this.dataService
              .getProtocolPerformance(
                protocolId,
                enrollmentTarget,
                this.chartname,
                this._qryStrSponsor
              )
              .subscribe(
                (data) => {
                  this.performanceData(data);
                },
                (err) => {
                  this.showLoading = false;
                }
              );
          },
          (err) => {
            this.showLoading = false;
          }
        );
    });
  }

  performanceData(data: any): any {
    console.log(JSON.stringify(data))
   
    this.processData(data);
    this.showLoading = false;
    this.cdRef.detectChanges();
  }

  processData(data: any): any {
    this._downloadKitsIn = data.KitsIn;
    for(let i=0;i<data.KitsIn.length;i++){
     this.xAxisMonth.push(i)
     
     this.actual.push(data.KitsIn[i].actual)
     this.foreCast.push(data.KitsIn[i].foreCast)
     this.comparator.push(data.KitsIn[i].comparator)
     this.upperFCBand.push(data.KitsIn[i].upperFCBand)
     this.lowerFCBrand.push(data.KitsIn[i].lowerFCBrand)
     this.LB.push(data.KitsIn[i].LB)
     
    //  this.UB.push(data.KitsIn[i].UB)
    let UBvalue = data.KitsIn[i].UB-data.KitsIn[i].LB
    if(UBvalue > 0){
      this.UB.push(UBvalue)
    }else{
      this.UB.push('') 
    }
    // this.UB.push(data.KitsIn[i].UB-data.KitsIn[i].LB)
     this.month.push(this.formatDate(data.KitsIn[i].month))
     this.UBMainValue.push(data.KitsIn[i].UB)
     let actualNumbersKitsIN =data.KitsIn[i].actualNumbers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
     let forecastNumberKitsIn =Math.round(data.KitsIn[i].foreCastNumbers)
     this.actualNumber.push(actualNumbersKitsIN)
     this.forecastNumber.push(forecastNumberKitsIn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    //  if(data.KitsIn[i].actualNumbers != ''){
    //   this.actualNumber.push(data.KitsIn[i].actualNumbers)
    //  }else{
    //   this.actualNumber.push('Not available')

    //  }
    //  if(data.KitsIn[i].foreCastNumbers != "" || data.KitsIn[i].foreCastNumbers != null || data.KitsIn[i].foreCastNumbers >= 0){
    //   this.forecastNumber.push(data.KitsIn[i].foreCastNumbers)
    //  }else{
    //   this.forecastNumber.push('Not available')

    //  }
   //  this.actualNumber.push(data.KitsIn[i].actualNumbers)
    
    //  this.foreCastNumber.push(data.KitsIn[i].foreCastNumbers)
    }
    localStorage.setItem('actualnumberkitsIN',JSON.stringify(this.actualNumber))
    localStorage.setItem('forecastnumberkitsIN',JSON.stringify(this.forecastNumber))
     
    this.chartOption.xAxis.data= this.xAxisMonth;
     
     this.chartOption.series[0].data = this.actual;
    this.chartOption.series[1].data = this.foreCast;
    this.chartOption.series[2].data = this.comparator;
    this.chartOption.series[3].data = this.upperFCBand;
    this.chartOption.series[4].data = this.lowerFCBrand;
     this.chartOption.series[5].data = this.LB;
     this.chartOption.series[6].data = this.UB;
     this.chartOption.series[7].data = this.month;
     this.chartOption.series[8].data = this.UBMainValue;
    //  this.chartOption.series[9].data = this.actualNumber
    
   // this.chartOption = this.actualNumber
    //  this.chartOption.series[10].data = this.foreCastNumber
     this.echartsIntance.setOption(this.chartOption);
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

  onChartInit(ec) {
    this.echartsIntance = ec;
  }

  chartOption: any = {
    // backgroundColor: '#fbfdff',
    // opacity:.5,
    
    tooltip: {
    trigger: "axis",

    axisPointer: {
      type: 'cross'
  },

  //   axisPointer: {
  //     animation: true
  // },
  formatter: function (params) {
      // let rez = '<p>' + params[0].axisValue + '</p>';
     //  console.log(params); //quite useful for debug
      
      var valupActualNumber =[]
      var valupforecastNumber =[]
      var actualNumber = JSON.parse(localStorage.getItem("actualnumberkitsIN"));
      var forecastNumber = JSON.parse(localStorage.getItem("forecastnumberkitsIN"));
      valupActualNumber = actualNumber
      valupforecastNumber = forecastNumber
    
      console.log(valupforecastNumber)

      return `Month number: ${params[0].axisValue}<br /> 
      Month: ${params[7].data}<br />
      Actual #Kits :${valupActualNumber[params[0].axisValue]}<br />
      Forecast #Kits :${valupforecastNumber[params[0].axisValue]}<br />
      (%) Actual: ${params[0].data}<br />
      (%) ForeCast: ${params[1].data}<br />
       Comparator: ${params[2].data}<br />
      Upper FC Limit: ${params[3].data}<br />
      Lower FC Limit: ${params[4].data}<br />
      (%) LB: ${params[5].data}<br/>
      (%) UB: ${params[8].data}<br /> `;
  },  
      
        // position: ['35%', '32%'],
    //    formatter: function (params) {
    //     console.log('@@@@'+JSON.stringify(params[1]))       
    //    let toolTipValue = `${params.seriesName} - ${params.data}%`
    //     return toolTipValue
    // } 
    },
    legend: {
      orient: 'horizontal',
      data: ["Actual","ForeCast","Comparator","Upper FC Limit","Lower FC Limit","LB","UB"],
      x: 'left',
      selectedMode: false,
      padding :16
    },
    grid: {
      left: "3%",
      right: "8%",
      bottom: "14%",
      top : "25%",
      containLabel: true,
      // backgroundColor: '#d7e6ff',
      // opacity:.5,
      // backgroundColor: '#ccc',
      // opacity:1,
      show: true
    },
    nameTextStyle:{
      fontSize : 12,
      padding :23,
      
    } ,
    
    xAxis: {
      type: 'category',
      name: "Months from First Kit Received",
      nameLocation: "middle",
      boundaryGap: false,
      data: [],
      
     
      
  },
  yAxis: {
      type: 'value',
      name :'% Cumulative Kits-In',
      nameRotate: 90,
      nameLocation: "center",
      drawAxisLineEnabled : 'no',
      drawGridLinesEnabled : 'no',
      axisLabel: {
        formatter: "{value}%"
        },
      padding:10,
      
     
  },
  series: [
    {
      data: [],
      type: 'line',
      name: "Actual",
      // stack :"Actual",
      itemStyle: { color: "#000000" },
      animationDelay: function (idx) {
        return idx * 10;
    },
    
    },
    {
       
      data: [],
      type: 'line',
      name: "ForeCast",
      // stack :"ForeCast",
      itemStyle: { color: "#FF0000" },
      animationDelay: function (idx) {
        return idx * 10;
    }
    },
    {
    data :[],
    type: 'line',
    name: "Comparator",
    // stack :"Comparator",
    itemStyle: { color: "#4682B4" },
    animationDelay: function (idx) {
      return idx * 10;
  }
  },
  {
 
    data: [],
    type: 'line',
    name: "Upper FC Limit",
    // stack :"Upper FC Limit",
    lineStyle: {
          color: '#8b0000',
          width: 3,
          type: 'dashed'
      } ,
      animationDelay: function (idx) {
        return idx * 10;
    }     
},  
{
 
  data: [],
  type: 'line',
  name: "Lower FC Limit",
  // stack :"Lower FC Limit",
  lineStyle: {
        color: '#b22222',
        width: 3,
        type: 'dashed'
    } ,
    animationDelay: function (idx) {
      return idx * 10;
  }     
},  
  { 
    data :[],
    type: 'line',
    name: "LB",
    stack: 'UB',
    lineStyle: {
      // color: '#deebff',
      color: '#000000',
       width: 0,
      type: 'dashed'
    },
    itemStyle: { 
      color: "#000",
      type: 'dashed', 
     },
    areaStyle: {   
      color: '#FFFFFF',
      origin:"start",
    
      
},
},
{
  data :[],
  type: 'line',
  name: "UB",
  itemStyle: { 
    color: "#000000",
    type: 'dashed', 
   },
  stack: 'UB',
  lineStyle: {
  color: '#000000',
  width: 0,
  type: 'dashed', 
},

areaStyle: {
  color: '#77b5fe', 
  origin:"start" ,
  opacity:.7
},
},
{
  data :[],
  type:'line',
  name: "month",
  // stack :"month",
    
},
{
  data :[],
  type:'line',
  name: "UBMainvalue",
  // stack :"month",
  lineStyle: {
    color: '#000000',
    width: 0,
    type: 'dashed', 
  },
  itemStyle: { 
    color: "#000000",
    type: 'dashed', 
   },
    
},

// {
 
//   data :[],
//   type:'line',
//   name: "actualnumbers",
  
// },
// {
 
//   data :[],
//   type:'line',
//   name: "forecastnumbers",
// }

    ],
  };

  downloadexcel(){
    this.excelService.exportAsExcelFile(this._downloadKitsIn,  'Kits-In');
  }

  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }

  ngOnDestroy() {
    if (this.sponsorSub != undefined) this.sponsorSub.unsubscribe();
    if (this._ProtocolPerfSub != undefined) this._ProtocolPerfSub.unsubscribe();
    if (this._getEnrollmentTargetSub != undefined)
      this._getEnrollmentTargetSub.unsubscribe();
  }

}

