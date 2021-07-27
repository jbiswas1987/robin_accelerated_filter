import { Component, OnInit, OnDestroy } from "@angular/core";
import { EChartOption } from "echarts";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { ActivatedRoute } from "@angular/router";
import { ChangeDetectorRef } from "@angular/core";
import { DashboardService } from "../../../dashboard/dashboard.service";

@Component({
  selector: "app-patient-breakdown",
  templateUrl: "./patient-breakdown.component.html",
  styleUrls: ["./patient-breakdown.component.less"],
})
export class PatientBreakdownComponent implements OnInit, OnDestroy {
  showLoading: boolean = false;
  echartsIntance: any;
  protocolId: any;
  sponsorSub: any;
  _patientBreakDownSub: any;
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
      }

      this.reset(this.protocolId);
    });
  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  // reset(protocolId) {
  //   //this.showLoading = true;
  //   this.cdRef.detectChanges();
  //   this.sponsorSub = this.dashService.sponsorName.subscribe((respdata) => {
  //     this.showLoading = true;
  //     this._patientBreakDownSub = this.dataService
  //       .getPatientBreakDown(protocolId, respdata)
  //       .subscribe(
  //         (data: any[]) => {
  //           let name = data.map((a) => a.name);
  //           this.chartOptionEnroll.series[0].data = data;
  //           this.chartOptionEnroll.legend.data = name;
  //           this.echartsIntance.setOption(this.chartOptionEnroll);
  //           this.showLoading = false;
  //           this.cdRef.detectChanges();
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
      this._sponsorName =
      this._qryStrSponsor != "" ? this._qryStrSponsor : respdata;
      this._patientBreakDownSub = this.dataService
        .getPatientBreakDown(protocolId, this._sponsorName)
        .subscribe(
          (data: any[]) => {
            let name = data.map((a) => a.name);
            this.chartOptionEnroll.series[0].data = data;
            this.chartOptionEnroll.legend.data = name;
            this.echartsIntance.setOption(this.chartOptionEnroll);
            this.showLoading = false;
            this.cdRef.detectChanges();
          },
          (err) => {
            this.showLoading = false;
          }
        );
    });
  }

  chartOptionEnroll: any = {
    //tooltip: {
    //  trigger: 'item',
    //  formatter: "{b}: {c} ({d}%)"
    //},
    legend: {
      type: "scroll",
      orient: "horizontal",
      data: [],
    },
    series: [
      {
        name: " ",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center",
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "10",
              fontWeight: "bold",
            },
            formatter: "{b} \n count: {c} \n ({d}%)",
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [],
      },
    ],
  };

  ngOnDestroy() {
    this.sponsorSub.unsubscribe();
    this._patientBreakDownSub.unsubscribe();
  }
}
