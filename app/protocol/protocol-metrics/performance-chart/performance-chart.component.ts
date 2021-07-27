import { Component, OnInit, OnDestroy } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";
import { EChartOption } from "echarts";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { ActivatedRoute } from "@angular/router";
import { ChangeDetectorRef } from "@angular/core";
import { Breakdown, BreakdownInt } from "src/app/common/common";
import { DashboardService } from "../../../dashboard/dashboard.service";

@Component({
  selector: "app-performance-chart",
  templateUrl: "./performance-chart.component.html",
  styleUrls: ["./performance-chart.component.less"],
})
export class PerformanceChartComponent implements OnInit, OnDestroy {
  @Input() chartname: string;
  @Output() countToEmit = new EventEmitter<String>();

  showLoading: boolean = false;
  echartsIntance: any;
  protocolId: any;
  sponsorSub: any;
  _ProtocolPerfSub: any;
  _getEnrollmentTargetSub: any;
  _qryStrSponsor: any = "";
  _sponsorName: string;
  constructor(
    private dataService: ProtocolService,
    private dashService: DashboardService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params) => {
    //   this.protocolId = params["id"];
    //   this.reset(this.protocolId);
    // });
    this.route.params.subscribe((params) => {
      this.protocolId = params["id"];

      if (params.hasOwnProperty("sponsor")) {
        this._qryStrSponsor = atob(params["sponsor"]);
        console.log('@@@@@@@@@@' + this._qryStrSponsor)
      }

      this.reset(this.protocolId);
    });
  }

  // reset(protocolId) {
  //   //this.showLoading = true;
  //   this.cdRef.detectChanges();
  //   this.sponsorSub = this.dashService.sponsorName.subscribe((respdata) => {
  //     this.showLoading = true;
  //     this._getEnrollmentTargetSub = this.dataService
  //       .getEnrollmentTarget(protocolId, respdata)
  //       .subscribe(
  //         (data: BreakdownInt) => {
  //           console.log(data);
  //           if (!(data || data.value || data.value > 0)) {
  //             data = new BreakdownInt();
  //             data.value = 100;
  //           }
  //           let enrollmentTarget = data.value;
  //           this._ProtocolPerfSub = this.dataService
  //             .getProtocolPerformance(
  //               protocolId,
  //               enrollmentTarget,
  //               this.chartname,
  //               respdata
  //             )
  //             .subscribe(
  //               (data) => {
  //                 this.performanceData(data);
  //               },
  //               (err) => {
  //                 this.showLoading = false;
  //               }
  //             );
  //         },
  //         (err) => {
  //           this.showLoading = false;
  //         }
  //       );
  //   });
  // }

  reset(protocolId) {
    //this.showLoading = true;
    this.cdRef.detectChanges();
    this.sponsorSub = this.dashService.sponsorName.subscribe((respdata) => {
      this.showLoading = true;
      this._qryStrSponsor != "" ? this._qryStrSponsor : respdata;
      
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
    console.log(data);
    this.processData(data);
    this.showLoading = false;
    this.cdRef.detectChanges();
  }
  processData(data: any): any {
    let industryQ1 = data.filter((x) => x.percentile % 5 == 0).map((y) => y.q1);
    let industryQ2 = data.filter((x) => x.percentile % 5 == 0).map((y) => y.q2);
    let industryQ3 = data.filter((x) => x.percentile % 5 == 0).map((y) => y.q3);
    let sponsorActual = data
      .filter((x) => x.percentile % 5 == 0)
      .map((y) => y.protocol);
    let label = data
      .filter((x) => x.percentile % 5 == 0)
      .map((x) => x.percentile + "%");
    let comparatorCount =
      data.length == 0 ? "No Comparator" : data[0].comparatorCount;
    this.countToEmit.emit(comparatorCount);
    this.chartOption.yAxis.data = label;
    console.log('@@@@@@@@@' + industryQ2)
    this.chartOption.series[0].data = industryQ1;
    this.chartOption.series[1].data = industryQ2;
    this.chartOption.series[2].data = industryQ3;
    this.chartOption.series[3].data = sponsorActual;
    this.echartsIntance.setOption(this.chartOption);
  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  chartOption: any = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Comparator-Q1", "Comparator-Q2", "Comparator-Q3", "Protocol"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "6%",
      top : "8%",
      containLabel: true,
    },
    nameTextStyle:{
      fontSize : 12,
      padding :5,
      
    } ,
    xAxis: {
      type: "value",
      name: "Weeks",
      nameLocation: "middle",
    },
    yAxis: {
      type: "category",
      boundaryGap: false,
      data: [],
    },
    series: [
      {
        name: "Comparator-Q1",
        type: "line",
        stack: "Comparator-Q1",
        data: [],
        itemStyle: { color: "#d5ceeb" },
      },
      {
        name: "Comparator-Q2",
        type: "line",
        stack: "Comparator-Q2",
        data: [],
        itemStyle: { color: "#d5ceeb" },
      },
      {
        name: "Comparator-Q3",
        type: "line",
        stack: "Comparator-Q3",
        data: [],
        itemStyle: { color: "#d5ceeb" },
      },
      {
        name: "Protocol",
        type: "line",
        stack: "Protocol",
        data: [],
      },
    ],
  };

  ngOnDestroy() {
    if (this.sponsorSub != undefined) this.sponsorSub.unsubscribe();
    if (this._ProtocolPerfSub != undefined) this._ProtocolPerfSub.unsubscribe();
    if (this._getEnrollmentTargetSub != undefined)
      this._getEnrollmentTargetSub.unsubscribe();
  }
}
