import { Component, OnInit ,OnDestroy,ViewChild,HostListener,AfterViewInit} from '@angular/core';
import { MatTableDataSource, MatTableModule,MatPaginator } from '@angular/material';
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Router } from "@angular/router";
import {DataService} from '../../common/data.service'
import {ExactaComponent} from '../exacta/exacta.component'
import {ExcelService} from '../excel.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common'
import {InfoDetailsComponent} from '../../common/info-details/info-details.component'
@Component({
  selector: 'app-actual-vforecast',
  templateUrl: './actual-vforecast.component.html',
  styleUrls: ['./actual-vforecast.component.less']
})
export class ActualVforecastComponent implements OnInit, AfterViewInit,OnDestroy {
  rows = new Array<any>();
  dataSource: any;
  displayedColumns = [];
  _moverViewKitsINOutSub : any;
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

  kitsINOut:any =[]

  value : any =0
  type : any;
  navUrl : any
  lengthObj:any
  objKitsInOverViewData:any;
  myFlagForSlideToggle: boolean = true;
  togglevalue : boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  valueAssign : any
  IsExacta : any;
  monthClickForExacata : any;

  _sponsorName :any
  _sponsorNameResponse:any
  sponsor:any;

  download: any = this.getBaseUrl() + "/assets/icon/download.png";
  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/Historical_Forecast_vs_Actual.pdf"

  constructor(private dataService: DashboardService,private excelService:ExcelService,
    private dataServices : DataService,public dialog: MatDialog,private router: Router,) {
   this._sponsorNameResponse ='ROCHE'
   this.type ='KitsOut'
   this.IsExacta = true
   
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

   this.cursor = 'not-allowed';
  
   localStorage.setItem('month','')
   localStorage.setItem('exactaMonth','')
   this.showLoading = true;
//    this.sponsor ={
//     sponsor : this._sponsorNameResponse
//   }
//     this._moverViewKitsINOutSub =  this.dataService.getfvsaoverview(this.sponsor).subscribe((dataRows) => {
//    this.kitsInOUTOverViewData = dataRows;
//    this.kitsINOut=[]
//    this.kitsInOverViewData =  this.kitsInOUTOverViewData.KitsOutForecastvsActuals;
//    this.TabledataPopulation(this.kitsInOverViewData)
//  })

} 
TabledataPopulation(input) {
   this.rows = input; // Update your model
   this.displayedColumns = this.rows.length > 0 ? Object.keys(this.rows[0]) : [];
   this.dataSource = new MatTableDataSource(this.rows);
   this.dataSource.paginator = this.paginator;
   this.showLoading = false;
 }

 //---------------------------------------------------------------
 ngAfterViewInit() {

   this._sponsorName = this.dataService.sponsorNameRestDashB.subscribe((response) =>{
  
    this.expanded = "false";
 })

  // this._sponsorName = this.dataService.sponsorNameRestDashB.subscribe((response) =>{
  // //   this._sponsorNameResponse = response;
  // //   this.sponsor={
  // //     sponsor:this._sponsorNameResponse
  // //   }
  // //   if(this._sponsorNameResponse != ''){
  // //     this.showLoading = true;
  // //   this._moverViewKitsINOutSub =  this.dataService.getfvsaoverview(this.sponsor).subscribe((dataRows) => {
  // //     this.kitsInOUTOverViewData = dataRows;
  // //     this.kitsINOut=[]

  // //     if(this.type ='KitsOut'){
  // //       this.kitsOutOverView()
  // //      }else if(this.type ='KitsIn'){
  // //       this.kitsINOverView()
  // //      }


  // //     // this.kitsInOverViewData =  this.kitsInOUTOverViewData.KitsOutForecastvsActuals;
  // //     // this.TabledataPopulation(this.kitsInOverViewData)
  // //   })
  // // }
  // });

  //  this.dataSource.paginator = this.paginator;
 }

  ngOnInit() {
  }

  kitsINOverView(){
    this.type ='KitsIn'
    this.IsExacta = false
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
    
    this.kitsInOverViewData =  this.kitsInOUTOverViewData.KitsInForecastvsActuals;
    this.objKitsInOverViewData = this.kitsInOverViewData[0]
    this.lengthObj = Object.keys(this.objKitsInOverViewData).length
    localStorage.setItem('overViewGridFirstRowLength', this.lengthObj)
    localStorage.setItem('kitsStatus','true')
    this.dataService.exactaDisplayTable('false')
    this.TabledataPopulation(this.kitsInOverViewData)

  }

  kitsOutOverView(){
    this.type ='KitsOut'
    this.IsExacta = false
    this.showLoading = true;
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
    

    this.kitsInOverViewData =  this.kitsInOUTOverViewData.KitsOutForecastvsActuals;
    this.objKitsInOverViewData = this.kitsInOverViewData[0]
    this.lengthObj = Object.keys(this.objKitsInOverViewData).length
    localStorage.setItem('overViewGridFirstRowLength', this.lengthObj)
    localStorage.setItem('kitsStatus','true')
    this.dataService.exactaDisplayTable('false')
    this.TabledataPopulation(this.kitsInOverViewData)
    

  }

  downloadexcel(){
    this.excelService.exportAsExcelFile(this.kitsInOverViewData,  'actual_vforecast');
  }

  expand(){
    console.log(this.expanded)
    // if(this.expanded ==  true){
     // this._sponsorNameResponse = localStorage.getItem('selectedSponsor');
     this._sponsorNameResponse = this.dataServices.get_city_protocolID();
     if(this._sponsorNameResponse == "ALL"){
       this._sponsorNameResponse =[]
     }else{
       this._sponsorNameResponse = this._sponsorNameResponse
     }
      this.sponsor={
        ctprotocolId :this._sponsorNameResponse
      }
      // if(this._sponsorNameResponse != ''){
        this.showLoading = true;
      this._moverViewKitsINOutSub =  this.dataService.getfvsaoverview(this.sponsor).subscribe((dataRows) => {
        this.kitsInOUTOverViewData = dataRows;
        this.kitsINOut=[]
  
        if(this.type ='KitsOut'){
          this.kitsOutOverView()
         }else if(this.type ='KitsIn'){
          this.kitsINOverView()
         }
  
  
        this.kitsInOverViewData =  this.kitsInOUTOverViewData.KitsOutForecastvsActuals;
        this.TabledataPopulation(this.kitsInOverViewData)
      })
    // }
    this.dataSource.paginator = this.paginator;
    
  }

  infoDetails(content){
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
      disableClose: true,
      data: { message: this.info_dispay},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
    });

  }
  ngOnDestroy() {
    if (this._moverViewKitsINOutSub != undefined)
    this._moverViewKitsINOutSub.unsubscribe();
    if(this._sponsorName != undefined)
    this._sponsorName.unsubscribe();
  }
  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }

}
