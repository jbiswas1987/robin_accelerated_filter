import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { MccService } from "src/app/mcc/mcc.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { supplyTargetRes } from "../../model/supplyTargetRes";
import { SupplyTargetTooltipScatterRes } from "../../model/SupplyTargetTooltipRes";
import { MccProtocolListComponent } from "../../../app/mcc/mcc-protocol-list/mcc-protocol-list.component";
import { DataService } from "src/app/common/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MccDetail } from "src/app/common/common";
import { parseTemplate } from "@angular/compiler";
import { DashboardService } from "../../dashboard/dashboard.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import {Location} from '@angular/common'
 import {InfoDetailsComponent} from '../../common/info-details/info-details.component'
@Component({
  selector: 'app-protocol-kits-in-kits-out-scatter',
  templateUrl: './protocol-kits-in-kits-out-scatter-breadcrumb.component.html',
  styleUrls: ['./protocol-kits-in-kits-out-scatter-breadcrumb.component.less'],
  providers: [MccService],
})
export class ProtocolKitsInKitsOutScatterComponent  implements OnInit, OnDestroy {
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
  // private sponsor: any;
  dateSelectd:any;
  yAxisData:any;
  ScatterType : any;
  ScatterObject: any =[]
  ScatterObjects: any =[]
  private titles:any
  private sponsor :any;
  

  breadcrumb :any =this.getBaseUrl()+ "/assets/icon/breadcrum.png";
  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/Scatter_Plot.pdf"
  constructor(
    private dataService: MccService,
    private cdRef: ChangeDetectorRef,
    private protocolService: DataService,
    private route: ActivatedRoute,
    private dashService: DashboardService,
    private router: Router,public dialog: MatDialog
  ) {}

  onChartInit(ec) {
    this.echartsIntance = ec;
  }

  ngOnInit() {
    this.yAxisData =[];
    this.sponsor = localStorage.getItem('sponsorName')
    this.route.params.subscribe((params) => {
      this.dateSelectd = params['id'];
      this.ScatterType = params['type'];
      
      
    });
    this.reset();
    this.mccObj = this.mccDetails.mccPortfolio.find((ele) => {
      return ele.id == this.id;
    });
  }
  ngOnDestroy() {
    this._scatterDataSub.unsubscribe();
  }
  public reset() {
    this.serviceCall(this.dateSelectd);
    this.showLoading = true;
  }

  serviceCall(dateSelectd: any) {
    let requestBody = {
      forecastMonth:dateSelectd,
      type:this.ScatterType,
      sponsor:this.sponsor
    }
   
      this.showLoading = true;
      this._scatterDataSub = this.dashService.getMapKitsInScatterPlot(requestBody)
        .subscribe((obj) => {
          this.ScatterObject =[];
          this.ScatterObjects =[];
          if(obj.length < 2900){
            for(let i=0;i< obj.length;i++){
              this.ScatterObject.push(obj[i])
            }
          }else{
            for(let i=0;i< 2997;i++){
              this.ScatterObject.push(obj[i])
            }
          }
          // for(let i=0;i< obj.length;i++){
          //   this.ScatterObject.push(obj[i])
          // }

          this.ScatterObjects.push(obj)
         
          this.resetGraph(this.ScatterObject);
          console.log('New json Value@@@@@@' + this.ScatterObject.length)
          // for(let i = 2999 ; i<3400;i++){
          //   this.ScatterObjects.push(obj[i])
          // }
         
          // console.log('New json Value' + this.ScatterObjects.length)
         
          // this.resetGraph(this.ScatterObjects);

        
          // if (Object.keys(obj).length != 0) {
          //   this.resetGraph(obj);
          //   this.showLoading = false;
          // } else {
          //   alert("No data available");
          
          // }
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
      console.log( this.scatterArray.length)
      let obj = new SupplyTargetTooltipScatterRes();
      obj.value = [];
      obj.value.push(arg["x"], arg["y"]);
      obj.label = {
        name: arg["name"],
        id: arg["id"],
       hasDetails: arg["SLTInvestigatorId"],
        sponsor : arg["sponsor"]
        
      };
      obj.itemStyle = {};
      console.log(JSON.stringify(pointData))
      pointData.push(obj);
      this.scatterArray.push(pointData);
    });
    this.option.series[0].data = this.scatterArray;
    this.yAxisData =[1,2,3,4,5,6,7,8,9,10]
    //localStorage.setItem("scatterData",JSON.stringify(this.scatterArray));
    // this.option.title.subtext = this.mccObj.desc;

    // this.option.legend.data = [this.mccObj.xlabel, this.mccObj.ylabel];
    // this.option.xAxis[0].name = this.mccObj.xAxis;
    // this.option.yAxis[0].name = this.mccObj.yAxis;
    // this.option.xAxis[0].axisLabel.formatter = this.mccObj.xformatter;
    //  this.option.yAxis[0].data.formatter = this.yAxisData ;
    if(this.ScatterType == 'KitsOut'){
        this.titles = 'Kits-Out'
    }else if(this.ScatterType == 'KitsIn'){
      this.titles = 'Kits-In'
    }

    let Xavg = data.reduce((r, c) => r + c.x, 0) / data.length;
    this.option.series[0].name = this.ScatterType;
    // this.option.title.text = this.ScatterType;
    this.option.title.text = this.titles;
    this.option.yAxis[0].name = "Total "+"" + this.titles
    this.option.series[0].markLine.data[1].xAxis = Xavg;
    this.echartsIntance.setOption(this.option);
    this.showLoading = false;
    this.cdRef.detectChanges();
  }
  

  

  //----------------------------------

  onBrushSelected(params) {
    
    if (params.batch.areas != []) {
      
      var brushComponent = params.batch[0];
      //  var dataArray = JSON.parse(localStorage.getItem("scatterData"));

      console.log('params value@@' +JSON.stringify(params))
      
      var rawIndices = brushComponent.selected[0].dataIndex;
      if (rawIndices.length != 0) {
        var selectedScatterData = [];
        rawIndices.forEach((element) => {
          // console.log(dataArray[element]);
          selectedScatterData.push(this.scatterArray[element]);
          // localStorage.removeItem("scatterData");
        });
        //  console.log('Scatter Datas value@@'+selectedScatterData);

        this.protListComponent.reset(selectedScatterData, 'scatterForecastingProtoCol');
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
      text:'',
      subtext: "% deviation in the forecast w.r.t last month",
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
        console.log(params);
        if (params.componentType == "markLine") {
          params.name = params.name ? params.name : "Average";
          return params.name + " : " + params.value + " ";
        }
        if (params.value.length > 2) {
          return (
            params.seriesName +
            " :<br/> " +
            // this.level +
            // ": " +
            // params.value[2].label.name +
            "<br/>% Variance: " +
            params.value[0]+'%' +
            "<br/>Kits - Out/ Kits - In: " +
            params.value[1] +
            "<br/>Name: " +
            params.value[2].label.name +
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
          xAxisIndex: 'all',
          yAxisIndex: 'all',
          type: ["rect", "polygon", "clear"],
          title: {
            rect: "Box Select",
            // polygon: "Lasso Select",
            // lineX: "Horizontally Select",
            // lineY: "Vertically Select",
            // keep: "Keep Selections",
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
    nameTextStyle:{
     padding : 5
    },
    xAxis: [
      {
        name: "% Variance",
        type: "value",
        
        // nameGap: 22,
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
        subtitle	: "Sub Title",
        type: "value",
        nameGap: 65,
        nameTextStyle: {
          fontWeight: "bold",
        },
        nameLocation: "center",
        scale: true,
        // axisLabel: {
        //   formatter: "{value} %",
        // },
        data:[],
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '',
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

  // backButtonActivity(){
  //   // let sponsor = localStorage.getItem("sponsor_name");
  //   // console.log('Sponsor' + sponsor)
  //   this.router.navigate(["home/forCast"]);
  // }

  backButtonKitForCasting(){
    // let sponsor = localStorage.getItem("sponsor_name");
    // console.log('Sponsor' + sponsor)
    this.router.navigate(["home/kitsforecasting"]);
  }

  backButtonHome(){
    this.router.navigate(["home/landing"]);
  }

  infoDetails(content){
    // this._infoDisplay = true
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
      panelClass:['animate__animated','animate__slideInLeft','my-class'] ,
      disableClose: true,
      data: { message: this.info_dispay},
    });
    
        }

  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  
}
}
