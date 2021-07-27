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
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-ko-analysis-main',
  templateUrl: './ko-analysis-main.component.html',
  styleUrls: ['./ko-analysis-main.component.less']
})
export class KoAnalysisMainComponent implements OnInit,AfterViewInit,OnDestroy {
  private _newSaleCarriedOverFilter : any
  private newSaleCarriedOverTotalValue : any
  selected_ship_date :any 
  selected_area_desease:any
  private area_filter : any;
  selectArea : any;
  selectShip:any;
  ko_analysis_filter:any
  ship_date_filter : any =[]
  _data_multiSelect_filter : any ;
  disabled = false;
  showFilter = false;
  dropdownSettings: any = {};
  myForm: FormGroup;
  select_date =[];
  set_obj : any
  ko_object:any
  ko_demand_type_select:any
  demandType:any

  textDecorationAll :any
  textColorAll :any;
  textUnderLineAll :any;
  textUnderLineColorAll :any;
  textthicknessAll:any;
  textoffsetAll :any;

  textDecorationCovid :any
  textColorCovid :any;
  textUnderLineCovid :any;
  textUnderLineColorCovid :any;
  textthicknessCovid:any;
  textoffsetCovid :any;

  textDecorationNonCovid :any
  textColorNonCovid :any;
  textUnderLineNonCovid :any;
  textUnderLineColorNonCovid :any;
  textthicknessNonCovid:any;
  textoffsetNonCovid :any;
  _sponsorName :any
  _sponsorNameResponse:any

  constructor(private dashService: DashboardService,
   private route: ActivatedRoute,private dataServices:  DataService) {
   this.textDecorationAll ='underline'
   this.textColorAll = '#4ba4be';
   this.textUnderLineAll ='underline'
   this.textUnderLineColorAll = '#005d78'
   this.textthicknessAll ='3px'
   this.textoffsetAll = '6px'

   this.textDecorationCovid ='none'
   this.textColorCovid = '#000000'
   this.textUnderLineCovid='none'
   this.textUnderLineColorCovid ='none'
   this.textthicknessCovid ='none'
   this.textoffsetCovid ='none'
  
   this.textDecorationNonCovid ='none'
   this.textColorNonCovid = '#000000'
   this.textUnderLineNonCovid='none'
   this.textUnderLineColorNonCovid ='none'
   this.textthicknessNonCovid ='none'
   this.textoffsetNonCovid ='none'
     }

  ngOnInit() {
  }

  ngAfterViewInit() {
    
  this.area_filter =["All","Covid","Non-Covid"];

  this._sponsorName = this.dashService.sponsorNameRestDashB.subscribe((response) =>{
    this._sponsorNameResponse = response;
   
    if(this._sponsorNameResponse != ''){
    //  this.showLoading = true;
      //this.getKOAnalysisData();

      this.textDecorationAll ='underline'
      this.textColorAll = '#4ba4be';
      this.textUnderLineAll ='underline'
      this.textUnderLineColorAll = '#005d78'
      this.textthicknessAll ='3px'
      this.textoffsetAll = '6px'
   
      this.textDecorationCovid ='none'
      this.textColorCovid = '#000000'
      this.textUnderLineCovid='none'
      this.textUnderLineColorCovid ='none'
      this.textthicknessCovid ='none'
      this.textoffsetCovid ='none'
     
      this.textDecorationNonCovid ='none'
      this.textColorNonCovid = '#000000'
      this.textUnderLineNonCovid='none'
      this.textUnderLineColorNonCovid ='none'
      this.textthicknessNonCovid ='none'
      this.textoffsetNonCovid ='none'  


  }
  });

 
   this._newSaleCarriedOverFilter = this.dashService.new_sale_carried_over.subscribe((response) =>{
       this.newSaleCarriedOverTotalValue = response;      
       if(this.newSaleCarriedOverTotalValue.ship_date_filter != undefined){
        this.ship_date_filter =[];
        this.ship_date_filter = this.newSaleCarriedOverTotalValue.ship_date_filter;
        this._data_multiSelect_filter = this.newSaleCarriedOverTotalValue._dataMultiselectFilter
        this.selected_ship_date = this.ship_date_filter[0]
        this.selected_area_desease = this.area_filter[0]
       }
       this.dropdownSettings = {
        singleSelection: false,
        idField: "id",
        textField: "item_text",
        selectAllText: "select All",
        unSelectAllText: "Unselect All",
        // "enableCheckAll": false,
        closeDropDownOnSelection: false,
        showSelectedItemsAtTop: false,
        defaultOpen: false,
        limitSelection: -1,
        itemsShowLimit: 0,
        allowSearchFilter: this.showFilter
      };
  
   })   
  }

  DemandBreakDownAll(){
    this.textDecorationAll ='underline'
    this.textColorAll = '#4ba4be';
    this.textUnderLineAll ='underline'
    this.textUnderLineColorAll = '#005d78'
    this.textthicknessAll ='3px'
    this.textoffsetAll = '6px'
 
    this.textDecorationCovid ='none'
    this.textColorCovid = '#000000'
    this.textUnderLineCovid='none'
    this.textUnderLineColorCovid ='none'
    this.textthicknessCovid ='none'
    this.textoffsetCovid ='none'
   
    this.textDecorationNonCovid ='none'
    this.textColorNonCovid = '#000000'
    this.textUnderLineNonCovid='none'
    this.textUnderLineColorNonCovid ='none'
    this.textthicknessNonCovid ='none'
    this.textoffsetNonCovid ='none'
    
    this.selectArea = 'All'
    this.selectShip = this.selected_ship_date
    let ko_analysis_filter ={
      selectArea : this.selectArea,
      selectShip: this.select_date
    }
    this.dashService.ship_desease_filter(ko_analysis_filter)

  }

  DemandBreakDownCovid(){
    this.textDecorationAll ='none'
    this.textColorAll = '#000000';
    this.textUnderLineAll ='none'
    this.textUnderLineColorAll = 'none'
    this.textthicknessAll ='none'
    this.textoffsetAll = 'none'
 
    this.textDecorationCovid ='underline'
    this.textColorCovid = '#4ba4be'
    this.textUnderLineCovid='underline'
    this.textUnderLineColorCovid ='#005d78'
    this.textthicknessCovid ='3px'
    this.textoffsetCovid ='6px'
   
    this.textDecorationNonCovid ='none'
    this.textColorNonCovid = '#000000'
    this.textUnderLineNonCovid='none'
    this.textUnderLineColorNonCovid ='none'
    this.textthicknessNonCovid ='none'
    this.textoffsetNonCovid ='none'

    this.selectArea = 'Covid'
    this.selectShip = this.selected_ship_date
    let ko_analysis_filter ={
      selectArea : this.selectArea,
      selectShip: this.select_date
    }
    this.dashService.ship_desease_filter(ko_analysis_filter)
  }

  DemandBreakDownnonCovid(){
    this.textDecorationAll ='none'
    this.textColorAll = '#000000';
    this.textUnderLineAll ='underline'
    this.textUnderLineColorAll = 'none'
    this.textthicknessAll ='none'
    this.textoffsetAll = 'none'
 
    this.textDecorationCovid ='none'
    this.textColorCovid = '#000000'
    this.textUnderLineCovid='none'
    this.textUnderLineColorCovid ='none'
    this.textthicknessCovid ='none'
    this.textoffsetCovid ='none'
   
    this.textDecorationNonCovid ='underline'
    this.textColorNonCovid = '#4ba4be'
    this.textUnderLineNonCovid='underline'
    this.textUnderLineColorNonCovid ='#005d78'
    this.textthicknessNonCovid ='3px'
    this.textoffsetNonCovid ='6px'

    this.selectArea = 'NonCovid'
    this.selectShip = this.selected_ship_date
    let ko_analysis_filter ={
      selectArea : this.selectArea,
      selectShip: this.select_date
    }
    this.dashService.ship_desease_filter(ko_analysis_filter)
  }

  onPageAreaDeseasChanged(){
    if(this.selected_area_desease == 'Non-Covid'){
      this.selectArea = 'NonCovid'
    }else{
      this.selectArea = this.selected_area_desease
    }
    // this.selectArea = this.selected_area_desease
    this.selectShip = this.selected_ship_date
    let ko_analysis_filter ={
      selectArea : this.selectArea,
      selectShip: this.select_date
    }
    this.dashService.ship_desease_filter(ko_analysis_filter)

    
    console.log('@@@'+this.selectArea  +  this.selectShip )
  }
  onItemSelect(item: any) {
    // this.selectArea = this.selected_area_desease
    if(this.selected_area_desease == 'Non-Covid'){
      this.selectArea = 'NonCovid'
    }else{
      this.selectArea = this.selected_area_desease
    }
    this.select_date.push(item)
    let ko_analysis_filter ={
      selectArea : this.selectArea,
      selectShip: this.select_date
    }
    this.dashService.ship_desease_filter(ko_analysis_filter)

   // --Ko-Demand type object call -----------
    this.set_obj = this.dataServices.getKO_AnalysisObj()
    this.demandType = this.dataServices.get_ko_demand_type()
    if(this.demandType == undefined || this.demandType ==''){
      this.demandType ='Carried Over'
    }
    this.ko_object = this.set_obj.koareachart
    this.ko_demand_type_select ={
      obj : this.ko_object,
      demand_type : this.demandType,
      selectdate: this.select_date
    }  
    this.dataServices.set_filter_date(this.select_date)  
    this.dashService.ko_demand_function(this.ko_demand_type_select)
    ///----------------------------------
    
  }
  OnItemDeSelect(item: any) {
    // this.select_date =[]
    //this.select_date.splice(item.id,1)

    for(var i = 0; i < this.select_date.length; i++) {
      if(this.select_date[i].id == item.id) {
        this.select_date.splice(i, 1);
          break;
      }
  }

    // this.selectArea = this.selected_area_desease
    if(this.selected_area_desease == 'Non-Covid'){
      this.selectArea = 'NonCovid'
    }else{
      this.selectArea = this.selected_area_desease
    }
    let ko_analysis_filter ={
      selectArea : this.selectArea,
      selectShip: this.select_date
      }
      this.dashService.ship_desease_filter(ko_analysis_filter)

    //-------------------------------  
    this.set_obj = this.dataServices.getKO_AnalysisObj()
    this.demandType = this.dataServices.get_ko_demand_type()
    if(this.demandType == undefined || this.demandType ==''){
      this.demandType ='Carried Over'
    }
    this.ko_object = this.set_obj.koareachart
    this.ko_demand_type_select ={
      obj : this.ko_object,
      demand_type : this.demandType,
      selectdate: this.select_date
    }   
    this.dataServices.set_filter_date(this.select_date)   
    this.dashService.ko_demand_function(this.ko_demand_type_select)

   
  }
  onSelectAll(items: any) {
    // this.selectArea = this.selected_area_desease
    if(this.selected_area_desease == 'Non-Covid'){
      this.selectArea = 'NonCovid'
    }else{
      this.selectArea = this.selected_area_desease
    }
    this.select_date =[]
    for(let i=0;i<items.length;i++){
      this.select_date.push(items[i])
    }

    
    let ko_analysis_filter ={
      selectArea : this.selectArea,
      selectShip: this.select_date
    }
    this.dashService.ship_desease_filter(ko_analysis_filter)

    //-------

    this.set_obj = this.dataServices.getKO_AnalysisObj()
    this.demandType = this.dataServices.get_ko_demand_type()
    if(this.demandType == undefined || this.demandType ==''){
      this.demandType ='Carried Over'
    }
    this.ko_object = this.set_obj.koareachart
    this.ko_demand_type_select ={
      obj : this.ko_object,
      demand_type : this.demandType,
      selectdate: this.select_date
    } 
    this.dataServices.set_filter_date(this.select_date)    
   this.dashService.ko_demand_function(this.ko_demand_type_select)

    //-----------------
  }
  onDeSelectAll(items: any) {
    
    // this.selectArea = this.selected_area_desease
    if(this.selected_area_desease == 'Non-Covid'){
      this.selectArea = 'NonCovid'
    }else{
      this.selectArea = this.selected_area_desease
    }
    this.select_date =[]
    let ko_analysis_filter ={
      selectArea : this.selectArea,
      selectShip: ''
      }
      this.dashService.ship_desease_filter(ko_analysis_filter)

    this.set_obj = this.dataServices.getKO_AnalysisObj()
    this.demandType = this.dataServices.get_ko_demand_type()
    if(this.demandType == undefined || this.demandType ==''){
      this.demandType ='Carried Over'
    }
    this.ko_object = this.set_obj.koareachart
    this.ko_demand_type_select ={
      obj : this.ko_object,
      demand_type : this.demandType,
      selectdate: this.select_date
    }   
    this.dataServices.set_filter_date(this.select_date) 
    this.dashService.ko_demand_function(this.ko_demand_type_select)
  }


  ngOnDestroy() {
    if (this._newSaleCarriedOverFilter != undefined)
      this._newSaleCarriedOverFilter.unsubscribe();
      if(this._sponsorName != undefined)
      this._sponsorName.unsubscribe();
  }
}
