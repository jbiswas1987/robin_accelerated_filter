import { Component, OnInit, OnDestroy } from "@angular/core";
import { EChartOption } from "echarts";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { ActivatedRoute } from "@angular/router";
import { ChangeDetectorRef } from "@angular/core";
import { DashboardService } from "src/app/dashboard/dashboard.service";

@Component({
  selector: "app-visit-breakdown",
  templateUrl: "./visit-breakdown.component.html",
  styleUrls: ["./visit-breakdown.component.less"],
})
export class VisitBreakdownComponent implements OnInit, OnDestroy {
  showLoading: boolean = false;
  echartsIntance: any;
  protocolId: any;
  chartType: string = "Short";
  sponsorSub: any;
  _visitBreakdownSub: any;
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
  //     this._visitBreakdownSub = this.dataService
  //       .getVisitBreakDown(protocolId, respdata)
  //       .subscribe(
  //         (data: any[]) => {
  //           let name = data.map((a) => a.name);
  //           let value = data.map((a) => a.value);
  //           if (name.length > 50) this.chartType = "ExtraLong";
  //           else if (name.length > 30) this.chartType = "Long";
  //           else if (name.length > 20) this.chartType = "Medium";
  //           else this.chartType = "Short";
  //           this.chartOptionVisits.yAxis.data = name;
  //           this.chartOptionVisits.series[0].data = data;
  //           //this.chartOptionVisits.series[0].data = value;
  //           this.echartsIntance.setOption(this.chartOptionVisits);
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

      this._visitBreakdownSub = this.dataService
        .getVisitBreakDown(protocolId, this._sponsorName )
        .subscribe(
          (data: any[]) => {
            let name = data.map((a) => a.name);
            let value = data.map((a) => a.value);
            if (name.length > 50) this.chartType = "ExtraLong";
            else if (name.length > 30) this.chartType = "Long";
            else if (name.length > 20) this.chartType = "Medium";
            else this.chartType = "Short";
            this.chartOptionVisits.yAxis.data = name;
            this.chartOptionVisits.series[0].data = data;
            console.log('@#@#@@#@#@@##@##' + JSON.stringify(data))
            //this.chartOptionVisits.series[0].data = value;
            this.echartsIntance.setOption(this.chartOptionVisits);
            this.showLoading = false;
            this.cdRef.detectChanges();
          },
          (err) => {
            this.showLoading = false;
          }
        );
    });
  }


  chartOptionVisits: any = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      textStyle: {
        fontSize: 10,
      },
      //position: ["50%", "50%"],
      // position: function (params) {
      //   console.log(params);
      //   return [120, params[1] + 10];
      //   //return [params[0], params[1]];
      // },
      position: function (pos, params, dom, rect, size) {
        let txt: string = dom.innerText;
        txt = txt.replace(new RegExp(",", "g"), "\r\n");
        dom.innerText = txt;
        return [120, pos[1] - 50];
        //return [pos[0], pos[1]];
      },
      // position: function (pos, params, dom, rect, size) {
      //   // tooltip will be fixed on the right if mouse hovering on the left,
      //   // and on the left if hovering on the right.
      //   var obj = {  };
      //   obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
      //   return obj;
      // },
      axisPointer: {
        type: "shadow",
        label: {
          formatter: function (params) {
            return params.seriesData[0].data["Description"];
          },
        },
      },
    },

    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      position: "top",
    },
    yAxis: {
      type: "category",
      data: [],
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        interval: 0,
      },
    },
    series: [
      {
        name: "",
        type: "bar",
        barWidth: "60%",
        barMinWidth: 2,
        barCategoryGap: "40%",
        data: [],
      },
    ],
  };

  ngOnDestroy() {
    this.sponsorSub.unsubscribe();
    this._visitBreakdownSub.unsubscribe();
  }
}
