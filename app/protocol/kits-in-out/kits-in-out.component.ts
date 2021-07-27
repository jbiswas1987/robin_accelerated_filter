import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Input, Output, EventEmitter } from "@angular/core";
import { DashboardService } from "../../dashboard/dashboard.service";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { Breakdown, BreakdownInt } from "src/app/common/common";
import { ActivatedRoute } from "@angular/router";
import { ChangeDetectorRef } from "@angular/core";
@Component({
  selector: 'app-kits-in-out',
  templateUrl: './kits-in-out.component.html',
  styleUrls: ['./kits-in-out.component.less']
})
export class KitsInOutComponent{
//   showLoading: boolean = false;
//   echartsIntance: any;
//   protocolId: any;
//   sponsorSub: any;
//   _ProtocolPerfSub: any;
//   _getEnrollmentTargetSub: any;
//   _qryStrSponsor: any = "";
//   _sponsorName: string;
//   chartname : string;
//   _fanKitsINOutSub:any
//   xAxisMonth :any =[]
//   responValue :any;
//   actual:any =[]
//   foreCast:any =[];
//   comparator:any =[];
//   upperFCBand :any =[];
//   lowerFCBrand:any=[];
//   LB:any=[];
//   UB:any =[];
//   @Output() countToEmit = new EventEmitter<String>();
//   constructor(private router: Router,
//     private dataService: ProtocolService,
//     private dashService: DashboardService,
//     private route: ActivatedRoute,
//     private cdRef: ChangeDetectorRef) { }

//   ngOnInit() {
//     this.route.params.subscribe((params) => {
//       this.protocolId = params["id"];
      

//       if (params.hasOwnProperty("sponsor")) {
//         this._qryStrSponsor = atob(params["sponsor"]);
       
//       }
//       console.log('ProtoCol ID'+ this.protocolId)
//       console.log('Sponsor Name'+this._qryStrSponsor )
//       this.getFanChartKitsInOut(this.protocolId,this._qryStrSponsor );
//      // this.processData('');
//      // this.reset(this.protocolId);
//     });
    
//   }

//   getFanChartKitsInOut(protocolId,_qryStrSponsor){
//     let requestBody ={      
//         "protocolId" : protocolId,
//         "sponsor": _qryStrSponsor    
//     }

//     this._fanKitsINOutSub =  this.dashService.getfanChartKitsInOut(requestBody).subscribe((dataRows) => {
//       this.responValue = dataRows;
//       this.performanceData(this.responValue);

//     });


//   }

//   reset(protocolId) {
//     //this.showLoading = true;
//     this.cdRef.detectChanges();
//     this.sponsorSub = this.dashService.sponsorName.subscribe((respdata) => {
//       this.showLoading = true;
//       this._qryStrSponsor != "" ? this._qryStrSponsor : respdata;
//       protocolId = '17'
//       this._getEnrollmentTargetSub = this.dataService
//         .getEnrollmentTarget(protocolId, this._qryStrSponsor)
//         .subscribe(
//           (data: BreakdownInt) => {
//             console.log(data);
//             if (!(data || data.value || data.value > 0)) {
//               data = new BreakdownInt();
//               data.value = 100;
//             }
            
//             let enrollmentTarget = data.value;
//             this._ProtocolPerfSub = this.dataService
//               .getProtocolPerformance(
//                 protocolId,
//                 enrollmentTarget,
//                 this.chartname,
//                 this._qryStrSponsor
//               )
//               .subscribe(
//                 (data) => {
//                   this.performanceData(data);
//                 },
//                 (err) => {
//                   this.showLoading = false;
//                 }
//               );
//           },
//           (err) => {
//             this.showLoading = false;
//           }
//         );
//     });
//   }

//   performanceData(data: any): any {
   
//     this.processData(data);
//     this.showLoading = false;
//     this.cdRef.detectChanges();
//   }

//   processData(data: any): any {
    
//     for(let i=0;i<data.length;i++){
//      this.xAxisMonth.push(i)
//      this.actual.push(data[i].actual)
//      this.foreCast.push(data[i].foreCast)
//      this.comparator.push(data[i].comparator)
//      this.upperFCBand.push(data[i].upperFCBand)
//      this.lowerFCBrand.push(data[i].lowerFCBrand)
//      this.LB.push(data[i].LB)
//      this.UB.push(data[i].UB)
//     }
//     console.log('+++++@#' + this.xAxisMonth);
   
//      this.chartOption.xAxis.data= this.xAxisMonth;
//      this.chartOption.series[0].data = this.actual;
//     this.chartOption.series[1].data = this.foreCast;
//     this.chartOption.series[2].data = this.comparator;
//     this.chartOption.series[3].data = this.upperFCBand;
//     this.chartOption.series[4].data = this.lowerFCBrand;
//      this.chartOption.series[5].data = this.LB;
//      this.chartOption.series[6].data = this.UB;
//      this.echartsIntance.setOption(this.chartOption);
//   }

//   onChartInit(ec) {
//     this.echartsIntance = ec;
//   }

//   chartOption: any = {
    
//     tooltip: {
//        trigger: "axis",
//     },
//     legend: {
//       data: [],
//     },
//     grid: {
//       left: "13%",
//       right: "14%",
//       bottom: "14%",
//       top : "14%",
//       containLabel: true,
//     },

//     xAxis: {
//       type: 'category',
//       name: "Weeks from FPI",
//       nameLocation: "middle",
//       boundaryGap: false,
//       data: []
//   },
//   yAxis: {
//       type: 'value',
//       name :'Cumulative % enrollments',
//   },
//   series: [
//     {
//       data: [],
//       type: 'line',
//       name: "Q1",
//       stack :"Q1",
//       itemStyle: { color: "#000000" },
//       animationDelay: function (idx) {
//         return idx * 10;
//     }
//     },
//     {
       
//       data: [],
//       type: 'line',
//       name: "Q2",
//       stack :"Q2",
//       itemStyle: { color: "#FF0000" },
//       animationDelay: function (idx) {
//         return idx * 10;
//     }
//     },
//     {
//     data :[],
//     type: 'line',
//     name: "Q3",
//     stack :"Q3",
//     itemStyle: { color: "#4682B4" },
//     animationDelay: function (idx) {
//       return idx * 10;
//   }
//   },
//   {
 
//     data: [],
//     type: 'line',
//     name: "Q4",
//     stack :"Q4",
//     lineStyle: {
//           color: '#8b0000',
//           width: 3,
//           type: 'dashed'
//       } ,
//       animationDelay: function (idx) {
//         return idx * 10;
//     }     
// },  
// {
 
//   data: [],
//   type: 'line',
//   name: "Q5",
//   stack :"Q5",
//   lineStyle: {
//         color: '#b22222',
//         width: 3,
//         type: 'dashed'
//     } ,
//     animationDelay: function (idx) {
//       return idx * 10;
//   }     
// },  
//   {
 
//     data :[],
//     type: 'line',
//     name: "Q6",
//   //    areaStyle: {
//   //     color: '#abcdff'
//   // },
//   itemStyle: { color: "#deebff" },
//   stack: 'Q6',
//   animationDelay: function (idx) {
//     return idx * 10;
// }
      
// },
// {
 
//   data :[],
//   type: 'line',
//   name: "Q7",
// //    areaStyle: {
// //     color: '#abcdff'
// // },
// itemStyle: { color: "#deebff" },
// stack: 'Q7',
// animationDelay: function (idx) {
//   return idx * 10;
// }  
// }

//     ],
//   };

  

//   ngOnDestroy() {
//     if (this.sponsorSub != undefined) this.sponsorSub.unsubscribe();
//     if (this._ProtocolPerfSub != undefined) this._ProtocolPerfSub.unsubscribe();
//     if (this._getEnrollmentTargetSub != undefined)
//       this._getEnrollmentTargetSub.unsubscribe();
//   }

}
