import { Component, OnInit ,AfterViewInit,OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {DashboardService} from '../../app/dashboard/dashboard.service'
import { SharedSessionService } from "../common/sharedsession.service";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common'
import {InfoDetailsComponent} from '../common/info-details/info-details.component'
import { HostListener } from "@angular/core";
@HostListener('window:resize', ['$event'])

@Component({
  selector: 'app-home',
  templateUrl: './home-new.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit,AfterViewInit,OnDestroy {
  banner: any = this.getBaseUrl() + "/assets/icon/banner.png";
  block: any =  this.getBaseUrl() + "/assets/icon/forcast.png";
  blockPortfolio: any =  this.getBaseUrl() + "/assets/icon/portfolio.png";
  forecastPortfolio:any = this.getBaseUrl()+"/assets/icon/forecasting.jpg"
  ko_demand :any = this.getBaseUrl()+"/assets/icon/ko-demand.png"
  ko_supplier :any = this.getBaseUrl()+"/assets/icon/ko_supplier.png"
  skip :any =this.getBaseUrl()+ "/assets/icon/skip.png";
  info : any = this.getBaseUrl()+"/assets/icon/info_other.png"
  landingpage :any = this.getBaseUrl()+"/assets/img/landingMain.png"
  landingpageleft:any =this.getBaseUrl()+"/assets/img/prism.png"
  
  performace :any = this.getBaseUrl()+"/assets/img/performace.png"
  performance_hover :any = this.getBaseUrl()+"/assets/img/performace_hover.png"
  forecasting :any = this.getBaseUrl()+"/assets/img/forecast.png"
  forecasting_hover :any = this.getBaseUrl()+"/assets/img/forecast_hover.png"
  ko_demand_icon :any = this.getBaseUrl()+"/assets/img/ko_demand_icon.png"
  ko_demand_icon_hover :any = this.getBaseUrl()+"/assets/img/ko_demand_icon_hover.png"
  ko_supplier_icon :any = this.getBaseUrl()+"/assets/img/ko_supplier_icon.png"
  ko_supplier_icon_hover :any = this.getBaseUrl()+"/assets/img/ko_supplier_icon_hover.png"

  performanceImg :any
  forecastingImg :any
  kodemandiconImg:any;
  kosuppliericonImg :any

  // permornance_1 : any = this.getBaseUrl()+"/assets/img/performance_1.png"
  // permornance_2 : any = this.getBaseUrl()+"/assets/img/performance_2.png"
  // permornance_3 : any = this.getBaseUrl()+"/assets/img/performance_3.png"
  // forecast_1 :any = this.getBaseUrl()+"/assets/img/forecast_1.png"
  // forecast_2 :any = this.getBaseUrl()+"/assets/img/forecast_2.png"
  // forecast_3 :any = this.getBaseUrl()+"/assets/img/forecast_3.png"
  // ko_demand_1 :any = this.getBaseUrl()+"/assets/img/ko_demand_1.png"
  // ko_demand_2 :any = this.getBaseUrl()+"/assets/img/ko_demand_2.png"
  // supplier_1 :any = this.getBaseUrl()+"/assets/img/supplier_1.png"
  // supplier_2 :any = this.getBaseUrl()+"/assets/img/supplier_2.png"
  // supplier_3 :any = this.getBaseUrl()+"/assets/img/supplier_3.png"
  info_dispay_forecasting_dashboard = this.getBaseUrl()+"/assets/pdf/Robin_Forecasting_Dashboard_Summary.pdf"
  info_dispay_performance_dashboard = this.getBaseUrl()+"/assets/pdf/Robin_Performance_Dashboard_Summary.pdf"
  info_dispay_ko_dashboard = this.getBaseUrl()+"/assets/pdf/Robin_Kits_Demand_Historical_Summary.pdf"
  _sponsorName:any
  sponsor:any;
  selectedSponsor: string = "ROCHE";
  scrHeight:any;
  scrWidth:any;

  constructor(private http: HttpClient,
    private router: Router,private dashBoardServices : DashboardService,private sharedService: SharedSessionService,public dialog: MatDialog) { 
      this.sharedService.changeSponsor = true;
      this.dashBoardServices.headerStatusValue('')  
      this.performanceImg = this.performace;
      this.forecastingImg = this.forecasting;
      this.kodemandiconImg = this.ko_demand_icon;
      this.kosuppliericonImg= this.ko_supplier_icon
      this.getScreenSize();
    }
    getScreenSize(event?) {
      this.scrHeight = window.innerHeight;
      this.scrWidth = window.innerWidth;
      console.log( this.scrWidth,this.scrHeight);
}

  ngOnInit() {
    this.dashBoardServices.headerInformationDis(true);    
  
  }
  ngAfterViewInit() {

    this._sponsorName =this.dashBoardServices.sponsorName.subscribe((response) => {
      this.sponsor = response
      
      // console.log('sponsor name' + this.sponsor)
      if(this.sponsor == '' || this.sponsor == null){
       // this.dashBoardServices.updateSponsor(this.selectedSponsor)
       localStorage.setItem("sponsor_name",this.selectedSponsor)
      }else{
        //this.dashBoardServices.updateSponsor(this.sponsor)
        localStorage.setItem("sponsor_name",this.sponsor)
      }
      
      
  })
   
  }
  performanceDashBoard(){
    this.dashBoardServices.headerInformationDis(false);
    this.router.navigate(["home"]);
  }

  forCastingDashBoard(){
    this.dashBoardServices.headerInformationDis(true);
    this.router.navigate(["home/kitsforecasting"]);
    
  }

  koAnalysis(){
    this.dashBoardServices.headerInformationDis(true);
    this.router.navigate(["home/koanalysis"]);
  }
  koSupplier(){
    this.dashBoardServices.headerInformationDis(true);
    this.router.navigate(["home/Kits-Components-Forecast"]);
  }
  ngOnDestroy(){
    this.sharedService.changeSponsor = false;
    if(this._sponsorName != undefined){
      this._sponsorName.unsubscribe();
    }
  }

  performanceDashBoardinfo(content){
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
      disableClose: true,
      data: { message: this.info_dispay_performance_dashboard},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
    });

  }
  forCastingDashBoardinfo(content){
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
      disableClose: true,
      data: { message: this.info_dispay_forecasting_dashboard},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
    });

  }

  koAnalysisinfo(){
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
      disableClose: true,
      data: { message: this.info_dispay_ko_dashboard},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
    });
  }

  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  
}
imgChangeover(type){
  if(type === 'performace'){
    this.performanceImg = this.performance_hover;
  }else if(type === 'Forecasting'){
    this.forecastingImg = this.forecasting_hover;
  }else if(type === 'KitDemand'){
    this.kodemandiconImg = this.ko_demand_icon_hover;
  }else if(type === 'KitForecast'){
    this.kosuppliericonImg= this.ko_supplier_icon_hover
    
}
}
mouseLeave(type){
  if(type === 'performace'){
    this.performanceImg = this.performace;
  }else if(type === 'Forecasting'){
    this.forecastingImg = this.forecasting;
  }else if(type === 'KitDemand'){
    this.kodemandiconImg = this.ko_demand_icon;
  }else if(type === 'KitForecast'){
    this.kosuppliericonImg= this.ko_supplier_icon
  }
   
  
}
}
