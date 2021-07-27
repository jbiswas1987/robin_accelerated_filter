import { Component, OnInit,AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Input, Output, EventEmitter } from "@angular/core";
import { DashboardService } from "../../dashboard/dashboard.service";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { Breakdown, BreakdownInt } from "src/app/common/common";
import { ActivatedRoute } from "@angular/router"
import { Observable, of, throwError } from "rxjs";
import { MatTableDataSource, MatTableModule } from '@angular/material';
import {DataService} from '../../common/data.service'
import {ExcelService} from '../../forcast-dashboard/excel.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common'
import {InfoDetailsComponent} from '../../common/info-details/info-details.component'
@Component({
  selector: 'app-ko-analysis-line',
  templateUrl: './ko-analysis-line.component.html',
  styleUrls: ['./ko-analysis-line.component.less']
})
export class KoAnalysisLineComponent implements OnInit,AfterViewInit,OnDestroy {
 private _newSaleCarriedOver : any
 private newSaleCarriedOver : any
 private newSaleCarriedOverTotalValue : any
 private newSale : any=[];
 private carriedOver : any =[];
 private ship_date : any =[]
 echartsIntance: any;

 private _filterChangeLine : any
 change_filter_response: any
 private new_sale_demand_area: any = [];
 private carried_over_demand_area: any = []
 change_ship_date: any;
 change_desease_area: any
 obj : any
 ko_object :any;
 set_obj : any;
 showLoading: boolean = false;
 deseaseType : any=[]
 download: any = this.getBaseUrl() + "/assets/icon/download.png";
 info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/Demand_Breakdown.pdf"
_response : any;
 constructor(private dashService: DashboardService,
    private route: ActivatedRoute,private dataServices:  DataService, private router: Router,private excelService:ExcelService,
    public dialog: MatDialog) { 
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.showLoading =true
   
    this.newSale =[];
    this.carriedOver =[];
    this.ship_date =[]
      this._newSaleCarriedOver = this.dashService.new_sale_carried_over.subscribe((response) =>{
       this.newSaleCarriedOverTotalValue = response;
       this._response = this.newSaleCarriedOverTotalValue._response
       this.newSale = this.newSaleCarriedOverTotalValue.newSale;
       this.carriedOver = this.newSaleCarriedOverTotalValue.carriedOverDemand
       this.ship_date = this.newSaleCarriedOverTotalValue.ship_date
       this.chartOption.xAxis.data = this.ship_date;
      //  this.chartOption.series[0].name = '% New Sales Total Demand'+'('+'All'+')'
      //  this.chartOption.series[1].name = '% Carried Over Demand Total Demand'+'('+'All'+')'
       this.chartOption.series[0].data = this.newSale ;
       this.chartOption.series[1].data =  this.carriedOver ;
       if(this.echartsIntance != undefined){
        this.echartsIntance.setOption(this.chartOption);        
       }
       this.showLoading =false
      // this.echartsIntance.setOption(this.chartOption);
   })

   //----------------------


   this._filterChangeLine = this.dashService.ship_desease_filter_change.subscribe(response => {
    this.change_filter_response = response
    this._response = this.change_filter_response._response
    if (Object.keys(this.change_filter_response).length > 0) {
      this.ship_date = [];
      this.new_sale_demand_area = [];
      this.carried_over_demand_area = []
      this.change_ship_date = this.change_filter_response.selectShip,
        this.change_desease_area = this.change_filter_response.selectArea
       // this.obj = localStorage.getItem('ko_analysis')
        this.set_obj = this.dataServices.getKO_AnalysisObj()
        this.ko_object = this.set_obj

        if(this.change_ship_date == ''){
          for (let i = 0; i < this.ko_object.kobarlinechart.length; i++) {
            if (this.ko_object.kobarlinechart[i].DiseaseArea == this.change_desease_area) {
              this.ship_date.push(this.formatDate(this.ko_object.kobarlinechart[i].Due_Date))
              this.new_sale_demand_area.push(this.ko_object.kobarlinechart[i].PercentageNewSales)
              this.carried_over_demand_area.push(this.ko_object.kobarlinechart[i].PercentageCarriedOver)
            }
  
          }
        }else if(this.change_ship_date.length>0){

          for(let k=0;k<this.change_ship_date.length;k++){
            for (let i = 0; i < this.ko_object.kobarlinechart.length; i++) {
              if (this.ko_object.kobarlinechart[i].DiseaseArea == this.change_desease_area && this.formatDate(this.ko_object.kobarlinechart[i].Due_Date) == this.change_ship_date[k].item_text) {
                this.ship_date.push(this.formatDate(this.ko_object.kobarlinechart[i].Due_Date))
                this.new_sale_demand_area.push(this.ko_object.kobarlinechart[i].PercentageNewSales)
                this.carried_over_demand_area.push(this.ko_object.kobarlinechart[i].PercentageCarriedOver)
              }
    
            }
          }

        }else{
          for (let i = 0; i < this.ko_object.kobarlinechart.length; i++) {
            if (this.ko_object.kobarlinechart[i].DiseaseArea == this.change_desease_area && this.formatDate(this.ko_object.kobarlinechart[i].Due_Date) == this.change_ship_date) {
              this.ship_date.push(this.formatDate(this.ko_object.kobarlinechart[i].Due_Date))
              this.new_sale_demand_area.push(this.ko_object.kobarlinechart[i].PercentageNewSales)
              this.carried_over_demand_area.push(this.ko_object.kobarlinechart[i].PercentageCarriedOver)
            }
  
          }
        }

     
      
      this.chartOption.xAxis.data = this.ship_date;
     
      // this.chartOption.series[0].name = '% New Sales Total Demand'+''+'('+this.change_desease_area+')'
      // this.chartOption.series[1].name = '% Carried Over Demand Total Demand'+'' +'('+this.change_desease_area+')'
      this.chartOption.series[0].data = this.new_sale_demand_area;
      this.chartOption.series[1].data = this.carried_over_demand_area;
      // this.echartsIntance.setOption(this.chartOption);
      if(this.echartsIntance != undefined){
        this.echartsIntance.setOption(this.chartOption);        
       }
      this.showLoading =false
      // this.chartOption_line.xAxis.data = this.ship_date;
      // this.chartOption_line.series[0].data = this.new_sale_demand_area ;
      // this.chartOption_line.series[1].data =  this.carried_over_demand_area ;
      // this.echartsIntance_line.setOption(this.chartOption_line);
      // this.echartsIntance.setOption(this.chartOption);
     
      
    }
  })

  
  }

  onChartInits(ec) {
    this.echartsIntance = ec;
  }
  formatDate(date) {
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var d = new Date(date),
        month = '' +strArray[d.getMonth()],
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month,year].join('-');
}

  chartOption : any= {
    tooltip: {
      trigger: 'axis',
      show: true,
      feature: {
        dataView: {
          title: "Data View",
          readOnly: false,
          lang: ["Data View", "Close", "Refresh"],
        },
        magicType: {
          show: true,
          type: ["line", "bar"],
          title: {
            line: "Line",
            bar: "Bar",
          },
        },
        saveAsImage: { show: true, title: "save" },
      },
      textStyle: {
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 14,
      },

      formatter: function (params) {
       
        console.log(params)
      
        let returnType;
        if(params.length ==1){
          returnType =  `
          <b >${params[0].name} </b><br/>
          ${params[0].seriesName}: ${params[0].data}%<br/>`
        }else if(params.length ==2){
          returnType =  `
          <b >${params[0].name} </b><br/>
          ${params[0].seriesName}: ${params[0].data}%<br/>
          ${params[1].seriesName}: ${params[1].data}%<br/>`
        }
        // returnType =  `
        // <b >${params[0].name} </b><br/>
        // New Sales (Total Demand) : ${params[0].data}%<br/>
        // Carried Over (Total Demand) : ${params[1].data}%<br/>`
       
        return returnType;
      },
 
     
    },
    legend: {
      orient: 'horizontal',
      // selectedMode: false,
      // data: [],
      data: ["% New Sales Total Demand","% Carried Over Demand Total Demand"]
    },
    grid: {
      left: "5%",
      right: "2%",
      bottom: "12%",
      top : "15%",
      containLabel: true,
      show: true
    },
    nameTextStyle: {
      fontSize: 14,
      padding: 28
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: {
        rotate: 45, 
        fontSize: '13'
      },
      

    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: "{value}%",
        fontSize: '13'
        },
       
     // nameGap: 10,
      name :'(%) of Total Demand',
      nameLocation : "center",
      left: '10%',
      axisTick: {
        alignWithLabel: true
      },
     
      // position: "right",

    },
    series: [
      {
      //  name: [],
        name: '% New Sales Total Demand',
        type: 'line',
        lineThickness: 4,
        data: [],
        itemStyle: {
          color: '#98413f',
          width: 4,
        },
        
    },
      {
        //name: [],
        name: '% Carried Over Demand Total Demand',
        type: 'line',
        lineThickness: 4,
        data: [],
        itemStyle: {
          color: '#334b62',
          width: 4,
        },
      
      },


    ]
  };
  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }

  downloadexcel(){
      if(this._response  == undefined){
        this.excelService.exportAsExcelFile(this.ko_object.kobarlinechart,'demand_break_down')
      }else{
        this.excelService.exportAsExcelFile(this._response,  'demand_break_down');
      }   
  }
  infoDetails(content){
    // this._infoDisplay = true
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
       
      disableClose: true,
      data: { message: this.info_dispay},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
      
    });
  }
  ngOnDestroy() {
    if (this._newSaleCarriedOver != undefined)
      this._newSaleCarriedOver.unsubscribe();
      if (this._filterChangeLine != undefined)
      this._filterChangeLine.unsubscribe();
      
  }
}
