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
  selector: 'app-fanchart-kits-out',
  templateUrl: './fanchart-kits-out.component.html',
  styleUrls: ['./fanchart-kits-out.component.less']
})
export class FanchartKitsOutComponent implements OnInit {
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
  level : any;
  actualNumber:any =[]
  forecastNumber:any =[]
  download: any = this.getBaseUrl() + "/assets/icon/download.png";
  _downloadKitsKitsOut : any;
  constructor(private dataService: ProtocolService,
    private dashService: DashboardService,
    private route: ActivatedRoute,private router: Router,private excelService:ExcelService,
    private cdRef: ChangeDetectorRef) { 
      localStorage.removeItem('actualnumberkitsOut')
      localStorage.removeItem('forecastnumberkitsOut')
    }

  ngOnInit() {
    this.level = 'Performance Kits-Out'
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

  //  if(data.KitsOut.length>0){
  //    this.chartOption.grid.backgroundColor = '#88d1fa'
  //   this.processData(data);
  //  }  else{
  //   this.chartOption.grid.backgroundColor = '#FFFFFF'
  //  }
    this.processData(data);
    this.showLoading = false;
    this.cdRef.detectChanges();
  }

  processData(data: any): any {
    this._downloadKitsKitsOut=data.KitsOut
    for(let i=0;i<data.KitsOut.length;i++){
      
     this.xAxisMonth.push(i)

     this.actual.push(data.KitsOut[i].actual)
     this.foreCast.push(data.KitsOut[i].foreCast)
     this.comparator.push(data.KitsOut[i].comparator)
     this.upperFCBand.push(data.KitsOut[i].upperFCBand)
    
     this.lowerFCBrand.push(data.KitsOut[i].lowerFCBrand)
     
     this.LB.push(data.KitsOut[i].LB)
    //  this.UB.push(data.KitsOut[i].UB)
    let UBvalue = (data.KitsOut[i].UB-data.KitsOut[i].LB)
    if(UBvalue >0){
      this.UB.push(UBvalue)
    }else{
      this.UB.push('')
    }
    // this.UB.push(data.KitsOut[i].UB-data.KitsOut[i].LB)
     this.month.push(this.formatDate(data.KitsOut[i].month))
     this.UBMainValue.push(data.KitsOut[i].UB)
     let actualNumbersKitsOut =data.KitsOut[i].actualNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
     let forecastNumberKitsOut =Math.round(data.KitsOut[i].foreCastNumber)
     this.actualNumber.push(actualNumbersKitsOut)
     this.forecastNumber.push(forecastNumberKitsOut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    //  if(data.KitsOut[i].actualNumber != ''){
    //   this.actualNumber.push(data.KitsOut[i].actualNumber)
    //  }else{
    //   this.actualNumber.push('Not available')

    //  }
    //  if(data.KitsOut[i].foreCastNumber != "" || data.KitsOut[i].foreCastNumber != null || data.KitsOut[i].foreCastNumber >= 0){
    //   this.forecastNumber.push(data.KitsOut[i].foreCastNumber)
    //  }else{
    //   this.forecastNumber.push('Not available')

    //  }
    }
    console.log('+++++@#' + this.xAxisMonth);
    localStorage.setItem('actualnumberkitsOut',JSON.stringify(this.actualNumber))
    localStorage.setItem('forecastnumberkitsOut',JSON.stringify(this.forecastNumber))
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
    
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: 'cross'
    },

    formatter: function (params) {
      var valupActualNumber =[]
      var valupforecastNumber =[]
      var actualNumber = JSON.parse(localStorage.getItem("actualnumberkitsOut"));
      var forecastNumber = JSON.parse(localStorage.getItem("forecastnumberkitsOut"));
      valupActualNumber = actualNumber
      valupforecastNumber = forecastNumber
        // return rez;
  
        return `Month number: ${params[0].axisValue}<br /> 
        Month: ${params[7].data}<br />
        Actual #Kits :${valupActualNumber[params[0].axisValue]}<br />
        Forecast #Kits :${valupforecastNumber[params[0].axisValue]}<br />
        (%) Actual: ${params[0].data}<br />
        (%) ForeCast: ${params[1].data}<br />
        Comparator: ${params[2].data}<br />
        Upper FC Limit: ${params[3].data}<br />
        Lower FC Limit: ${params[4].data}<br />
        LB: ${params[5].data}<br/>
        UB: ${params[8].data}<br /> `;
    },  

      //  position: ['35%', '32%'],
    //    formatter: function (params) {       
    //     let toolTipValue = `${params.seriesName} - ${params.data}%`
    //      return toolTipValue
    //  } 
    },
    // backgroundColor: '#fbfdff',
    // opacity:.5,
    legend: {
      orient: 'horizontal',
      // data: ["Actual","ForeCast","Comparator","UpperFCBand","LowerFCBand","LB","UB"],
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
      // backgroundColor: '#ccc',
      // // opacity:1,
      // backgroundColor: '#d7e6ff',
      // opacity:.5,
      show: true
     
    },
    nameTextStyle:{
      fontSize : 12,
      padding :23,
      
    } ,
    xAxis: {
      type: 'category',
      name: "Months from First Kit Sent",
      nameLocation: "middle",
      boundaryGap: false,
      data: [],
//       axisLabel: {
//         interval: 5,
        
// },
  },
  yAxis: {
      type: 'value',
      name :'% Cumulative Kits-Out',
      nameRotate: 90,
      nameLocation: "center",
      axisLabel: {
        formatter: "{value}%"
        },
     padding:10
  },
  series: [

    {
      data: [],
      type: 'line',
      name: "Actual",
      // stack :"Actual",
      itemStyle: { color: "#000000" },
    //   animationDelay: function (idx) {
    //     return idx * 10;
    // },
 
    },
    {
       
      data: [],
      type: 'line',
      name: "ForeCast",
      // stack :"ForeCast",
      itemStyle: { color: "#FF0000" },
    //   animationDelay: function (idx) {
    //     return idx * 10;
    // }
    },
    {
    data :[],
    type: 'line',
    name: "Comparator",
    // stack :"Comparator",
    itemStyle: { color: "#4682B4" },
  //   animationDelay: function (idx) {
  //     return idx * 10;
  // }
  },
  {
 
    data: [],
    type: 'line',
    name: "Upper FC Limit",
    smooth:true,
    // stack :"Upper FC Limit",
    lineStyle: {
          color: '#8b0000',
          width: 3,
          // type: 'dashed'
      } ,
    //   animationDelay: function (idx) {
    //     return idx * 10;
    // }     
},  
{
 
  data: [],
  type: 'line',
  name: "Lower FC Limit",
  smooth:true,
  // symbol: 'none',
  // stack :"Lower FC Limit",
  lineStyle: {
        color: '#b22222',
        width: 2,
        // type: 'dashed'
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
  // itemStyle: { 
  //   color: "#000",
  //   type: 'dashed', 
  //  },
 

  areaStyle: {   
        color: '#ffffff',
        origin:"start",
        
        
},

},
{
  
data :[],
type: 'line',
name: "UB",
itemStyle: { 
  color: "#000",
  type: 'dashed', 
 },
stack: 'UB',
lineStyle: {
color: '#000000',
width: 0,
type: 'dashed', 
},
// areaStyle: {
//   color: '#c1d9ff', 
//   origin:"start" ,
//   opacity:.5
// },
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
  stack :"month",
    
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
    ],
  };
  downloadexcel(){
    this.excelService.exportAsExcelFile(this._downloadKitsKitsOut,  'Kits-Out');
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
