import { Component, OnInit ,OnDestroy,ViewChild,HostListener,AfterViewInit} from '@angular/core';
import { MatTableDataSource, MatTableModule,MatPaginator } from '@angular/material';
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Router } from "@angular/router";
import {DataService} from '../../common/data.service'
import {ExactaComponent} from '../exacta/exacta.component'
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import * as moment from 'moment';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import {ExcelService} from '../excel.service';

import { CustomTooltip } from "../custom-tooltip/custom-tooltip.component";
import { ITooltipAngularComp } from 'ag-grid-angular';
import { ITooltipParams } from 'ag-grid-community';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import {Location} from '@angular/common'
 import {InfoDetailsComponent} from '../../common/info-details/info-details.component'

@Component({
  selector: 'app-kit-protocol-pareto-grid',
  templateUrl: './kit-protocol-pareto-grid.component.html',
  styleUrls: ['./kit-protocol-pareto-grid.component.less']
})
export class KitProtocolParetoGridComponent implements OnInit, AfterViewInit,OnDestroy {
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
  textunderlineoffsetKitsOut :any;
  cursor : any;
  cursorType : any;
  padding : any;
  type : any;
  navUrl : any
  flags = [];
  output = [];
  private paginationNumberFormatter;
  private gridApi;
  private gridColumnApi;
  public modules: any[] = AllModules;
  private options: string[];
  selectedQuantity = "10";
  _protocoltableAPIResponse : any =[]
  _newProtocolresponse : any =[];
  private columnDefs : any;
  private defaultColDef : any;
  private rowData= [];
  private columnDef = [];
  private sideBar;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private rowSelection;
  private rowDatas :any = []
  private paginationPageSize;
  private autoHeights:boolean
  private domLayout;
  private sortingOrder;
  private pfdate : any;
  rowHeight:any
  tooltipShowDelay:any;

  _newProtocolsList : any =[]
  obj :any
  frameworkComponents :any;

  _sponsorName :any
  _sponsorNameResponse:any
  _sponsorNameForLoader :any = 'false'
  sponsor:any;
  batchResponseLoad :any

  download: any = this.getBaseUrl() + "/assets/icon/download.png";
  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/3_months_Forward_Details.pdf"
  constructor(private dataService: DashboardService,private excelService:ExcelService,
    private router: Router, public dialog: MatDialog,private dataServicesFetch: DataService) { 
     
      this.options = ["10", "50", "100","200","500","1000"]
      this.type ='KitsOut'
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
      
     
    }
  
    sizeToFit() {
      this.gridApi.sizeColumnsToFit();
    }
  
    onPageSizeChanged(newPageSize) {
      const inputElement = document.getElementById('page-size') as HTMLInputElement
      var value = inputElement.value;
      this.gridApi.paginationSetPageSize(this.selectedQuantity);
    }
  
   onGridReady(params) {
    this._sponsorNameResponse ='ROCHE'
      this.showLoading = true
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      params.columnApi.autoSizeAllColumns();
     // this.getDataPopulating();
  }


  ngAfterViewInit() {
    // this._sponsorName = this.dataService.sponsorNameRestDashB.subscribe((response) =>{
      this._sponsorNameForLoader = this.dataService.sponsorNameRestDashB.subscribe((response) =>{
        this.showLoading = true;
      })
      this._sponsorName = this.dataService.batchSecondLoadWidget.subscribe((response) =>{
    //  this._sponsorNameResponse = localStorage.getItem('selectedSponsor')

      this._sponsorNameResponse = this.dataServicesFetch.get_city_protocolID();

      if(this._sponsorNameResponse == "ALL"){
        this._sponsorNameResponse =[]
      }else{
        this._sponsorNameResponse = this._sponsorNameResponse
      }

      this.batchResponseLoad =response
      if(this.batchResponseLoad == 'true'){

        this.type ='KitsOut'
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

       
       // this.defaultColDef =''
        this.columnDefs=[]
        this.batchResponseLoad = 'false'
       
        this.getDataPopulating();
    }
    });
  
   }
   getDataPopulating(){
    this.rowDatas =[]
    this._newProtocolresponse =[]
    this._protocoltableAPIResponse =[]
    this.flags =[]
    this.output =[]
    this._newProtocolsList =[]
    this.sponsor ={
      ctprotocolId : this._sponsorNameResponse
    }
     this.dataService.getkitforecastparetogrid(this.sponsor).subscribe((dataRows) => {
       this._protocoltableAPIResponse = dataRows
       for (let i = 0; i < this._protocoltableAPIResponse.KitsIn.length; i++) {
         if (this.flags[this._protocoltableAPIResponse.KitsIn[i].ForecastMonth])
           continue;
         this.flags[this._protocoltableAPIResponse.KitsIn[i].ForecastMonth] = true;
         this.output.push(this._protocoltableAPIResponse.KitsIn[i].ForecastMonth);
       }       
      for(let k=0;k<this._protocoltableAPIResponse.KitsOut.length;k++){
        if(this._protocoltableAPIResponse.KitsOut[k].ForecastMonth == this.output[0]){
           var obj_zero = {
             'forecast_date_zero':this.output[0],
             'ForcastActual_zero':this._protocoltableAPIResponse.KitsOut[k].KitsOut,
             'KO_MoMGrowth_zero':'Kits-out MoM Growth:'+this._protocoltableAPIResponse.KitsOut[k].KO_MoMGrowth+'%',
           }
        }else if(this._protocoltableAPIResponse.KitsOut[k].ForecastMonth == this.output[1]){
          var obj_first ={
           'forecast_date_zero':obj_zero.forecast_date_zero,
           'forecast_date_first':this.output[1],
           'ForcastActual_zero':obj_zero.ForcastActual_zero,
           'ForcastActual_first':this._protocoltableAPIResponse.KitsOut[k].KitsOut,
           'KO_MoMGrowth_sero' : obj_zero.KO_MoMGrowth_zero,
           'KO_MoMGrowth_first':'Kits-out MoM Growth:'+this._protocoltableAPIResponse.KitsOut[k].KO_MoMGrowth+'%',
          }
             
        }else if(this._protocoltableAPIResponse.KitsOut[k].ForecastMonth == this.output[2]){
         var obj_second={
           'forecast_date_zero':obj_first.forecast_date_zero,
           'forecast_date_first':obj_first.forecast_date_first,
           'forecast_date_second':this.output[2],
           'ForcastActual_zero':obj_first.ForcastActual_zero,
           'ForcastActual_first':obj_first.ForcastActual_first,
           'ForcastActual_second':this._protocoltableAPIResponse.KitsOut[k].KitsOut,
           'KO_MoMGrowth_zero' : obj_first.KO_MoMGrowth_sero,
           'KO_MoMGrowth_first':obj_first.KO_MoMGrowth_first,
           'KO_MoMGrowth_second':'Kits-out MoM Growth:'+this._protocoltableAPIResponse.KitsOut[k].KO_MoMGrowth+'%',
          }

        }else if(this._protocoltableAPIResponse.KitsOut[k].ForecastMonth == this.output[3]){
         if(this._protocoltableAPIResponse.KitsOut[k].ProtocolName == '' || this._protocoltableAPIResponse.KitsOut[k].ProtocolName == undefined){
           if(this._protocoltableAPIResponse.KitsOut[k].PFDate == '0001-01-01T00:00:00'){
               this.pfdate = 'NULL'
           }else {
             this.pfdate =this._protocoltableAPIResponse.KitsOut[k].PFDate
           }
           var obj_third={
             'details':'-',
             'Link':this._protocoltableAPIResponse.KitsOut[k].Link,
             'ProtocolName':this._protocoltableAPIResponse.KitsOut[k].ProtocolName,
             'CTProtocolID':this._protocoltableAPIResponse.KitsOut[k].CTProtocolId,
             'NCT':this._protocoltableAPIResponse.KitsOut[k].NCT,
             'Sponsor':this._protocoltableAPIResponse.KitsOut[k].Sponsor,
             'PFDate':this.pfdate,
             'forecast_date_zero':obj_second.forecast_date_zero,
             'forecast_date_first':obj_second.forecast_date_first,
             'forecast_date_second':obj_second.forecast_date_second,
             'forecast_date_third':this.output[3],
             'ForcastActual_zero':obj_second.ForcastActual_zero,
             'ForcastActual_first':obj_second.ForcastActual_first,
             'ForcastActual_second':obj_second.ForcastActual_second,
             'ForcastActual_third':this._protocoltableAPIResponse.KitsOut[k].KitsOut,
             'KO_MoMGrowth_zero' : obj_second.KO_MoMGrowth_zero,
             'KO_MoMGrowth_first':obj_second.KO_MoMGrowth_first,
             'KO_MoMGrowth_second':obj_second.KO_MoMGrowth_second,
             'KO_MoMGrowth_thir':'Kits-out MoM Growth:'+this._protocoltableAPIResponse.KitsOut[k].KO_MoMGrowth+'%',
            }
         }else{
           if(this._protocoltableAPIResponse.KitsOut[k].PFDate == '0001-01-01T00:00:00'){
             this.pfdate = 'NULL'
         }else {
           this.pfdate =this._protocoltableAPIResponse.KitsOut[k].PFDate
         }
           var obj_third={
             'details':'details',
             'Link':this._protocoltableAPIResponse.KitsOut[k].Link,
             'ProtocolName':this._protocoltableAPIResponse.KitsOut[k].ProtocolName,
             'CTProtocolID':this._protocoltableAPIResponse.KitsOut[k].CTProtocolId,
             'NCT':this._protocoltableAPIResponse.KitsOut[k].NCT,
             'Sponsor':this._protocoltableAPIResponse.KitsOut[k].Sponsor,
             'PFDate':this.pfdate,
             'forecast_date_zero':obj_second.forecast_date_zero,
             'forecast_date_first':obj_second.forecast_date_first,
             'forecast_date_second':obj_second.forecast_date_second,
             'forecast_date_third':this.output[3],
             'ForcastActual_zero':obj_second.ForcastActual_zero,
             'ForcastActual_first':obj_second.ForcastActual_first,
             'ForcastActual_second':obj_second.ForcastActual_second,
             'ForcastActual_third':this._protocoltableAPIResponse.KitsOut[k].KitsOut,
             'KO_MoMGrowth_zero' : obj_second.KO_MoMGrowth_zero,
             'KO_MoMGrowth_first':obj_second.KO_MoMGrowth_first,
             'KO_MoMGrowth_second':obj_second.KO_MoMGrowth_second,
             'KO_MoMGrowth_thir':'Kits-out MoM Growth:'+this._protocoltableAPIResponse.KitsOut[k].KO_MoMGrowth+'%',
            }
         }         
          this._newProtocolsList.push(obj_third)
        }
        
       }       
       this.rowData = this._newProtocolsList
       this.getPaertoGridPlot();       
   });
   }

    kitsINOverView(){
      this.rowDatas =[]
      this.type ='KitsIn'
      this.rowData =[]
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
      this._newProtocolresponse =[]
      this._newProtocolsList =[]

      for(let k=0;k<this._protocoltableAPIResponse.KitsIn.length;k++){
        if(this._protocoltableAPIResponse.KitsIn[k].ForecastMonth == this.output[0]){
           var obj_zero = {
             'forecast_date_zero':this.output[0],
             'ForcastActual_zero':this._protocoltableAPIResponse.KitsIn[k].KitsIn,
             'KO_MoMGrowth_zero':'Kits-In MoM Growth:'+this._protocoltableAPIResponse.KitsIn[k].KI_MoMGrowth+'%',
           }
        }else if(this._protocoltableAPIResponse.KitsIn[k].ForecastMonth == this.output[1]){
          var obj_first ={
           'forecast_date_zero':obj_zero.forecast_date_zero,
           'forecast_date_first':this.output[1],
           'ForcastActual_zero':obj_zero.ForcastActual_zero,
           'ForcastActual_first':this._protocoltableAPIResponse.KitsIn[k].KitsIn,
           'KO_MoMGrowth_sero' : obj_zero.KO_MoMGrowth_zero,
           'KO_MoMGrowth_first':'Kits-In MoM Growth:'+this._protocoltableAPIResponse.KitsIn[k].KI_MoMGrowth+'%',
          }
             
        }else if(this._protocoltableAPIResponse.KitsIn[k].ForecastMonth == this.output[2]){
         var obj_second={
           'forecast_date_zero':obj_first.forecast_date_zero,
           'forecast_date_first':obj_first.forecast_date_first,
           'forecast_date_second':this.output[2],
           'ForcastActual_zero':obj_first.ForcastActual_zero,
           'ForcastActual_first':obj_first.ForcastActual_first,
           'ForcastActual_second':this._protocoltableAPIResponse.KitsIn[k].KitsIn,
           'KO_MoMGrowth_zero' : obj_first.KO_MoMGrowth_sero,
           'KO_MoMGrowth_first':obj_first.KO_MoMGrowth_first,
           'KO_MoMGrowth_second':'Kits-In MoM Growth:'+this._protocoltableAPIResponse.KitsIn[k].KI_MoMGrowth+'%',
          }

        }else if(this._protocoltableAPIResponse.KitsIn[k].ForecastMonth == this.output[3]){
         if(this._protocoltableAPIResponse.KitsIn[k].ProtocolName == '' || this._protocoltableAPIResponse.KitsIn[k].ProtocolName == undefined){
           var obj_third={
             'details':'-',
             'Link':this._protocoltableAPIResponse.KitsIn[k].Link,
             'ProtocolName':this._protocoltableAPIResponse.KitsIn[k].ProtocolName,
             'CTProtocolID':this._protocoltableAPIResponse.KitsIn[k].CTProtocolId,
             'NCT':this._protocoltableAPIResponse.KitsIn[k].NCT,
             'Sponsor':this._protocoltableAPIResponse.KitsIn[k].Sponsor,
             'PFDate':this._protocoltableAPIResponse.KitsIn[k].PFDate,
             'forecast_date_zero':obj_second.forecast_date_zero,
             'forecast_date_first':obj_second.forecast_date_first,
             'forecast_date_second':obj_second.forecast_date_second,
             'forecast_date_third':this.output[3],
             'ForcastActual_zero':obj_second.ForcastActual_zero,
             'ForcastActual_first':obj_second.ForcastActual_first,
             'ForcastActual_second':obj_second.ForcastActual_second,
             'ForcastActual_third':this._protocoltableAPIResponse.KitsIn[k].KitsIn,
             'KO_MoMGrowth_zero' : obj_second.KO_MoMGrowth_zero,
             'KO_MoMGrowth_first':obj_second.KO_MoMGrowth_first,
             'KO_MoMGrowth_second':obj_second.KO_MoMGrowth_second,
             'KO_MoMGrowth_thir':'Kits-In MoM Growth:'+this._protocoltableAPIResponse.KitsIn[k].KI_MoMGrowth+'%',
            }
         }else{
           var obj_third={
             'details':'details',
             'Link':this._protocoltableAPIResponse.KitsIn[k].Link,
             'ProtocolName':this._protocoltableAPIResponse.KitsIn[k].ProtocolName,
             'CTProtocolID':this._protocoltableAPIResponse.KitsIn[k].CTProtocolId,
             'NCT':this._protocoltableAPIResponse.KitsIn[k].NCT,
             'Sponsor':this._protocoltableAPIResponse.KitsIn[k].Sponsor,
             'PFDate':this._protocoltableAPIResponse.KitsIn[k].PFDate,
             'forecast_date_zero':obj_second.forecast_date_zero,
             'forecast_date_first':obj_second.forecast_date_first,
             'forecast_date_second':obj_second.forecast_date_second,
             'forecast_date_third':this.output[3],
             'ForcastActual_zero':obj_second.ForcastActual_zero,
             'ForcastActual_first':obj_second.ForcastActual_first,
             'ForcastActual_second':obj_second.ForcastActual_second,
             'ForcastActual_third':this._protocoltableAPIResponse.KitsIn[k].KitsIn,
             'KO_MoMGrowth_zero' : obj_second.KO_MoMGrowth_zero,
             'KO_MoMGrowth_first':obj_second.KO_MoMGrowth_first,
             'KO_MoMGrowth_second':obj_second.KO_MoMGrowth_second,
             'KO_MoMGrowth_thir':'Kits-In MoM Growth:'+this._protocoltableAPIResponse.KitsIn[k].KI_MoMGrowth+'%',
            }
         }
        
          this._newProtocolsList.push(obj_third)
        }
        
       }
     
     
      this.rowData = this._newProtocolsList
      this.getPaertoGridPlot();

   
       
    }
  
    kitsOutOverView(){
      this.rowDatas =[]
      this.rowData =[]
      this.type ='KitsOut'
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
      this._newProtocolresponse=[]
      this._newProtocolsList =[]

      for(let k=0;k<this._protocoltableAPIResponse.KitsOut.length;k++){
        if(this._protocoltableAPIResponse.KitsOut[k].ForecastMonth == this.output[0]){
           var obj_zero = {
             'forecast_date_zero':this.output[0],
             'ForcastActual_zero':this._protocoltableAPIResponse.KitsOut[k].KitsOut,
             'KO_MoMGrowth_zero':'Kits-out MoM Growth:'+this._protocoltableAPIResponse.KitsOut[k].KO_MoMGrowth+'%',
           }
        }else if(this._protocoltableAPIResponse.KitsOut[k].ForecastMonth == this.output[1]){
          var obj_first ={
           'forecast_date_zero':obj_zero.forecast_date_zero,
           'forecast_date_first':this.output[1],
           'ForcastActual_zero':obj_zero.ForcastActual_zero,
           'ForcastActual_first':this._protocoltableAPIResponse.KitsOut[k].KitsOut,
           'KO_MoMGrowth_sero' : obj_zero.KO_MoMGrowth_zero,
           'KO_MoMGrowth_first':'Kits-out MoM Growth:'+this._protocoltableAPIResponse.KitsOut[k].KO_MoMGrowth+'%',
          }
             
        }else if(this._protocoltableAPIResponse.KitsOut[k].ForecastMonth == this.output[2]){
         var obj_second={
           'forecast_date_zero':obj_first.forecast_date_zero,
           'forecast_date_first':obj_first.forecast_date_first,
           'forecast_date_second':this.output[2],
           'ForcastActual_zero':obj_first.ForcastActual_zero,
           'ForcastActual_first':obj_first.ForcastActual_first,
           'ForcastActual_second':this._protocoltableAPIResponse.KitsOut[k].KitsOut,
           'KO_MoMGrowth_zero' : obj_first.KO_MoMGrowth_sero,
           'KO_MoMGrowth_first':obj_first.KO_MoMGrowth_first,
           'KO_MoMGrowth_second':'Kits-out MoM Growth:'+this._protocoltableAPIResponse.KitsOut[k].KO_MoMGrowth+'%',
          }

        }else if(this._protocoltableAPIResponse.KitsOut[k].ForecastMonth == this.output[3]){
         if(this._protocoltableAPIResponse.KitsOut[k].ProtocolName == '' || this._protocoltableAPIResponse.KitsOut[k].ProtocolName == undefined){
           var obj_third={
             'details':'-',
             'Link':this._protocoltableAPIResponse.KitsOut[k].Link,
             'ProtocolName':this._protocoltableAPIResponse.KitsOut[k].ProtocolName,
             'CTProtocolID':this._protocoltableAPIResponse.KitsOut[k].CTProtocolId,
             'NCT':this._protocoltableAPIResponse.KitsOut[k].NCT,
             'Sponsor':this._protocoltableAPIResponse.KitsOut[k].Sponsor,
             'PFDate':this._protocoltableAPIResponse.KitsOut[k].PFDate,
             'forecast_date_zero':obj_second.forecast_date_zero,
             'forecast_date_first':obj_second.forecast_date_first,
             'forecast_date_second':obj_second.forecast_date_second,
             'forecast_date_third':this.output[3],
             'ForcastActual_zero':obj_second.ForcastActual_zero,
             'ForcastActual_first':obj_second.ForcastActual_first,
             'ForcastActual_second':obj_second.ForcastActual_second,
             'ForcastActual_third':this._protocoltableAPIResponse.KitsOut[k].KitsOut,
             'KO_MoMGrowth_zero' : obj_second.KO_MoMGrowth_zero,
             'KO_MoMGrowth_first':obj_second.KO_MoMGrowth_first,
             'KO_MoMGrowth_second':obj_second.KO_MoMGrowth_second,
             'KO_MoMGrowth_thir':'Kits-out MoM Growth:'+this._protocoltableAPIResponse.KitsOut[k].KO_MoMGrowth+'%',
            }
         }else{
           var obj_third={
             'details':'details',
             'Link':this._protocoltableAPIResponse.KitsOut[k].Link,
             'ProtocolName':this._protocoltableAPIResponse.KitsOut[k].ProtocolName,
             'CTProtocolID':this._protocoltableAPIResponse.KitsOut[k].CTProtocolId,
             'NCT':this._protocoltableAPIResponse.KitsOut[k].NCT,
             'Sponsor':this._protocoltableAPIResponse.KitsOut[k].Sponsor,
             'PFDate':this._protocoltableAPIResponse.KitsOut[k].PFDate,
             'forecast_date_zero':obj_second.forecast_date_zero,
             'forecast_date_first':obj_second.forecast_date_first,
             'forecast_date_second':obj_second.forecast_date_second,
             'forecast_date_third':this.output[3],
             'ForcastActual_zero':obj_second.ForcastActual_zero,
             'ForcastActual_first':obj_second.ForcastActual_first,
             'ForcastActual_second':obj_second.ForcastActual_second,
             'ForcastActual_third':this._protocoltableAPIResponse.KitsOut[k].KitsOut,
             'KO_MoMGrowth_zero' : obj_second.KO_MoMGrowth_zero,
             'KO_MoMGrowth_first':obj_second.KO_MoMGrowth_first,
             'KO_MoMGrowth_second':obj_second.KO_MoMGrowth_second,
             'KO_MoMGrowth_thir':'Kits-out MoM Growth:'+this._protocoltableAPIResponse.KitsOut[k].KO_MoMGrowth+'%',
            }
         }
        
          this._newProtocolsList.push(obj_third)
        }
        
       }

      this.rowData = this._newProtocolsList
      this.getPaertoGridPlot(); 
   
  
    }

  ngOnInit() {
  }

  getPaertoGridPlot(){
    this.columnDefs = [
      {
        groupId: 'leftPinId',       
        children: [
          {
            field: 'details',
            headerName: 'Link',
            width:110,
            // resizable: true,
            cellStyle: {color: '#212121', 'text-decoration':'underline','cursor':'pointer','font-size':'13px','height':'40px','text-underline-offset':'2px'},
            pinned: 'left'
             
          },
          {
            field: 'ProtocolName',
            width:130,
            // resizable: true,
            pinned: 'left',
            cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'}          
          },
          {
            field: 'CTProtocolID',
            width:130,
            // resizable: true,
            pinned: 'left',
            cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'},
            
          },
          {
            field: 'Sponsor',
            width: 110,
            pinned: 'left',
            // resizable: true,
            cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} 
          },
          {
            field: 'PFDate',
            width: 110,
            pinned: 'left',
            // resizable: true,
            valueFormatter: function (params) {
              if(params.value == 'NULL'){
                return ' '
              }else if(params.value == '0001-01-01T00:00:00'){
                return ''
              }else {
                return moment(params.value).format('MM/DD/YYYY');
              }
              
          },
         
            cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} 
          },
    
        ],
      },
      {
        groupId: 'actual',
        headerName: 'Actual',
        cellStyle: {textAlign: 'center'},
        headerClass: 'text-center',
        children: [
          { field: 'ForcastActual_zero', headerName: this.output[0],tooltipField: 'KO_MoMGrowth_zero',
          type: 'rightAligned',valueFormatter:
          '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
           cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'}},
         
        ],
      },
    {
    groupId: 'Forecast',
    
    headerName: 'Forecast',
    
    headerClass: 'text-center',
    type: 'rightAligned',
    cellClass: "grid-cell-centered",
    children: [
      { field: 'ForcastActual_first', headerName:this.output[1] ,  type: 'rightAligned',tooltipField: 'KO_MoMGrowth_first',sort: 'desc',valueFormatter:
      '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',tooltipComponentParams: { color: '#ececec' },
      cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'}},
      { field: 'ForcastActual_second' ,headerName:this.output[2], type: 'rightAligned',tooltipField: 'KO_MoMGrowth_second',valueFormatter:
      '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',tooltipClass: 'my-tooltip',
      cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'}},
      { field: 'ForcastActual_third',headerName:this.output[3], type: 'rightAligned',tooltipField: 'KO_MoMGrowth_thir',valueFormatter:
      '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
      cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} },
      
    ],
  },
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      flex: 1,
      autoHeight: true,
      filter: true,
      // enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      // tooltipComponent: 'customTooltip',
      
      // tooltipComponentFramework: CustomTooltip,
      //   tooltipValueGetter: (params: ITooltipParams) => params.data,
           
    };
    this.rowHeight = 40;
    this.paginationPageSize = 10;
    this.rowSelection = 'multiple';
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };
    this.sideBar = { toolPanels: [{ id: 'filters',
    labelDefault: 'Filters',
    labelKey: 'filters',
    iconKey: 'filter',
    toolPanel: 'agFiltersToolPanel',}] };
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
    this.domLayout = "autoHeight";
    this.sortingOrder = ['desc', 'asc', null];
    // this.tooltipShowDelay = 0;
    // this.frameworkComponents = { customTooltip: CustomTooltip };
   this.showLoading = false;
  }

  downloadexcel(){
    if(this.type =='KitsIn'){
      this.excelService.exportAsExcelFile(this._protocoltableAPIResponse.KitsIn,  'Kits-In');
    }else if(this.type =='KitsOut'){
      this.excelService.exportAsExcelFile(this._protocoltableAPIResponse.KitsOut,  'Kits-Out');
    }
    
  }

  infoDetails(content){
    // this._infoDisplay = true
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
      panelClass:['animate__animated','animate__slideInLeft','my-class'] ,
      disableClose: true,
      data: { message: this.info_dispay},
    });
    
        }
  ngOnDestroy() {
  if(this._sponsorName != undefined)
  this._sponsorName.unsubscribe();
  if(this._sponsorNameForLoader != undefined)
  this._sponsorNameForLoader.unsubscribe();
        }

  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }
  onRowClick(event) {
    console.log(event)
    if(event.value == 'details'){
      let navUrl: string = event.data.Link;
    //navUrl = navUrl.replace("..", "home");
    navUrl = navUrl.replace("../protocol", "protocols");
    
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl = currentAbsoluteUrl.substring(0, index);
    
    const url = this.router.serializeUrl(this.router.createUrlTree([navUrl]));
    window.open(baseUrl + url + "/" + btoa(event.data.Sponsor), "_blank");
    
    }
   
    
    }
    
}
