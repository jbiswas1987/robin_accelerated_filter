import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { MccService } from "src/app/mcc/mcc.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { supplyTargetRes } from "../model/supplyTargetRes";
import { SupplyTargetTooltipRes } from "../model/SupplyTargetTooltipRes";
import { MccProtocolListComponent } from "./mcc-protocol-list/mcc-protocol-list.component";
import { DataService } from "src/app/common/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MccDetail } from "src/app/common/common";
import { parseTemplate } from "@angular/compiler";
import { DashboardService } from "../dashboard/dashboard.service";

@Component({
  selector: "app-mcc",
  templateUrl: "./mcc.component.html",
  styleUrls: ["./mcc.component.less"],
  providers: [MccService],
})
export class MccComponent implements OnInit, OnDestroy {
  echartsIntance: any;
  showLoading: boolean = false;
  title: string;
  scatterArray: Array<any>;
  Idata: any;
  id: string;
  protocolList: string[] = [];
  scatData: Array<any>;
  mccDetails: MccDetail = new MccDetail();
  mccObj: any;
  level: string;
  public _mccSub;
  _sponsor: any;
  _scatterDataSub: any;
  @ViewChild("drawer") drawer: MatSidenav;
  @ViewChild("protListComponent") protListComponent: MccProtocolListComponent;
  private sponsor: any;
  constructor(
    private dataService: MccService,
    private cdRef: ChangeDetectorRef,
    private protocolService: DataService,
    private route: ActivatedRoute,
    private dashService: DashboardService,
    private router: Router
  ) {}

  onChartInit(ec) {
    this.echartsIntance = ec;
  }

  ngOnInit() {
    this.protocolList = this.protocolService.getProtocolList();
    this._sponsor = localStorage.getItem("sponsor_name");
    if (this.protocolList == undefined || this.protocolList.length === 0) {
      this.level = "Protocol";
    } else {
      this.level = "Site";
    }
    this.route.params.subscribe((params) => {
      this.id = params["mccid"];
      // this.sponsor = params["sponsor"]
    });

    this.reset();
    this.mccObj = this.mccDetails.mccPortfolio.find((ele) => {
      return ele.id == this.id;
    });
  }
  ngOnDestroy() {
    this._mccSub.unsubscribe();
    this._scatterDataSub.unsubscribe();
  }
  public reset() {
    this.serviceCall(this.protocolList);
    this.showLoading = true;
  }

  serviceCall(protocolList: string[]) {
    this._mccSub = this.dashService.sponsorName.subscribe((data) => {
   
      if (this._sponsor == null) {
        data = data;
      } else {
        data = this._sponsor;
      }
      this.showLoading = true;
      this._scatterDataSub = this.dataService
        .getscatterData(protocolList, this.id, data)
        .subscribe((obj) => {
          if (Object.keys(obj).length != 0) {
            // console.log("@@@@@@@" + JSON.stringify(obj));
           // let objs =[{"x":7.51,"y":2925.15,"name":"30648229820","id":"362","sponsor":"JANSSEN"},{"x":-81.88,"y":0.72,"name":"30691393410"},{"x":100.00,"y":0.0,"name":"30691393416"}]

            this.resetGraph(obj);
          } else {
            alert("No data available");
            this.router.navigate(["/dashboard"]);
          }
        });
    });
  }

  resetGraph(data) {
    this.echartsIntance.dispatchAction({
      type: "brush",
      command: "clear",
      areas: [],
    });
    this.scatterArray = [];
    data.forEach((arg) => {
      let pointData = [];
      pointData.push(arg["x"], arg["y"]);
      let obj = new SupplyTargetTooltipRes();
      obj.value = [];
      obj.value.push(arg["x"], arg["y"]);
      obj.label = {
        name: arg["name"],
        id: arg["id"],
        hasDetails: arg["SLTInvestigatorId"],
      };
      obj.itemStyle = {};
      pointData.push(obj);
      this.scatterArray.push(pointData);
    });
    this.option.series[0].data = this.scatterArray;
    //localStorage.setItem("scatterData",JSON.stringify(this.scatterArray));
    this.option.title.subtext = this.mccObj.desc;

    this.option.legend.data = [this.mccObj.xlabel, this.mccObj.ylabel];
    this.option.xAxis[0].name = this.mccObj.xAxis;
    this.option.yAxis[0].name = this.mccObj.yAxis;
    this.option.xAxis[0].axisLabel.formatter = this.mccObj.xformatter;
    this.option.yAxis[0].axisLabel.formatter = this.mccObj.yformatter;

    let Xavg = data.reduce((r, c) => r + c.x, 0) / data.length;
    this.option.series[0].markLine.data[1].xAxis = Xavg;
    this.echartsIntance.setOption(this.option);
    this.showLoading = false;
    this.cdRef.detectChanges();
  }


  onBrushSelected(params) {
    if (params.batch.areas != []) {
      // debugger;
      var brushComponent = params.batch[0];
      //  var dataArray = JSON.parse(localStorage.getItem("scatterData"));
      var rawIndices = brushComponent.selected[0].dataIndex;
      if (rawIndices.length != 0) {
        var selectedScatterData = [];
        rawIndices.forEach((element) => {
          // console.log(dataArray[element]);
          selectedScatterData.push(this.scatterArray[element]);
          // localStorage.removeItem("scatterData");
        });
        // console.log(selectedScatterData);

        this.protListComponent.reset(selectedScatterData, this.level);
        setTimeout(() => {
          this.drawer.open();
          this.cdRef.detectChanges();
        }, 800);
      } else {
        setTimeout(() => {
          this.drawer.close();
          this.cdRef.detectChanges();
        }, 800);
      }
    }
  }


  option = {
    title: {
      text: "MCC Metric",
      subtext: "",
    },
    grid: {
      left: "5%",
      right: "7%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      // trigger: 'axis',
      showDelay: 0,
      formatter: (params) => {
        console.log(params.seriesName);
        if (params.componentType == "markLine") {
          params.name = params.name ? params.name : "Average";
          return params.name + " : " + params.value + " ";
        }
        if (params.value.length > 2) {
          return (
            params.seriesName +
            " :<br/> " +
            this.level +
            ": " +
            params.value[2].label.name +
            "<br/>X: " +
            params.value[0] +
            "<br/>Y: " +
            params.value[1] +
            ""
          );
        } else {
          return (
            params.seriesName +
            " :<br/>" +
            params.name +
            " : " +
            params.value +
            "% "
          );
        }
      },
      axisPointer: {
        show: true,
        type: "cross",
        lineStyle: {
          type: "dashed",
          width: 1,
        },
      },
    },
    toolbox: {
      feature: {
        dataZoom: {
          title: {
            zoom: "Zoom",
            back: "Zoom Reset",
          },
        },
        brush: {
          type: ["rect", "polygon", "clear"],
          title: {
            rect: "Box Select",
            polygon: "Lasso Select",
            lineX: "Horizontally Select",
            lineY: "Vertically Select",
            keep: "Keep Selections",
            clear: "Clear Selections",
          },
        },
      },
    },
    brush: {
      xAxisIndex: 0,
      throttleType: "debounce",
    },
    legend: {
      data: ["", ""],
      left: "center",
    },
    xAxis: [
      {
        name: "",
        type: "value",
        nameGap: 22,
        nameLocation: "center",
        nameTextStyle: {
          fontWeight: "bold",
        },
        scale: true,
        axisLabel: {
          formatter: "{value}",
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        name: "",
        type: "value",
        nameGap: 65,
        nameTextStyle: {
          fontWeight: "bold",
        },
        nameLocation: "center",
        scale: true,
        axisLabel: {
          formatter: "{value} %",
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "MCC metrics",
        type: "scatter",
        data: [],
        markLine: {
          lineStyle: {
            type: "solid",
          },
          data: [
            { type: "average", name: "Average" },
            { xAxis: 0 },
            //[{
            //  // Mark line with a fixed X position in starting point. This is used to generate an arrow pointing to maximum line.
            //  yAxis: 'min',
            //  xAxis: 'average',
            //}, {
            //    yAxis: 'max',
            //    xAxis: 'average',
            //}]
          ],
        },
      },
    ],
  };
}
