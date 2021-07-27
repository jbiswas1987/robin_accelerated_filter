import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_patterns from "@amcharts/amcharts4/themes/patterns";

import { DashboardService } from "../../dashboard/dashboard.service";
import { Router } from "@angular/router";
import {ExcelService} from '../excel.service';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import {Location} from '@angular/common'
 import {InfoDetailsComponent} from '../../common/info-details/info-details.component'
 import{DataService} from '../../common/data.service'

@Component({
  selector: 'app-ko-demand-pareto-analysis',
  templateUrl: './ko-demand-pareto-analysis.component.html',
  styleUrls: ['./ko-demand-pareto-analysis.component.less']
})
export class KoDemandParetoAnalysisComponent implements OnInit,OnDestroy {
  togglevalue : boolean = false;

  kitsInOUTOverViewData:any;
  kitsInOverViewData:any;
  kitsOutOverViewData:any;  
  expanded : any;
  showLoading: boolean = false;
  buttonBGColorKitsIN: any;
  textColorKitsIN : any;
  textdecorationKitsIN:any;
  textUnderLinePosKitsIN : any;
  textUnderLineColorCodeKitsIN: any;
  underLineTicknessKitsIN : any;
  buttonBGColorKitsOut: any;
  buttonBGColorKitsOUT: any;
  textColorKitsOut : any;
  textdecorationKitsOut:any
  textUnderLinePosKitsOut : any;
  textUnderLineColorCodeKitsOut: any;
  underLineTicknessKitsOut : any;
  textunderlineoffsetKitsIN:any ;
  textunderlineoffsetKitsOut :any

  cursor : any;
  cursorType : any;
  padding : any;

  _koDemandPerotoAna: any =[]
  _koDemandPerotoAnaTopProtocols : any =[]
  data :any =[]
  _forCastDateKitsInOut:any
  currentMonthYear :any= [];
  chart : any;
  _paretoDate :any;
  _paretoResponse :any
  _paretodateResponse :any =[]  
  _paretodateFormat : any =[]
  NewParetoArr :any =[]
  type :any ='KitsOut'
  total :any;
  _foreCastMonthType : any;
  monthSelect : any
  month : any;
  download: any = this.getBaseUrl() + "/assets/icon/download.png";
  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/Top_50_Protocols.pdf"
  _protocolCount : any ;
  _protolValue : any =[]
  selectedQuantity:any;
  obj : any;
  startRange : any
  endRange :any
  pfdate ; any;
  _tempProtocolCount : any;
  IsTopCountValue : any;

  _sponsorName :any
  _sponsorNameResponse:any
  _sponsorNameForLoader :any = 'false'
  sponsor:any;
  batchResponseLoad:any ='false'
  constructor(private dataService: DashboardService,private router: Router,private excelService:ExcelService,
    public dialog: MatDialog,private dataFetchMethod : DataService) { 
    this._sponsorNameResponse ='ROCHE'
   localStorage.removeItem('startrange')
   this.buttonBGColorKitsIN = '#FFFFFF';
   this.buttonBGColorKitsOUT = '#D3D3D3'
   this.textColorKitsIN = '#000000'
   this.textColorKitsOut = '#4ba4be'
   this.textdecorationKitsIN ='none'
   this.textdecorationKitsOut = 'underline'
   this.textUnderLinePosKitsIN ='none'
   this.textUnderLineColorCodeKitsIN='none' 
   this.underLineTicknessKitsIN = 'none'
   this.textUnderLinePosKitsOut ='under';
   this.textUnderLineColorCodeKitsOut ='#005d78';
   this.underLineTicknessKitsOut ='3px'
   this.textunderlineoffsetKitsIN ='none' ;
   this.textunderlineoffsetKitsOut ='6px'  
   this._paretodateFormat =[]
   this._koDemandPerotoAna =[]
   this._koDemandPerotoAnaTopProtocols =[]
   this.NewParetoArr =[]
   this.type ='KitsOut'
   this._foreCastMonthType = 'KitsOutForecastCurrentMonth'
   this.showLoading = true;

  //  this.sponsor ={
  //   sponsor : this._sponsorNameResponse
  // }
  // this.getParetoAPICall();

  //  this._paretoDate = this.dataService.getkitforecastparetodates(this.sponsor).subscribe((dataRows) =>{    
  //   this._paretodateResponse = dataRows
  //  for(let i =0;i< this._paretodateResponse.length ; i++){
  //       let dateFormat = this.formatDate(this._paretodateResponse[i].ForecastMonth)
  //       this._paretodateFormat.push(dateFormat)
  //   }
  //   this.month = this._paretodateFormat[0].formatYear
  //   this.monthSelect = {forecastMonth :this._paretodateFormat[0].formatMonth}    
  //      this.getKODemandPertoAnalysis(this.monthSelect);
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
    this._sponsorNameForLoader = this.dataService.sponsorNameRestDashB.subscribe((response) =>{
      this.showLoading = true;
    })
    // this._sponsorName = this.dataService.sponsorNameRestDashB.subscribe((response) =>{
      this._sponsorName = this.dataService.batchSecondLoadWidget.subscribe((response) =>{
     // this._sponsorNameResponse = localStorage.getItem('selectedSponsor');
      this._sponsorNameResponse = this.dataFetchMethod.get_city_protocolID();

      if(this._sponsorNameResponse == "ALL"){
        this._sponsorNameResponse =[]
      }else{
        this._sponsorNameResponse = this._sponsorNameResponse
      }

      this.batchResponseLoad =response
      this.sponsor={
        ctprotocolId:this._sponsorNameResponse
      }
      if(this.batchResponseLoad == 'true'){
        this._paretodateFormat =[]
        this._koDemandPerotoAna =[]
        this._koDemandPerotoAnaTopProtocols =[]
        this.NewParetoArr =[]
        this.type ='KitsOut'
        this._foreCastMonthType = 'KitsOutForecastCurrentMonth'
       

        //-------------------------

        this.expanded = true
        this.buttonBGColorKitsIN = '#FFFFFF';
        this.buttonBGColorKitsOUT = '#D3D3D3'
        this.textColorKitsIN = '#000000'
        this.textColorKitsOut = '#4ba4be'
        this.textdecorationKitsIN ='none'
        this.textdecorationKitsOut = 'underline'
    
        this.textUnderLinePosKitsIN ='none'
        this.textUnderLineColorCodeKitsIN='none' 
        this.underLineTicknessKitsIN = 'none'
    
        this.textUnderLinePosKitsOut ='under';
        this.textUnderLineColorCodeKitsOut ='#005d78';
        this.underLineTicknessKitsOut ='3px'
    
        this.textunderlineoffsetKitsIN ='none' ;
        this.textunderlineoffsetKitsOut ='6px'
        this.batchResponseLoad = 'false'
        this.getParetoAPICall();
      }
    })
}
getParetoAPICall(){
  this._paretoDate = this.dataService.getkitforecastparetodates(this.sponsor).subscribe((dataRows) =>{    
    this._paretodateResponse = dataRows
   for(let i =0;i< this._paretodateResponse.length ; i++){
        let dateFormat = this.formatDate(this._paretodateResponse[i].ForecastMonth)
        this._paretodateFormat.push(dateFormat)
    }
    this.month = this._paretodateFormat[0].formatYear
    // this.monthSelect = {forecastMonth :this._paretodateFormat[0].formatMonth}    
      //  this.getKODemandPertoAnalysis(this.monthSelect);
      this.monthSelect = this._paretodateFormat[0].formatMonth
      this.getKODemandPertoAnalysis(this.monthSelect);
   });
}
  getKODemandPertoAnalysis(monthSelect:any){
    let sponsorBody ={
      ctprotocolId : this._sponsorNameResponse,
      forecastMonth :monthSelect

    }
    this._paretodateResponse = this.dataService.getkitforecastpareto(sponsorBody).subscribe((response) =>{
         this._koDemandPerotoAna = response
        // for(let k=0; k< 50;k++){
        //     if(this._koDemandPerotoAna.length<51 && (response[k].ProtocolName != '' || response[k].ProtocolName != null || response[k].ProtocolName != undefined))

        //     this._koDemandPerotoAna.push(response[k])
        // }
        
        this.selectedQuantity = '50'
        this.getCalculationParetoChart(this._koDemandPerotoAna);
    })
  }
  getCalculationParetoChart(_koDemandPerotoAna){
    this.NewParetoArr = this._koDemandPerotoAna;
    if(this.type == 'KitsOut'){
        for (let i = 0; i < ( this.NewParetoArr.length - 1 ); i++) {
            for (let j = 0; j < this.NewParetoArr.length - i - 1; j++) {
            if (this.NewParetoArr[j].KitsOutForecastCurrentMonth < this.NewParetoArr[j+1].KitsOutForecastCurrentMonth) 
            {
                var temp = this.NewParetoArr[j];
                this.NewParetoArr[j] = this.NewParetoArr[j+1];
                this.NewParetoArr[j+1] = temp;
            }
            }
        }
    }else if(this.type == 'KitsIn'){
        for (let i = 0; i < ( this.NewParetoArr.length - 1 ); i++) {
            for (let j = 0; j < this.NewParetoArr.length - i - 1; j++) {
            if (this.NewParetoArr[j].KitsInForecastCurrentMonth < this.NewParetoArr[j+1].KitsInForecastCurrentMonth) 
            {
                var temp = this.NewParetoArr[j];
                this.NewParetoArr[j] = this.NewParetoArr[j+1];
                this.NewParetoArr[j+1] = temp;
            }
            }
        }
    }
//    for (let i = 0; i < ( this.NewParetoArr.length - 1 ); i++) {
//         for (let j = 0; j < this.NewParetoArr.length - i - 1; j++) {
//         if (this.NewParetoArr[j].KitsOutForecastCurrentMonth < this.NewParetoArr[j+1].KitsOutForecastCurrentMonth) 
//         {
//             var temp = this.NewParetoArr[j];
//             this.NewParetoArr[j] = this.NewParetoArr[j+1];
//             this.NewParetoArr[j+1] = temp;
//         }
//         }
//     }
    // console.log('@#@#'+JSON.stringify(array));
    // this.getParetoChartPlot(this.NewParetoArr);
    
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

      // this._protolValue = ['50','100','200','500','1000',this._protocolCount]
    }

       
    // this._protolValue = ['50','100','200','500','1000',this._protocolCount]
    this.getTopProtocols(this.NewParetoArr);
  }

  getTopProtocols(_topProtocols : any){
    this.startRange = 0;
    // if(this.selectedQuantity>=this._protocolCount){
     
    // }else{

    // }
    if(this.IsTopCountValue == true){
      this.endRange = this._protocolCount;
    }else{
      this.endRange = this.selectedQuantity;
    }
    

   
  this._koDemandPerotoAnaTopProtocols =[]   
  for(let k=0; k< this.selectedQuantity;k++){
          var protocolname
            if(this._koDemandPerotoAnaTopProtocols.length<this._protocolCount && (_topProtocols[k].ProtocolName != '' || _topProtocols[k].ProtocolName != null || _topProtocols[k].ProtocolName != undefined))
            if(_topProtocols[k].ProtocolName === undefined || _topProtocols[k].ProtocolName === '' || _topProtocols[k].ProtocolName == null){
              protocolname = ''
              if(_topProtocols[k].PFDate == '0001-01-01T00:00:00'){
                this.pfdate = ' '
            }else {
              this.pfdate =moment(_topProtocols[k].PFDate).format('MM/DD/YYYY')
            }
              this.obj ={
                CTProtocolId:_topProtocols[k].CTProtocolId,
                ForecastMonth:_topProtocols[k].ForecastMonth,
                KitsInActualPreviousMonth:_topProtocols[k].KitsInActualPreviousMonth,
                KitsInForecastCurrentMonth:_topProtocols[k].KitsInForecastCurrentMonth,
                KitsOutActualPreviousMonth:_topProtocols[k].KitsOutActualPreviousMonth,
                KitsOutForecastCurrentMonth:_topProtocols[k].KitsOutForecastCurrentMonth,
                MonthOfCreation:_topProtocols[k].MonthOfCreation,
                NCT:_topProtocols[k].NCT,
                PFDate:this.pfdate,
                ProtocolName:protocolname,
                Sponsor:_topProtocols[k].Sponsor,
                CTProtoIDProName:_topProtocols[k].CTProtocolId

              } 
            }else{
              protocolname =_topProtocols[k].ProtocolName 
              if(_topProtocols[k].PFDate == '0001-01-01T00:00:00'){
                this.pfdate = ' '
              }else {
                this.pfdate =moment(_topProtocols[k].PFDate).format('MM/DD/YYYY')
              }
              this.obj ={
                CTProtocolId:_topProtocols[k].CTProtocolId,
                ForecastMonth:_topProtocols[k].ForecastMonth,
                KitsInActualPreviousMonth:_topProtocols[k].KitsInActualPreviousMonth,
                KitsInForecastCurrentMonth:_topProtocols[k].KitsInForecastCurrentMonth,
                KitsOutActualPreviousMonth:_topProtocols[k].KitsOutActualPreviousMonth,
                KitsOutForecastCurrentMonth:_topProtocols[k].KitsOutForecastCurrentMonth,
                MonthOfCreation:_topProtocols[k].MonthOfCreation,
                NCT:_topProtocols[k].NCT,
                PFDate:this.pfdate,
                ProtocolName:protocolname,
                Sponsor:_topProtocols[k].Sponsor,
                CTProtoIDProName:_topProtocols[k].CTProtocolId +' '+'('+protocolname+')'
              } 
            
            }

            // var obj ={
            //   CTProtocolId:_topProtocols[k].CTProtocolId,
            //   ForecastMonth:_topProtocols[k].ForecastMonth,
            //   KitsInActualPreviousMonth:_topProtocols[k].KitsInActualPreviousMonth,
            //   KitsInForecastCurrentMonth:_topProtocols[k].KitsInForecastCurrentMonth,
            //   KitsOutActualPreviousMonth:_topProtocols[k].KitsOutActualPreviousMonth,
            //   KitsOutForecastCurrentMonth:_topProtocols[k].KitsOutForecastCurrentMonth,
            //   MonthOfCreation:_topProtocols[k].MonthOfCreation,
            //   NCT:_topProtocols[k].NCT,
            //   PFDate:_topProtocols[k].PFDate,
            //   ProtocolName:protocolname,
            //   Sponsor:_topProtocols[k].Sponsor,
            //   CTProtoIDProName:_topProtocols[k].CTProtocolId +' '+'('+protocolname+')'
            // } 
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

    if(this.type == 'KitsOut'){
        for(var i = 0; i < this.chart.data.length; i++){
            var value = this.chart.data[i].KitsOutForecastCurrentMonth;
            this.total += value;
        }
        var sum = 0;
        for(var i = 0; i < this.chart.data.length; i++){
            var value = this.chart.data[i].KitsOutForecastCurrentMonth;
            sum += value;   
            this.chart.data[i].pareto = sum / this.total * 100;
        }    
    
    }else if(this.type == 'KitsIn'){
        for(var i = 0; i < this.chart.data.length; i++){
            var value = this.chart.data[i].KitsInForecastCurrentMonth;
            this.total += value;
        }
        var sum = 0;
        for(var i = 0; i < this.chart.data.length; i++){
            var value = this.chart.data[i].KitsInForecastCurrentMonth;
            sum += value;   
            this.chart.data[i].pareto = sum / this.total * 100;
        }    
    
    }

      
    //-------------------------------------------- 
  
    // Create axes
  let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "CTProtoIDProName";
  categoryAxis.renderer.labels.template.rotation = -90;
  categoryAxis.renderer.labels.template.horizontalCenter = "right";
  categoryAxis.renderer.labels.template.verticalCenter = "middle";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 5;
  categoryAxis.tooltip.disabled = true;
  
  let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.minWidth = 50;
  valueAxis.min = 0;
  valueAxis.cursorTooltipEnabled = false;
  
  // Create series
  let series = this.chart.series.push(new am4charts.ColumnSeries());
  series.sequencedInterpolation = true;
//   series.dataFields.valueY = "KitsOutForecastCurrentMonth";
 series.dataFields.valueY = this._foreCastMonthType;
  series.dataFields.categoryX = "CTProtoIDProName";
  series.name = "Kits-In Forecast Current Month";
  // series.tooltipText = "{name}: [bold]{valueY}[/]";
  // series.tooltipText = "{name}: {valueY}[/]";

  //----------------------------------------
  if(this.type == 'KitsOut'){
    series.tooltipText = `[bold]${this.month}[/]
    -------------------------------------------------------
    Sponsor: {Sponsor}
    Protocol Name: {ProtocolName}
    CT Protocol ID: {CTProtocolId}
    NCT: {NCT}
    LM Actuals: {KitsOutActualPreviousMonth}
    PF Date: {PFDate}
    #Kit: {KitsOutForecastCurrentMonth}`;
  }else if(this.type == 'KitsIn'){
    series.tooltipText = `[bold]${this.month}[/]
    -------------------------------------------------------
    Sponsor: {Sponsor}
    Protocol Name: {ProtocolName}
    CT Protocol ID: {CTProtocolId}
    NCT: {NCT}
    LM Actuals: {KitsInActualPreviousMonth}
    PF Date: {PFDate}
    #Kit: {KitsInForecastCurrentMonth}`;
  }

//   series.tooltipText = `[bold]${this.month}[/]
//   -------------------------------------------------------
//   Sponsor: {Sponsor}
//   Protocol Name: {ProtocolName}
//   CT Protocol ID: {CTProtocolId}
//   NCT: {NCT}
//   PF Date:{PFDate}`;
  
  //---------------------------
  series.columns.template.strokeWidth = 0;
  series.tooltip.pointerOrientation = "vertical";
  series.columns.template.column.cornerRadiusTopLeft = 2;
  series.columns.template.column.cornerRadiusTopRight = 2;
  series.columns.template.column.fillOpacity = 1;
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
  paretoSeries.dataFields.categoryX = "CTProtoIDProName";
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

  ngOnDestroy() {    
    if (this._forCastDateKitsInOut != undefined)
     this._forCastDateKitsInOut.unsubscribe();
     if(this._paretoDate != undefined)
     this._paretoDate.unsubscribe()
     if(this._paretoResponse != undefined)
     this._paretoResponse.unsubscribe()
     if(this._sponsorName != undefined)
     this._sponsorName.unsubscribe();
     if(this._sponsorNameForLoader != undefined)
     this._sponsorNameForLoader.unsubscribe();
  }
  kitsINOverView(){
    this.NewParetoArr =[] 
     this.type ='KitsIn'
     this._foreCastMonthType = 'KitsInForecastCurrentMonth'
    this.showLoading = true;
    this.expanded = true
    this.buttonBGColorKitsIN = '#D3D3D3';
    this.buttonBGColorKitsOUT = '#FFFFFF'
    this.textColorKitsIN = '#4ba4be'
    this.textColorKitsOut = '#000000'
    this.textdecorationKitsIN ='underline'
    this.textdecorationKitsOut = 'none'
    this.textUnderLinePosKitsIN ='under'
    this.textUnderLineColorCodeKitsIN='#005d78' 
    this.underLineTicknessKitsIN = '3px'
    this.textUnderLinePosKitsOut ='none';
    this.textUnderLineColorCodeKitsOut ='none';
    this.underLineTicknessKitsOut ='none'  
    this.textunderlineoffsetKitsIN ='6px' ;
    this.textunderlineoffsetKitsOut ='none'
    // this.getCalculationParetoChart(this._koDemandPerotoAna);
  //  this.kitsInOverViewData =  this.kitsInOUTOverViewData.KitsInForecastvsActuals;
//   this.getParetoChartPlot(this._koDemandPerotoAna)
  this.getCalculationParetoChart(this._koDemandPerotoAna);

  }
  kitsOutOverView(){
    this.NewParetoArr =[]
     this.type ='KitsOut'
    this.showLoading = true;
    this._foreCastMonthType = 'KitsOutForecastCurrentMonth'
    this.expanded = true
    this.buttonBGColorKitsIN = '#FFFFFF';
    this.buttonBGColorKitsOUT = '#D3D3D3'
    this.textColorKitsIN = '#000000'
    this.textColorKitsOut = '#4ba4be'
    this.textdecorationKitsIN ='none'
    this.textdecorationKitsOut = 'underline'

    this.textUnderLinePosKitsIN ='none'
    this.textUnderLineColorCodeKitsIN='none' 
    this.underLineTicknessKitsIN = 'none'

    this.textUnderLinePosKitsOut ='under';
    this.textUnderLineColorCodeKitsOut ='#005d78';
    this.underLineTicknessKitsOut ='3px'

    this.textunderlineoffsetKitsIN ='none' ;
    this.textunderlineoffsetKitsOut ='6px'
    // this.getCalculationParetoChart(this._koDemandPerotoAna);
    // this.getParetoChartPlot(this._koDemandPerotoAna)
    this.getCalculationParetoChart(this._koDemandPerotoAna);

  }
  onChange(currentMonthYear) {
    this._koDemandPerotoAna =[]
    this.NewParetoArr =[]
    this.showLoading = true;
    this.month = this.formatDatePartcularDate(currentMonthYear)
    this.monthSelect = {forecastMonth : currentMonthYear}    
    let sponsorBody ={
      ctprotocolId : this._sponsorNameResponse,
      forecastMonth :currentMonthYear

    }
    this._paretodateResponse = this.dataService.getkitforecastpareto(sponsorBody).subscribe((response) =>{
    //    for(let k=0; k< 50;k++){
    //         this._koDemandPerotoAna.push(response[k])
    //     }
    //     this.getCalculationParetoChart(this._koDemandPerotoAna);

    if(this._protocolCount == this.selectedQuantity){
      this.IsTopCountValue = true
    }else {
      this.IsTopCountValue = false
    }

    this._koDemandPerotoAna = response
    this.getCalculationParetoChart(this._koDemandPerotoAna)

    })
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

  downloadexcel(){
    this.excelService.exportAsExcelFile(this._koDemandPerotoAna,  'KO Demand Pareto Analysis');
    
  }

  onPageSizeChanged(newPageSize) {
    this.showLoading = true;
    this.getTopProtocols(this.NewParetoArr);
  }

}
