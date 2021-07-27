import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Input, Output, EventEmitter } from "@angular/core";
import { DashboardService } from "../../dashboard/dashboard.service";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { Breakdown, BreakdownInt } from "src/app/common/common";
import { ActivatedRoute } from "@angular/router"
import { Observable, of, throwError } from "rxjs";
import { MatTableDataSource, MatTableModule } from '@angular/material';
import { DataService } from '../../common/data.service'
import { ExcelService } from '../../forcast-dashboard/excel.service';

@Component({
  selector: 'app-ko-demand-main',
  templateUrl: './ko-demand-main.component.html',
  styleUrls: ['./ko-demand-main.component.less']
})
export class KoDemandMainComponent implements OnInit,AfterViewInit,OnDestroy {
  echartsIntance: any;
  ko_demand_object: any;
  date :any =[];
  covid_carried_over : any =[];
  covid_new_sale : any =[]
  covid_total : any =[]
  non_covid_carried_over : any =[]
  non_covid_new_sale: any =[]
  non_covid_on_going : any =[]
  non_covid_total : any =[]
  demand_type_value : any
  demand_type : any = []
  ko_demand_type_select :any
  set_obj : any;
  ko_object:any
  ko_demand_type :any;
  select_filter_date : any =[]


  textDecorationTotal :any
  textColorTotal :any;
  textUnderLineTotal :any;
  textUnderLineColorTotal :any;
  textthicknessTotal:any;
  textoffsetTotal :any;

  textDecorationNewSale :any
  textColorNewSale :any;
  textUnderLineNewSale :any;
  textUnderLineColorNewSale :any;
  textthicknessNewSale:any;
  textoffsetNewSale :any;

  textDecorationOngoing :any
  textColorOngoing :any;
  textUnderLineOngoing :any;
  textUnderLineColorOngoing :any;
  textthicknessOngoing:any;
  textoffsetOngoing :any;

  textDecorationCarriedOver :any
  textColorCarriedOver :any;
  textUnderLineCarriedOver :any;
  textUnderLineColorCarriedOver :any;
  textthicknessCarriedOver:any;
  textoffsetCarriedOver :any;
  _sponsorName :any
  _sponsorNameResponse:any
  constructor(private dashService: DashboardService,private dataServices:  DataService) {
    // this.demand_type =["Carried Over", "New Sale", "On-going", "Total"]
    this.demand_type =["Total", "New Sale", "On-going", "Carried Over"]

    //-----------------------------------------------------------

    this.textDecorationTotal ='underline'
    this.textColorTotal = '#4ba4be';
    this.textUnderLineTotal ='underline'
    this.textUnderLineColorTotal = '#005d78'
    this.textthicknessTotal ='3px'
    this.textoffsetTotal = '6px'
 
    this.textDecorationNewSale ='none'
    this.textColorNewSale = '#000000'
    this.textUnderLineNewSale='none'
    this.textUnderLineColorNewSale ='none'
    this.textthicknessNewSale ='none'
    this.textoffsetNewSale ='none'
   
    this.textDecorationOngoing ='none'
    this.textColorOngoing = '#000000'
    this.textUnderLineOngoing='none'
    this.textUnderLineColorOngoing ='none'
    this.textthicknessOngoing ='none'
    this.textoffsetOngoing ='none'

    this.textDecorationCarriedOver ='none'
    this.textColorCarriedOver = '#000000'
    this.textUnderLineCarriedOver='none'
    this.textUnderLineColorCarriedOver ='none'
    this.textthicknessCarriedOver ='none'
    this.textoffsetCarriedOver ='none'

    //------------------------------------------------------------

    this.getKODemandDataData()
   }

  ngOnInit() {
  }
  getKODemandDataData() {

  this.demand_type_value = this.demand_type[0]  

  }

  ngAfterViewInit() {

    this._sponsorName = this.dashService.sponsorNameRestDashB.subscribe((response) =>{
      this._sponsorNameResponse = response;
     
      if(this._sponsorNameResponse != ''){
      //  this.showLoading = true;
        //this.getKOAnalysisData();
  
        this.textDecorationTotal ='underline'
        this.textColorTotal = '#4ba4be';
        this.textUnderLineTotal ='underline'
        this.textUnderLineColorTotal = '#005d78'
        this.textthicknessTotal ='3px'
        this.textoffsetTotal = '6px'
     
        this.textDecorationNewSale ='none'
        this.textColorNewSale = '#000000'
        this.textUnderLineNewSale='none'
        this.textUnderLineColorNewSale ='none'
        this.textthicknessNewSale ='none'
        this.textoffsetNewSale ='none'
       
        this.textDecorationOngoing ='none'
        this.textColorOngoing = '#000000'
        this.textUnderLineOngoing='none'
        this.textUnderLineColorOngoing ='none'
        this.textthicknessOngoing ='none'
        this.textoffsetOngoing ='none'
    
        this.textDecorationCarriedOver ='none'
        this.textColorCarriedOver = '#000000'
        this.textUnderLineCarriedOver='none'
        this.textUnderLineColorCarriedOver ='none'
        this.textthicknessCarriedOver ='none'
        this.textoffsetCarriedOver ='none'
  
  
    }
    });

  }

  DemandBreakDownTotal(){
    this.textDecorationTotal ='underline'
    this.textColorTotal = '#4ba4be';
    this.textUnderLineTotal ='underline'
    this.textUnderLineColorTotal = '#005d78'
    this.textthicknessTotal ='3px'
    this.textoffsetTotal = '6px'
 
    this.textDecorationNewSale ='none'
    this.textColorNewSale = '#000000'
    this.textUnderLineNewSale='none'
    this.textUnderLineColorNewSale ='none'
    this.textthicknessNewSale ='none'
    this.textoffsetNewSale ='none'
   
    this.textDecorationOngoing ='none'
    this.textColorOngoing = '#000000'
    this.textUnderLineOngoing='none'
    this.textUnderLineColorOngoing ='none'
    this.textthicknessOngoing ='none'
    this.textoffsetOngoing ='none'

    this.textDecorationCarriedOver ='none'
    this.textColorCarriedOver = '#000000'
    this.textUnderLineCarriedOver='none'
    this.textUnderLineColorCarriedOver ='none'
    this.textthicknessCarriedOver ='none'
    this.textoffsetCarriedOver ='none'

    this.demand_type_value ='Total'
    this.set_obj = this.dataServices.getKO_AnalysisObj()
    this.dataServices.set_ko_demand_type(this.demand_type_value)
    this.select_filter_date = this.dataServices.get_filter_date()
    this.ko_object = this.set_obj.koareachart
    this.ko_demand_type_select ={
      obj : this.ko_object,
      demand_type : this.demand_type_value,
      selectdate: this.select_filter_date
    }    
    this.dashService.ko_demand_function(this.ko_demand_type_select)
  }
  DemandBreakDownNewSales(){
    this.textDecorationTotal ='none'
    this.textColorTotal = '#000000';
    this.textUnderLineTotal ='none'
    this.textUnderLineColorTotal = '#005d78'
    this.textthicknessTotal ='none'
    this.textoffsetTotal = 'none'
 
    this.textDecorationNewSale ='underline'
    this.textColorNewSale = '#4ba4be'
    this.textUnderLineNewSale='underline'
    this.textUnderLineColorNewSale ='#005d78'
    this.textthicknessNewSale ='3px'
    this.textoffsetNewSale ='6px'
   
    this.textDecorationOngoing ='none'
    this.textColorOngoing = '#000000'
    this.textUnderLineOngoing='none'
    this.textUnderLineColorOngoing ='none'
    this.textthicknessOngoing ='none'
    this.textoffsetOngoing ='none'

    this.textDecorationCarriedOver ='none'
    this.textColorCarriedOver = '#000000'
    this.textUnderLineCarriedOver='none'
    this.textUnderLineColorCarriedOver ='none'
    this.textthicknessCarriedOver ='none'
    this.textoffsetCarriedOver ='none'

    this.demand_type_value ='New Sale'
    this.set_obj = this.dataServices.getKO_AnalysisObj()
    this.dataServices.set_ko_demand_type(this.demand_type_value)
    this.select_filter_date = this.dataServices.get_filter_date()
    this.ko_object = this.set_obj.koareachart
    this.ko_demand_type_select ={
      obj : this.ko_object,
      demand_type : this.demand_type_value,
      selectdate: this.select_filter_date
    }    
    this.dashService.ko_demand_function(this.ko_demand_type_select)
  }

  DemandBreakDownOngoing(){
    this.textDecorationTotal ='none'
    this.textColorTotal = '#000000';
    this.textUnderLineTotal ='none'
    this.textUnderLineColorTotal = '#005d78'
    this.textthicknessTotal ='none'
    this.textoffsetTotal = 'none'
 
    this.textDecorationNewSale ='none'
    this.textColorNewSale = '#000000'
    this.textUnderLineNewSale='none'
    this.textUnderLineColorNewSale ='none'
    this.textthicknessNewSale ='none'
    this.textoffsetNewSale ='none'
   
    this.textDecorationOngoing ='underline'
    this.textColorOngoing = '#4ba4be'
    this.textUnderLineOngoing='underline'
    this.textUnderLineColorOngoing ='#005d78'
    this.textthicknessOngoing ='3px'
    this.textoffsetOngoing ='6px'

    this.textDecorationCarriedOver ='none'
    this.textColorCarriedOver = '#000000'
    this.textUnderLineCarriedOver='none'
    this.textUnderLineColorCarriedOver ='none'
    this.textthicknessCarriedOver ='none'
    this.textoffsetCarriedOver ='none'

    this.demand_type_value ='On-going'
    this.set_obj = this.dataServices.getKO_AnalysisObj()
    this.dataServices.set_ko_demand_type(this.demand_type_value)
    this.select_filter_date = this.dataServices.get_filter_date()
    this.ko_object = this.set_obj.koareachart
    this.ko_demand_type_select ={
      obj : this.ko_object,
      demand_type : this.demand_type_value,
      selectdate: this.select_filter_date
    }    
    this.dashService.ko_demand_function(this.ko_demand_type_select)
  }

  DemandBreakDownnonCarriedOver(){
    this.textDecorationTotal ='none'
    this.textColorTotal = '#000000';
    this.textUnderLineTotal ='none'
    this.textUnderLineColorTotal = '#005d78'
    this.textthicknessTotal ='none'
    this.textoffsetTotal = 'none'
 
    this.textDecorationNewSale ='none'
    this.textColorNewSale = '#000000'
    this.textUnderLineNewSale='none'
    this.textUnderLineColorNewSale ='none'
    this.textthicknessNewSale ='none'
    this.textoffsetNewSale ='none'
   
    this.textDecorationOngoing ='none'
    this.textColorOngoing = '#000000'
    this.textUnderLineOngoing='none'
    this.textUnderLineColorOngoing ='none'
    this.textthicknessOngoing ='none'
    this.textoffsetOngoing ='none'

    this.textDecorationCarriedOver ='underline'
    this.textColorCarriedOver = '#4ba4be'
    this.textUnderLineCarriedOver='underline'
    this.textUnderLineColorCarriedOver ='#005d78'
    this.textthicknessCarriedOver ='3px'
    this.textoffsetCarriedOver ='6px'

    this.demand_type_value ='Carried Over'
    this.set_obj = this.dataServices.getKO_AnalysisObj()
    this.dataServices.set_ko_demand_type(this.demand_type_value)
    this.select_filter_date = this.dataServices.get_filter_date()
    this.ko_object = this.set_obj.koareachart
    this.ko_demand_type_select ={
      obj : this.ko_object,
      demand_type : this.demand_type_value,
      selectdate: this.select_filter_date
    }    
    this.dashService.ko_demand_function(this.ko_demand_type_select)

  }

  onPageDemandTypeChanged(){
    this.set_obj = this.dataServices.getKO_AnalysisObj()
    this.dataServices.set_ko_demand_type(this.demand_type_value)
    this.select_filter_date = this.dataServices.get_filter_date()
    this.ko_object = this.set_obj.koareachart
    this.ko_demand_type_select ={
      obj : this.ko_object,
      demand_type : this.demand_type_value,
      selectdate: this.select_filter_date
    }    
    this.dashService.ko_demand_function(this.ko_demand_type_select)
  }

  ngOnDestroy() {
    
      if(this._sponsorName != undefined)
      this._sponsorName.unsubscribe();
  }
}
