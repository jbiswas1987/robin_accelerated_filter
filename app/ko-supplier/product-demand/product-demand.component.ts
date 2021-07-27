import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_patterns from "@amcharts/amcharts4/themes/patterns";

import { DashboardService } from "../../dashboard/dashboard.service";
import { Router } from "@angular/router";
import {ExcelService} from '../../forcast-dashboard/excel.service';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import {Location} from '@angular/common'
 import {InfoDetailsComponent} from '../../common/info-details/info-details.component'
@Component({
  selector: 'app-product-demand',
  templateUrl: './product-demand.component.html',
  styleUrls: ['./product-demand.component.less']
})
export class ProductDemandComponent implements OnInit {
  _paretoDate :any;
  _paretodateResponse :any =[]  
  _paretodateFormat:any =[]
  NewParetoArr :any =[]
  _koDemandPerotoAna: any =[]
  _koDemandPerotoAnaTopProtocols : any =[]
  monthSelect : any
  month : any;
  _protocolCount : any ;
  _protolValue : any =[]
  selectedQuantity:any;
  obj : any;
  startRange : any
  endRange :any
  pfdate ; any;
  _tempProtocolCount : any;
  IsTopCountValue : any;
  chart : any;
  total :any;
  _foreCastMonthType : any;
  showLoading: boolean = false;

  _sponsorName :any
  _sponsorNameResponse:any
  sponsor:any;

  download: any = this.getBaseUrl() + "/assets/icon/download.png";
  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/Top_Products_by_Demand.pdf"
  constructor(private dataService: DashboardService,private router: Router,
    private excelService:ExcelService,public dialog: MatDialog) { 
      this.showLoading = true;
      localStorage.removeItem('startrange')
      this._paretodateFormat =[]
      this._koDemandPerotoAna =[]
      this._koDemandPerotoAnaTopProtocols =[]
      this.NewParetoArr =[]
      this._foreCastMonthType = 'KitsOutForecastCurrentMonth'
      // this._paretoDate = this.dataService.getkitforecastparetodates('').subscribe((dataRows) =>{    
      //   this._paretodateResponse = dataRows
      //  for(let i =0;i< this._paretodateResponse.length ; i++){
      //       let dateFormat = this.formatDate(this._paretodateResponse[i].ForecastMonth)
      //       this._paretodateFormat.push(dateFormat)
      //   }
      //   this.month = this._paretodateFormat[0].formatYear
      //   this.monthSelect = {forecastMonth :this._paretodateFormat[0].formatMonth}    
      //    this.getKODemandPertoAnalysis(this.monthSelect);
      //  });
    }


  ngOnInit() {
  }

  formatDate(date) {
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var d = new Date(date),
    month = '' + strArray[d.getMonth()],
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
      
        let a = [year, month, day].join('-');
        let m =[month, year].join('-');;
        let monthYear ={
         formatYear : m,
         formatMonth : date
        }

    return monthYear;
  }
  formatDatePartcularDate(date) {
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var d = new Date(date),
    month = '' + strArray[d.getMonth()],
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
      
        let a = [year, month, day].join('-');
        let m =[month, year].join('-');;
       

    return m;
  }


  ngAfterViewInit() {
    this._sponsorName = this.dataService.sponsorNameRestDashB.subscribe((response) =>{
      this._sponsorNameResponse = response;
      // this.sponsor={
      //   sponsor:this._sponsorNameResponse
      // }
      if(this._sponsorNameResponse != ''){
        this._paretodateFormat =[]
        this._koDemandPerotoAna =[]
        this._koDemandPerotoAnaTopProtocols =[]
        this.NewParetoArr =[]
        this._foreCastMonthType = 'KitsOutForecastCurrentMonth'
        this.showLoading = true;
        this._paretoDate = this.dataService.getkitforecastparetodates('').subscribe((dataRows) =>{    
        this._paretodateResponse = dataRows
         for(let i =0;i< this._paretodateResponse.length ; i++){
              let dateFormat = this.formatDate(this._paretodateResponse[i].ForecastMonth)
              this._paretodateFormat.push(dateFormat)
          }
          this.month = this._paretodateFormat[0].formatYear
          this.monthSelect = {
            forecastMonth :this._paretodateFormat[0].formatMonth,
            sponsor :this._sponsorNameResponse}    
           this.getKODemandPertoAnalysis(this.monthSelect);
         });
      }
    })
}


  getKODemandPertoAnalysis(monthSelect){
    this._paretodateResponse = this.dataService.getkitSupplierpareto(monthSelect).subscribe((response) =>{
       this._koDemandPerotoAna = response

       if(this._koDemandPerotoAna.length == 0){
        this.dataService.messageSection(this._koDemandPerotoAna.length)
      }else{
        this.dataService.messageSection(this._koDemandPerotoAna.length)
      }
               
        this.selectedQuantity = '50'
        this.getCalculationParetoChart(this._koDemandPerotoAna);
    })
  }
  getCalculationParetoChart(_koDemandPerotoAna){
    this.NewParetoArr = this._koDemandPerotoAna;
      for (let i = 0; i < ( this.NewParetoArr.length - 1 ); i++) {
            for (let j = 0; j < this.NewParetoArr.length - i - 1; j++) {
            if (this.NewParetoArr[j].ComponentForecast < this.NewParetoArr[j+1].ComponentForecast) 
            {
                var temp = this.NewParetoArr[j];
                this.NewParetoArr[j] = this.NewParetoArr[j+1];
                this.NewParetoArr[j+1] = temp;
            }
            }
        }

        this._protocolCount = this.NewParetoArr.length;
        if(this.IsTopCountValue == true){
          this._protolValue = [this._protocolCount,'50','100','200','500','1000']
        }else{
    
          if(this._protocolCount <50){
            this._protolValue = [this._protocolCount]
          } if(this._protocolCount>=50 && this._protocolCount <100){
            this._protolValue = ['50',this._protocolCount]
          }else if(this._protocolCount>=100 && this._protocolCount <200){
            this._protolValue = ['50','100',this._protocolCount]
          }else if(this._protocolCount>=200 && this._protocolCount <500){
            this._protolValue = ['50','100','200',this._protocolCount]
          }else if(this._protocolCount>=500 && this._protocolCount <1000){
            this._protolValue = ['50','100','200','500',this._protocolCount]
          }else if(this._protocolCount>=1000){
            this._protolValue = ['50','100','200','500','1000',this._protocolCount]
          }
        }

    // this._protocolCount = this.NewParetoArr.length;
    // if(this.IsTopCountValue == true){
    //   this._protolValue = [this._protocolCount,'50','100','200','500','1000']
    // }else{
    //   this._protolValue = ['50','100','200','500','1000',this._protocolCount]
    // }   
    this.getTopProtocols(this.NewParetoArr);
  }

  getTopProtocols(_topProtocols : any){
    this.startRange = 0;    
    if(this.IsTopCountValue == true){
      this.endRange = this._protocolCount;
    }else{
      this.endRange = this.selectedQuantity;
    }
   this._koDemandPerotoAnaTopProtocols =[]   
   for(let k=0; k< this.selectedQuantity;k++){
          var protocolname
            if(this._koDemandPerotoAnaTopProtocols.length<this._protocolCount)
          
             this.obj ={
                ProductId:_topProtocols[k].ProductId,
                ProductDescription:_topProtocols[k].ProductDescription,
                ComponentActuals:_topProtocols[k].ComponentActuals,
                ComponentForecast:_topProtocols[k].ComponentForecast,
                ForecastMonth:_topProtocols[k].ForecastMonth,
                MonthOfCreation:_topProtocols[k].MonthOfCreation,
               // } 
            }
           
            this._koDemandPerotoAnaTopProtocols.push(this.obj)
            // this._koDemandPerotoAnaTopProtocols.push(_topProtocols[k])
        }
    this.getParetoChartPlot(this._koDemandPerotoAnaTopProtocols);    
  }

  getParetoChartPlot(response:any){
   
    this.chart = am4core.create("chart", am4charts.XYChart);
    // am4core.useTheme(am4themes_patterns);

    this.chart.scrollbarX = new am4core.Scrollbar();
    this.chart.background.visible = false;
    
    console.log(this.chart.scrollbarX)
    this.chart.data = response
    this.total = 0;

       for(var i = 0; i < this.chart.data.length; i++){
            var value = this.chart.data[i].ComponentForecast;
            this.total += value;
        }
        var sum = 0;
        for(var i = 0; i < this.chart.data.length; i++){
            var value = this.chart.data[i].ComponentForecast;
            sum += value;   
            this.chart.data[i].pareto = sum / this.total * 100;
        }    
      
    //-------------------------------------------- 
  
    // Create axes
  let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
  // categoryAxis.title.text = "Product ID";
  categoryAxis.renderer.labels.template.fontSize = 13;
  // categoryAxis.label.fontSize = 35;
  categoryAxis.dataFields.category = "ProductId";
  categoryAxis.renderer.labels.template.rotation = -90;
  categoryAxis.renderer.labels.template.horizontalCenter = "right";
  categoryAxis.renderer.labels.template.verticalCenter = "middle";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 5;
  categoryAxis.tooltip.disabled = true;

  var label = this.chart.chartContainer.createChild(am4core.Label);
label.text = "Product ID";
label.fontSize = 13;
label.align = "center";
  
  let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.minWidth = 50;
  valueAxis.min = 0;
  valueAxis.cursorTooltipEnabled = false;
  
  // Create series
  let series = this.chart.series.push(new am4charts.ColumnSeries());

  
  series.sequencedInterpolation = true;
//   series.dataFields.valueY = "KitsOutForecastCurrentMonth";

 series.dataFields.valueY = "ComponentForecast";
  series.dataFields.categoryX = "ProductId";
  series.name = "Kits-In Forecast Current Month";
  series.wrap = true;
  series.maxWidth = 100;
  series.fontSize = 14
  // series.truncate = true;
  // series.tooltipText = "{name}: [bold]{valueY}[/]";
  // series.tooltipText = "{name}: {valueY}[/]";

  //----------------------------------------
  
    series.tooltipText = `[bold]${this.month}[/]
    ---------------------------------------------------------------------------------
    Product ID: {ProductId}
    Product Description: {ProductDescription}
    Forecast Quantity: {ComponentForecast}
    LM Actuals: {ComponentActuals}
    `;
  
 
  //---------------------------
  series.columns.template.strokeWidth = 0;
  series.tooltip.pointerOrientation = "vertical";
  series.columns.template.column.cornerRadiusTopLeft = 2;
  series.columns.template.column.cornerRadiusTopRight = 2;
  series.columns.template.column.fillOpacity = 1;
  series.tooltip.label.maxWidth = 350;
  series.tooltip.label.wrap = true;

  series.columns.template.fill = am4core.color("#2596be");
  series.tooltip.getFillFromObject = false;
  series.tooltip.background.fill = am4core.color("#696969");
  // on hover, make corner radiuses bigger
  let hoverState = series.columns.template.column.states.create("hover");
  hoverState.properties.cornerRadiusTopLeft = 0;
  hoverState.properties.cornerRadiusTopRight = 0;
  hoverState.properties.fillOpacity = 1;
  // this.chart.legend = new am4charts.Legend();
 
  let paretoValueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
  paretoValueAxis.renderer.opposite = true;
  paretoValueAxis.min = 0;
  paretoValueAxis.max = 100;
  paretoValueAxis.strictMinMax = true;
  paretoValueAxis.renderer.grid.template.disabled = true;
  paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
  paretoValueAxis.numberFormatter.numberFormat = "#'%'"
  paretoValueAxis.cursorTooltipEnabled = true;
  paretoValueAxis.tooltip.background.fill = am4core.color("#ff7f7f");
  
  let paretoSeries = this.chart.series.push(new am4charts.LineSeries())
  paretoSeries.dataFields.valueY = "pareto";
  
  // paretoSeries.dataFields.categoryX = "CTProtocolId";
  paretoSeries.dataFields.categoryX = "ProductId";
  paretoSeries.yAxis = paretoValueAxis;
  
//   paretoSeries.tooltipText = "Cumulative(%): {valueY.formatNumber('#.0')}%[/]";
  //paretoSeries.bullets.push(new am4charts.CircleBullet());
  let bullet = paretoSeries.bullets.push(new am4charts.CircleBullet());
  bullet.stroke = am4core.color("#ff7f7f");
  
  paretoSeries.strokeWidth = .3;
  paretoSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
  paretoSeries.strokeOpacity = 0.9;
//   paretoSeries.bullets.stroke = am4core.color("#fff");
  paretoSeries.bullets.template.fill = am4core.color("#ff7f7f");
  // paretoSeries.columns.template.fill = am4core.color("#85af78");
  paretoSeries.tooltip.getFillFromObject = false;
  paretoSeries.tooltip.background.fill = am4core.color("#696969");

  const a = paretoSeries.events.on('startchanged', categoryAxisZoomed,this);
  paretoSeries.events.on("endchanged", categoryAxisZoomedEnd,this);
  console.log('@@@@@'+value)
 
   function categoryAxisZoomed(ev) {
    var axis = ev.target;
    console.log(axis)
    var startRanges
    console.log(axis._prevEndIndex)
    console.log(axis._startIndex)
    // startRanges =axis._startIndex
    this.startRange  = axis._startIndex

    this.chart.exporting.menu = new am4core.ExportMenu();
    this.chart.logo.hide()
    this.chart.hideCredits=true
    return axis._startIndex
  }  
 
  function categoryAxisZoomedEnd(ev) {
    var axis = ev.target;
    console.log(axis)
    var startRanges
    console.log(axis._prevEndIndex)
    console.log(axis._startIndex)
    // startRanges =axis._startIndex
   
    this.endRange = axis._endIndex
    
    return axis._endIndex
  }  
  
  // Cursor
  this.chart.cursor = new am4charts.XYCursor();
  this.chart.cursor.behavior = "panX";
  this.IsTopCountValue = false;
  this.showLoading = false;
  }

  callF(_startIndex){
    this.startRange = _startIndex
    console.log(this.startRange)
  }

  getIndexValue(){
    this.startRange = localStorage.getItem('startrange')
  }

  onChange(currentMonthYear) {
    this._koDemandPerotoAna =[]
    this.NewParetoArr =[]
    this.showLoading = true;
    this.month = this.formatDatePartcularDate(currentMonthYear)
    this.monthSelect = {forecastMonth : currentMonthYear,
      sponsor:this._sponsorNameResponse
    }    
    this._paretodateResponse = this.dataService.getkitSupplierpareto(this.monthSelect).subscribe((response) =>{
    if(this._protocolCount == this.selectedQuantity){
      this.IsTopCountValue = true
    }else {
      this.IsTopCountValue = false
    }

    this._koDemandPerotoAna = response
    this.getCalculationParetoChart(this._koDemandPerotoAna)

    })
  }

  onPageSizeChanged(newPageSize) {
    this.showLoading = true;
    this.getTopProtocols(this.NewParetoArr);
  }

  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }

  downloadexcel(){
    this.excelService.exportAsExcelFile(this._koDemandPerotoAna,  'Product-Demand');
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
    if (this._paretoDate != undefined)
    this._paretoDate.unsubscribe();
    if(this._sponsorName !=undefined)
    this._sponsorName.unsubscribe();
    // if(this._paretodateResponse != undefined)
    // this._paretodateResponse.unsubscribe()
  }
}
