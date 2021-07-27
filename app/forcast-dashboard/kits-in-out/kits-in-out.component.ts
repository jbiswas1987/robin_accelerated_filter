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
export class KitsInOutComponent implements OnInit {
  showLoading: boolean = false;
  echartsIntance: any;
  protocolId: any;
  sponsorSub: any;
  _ProtocolPerfSub: any;
  _getEnrollmentTargetSub: any;
  _qryStrSponsor: any = "";
  _sponsorName: string;
  chartname : string;
  @Output() countToEmit = new EventEmitter<String>();
  constructor(private router: Router,
    private dataService: ProtocolService,
    private dashService: DashboardService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.protocolId = params["id"];

      if (params.hasOwnProperty("sponsor")) {
        this._qryStrSponsor = atob(params["sponsor"]);
       
      }
      this.processData('');
      this.reset(this.protocolId);
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
    console.log('+++++@#' + data);
    this.processData(data);
    this.showLoading = false;
    this.cdRef.detectChanges();
  }

  processData(data: any): any {
    // let industryQ1 = data.filter((x) => x.percentile % 5 == 0).map((y) => y.q1);
    // let industryQ2 = data.filter((x) => x.percentile % 5 == 0).map((y) => y.q2);
    // let industryQ3 = data.filter((x) => x.percentile % 5 == 0).map((y) => y.q3);
    // let sponsorActual = data
    //   .filter((x) => x.percentile % 5 == 0)
    //   .map((y) => y.protocol);
    // let label = data
    //   .filter((x) => x.percentile % 5 == 0)
    //   .map((x) => x.percentile + "%");
    // let comparatorCount =
    //   data.length == 0 ? "No Comparator" : data[0].comparatorCount;
    // this.countToEmit.emit(comparatorCount);
    // this.chartOption.yAxis.data = label
    // //this.chartOption.xAxis.data = [1,5,9,13,17,21,25,29,33,37,41,45,49,53,57,61,65,69,73,77,81,85,89,93,97,101,105,109,113,117,121,125,129];
    // // debugger
    // console.log('#$@' + industryQ3)
    let actual = [0,0,0,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,1	,4	,6	,10	,11	,15	,18	,21	,23	,25	,29	,30	,32	,35	,39	,42	,47	,48	,50]
    let forCast =['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',50	,52	,54	,57	,60	,63	,65	,68	,71	,74	,76	,78	,80	,82	,84	,86	,86	,88	,89	,89	,90	,90	,91	,91	,92	,93	,93	,94	,95	,96	,96	,97	,98	,98	,98	,99	,99,	100]
    let comparator =[0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,1	,3	,6	,9	,12	,15	,19	,23	,28	,32	,36	,41	,45	,49	,52	,55	,57	,58	,60	,62	,64	,67	,70	,73	,75	,78	,81	,84	,86	,88	,90	,92	,94	,95	,96	,97	,97	,98	,98	,98	,98	,98	,98	,98	,98	,99	,99	,99, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100,100]
    let upperFCBand =['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',50	,50	,51	,52	,54	,54	,56	,59	,62	,65	,67	,69	,71	,73	,75	,77	,77	,79	,80	,80	,81	,81	,82	,82	,83	,84	,84	,85	,86	,87	,87	,88	,89	,89	,89	,90	,91	,92	,93	,94	,95	,96	,97	,98	,99,	100]
    let lowerFCBrand =['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',50	,59	,61	,64	,67	,70	,72	,75	,78	,81	,83	,85	,87	,89	,91	,93	,93	,95	,96	,96	,97	,97	,98	,98	,99	,100]
    let comparatorBrand =[0	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,5.29	,15.87	,31.75	,45.43	,56.93	,66.24	,73.37	,78.30	,82.48	,85.90	,88.36	,89.87	,90.41	,90.66	,90.60	,90.25	,89.59	,88.64	,87.58	,86.40	,85.12	,83.72	,82.22	,80.56	,78.74	,76.78	,74.65	,72.38	,69.92	,67.29	,64.48	,61.49	,58.32	,55.36	,52.61	,50.07	,47.74	,45.63	,43.60	,41.66	,39.82	,38.06	,36.40	,34.64	,32.77	,30.80	,28.73	,26.56	,24.62	,22.89	,21.39	,20.11	,19.05	,18.07	,17.17	,16.34	,15.58	,14.91	,14.27	,13.66	,13.10	,12.57	,12.08	,11.46	,10.70	,9.80	,8.77	,7.60	,6.60	,5.77	,5.11	,4.61	,4.29	,3.88	,3.39	,2.83	,2.18	,1.45	,0.87	,0.44	,0.15	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00	,0.00]
     let LB = [0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,5	,16	,32	,45	,57	,66	,73	,78	,82	,86	,89	,90	,92	,93	,94	,95	,96	,97	,98	,98	,99	,99,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100,	100]
     let UB =[0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,1	,1	,2	,3	,5	,6	,8	,10	,12	,14	,16	,17	,19	,21	,23	,25	,28	,30	,33	,36	,39	,42	,45	,47	,50	,52	,54	,56	,58	,60	,62	,64	,65	,67	,69	,71	,73	,75	,77	,79	,80	,81	,82	,83	,84	,84	,85	,86	,86	,87	,87	,88	,89	,89	,90	,91	,92	,93	,94	,95	,95	,96	,96	,97	,97,98,99,99,100,100,100]
     this.chartOption.series[0].data = actual;
    this.chartOption.series[1].data = forCast;
    this.chartOption.series[2].data = comparator;
    this.chartOption.series[3].data = upperFCBand;
    this.chartOption.series[4].data = lowerFCBrand;
     this.chartOption.series[5].data = LB;
     this.chartOption.series[6].data = UB;
  //  this.echartsIntance.setOption(this.chartOption);
  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }

  chartOption: any = {
    
    tooltip: {
       trigger: "axis",
    },
    legend: {
      data: [],
    },
    grid: {
      left: "13%",
      right: "14%",
      bottom: "14%",
      top : "14%",
      containLabel: true,
    },

    xAxis: {
      type: 'category',
      name: "Weeks from FPI",
      nameLocation: "middle",
      boundaryGap: false,
      data: [1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129]
  },
  yAxis: {
      type: 'value',
      name :'Cumulative % enrollments',
  },
  series: [
    {
      data: [],
      type: 'line',
      name: "Q1",
      stack :"Q1",
      itemStyle: { color: "#000000" },
      animationDelay: function (idx) {
        return idx * 10;
    }
    },
    {
       
      data: [],
      type: 'line',
      name: "Q2",
      stack :"Q2",
      itemStyle: { color: "#FF0000" },
      animationDelay: function (idx) {
        return idx * 10;
    }
    },
    {
    data :[],
    type: 'line',
    name: "Q3",
    stack :"Q3",
    itemStyle: { color: "#4682B4" },
    animationDelay: function (idx) {
      return idx * 10;
  }
  },
  {
 
    data: [],
    type: 'line',
    name: "Q4",
    stack :"Q4",
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
  name: "Q5",
  stack :"Q5",
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
    name: "Q6",
  //    areaStyle: {
  //     color: '#abcdff'
  // },
  itemStyle: { color: "#deebff" },
  stack: 'Q6',
  animationDelay: function (idx) {
    return idx * 10;
}
      
},
{
 
  data :[],
  type: 'line',
  name: "Q7",
//    areaStyle: {
//     color: '#abcdff'
// },
itemStyle: { color: "#deebff" },
stack: 'Q7',
animationDelay: function (idx) {
  return idx * 10;
}  
}

    ],
  };

  

  ngOnDestroy() {
    if (this.sponsorSub != undefined) this.sponsorSub.unsubscribe();
    if (this._ProtocolPerfSub != undefined) this._ProtocolPerfSub.unsubscribe();
    if (this._getEnrollmentTargetSub != undefined)
      this._getEnrollmentTargetSub.unsubscribe();
  }

}
