import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Input, Output, EventEmitter } from "@angular/core";
import { DashboardService } from "../../dashboard/dashboard.service";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { Breakdown, BreakdownInt } from "src/app/common/common";
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-protocol-kits-in-kits-out',
  templateUrl: './protocol-kits-in-kits-out.component.html',
  styleUrls: ['./protocol-kits-in-kits-out.component.less']
})
export class ProtocolKitsInKitsOutComponent implements OnInit {
  showLoading: boolean = false;
  echartsIntance: any;
  protocolId: any;
  sponsorSub: any;
  _ProtocolPerfSub: any;
  _getEnrollmentTargetSub: any;
  _qryStrSponsor: any = "";
  _sponsorName: string;
  chartname : string;
  echartsObj : any;

  constructor(private router: Router,
    private dataService: ProtocolService,
    private dashService: DashboardService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.processData('');
  }

  processData(data: any): any {
     let datas = [92, 92, 91, 94, 90,20,9,89,6,23,50,4,9,8];
     this.chartOption.series[0].data = datas;
 
 //  this.echartsIntance.setOption(this.chartOption);
  }

  onChartInit($event) {
    console.log($event)
    
    this.echartsIntance = $event;
    this.echartsIntance.on('click', function(params) {
    //   console.log(params)
    // this.router.na
      // this.echartsIntance.series[0].data.forEach((data, index) => {
      //     if (index === params.dataIndex) {
      //         if (!data.isChecked) {
                
      //             data.isChecked = true;
      //         }
      //     } else {
      //         if (data.isChecked) {
                 
      //             data.isChecked = false;
      //         }
  
      //     }
      // })
      // this.echartsIntance.setOption(this.chartOption)
  });
  }


  onpieselected($event){
    console.log($event)
    this.router.navigate(["kitsInOutScattered",$event.dataIndex]);
  }

  chartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'shadow'
      }
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
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug', 'Sep', 'Oct','Nov','Dec'],
        reverse: true
    },
    yAxis: {
        type: 'value',
        axisTick: {
          alignWithLabel: true
      }, 
      position: "right",
      
    },
    series: [
      {
        name: 'Q1',
        type: 'bar',
        barGap: 0,
        data: [],
        itemStyle: { color: "#A9A9A9" }
    },
//     {
//         name: 'Q2',
//         type: 'bar',
//         data: [92, 82, 91, 94, 290,20,9,89,6,23,3,5,10,90],
//         itemStyle: { color: "#A9A9A9" }
//     },
//     {
//         name: 'Q3',
//         type: 'bar',
//         data: [150, 232, 201, 54, 90,20,9,89,6,23,91,92,98,100],
//         itemStyle: { color: "#A9A9A9" }
//     },
//     {
//         name: 'Q4',
//         type: 'bar',
//         data: [98, 77, 101, 99, 40,20,9,89,6,23,100,43,23,23,13,41],
//         itemStyle: { color: "#A9A9A9" }
//     },
//     {
//       name: 'Q5',
//       type: 'bar',
//       data: [98, 77, 101, 99, 40,20,9,89,6,23,23,42,23,12,13,90,23,12],
//       itemStyle: { color: "#A9A9A9" }
//   },
//   {
//     name: 'Q6',
//     type: 'bar',
//     data: [98, 77, 101, 99, 40,20,9,89,6,23,23,42,23,12,13,90,23,12],
//     itemStyle: { color: "#A9A9A9" }
// },
// {
//   name: 'Q7',
//   type: 'bar',
//   data: [98, 77, 91, 99, 40,20,94,89,61,23,23,42,23,121,93,90,23,92],
//   itemStyle: { color: "#A9A9A9" }
// }

  ]
};



  
}
