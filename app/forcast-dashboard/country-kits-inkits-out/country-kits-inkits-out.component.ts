import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4geodataWorldLow from "@amcharts/amcharts4-geodata/worldLow"
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  NavigationEnd,
} from "@angular/router";
import { DashboardService } from "../../dashboard/dashboard.service";
import { PAGE_DATA } from '../overview-kits-in-kits-out/data'
import { MatTableDataSource, MatTableModule } from '@angular/material';
import { Options } from '@angular-slider/ngx-slider';
import { HostListener } from "@angular/core";
import {ExcelService} from '../excel.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import {Location} from '@angular/common'
 import {InfoDetailsComponent} from '../../common/info-details/info-details.component'
 import {DataService} from '../../common/data.service'

@Component({
  selector: 'app-country-kits-inkits-out',
  templateUrl: './country-kits-inkits-out.componentdemo.html',
  styleUrls: ['./country-kits-inkits-out-demo.component.less']
})
export class CountryKitsInkitsOutComponent implements OnInit,AfterViewInit,OnDestroy {

  chart: any
  month: any;
  currentMonthYear: any = [];
  currentMonthYearRes :any =[]
  protocolId: string;
  _qryStrSponsor: any = "";
  // _sponsorName: string;
  sponsorSub: any;
 
  currentMonthInfo = {};
  upperBound: any;
  lowerBound: any;
  currentdateFormat: any
  _mapKitsINOutSub:any;
  kitsINOutMap : any;
  kitsINMap:any
  protoColPreMonth : any;
  protocolCurrentMonth:any;
  kitsInForcastpreviousMonth : any;
  kitsInForcastcurrentMonth : any;
  kitsOutForcastpreviousMonth : any;
  kitsOutForcastcurrentMonth :any;
  showLoading: boolean = false;
  selectedDate : any ='';
  _forCastDateKitsInOut:any
  kitsType:any ='';

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

  rows = new Array<any>();
  dataSource: any;
  displayedColumns = [];

  table_Information : any =[]

  value: number = 10;
  options: Options = {
    floor: 1,
    ceil: 100
  };

  sliderValue = 100;
  sliderValueMax: any = 200;
  screenHeight: number;
  screenWidth: number;
  IsHighScreenRes : boolean = false;
  kitsInfo :any =[]

  _sponsorName: any
  _sponsorNameResponse: any
  sponsor: any;
  defaultMonth :any;

  batchResponseLoad :any ='false'

  download: any = this.getBaseUrl() + "/assets/icon/download.png";
  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/Country_Level.pdf"
  constructor(private route: ActivatedRoute, private router: Router,private excelService:ExcelService, private dataService: DashboardService,
    public dialog: MatDialog,private dataServicesFetch: DataService) {
  //  this._sponsorNameResponse ='ROCHE'
    this.table_Information =[]
    this.getScreenSize();
    this.buttonBGColorKitsIN = '#FFFFFF';
    this.buttonBGColorKitsOUT = '#FFFFFF'
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

    this.currentMonthYear = [];
    this.month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];;
    var date = new Date();
    

    let getMonth = date.getMonth()
   // this.selectedDate = date.getFullYear()+'-'+(getMonth +1)+'-'+ '01';
   
  }

  TabledataPopulation(input) {
    this.rows = input; // Update your model
    this.displayedColumns = this.rows.length > 0 ? Object.keys(this.rows[0]) : [];
    this.dataSource = new MatTableDataSource(this.rows);
    this.showLoading = false;
  }

  ngOnInit(){
    var date = new Date();
 
  }

  onChange(currentMonthYear) {
    this.showLoading = true;
    
    this.value = 10;
    let date = new Date( this.currentMonthYear.filter(x => x.forCastMonth == currentMonthYear)[0].forCastMonth).toLocaleDateString();
    console.log(this.currentMonthInfo)
    this.selectedDate = this.formatDate(date)
    this.NewDevitationInformation();
    console.log(this.selectedDate)
  }

  sliderEvent(){
    // this.sliderValue = this.value + 100;
    // this.sliderValue = 100;
    this.showLoading = true;
    this.lowerBound = -this.value;
    // let upperBound = this.value
    this.upperBound = this.value


    this.getMapInformationPopulate(this.selectedDate, this.upperBound, this.lowerBound,this._sponsorNameResponse);
  }

 

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  ngAfterViewInit() {
    this.showLoading = true;
    
    this._forCastDateKitsInOut =  this.dataService.forcastdate.subscribe((response) =>{
      this.currentMonthYear =[]
       this.currentMonthYear  = response;   
     //  this.defaultMonth = this.currentMonthYear[0].forCaseMonthDisplay
       
    //   this.getMapInformationPopulate(this.formatDate(this.currentMonthYear[0].forCastMonth), this.upperBound, this.lowerBound);
      //  this.selectedDate = this.formatDate(this.currentMonthYear[0].forCastMonth)
      
       if(this.currentMonthYear.length >0){
        this.selectedDate = this.formatDate(this.currentMonthYear[0].forCastMonth)
        this.value =10;
        this.upperBound = 10;
        this.lowerBound = -10;
        this.getMapInformationPopulate(this.selectedDate, this.upperBound, this.lowerBound,this._sponsorNameResponse);
       }
    //   console.log('forCastResponseValue' +this.formatDate(this.currentMonthYear[0].forCastMonth));
    });

    // this._sponsorName = this.dataService.sponsorNameRestDashB.subscribe((response) =>{
      this._sponsorName = this.dataService.batchSecondLoadWidget.subscribe((response) =>{
    //  this._sponsorNameResponse = localStorage.getItem('selectedSponsor');
     this._sponsorNameResponse = this.dataServicesFetch.get_city_protocolID();
      if(this._sponsorNameResponse == "ALL"){
        this._sponsorNameResponse =[]
      }else{
        this._sponsorNameResponse = this._sponsorNameResponse
      }

      this.batchResponseLoad =response
      if(this.batchResponseLoad == 'true'){

        this.buttonBGColorKitsIN = '#FFFFFF';
        this.buttonBGColorKitsOUT = '#FFFFFF'
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
        this.kitsType = ''
        this.batchResponseLoad = 'false'
        this.showLoading = true;
     //   this.getMapInformationPopulate(this.selectedDate, this.upperBound, this.lowerBound,this._sponsorNameResponse);
    }
    });
    
  }

  kitsIN() {
    this.kitsType = 'kitsIN'
    // this.value = 10;
    this.showLoading = true;
    
    this.buttonBGColorKitsIN = '#FFFFFF';
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

    this.kitsINMap =  this.kitsINOutMap.KitsIn    
     this.getMapPlot(this.kitsINMap);
  }

  kitsOUT() {
    this.kitsType = 'kitsOut'
    // this.value = 10;
    this.showLoading = true;
   
    this.buttonBGColorKitsIN = '#FFFFFF';
    this.buttonBGColorKitsOUT = '#FFFFFF'
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
    
    this.kitsINMap =  this.kitsINOutMap.KitsIn    
    this.getMapPlot(this.kitsINMap);
  }


  public getMapInformationPopulate(currentDateFormat, upperBound, lowerBound,sponsorName): void {
    let MapdataPopulatedInformation ={
      forecastMonth:currentDateFormat,
      upperBound:upperBound,
      lowerBound:lowerBound,
      ctprotocolId:sponsorName
    }
    this._mapKitsINOutSub =  this.dataService.getMapKitsInOut(MapdataPopulatedInformation).subscribe((dataRows) => {
      
     this.kitsINOutMap = dataRows;
      
     this.protoColPreMonth = this.formatNumber(this.kitsINOutMap.portfolioLevel[0].ProtocolCountPreviousMonth);
     this.protocolCurrentMonth = this.formatNumber(this.kitsINOutMap.portfolioLevel[0].ProtocolCountCurrentMonth);
     this.kitsInForcastpreviousMonth = this.formatNumber(this.kitsINOutMap.portfolioLevel[0].KitsInForecastPrevmonth)
     this.kitsInForcastcurrentMonth =this.formatNumber(this.kitsINOutMap.portfolioLevel[0].KitsInForecastrunmonth);
     this.kitsOutForcastpreviousMonth =this.formatNumber(this.kitsINOutMap.portfolioLevel[0].KitsOutForecastPrevmonth);
     this.kitsOutForcastcurrentMonth =this.formatNumber(this.kitsINOutMap.portfolioLevel[0].KitsOutForecastrunmonth);

     this.table_Information =[
       {
        ' ': 'Protocols',
        'Current-Month': this.protocolCurrentMonth ,
        'Last Month': this.protoColPreMonth 
       },{
        ' ': 'Kits-In',
        'Current-Month': this.kitsInForcastcurrentMonth ,
        'Last Month': this.kitsInForcastpreviousMonth 
       },
       {
        ' ': 'Kits-Out',
        'Current-Month': this.kitsOutForcastcurrentMonth ,
        'Last Month': this.kitsOutForcastpreviousMonth 
       }
      
       ]

      this.TabledataPopulation(this.table_Information)

     this.kitsINMap =  this.kitsINOutMap.KitsIn
     if(this.kitsType == 'kitsIN'){
      this.kitsType = 'kitsIN'
     }else if(this.kitsType == 'kitsOut' || this.kitsType == ''){
      this.kitsType = 'kitsOut'
     }
    //  this.kitsType = 'kitsOut'
    
     this.getMapPlot(this.kitsINMap);
     this.dataService.toggleDisableMethood('false')
    })
  }

  formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

//---------------------------

@HostListener('window:resize', ['$event'])

    getScreenSize(event?) {
         
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
          console.log(this.screenHeight, this.screenWidth);
         
          if(this.screenHeight === 2160 || this.screenHeight === 1440){
            this.IsHighScreenRes = true;
          }else{
            this.IsHighScreenRes = false;
          }
    }

//----------------------------


  NewDevitationInformation(){
    this.lowerBound = -this.upperBound;
    let upperBound = this.upperBound
    this.getMapInformationPopulate(this.selectedDate, upperBound, this.lowerBound,this._sponsorNameResponse);
  }

  getMapPlot(kitsInValue){
 /* Create map instance */
 this.kitsInfo =[];
 this.chart = am4core.create("chartdiv", am4maps.MapChart);
 this.chart.seriesContainer.resizable = false;

 /* Set map definition */
 this.chart.geodata = am4geodataWorldLow;
 // Set projection
 this.chart.projection = new am4maps.projections.Miller();
 //this.chart.maxZoomLevel = 1;
 this.chart.seriesContainer.draggable = false;
 this.chart.chartContainer.wheelable = false;

 this.chart.seriesContainer.resizable = false;
 this.chart.seriesContainer.events.disableType("doublehit");

 // Create map polygon series
 var polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());

 // Make map load polygon (like country names) data from GeoJSON
 polygonSeries.useGeodata = true;

 // Configure series
 var polygonTemplate = polygonSeries.mapPolygons.template;
 
 
// polygonTemplate.tooltipText ="Name" +'-'+ "{name}" + '<br/>'+"PercentageVariance" +'{PercentageVariance}';
if(this.kitsType == 'kitsIN'){

  polygonTemplate.adapter.add("tooltipHTML", function (html, ev) {
  
    if (ev.dataItem.dataContext.value == 100) {
      polygonTemplate.tooltipHTML = '<b>{name}</b><br>Kits-In (Run month): {currentMonthKitsIN}<br>Kits-In (Pre month): {previousMonthKitsIN}<br> % MoM Growth from last month (Kits-In): {PercentageVarianceKitsIN}%<br>Kits-Out (Run month): {currentMonthKitsOut}<br>Kits-Out (Pre month): {previousMonthKitsOut}<br> % MoM Growth from last month (Kits-Out) : {PercentageVarianceKitsOut}%';
        return polygonTemplate.tooltipHTML;
    }else{
    //  polygonTemplate.tooltipHTML = "No Data Available"
     // return polygonTemplate.tooltipHTML;
    }
    // return polygonTemplate.tooltipHTML;
  })
  
  // polygonTemplate.tooltipHTML = '<b>{name}</b><br>Kits-In (Run month): {currentMonthKitsIN}<br>Kits-In (Pre month): {previousMonthKitsIN}<br>% deviation from last month (Kits In): {PercentageVarianceKitsIN}%<br>Kits-Out(Run month): {currentMonthKitsOut}<br>Kits-Out(Pre month): {previousMonthKitsOut}<br>% deviation from last month (Kits Out) : {PercentageVarianceKitsOut}%';

}else if(this.kitsType == 'kitsOut'){
  // polygonTemplate.tooltipHTML = '<b>{name}</b><br>Kits-Out(Run month Forecast) :{currentMonth}<br>Kits-Out(Pre month Forecast) :{previousMonth}<br>% devation from last month : {PercentageVariance}%';
 
  polygonTemplate.adapter.add("tooltipHTML", function (html, ev) {
  
    if (ev.dataItem.dataContext.value == 100) {
      polygonTemplate.tooltipHTML = '<b>{name}</b><br>Kits-In(Run month): {currentMonthKitsIN}<br>Kits-In (Pre month): {previousMonthKitsIN}<br> % MoM Growth from last month (Kits-In) : {PercentageVarianceKitsIN}%<br>Kits-Out (Run month): {currentMonthKitsOut}<br>Kits-Out (Pre month): {previousMonthKitsOut}<br>% MoM Growth from last month (Kits-Out) : {PercentageVarianceKitsOut}%';
      return polygonTemplate.tooltipHTML;
    }else{
      polygonTemplate.tooltipHTML = "No Data Available"
      return polygonTemplate.tooltipHTML;
    }
    // return polygonTemplate.tooltipHTML;
  })
  
 
  // polygonTemplate.tooltipHTML = '<b>{name}</b><br>Kits-In(Run month): {currentMonthKitsIN}<br>Kits-In(Pre month): {previousMonthKitsIN}<br>% deviation from last month (Kits In) : {PercentageVarianceKitsIN}%<br>Kits-Out(Run month): {currentMonthKitsOut}<br>Kits-Out(Pre month): {previousMonthKitsOut}<br>% deviation from last month (Kits Out) : {PercentageVarianceKitsOut}%';

}



 polygonTemplate.fill = am4core.color("#f5f5f5");

 // Create hover state and set alternative fill color
 var hs = polygonTemplate.states.create("hover");
//  hs.properties.fill = am4core.color("#ffffff00");
hs.properties.fill = am4core.color("#696969");

 
 //this.chart.zoomControl = new am4maps.ZoomControl();
 // Remove Antarctica
 polygonSeries.exclude = ["AQ"];
//  polygonSeries.include = ["AD", "AR", "AM" , "AU", "AT", "BS" , "BB", "BZ", "BM", "BO", "BR",, "BG", "KH", "CM", "CA", "CL", "CN", "CO" , "HR", "DO", "AE", "EC", "EG", "DE", "GT", "HN", "HK", "IN", "ID", "IR", "IQ", "IL", "IT", "JP", "JO", "KW", "LB", "LY",  "MK", "MX", "MM", "NL", "NG", "PK", "PA", "PY", "PE", "PH", "PR", "RU" , "SA", "RS", "SG", "SR", "CH", "TW", "TT", "TR", "UA", "GB", "US", "VE", "VN"
// ];


 // Add some data
 for (let i = 0; i < kitsInValue.length; i++) {

  if(this.kitsType == 'kitsIN'){
    if (kitsInValue[i].KitsInColourIndicator == 0) {
      polygonSeries.data.push({
        "id": kitsInValue[i].Code,
        "name": kitsInValue[i].CountryName,
        "value": 100,
        "fill": am4core.color("#85af78"),
        "previousMonthKitsIN":kitsInValue[i].KitsInForecastprevmonth,
        "currentMonthKitsIN":kitsInValue[i].KitsInForecastrunmonth,
        "previousMonthKitsOut":kitsInValue[i].KitsOutForecastprevmonth,
        "currentMonthKitsOut":kitsInValue[i].KitsOutForecastrunmonth,
        "PercentageVarianceKitsIN":kitsInValue[i].KitsInPercentageVariance,
        "PercentageVarianceKitsOut":kitsInValue[i].KitsOutPercentageVariance
      })
    } else if (kitsInValue[i].KitsInColourIndicator == 1) {
      polygonSeries.data.push({
       "id": kitsInValue[i].Code,
       "name": kitsInValue[i].CountryName,
       "value": 100,
       "fill": am4core.color("#A9A9A9"),
       "previousMonthKitsIN":kitsInValue[i].KitsInForecastprevmonth,
       "currentMonthKitsIN":kitsInValue[i].KitsInForecastrunmonth,
       "previousMonthKitsOut":kitsInValue[i].KitsOutForecastprevmonth,
       "currentMonthKitsOut":kitsInValue[i].KitsOutForecastrunmonth,
       "PercentageVarianceKitsIN":kitsInValue[i].KitsInPercentageVariance,
       "PercentageVarianceKitsOut":kitsInValue[i].KitsOutPercentageVariance
      })
    } else if (kitsInValue[i].KitsInColourIndicator == 2) {
      polygonSeries.data.push({
       "id": kitsInValue[i].Code,
       "name": kitsInValue[i].CountryName,
       "value": 100,      
        "fill": am4core.color("#ffa771"),
        "previousMonthKitsIN":kitsInValue[i].KitsInForecastprevmonth,
        "currentMonthKitsIN":kitsInValue[i].KitsInForecastrunmonth,
        "previousMonthKitsOut":kitsInValue[i].KitsOutForecastprevmonth,
        "currentMonthKitsOut":kitsInValue[i].KitsOutForecastrunmonth,
        "PercentageVarianceKitsIN":kitsInValue[i].KitsInPercentageVariance,
        "PercentageVarianceKitsOut":kitsInValue[i].KitsOutPercentageVariance
      })
    } 
    else {
     polygonSeries.data.push({ "fill": am4core.color("#fbe8bf") })
    }
  }else if(this.kitsType == 'kitsOut'){
    if (kitsInValue[i].KitsOutColourIndicator == 0) {
      polygonSeries.data.push({
        "id": kitsInValue[i].Code,
        "name": kitsInValue[i].CountryName,
        "value": 100,
        "fill": am4core.color("#85af78"),
        "previousMonthKitsIN":kitsInValue[i].KitsInForecastprevmonth,
        "currentMonthKitsIN":kitsInValue[i].KitsInForecastrunmonth,
        "previousMonthKitsOut":kitsInValue[i].KitsOutForecastprevmonth,
        "currentMonthKitsOut":kitsInValue[i].KitsOutForecastrunmonth,
        "PercentageVarianceKitsIN":kitsInValue[i].KitsInPercentageVariance,
        "PercentageVarianceKitsOut":kitsInValue[i].KitsOutPercentageVariance
      })
    } else if (kitsInValue[i].KitsOutColourIndicator == 1) {
      polygonSeries.data.push({
       "id": kitsInValue[i].Code,
       "name": kitsInValue[i].CountryName,
       "value": 100,
       "fill": am4core.color("#A9A9A9"),
       "previousMonthKitsIN":kitsInValue[i].KitsInForecastprevmonth,
       "currentMonthKitsIN":kitsInValue[i].KitsInForecastrunmonth,
       "previousMonthKitsOut":kitsInValue[i].KitsOutForecastprevmonth,
       "currentMonthKitsOut":kitsInValue[i].KitsOutForecastrunmonth,
       "PercentageVarianceKitsIN":kitsInValue[i].KitsInPercentageVariance,
       "PercentageVarianceKitsOut":kitsInValue[i].KitsOutPercentageVariance
      })
    } else if (kitsInValue[i].KitsOutColourIndicator == 2) {
      polygonSeries.data.push({
       "id": kitsInValue[i].Code,
       "name": kitsInValue[i].CountryName,
       "value": 100,      
        "fill": am4core.color("#ffa771"),
        "previousMonthKitsIN":kitsInValue[i].KitsInForecastprevmonth,
        "currentMonthKitsIN":kitsInValue[i].KitsInForecastrunmonth,
        "previousMonthKitsOut":kitsInValue[i].KitsOutForecastprevmonth,
        "currentMonthKitsOut":kitsInValue[i].KitsOutForecastrunmonth,
        "PercentageVarianceKitsIN":kitsInValue[i].KitsInPercentageVariance,
        "PercentageVarianceKitsOut":kitsInValue[i].KitsOutPercentageVariance
      })
    } 
    else {
     polygonSeries.data.push({ "fill": am4core.color("#fbe8bf") })
    }
  }
   
   this.kitsInfo = polygonSeries;
 
   this.showLoading = false;
 }


 // Bind "fill" property to "fill" key in data
 polygonTemplate.propertyFields.fill = "fill";

 // Create image series
 var imageSeries = this.chart.series.push(new am4maps.MapImageSeries());

 // Create a circle image in image series template so it gets replicated to all new images
 var imageSeriesTemplate = imageSeries.mapImages.template;
 var circle = imageSeriesTemplate.createChild(am4core.Circle);
 circle.radius = 4;
 circle.fill = am4core.color("#B27799");
 circle.stroke = am4core.color("#FFFFFF");
 circle.strokeWidth = 2;
 circle.nonScaling = true;
 circle.tooltipText = "{title}";

 // Set property fields
 imageSeriesTemplate.propertyFields.latitude = "latitude";
 imageSeriesTemplate.propertyFields.longitude = "longitude";

 // Add data for the three cities
 // imageSeries.data = [{
 //   "latitude": 48.856614,
 //   "longitude": 2.352222,
 //   "title": "Paris"
 // }, {
 //   "latitude": 40.712775,
 //   "longitude": -74.005973,
 //   "title": "New York"
 // }, {
 //   "latitude": 49.282729,
 //   "longitude": -123.120738,
 //   "title": "Vancouver"
 // }];
  }

  ngOnDestroy() {
    if (this._mapKitsINOutSub != undefined)
    this._mapKitsINOutSub.unsubscribe();
    if (this._forCastDateKitsInOut != undefined)
  this._forCastDateKitsInOut.unsubscribe();
  if(this._sponsorName != undefined)
  this._sponsorName.unsubscribe();
  
}
infoDetails(content){
  // this._infoDisplay = true
  const dialogRef = this.dialog.open(InfoDetailsComponent, {
     
    disableClose: true,
    data: { message: this.info_dispay},
    panelClass:['animate__animated','animate__slideInLeft','my-class'] 
  });
  
      }
downloadexcel(){
  this.excelService.exportAsExcelFile(this.kitsINMap,this.kitsType);
}

getBaseUrl(): string {
  var currentAbsoluteUrl = window.location.href;
  var currentRelativeUrl = this.router.url;
  var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
  var baseUrl: string = currentAbsoluteUrl.substring(0, index);
  return baseUrl;
}
  
}
function createMarkers(chart) {
  // console.log("calling createMarkers");
  // const demoAddress = { my_lat: 35.6895, my_lng: 139.6917 };
  // const mapImageSeries = chart.series.push(new am4maps.MapImageSeries());

  // const imageSeriesTemplate = mapImageSeries.mapImages.template;
  // const circle = imageSeriesTemplate.createChild(am4core.Circle);
  // circle.radius = 10;
  // circle.fill = am4core.color("#ff00");
  // circle.stroke = am4core.color("#000000");
  // circle.strokeWidth = 2;
  // circle.nonScaling = true;
  // circle.tooltipText = "hi";
  // imageSeriesTemplate.propertyFields.latitude = "latitude";
  // imageSeriesTemplate.propertyFields.longitude = "longitude";
  // // mapImageSeries.data = {
  // //   latitude: demoAddress.latitude,
  // //   longitude: demoAddress.longitude
  // // };
  // return chart;

  // ngOnDestroy() {
  //   this.sponsorSub.unsubscribe();
  // }
}