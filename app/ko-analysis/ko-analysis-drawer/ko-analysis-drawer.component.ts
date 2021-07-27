import { Component, OnInit ,AfterViewInit,OnDestroy,HostListener,
  ViewChild, ViewChildren, ElementRef,   QueryList} from '@angular/core';import { Subject,Subscription } from 'rxjs';
// import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import{DataService} from '../../../app/common/data.service'
import { DashboardService } from "../../dashboard/dashboard.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-ko-analysis-drawer',
  templateUrl: './ko-analysis-drawer.component.html',
  styleUrls: ['./ko-analysis-drawer.component.less']
})
export class KoAnalysisDrawerComponent implements OnInit {
  checkboxGroup: FormGroup;
  checkboxGroupTrialListType:FormGroup
  checkboxGroupProtocolName:FormGroup
  checkboxesSponsorFilter :any =[]
  checkboxesTrialFilter :any =[]
  checkboxesProtolName :any =[]
  _AllFilterList :any

  _tempSponsorList =[]
  _tempTrialTypeList =[]
  _tempProtocolNameList =[]

  _selectSponsorName :any
  
  _sponsorAPIResponse:any;

  flags = [];
  flagsTralType =[]
  outputCleanSponsor = [];
  outputTrialListType =[];
  outputProtocolName =[]
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:any;
  constructor(private dashService: DashboardService, private formBuilder: FormBuilder,private dataStoreServices : DataService) {
    this.checkboxesSponsorFilter =[]
    this.checkboxesTrialFilter  =[]
    this.checkboxesProtolName  =[]
    this._tempSponsorList =[]
    this._tempTrialTypeList =[]
    this._tempProtocolNameList =[]

  //   this.checkboxGroup = this.formBuilder.group({
  //     checkboxesSponsorFilter: new FormArray([])
  //   });
  //   // async orders
  //   of(this.getSponsor()).subscribe(checkboxesSponsorFilter => {
  //     this.checkboxesSponsorFilter = checkboxesSponsorFilter;
  //     this.addCheckboxesSponsor();
  //   });
  
  
  //  //-----------------To Generate the Trail Type-------------------------------
  
  //  this.checkboxGroupTrialListType = this.formBuilder.group({
  //   checkboxesTrialFilter: new FormArray([])
  // });
  // // async orders
  // of(this.getTrailType()).subscribe(checkboxesTrialFilter => {
  //   this.checkboxesTrialFilter = checkboxesTrialFilter;
  //   this.addCheckboxesTrailType();
  // });
  
  //    //-----------------To Generate the ProtocolName-------------------------------
  //    this.checkboxGroupProtocolName = this.formBuilder.group({
  //     checkboxesProtolName: new FormArray([])
  //   });
  //   // async orders
  //   of(this.getProtocolName()).subscribe(checkboxesProtolName => {
  //     this.checkboxesProtolName = checkboxesProtolName;
  //     this.addCheckboxesProtocolName();
  //   });
  
   }
  
  //  private addCheckboxesSponsor() {
  //   this.checkboxesSponsorFilter.map((o, i) => {
  //     const controlSponsor = new FormControl(i === -1); // if first item set to true, else false
  //     (this.checkboxGroup.controls.checkboxesSponsorFilter as FormArray).push(controlSponsor);
  //   });
  // }
  
  // private addCheckboxesTrailType() {
  //   this.checkboxesTrialFilter.map((o, i) => {
  //     const controlTrailType = new FormControl(i === -1); // if first item set to true, else false
  //     (this.checkboxGroupTrialListType.controls.checkboxesTrialFilter as FormArray).push(controlTrailType);
  //   });
  // }
  
  // addCheckboxesProtocolName(){
  //   this.checkboxesProtolName.map((o, i) => {
  //     const controlProtocolName = new FormControl(i === -1); // if first item set to true, else false
  //     (this.checkboxGroupProtocolName.controls.checkboxesProtolName as FormArray).push(controlProtocolName);
  //   });
  // }
  
  // getSponsor() {
  //   // this._AllFilterList = JSON.parse(localStorage.getItem('accelarateFilterRes'))
  //   // this.checkboxesSponsorFilter = JSON.parse(localStorage.getItem('disticntSponsorList'))
  //   this._AllFilterList = JSON.parse(this.dataStoreServices.get_All_list())
  //   this.checkboxesSponsorFilter = JSON.parse(this.dataStoreServices.get_sponsorList())
  //   return this.checkboxesSponsorFilter
  // }
  
  // getTrailType(){
  //   // this.checkboxesTrialFilter = JSON.parse(localStorage.getItem('disticntTrialListType'))
  //   this.checkboxesTrialFilter = JSON.parse(this.dataStoreServices.get_accerateList())
  //   this._tempTrialTypeList = this.checkboxesTrialFilter;
  //   return this.checkboxesTrialFilter
  // }
  
  // getProtocolName(){
  //   // this.checkboxesProtolName = JSON.parse(localStorage.getItem('disticntprotolColName'))
  //   this.checkboxesProtolName = JSON.parse(this.dataStoreServices.get_protocolNameList())
  // //  this.checkboxesProtolName = [{"protocolName":"54135419TRD2005"}]
  //   this._tempProtocolNameList = this.checkboxesProtolName;
  //   return this.checkboxesProtolName
  // }
  
  // getProtocolNameLoadMenu(){
  //   this.checkboxesProtolName =[]
  //   this._tempProtocolNameList =[]
  //   this.checkboxesProtolName = JSON.parse(localStorage.getItem('disticntprotolColName'))
  //   this._tempProtocolNameList = this.checkboxesProtolName;
  //   // this.checkboxesProtolName = this.checkboxesProtolName
  //   // this._tempProtocolNameList = this.checkboxesProtolName;
  //   return this.checkboxesProtolName
  // }
  // //-------------------------------------------------------------
  // onFilterChangeSponsor(){
  //   const selectedSponsorList = this.checkboxGroup.value.checkboxesSponsorFilter
  //     .map((v, i) => v ? this.checkboxesSponsorFilter[i].CleanSponsor : null)
  //     .filter(v => v !== null);
  //   console.log(selectedSponsorList);
  // }
  
  // onFilterChangeTrialListType(){
  //   const selectedTrialListList = this.checkboxGroupTrialListType.value.checkboxesTrialFilter
  //     .map((v, i) => v ? this.checkboxesTrialFilter[i].TrialListType : null)
  //     .filter(v => v !== null);
  //   console.log(selectedTrialListList);
  // }
  
  // onFilterChangeprotocolNameType(){
    
  //   const selectedprotocolNameList = this.checkboxGroupProtocolName.value.checkboxesProtolName
  //     .map((v, i) => v ? this.checkboxesProtolName[i].protocolName : null)
  //     .filter(v => v !== null);
  //   //   this.checkboxesProtolName =[]
  //   // this._tempProtocolNameList =[]
  //   console.log(selectedprotocolNameList);
  // }
  
  // loadProtocolName(){
  //   this.checkboxesProtolName =[]
  //   this.checkboxesProtolName =[]
  //   this.checkboxGroupProtocolName = this.formBuilder.group({
  //     checkboxesProtolName: new FormArray([])
  //   });
  //   of(this.getProtocolNameLoadMenu()).subscribe(checkboxesProtolName => {
  //     this.checkboxesProtolName = checkboxesProtolName;
  //     this.addCheckboxesProtocolName();
  //   });
  // }


  ngAfterViewInit() {

    this._sponsorAPIResponse = this.dashService.sponsorNameRestDashB.subscribe((response)=>{
      let sponsorName = response;
      if(sponsorName != ''){
       // this.isBooleanSideDrawer = 'true'

       this.dashService.getAccelarateFilterExternalSource().subscribe((response)=>{
      
        this.outputCleanSponsor =[]
        this.outputTrialListType =[]
        this.outputProtocolName =[]
        for (let i = 0; i <response.length; i++) {
          if (this.flags[response[i].CleanSponsor])
            continue;
          this.flags[response[i].CleanSponsor] = true;
        //  this.flagsTralType[response[i].TrialListType] = true;
          this.outputCleanSponsor.push({item_id: i,CleanSponsor:response[i].CleanSponsor})
          //this.outputTrialListType.push({TrialListType:response[i].TrialListType})
        } 
        for (let i = 0; i <response.length; i++) {
          if (this.flags[response[i].TrialListType])
            continue;
          this.flags[response[i].TrialListType] = true;
          this.outputTrialListType.push({TrialListType:response[i].TrialListType})
        } 
  
        for(let i= 0; i<response.length;i++){
          this.outputProtocolName.push({protocolName :response[i].ProtocolName })
        }


        this.dropdownList = this.outputCleanSponsor 


        this.dropdownSettings = {
          singleSelection: false,
          defaultOpen: true,
          idField: "item_id",
          textField: "CleanSponsor",
          selectAllText: "Select All",
          unSelectAllText: "UnSelect All",
          itemsShowLimit: 0,
          allowSearchFilter: true,
          maxHeight:120
         
        };
  
        // let sponsorNameList = JSON.stringify(this.outputTrialListType)
        // let trialTypeList = JSON.stringify(this.outputTrialListType)
        // let procolNameList = JSON.stringify(this.outputProtocolName)
        // let allList = JSON.stringify(response)
        // this.dataStoreServices.set_sponsorList(sponsorNameList)
        // this.dataStoreServices.set_accerateList(trialTypeList)
        // this.dataStoreServices.set_protocolNameList(procolNameList)
        // this.dataStoreServices.set_All_list(allList)
        
      })

      }
    })
  }

  ngOnInit() {
    
  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemDeSelect(item: any) {
    console.log(item);
  }

  //-----------------To Generate the sponsors-------------------------------
  
ngOnDestroy() {
 
  if(this._sponsorAPIResponse != undefined)
  this._sponsorAPIResponse.unsubscribe()
 
}
}
