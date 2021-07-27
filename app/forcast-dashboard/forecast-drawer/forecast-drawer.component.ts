import { Component, OnInit ,AfterViewInit,OnDestroy,HostListener,
  ViewChild, ViewChildren, ElementRef,EventEmitter, Output,   QueryList} from '@angular/core';
  import { Subject,Subscription } from 'rxjs';
// import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import{DataService} from '../../../app/common/data.service'
import { DashboardService } from "../../dashboard/dashboard.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-forecast-drawer',
  templateUrl: './forecast-drawer.component.html',
  styleUrls: ['./forecast-drawer.component.less']
})
export class ForecastDrawerComponent implements OnInit {
  @Output() drawer: EventEmitter<any> = new EventEmitter();

  _selectSponsorName :any  
  _sponsorAPIResponse:any;
  
  flagsTralType =[]
  outputCleanSponsor = [];
  outputTrialListType =[];
  outputProtocolName =[]
  dropdownList = [];  
  dropdownSettingsForSponsor={};
  dropdownSettingsForTrailType ={};
  dropdownSettingsForProtocolName ={};
  dropdownSettingsForAllList :any;
  _sponsorList :any =[];
  
  _tempAllFilterList :any =[]
  _trailTypeList :any =[]
  _protocolNameList :any =[]
  _ctProtocolIDForSponsorList =[]
  
  _sponsorListForForecastingDashboard =[]
  _tempProtocolNameForCasding =[]
  _tempSaveCasdingProtocolNameFilter =[]
  _tempSponsorListForCasding =[]
  _tempTralListForCasding =[]
  dropDownSelect = false;

  outputCleanSponsorForcascadingFilterForProtocolName=[]

  IsCascadeTrailType :boolean = false
  IsCascadeSponsorName :boolean = false;
  IsCasecadeProtocolName :boolean = false;

  _tempCIProtocolIDForTrailType =[]
  _tempCIProtocolIDForSponsor =[]
  _tempCIProtocolIDForProtocolName =[]
  _tempForAllSponsor =[]
  _selectedType =[]

  _IsTrialTypeClick : boolean = false
  _IsSponsorTypeClick :boolean = false
  _IsProtocolNameClick :boolean = false

  //----------------------------------------------------------------
  accelarateFilter :any
  outputCleanSponsorForEachTimeValueLoad = [];
  outputTrialListTypeForEachTimeValueLoad =[];
  outputProtocolNameForEachTimeValueLoad =[]
  _ctProtocolID :any
  _tempSponsorList =[]
  _tempTrialTypeList =[]
  _tempProtocolNameList =[]
  flags = [];
  selectedItemsTrailList = [];
  selectedItemsSponsorList = [];
  selectedItemsProtocolNameList =[]
  _AllFilterList :any =[]
  _selectedFilterClickrelationship:any =['Parent','Child','']
  _selectedItemsStore :any
  _selectedItemsStoreForTrailType:any
  _selectedItemsStoreForSponsor :any
  _selectedItemsStoreForProtocolName :any
  _selectTypeForSponsor :any;
  _selectedTypeForTrail:any;
  _selectTypeForProtocolName :any
  _temSponsorList =[]
  _tempProtolName =[]
  _tempStoreTrailType =[]
  _tempStoreSponsorName =[]
  _tempStoreProtocolName =[]
  _tempMultilevelFilterForSponsor:any =[]
  _tempMultilevelFilterForTrailType :any =[]
  _tempMultilevelFilterForProtocolname :any =[]
  Trailtype :any;
  sponsorType :any;
  protocolNameType :any;
  _tempCTProtoColIDLength :any;
 //------------------------------------------------------------------
 expandEDTrailType : boolean= false;
 expandEDSponsorTYpe : boolean= false;
 expandEDProtocolTYpe:boolean=false;
  errorMessage :any;
  _stopPropogateResponse :any
  _selectFilterLength:any
  constructor(private dashService: DashboardService, private formBuilder: FormBuilder,private dataStoreServices : DataService) { 
    this._ctProtocolID =[]
    this._tempSponsorList =[]
    this._tempTrialTypeList =[]
    this._tempProtocolNameList =[]
    this._AllFilterList =[]
    this.expandEDTrailType = false
    this.expandEDSponsorTYpe = false
    this.expandEDProtocolTYpe=false
  }
 ngOnInit() {

  }
  ngAfterViewInit() {
    this._sponsorAPIResponse = this.dashService.accerateFilter.subscribe((response)=>{
      this.accelarateFilter= response;
      if(this.accelarateFilter == 'true'){
        this.dashService.getAccelarateFilterExternalSource().subscribe((response)=>{
        this._selectedItemsStore =[[[],[]],[[],[]],[[],[]]]
        this._ctProtocolID =[]
        this._tempSponsorList =[]
        this._tempTrialTypeList =[]
        this._tempProtocolNameList =[]

        this._tempStoreTrailType =[]
        this._tempStoreSponsorName =[]
        this._tempStoreProtocolName =[]

        this.outputCleanSponsorForEachTimeValueLoad =[]
        this.outputTrialListTypeForEachTimeValueLoad =[]
        this.outputProtocolNameForEachTimeValueLoad =[]

        this.selectedItemsTrailList = [];
        this.selectedItemsSponsorList = [];
        this.selectedItemsProtocolNameList =[]

        for (let i = 0; i <response.length; i++) {
          if (this.flags[response[i].TrialListType])
            continue;
          this.flags[response[i].TrialListType] = true;
          this.outputTrialListTypeForEachTimeValueLoad.push({item_id: i,TrialListType:response[i].TrialListType})
        } 

        this._trailTypeList = this.outputTrialListTypeForEachTimeValueLoad 
        this._tempTrialTypeList = this._trailTypeList
        this._tempStoreTrailType = this._trailTypeList
        for (let i = 0; i <response.length; i++) {
          if (this.flags[response[i].CleanSponsor])
          continue;
          this.flags[response[i].CleanSponsor] = true;
          this.outputCleanSponsorForEachTimeValueLoad.push({item_id: i,CleanSponsor:response[i].CleanSponsor})
         } 
        this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad 
        this._tempSponsorList = this._sponsorList
        this._tempStoreSponsorName = this._sponsorList
        for(let i= 0; i<response.length;i++){
          this.outputProtocolNameForEachTimeValueLoad.push({item_id: i,protocolName :response[i].ProtocolName })
        }
        this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad 
        this._tempProtocolNameList = this._protocolNameList
        this._tempStoreProtocolName = this._protocolNameList
        this._AllFilterList = response;
        this._tempCTProtoColIDLength = response.length

        this.selectedItemsTrailList = this._trailTypeList;
        this.selectedItemsSponsorList = this._sponsorList;
        this.selectedItemsProtocolNameList =this._protocolNameList

        this.dropdownSettingsForSponsor = {
          singleSelection: false,
          idField: "item_id",
          textField: "CleanSponsor",
          selectAllText: "All",
          unSelectAllText: "Unselect All",
          itemsShowLimit: 0,
          allowSearchFilter: true,
          maxHeight:160,
          defaultOpen: "true",
        };
        
        this.dropdownSettingsForTrailType = {
          singleSelection: false,
          defaultOpen: true,
          idField: "item_id",
          textField: "TrialListType",
          selectAllText: "All",
          unSelectAllText: "Unselect All",
          itemsShowLimit: 0,
          allowSearchFilter: true,
          maxHeight:150         
        };        
      
        this.dropdownSettingsForProtocolName = {
          singleSelection: false,
          defaultOpen: true,
          idField: "item_id",
          textField: "protocolName",
          selectAllText: "All",
          unSelectAllText: "Unselect All",
          itemsShowLimit: 0,
          allowSearchFilter: true,
          maxHeight:150         
        };
       
        })
      }
    })  

    this._stopPropogateResponse = this.dashService.stopPropogateCollapge.subscribe((response)=>{
        if(response == 'true'){
          this.openFiltersItems()
        }
    })
  }
  //------------------------------------Trail List Event-------------------------------------------------------------
  onItemSelectForTrailList(item){
    this.selectTrailItems();
  }
  onItemALLSelectForTrailList(items){
   this.selectedItemsTrailList = items
   this.selectTrailItems();
     
  }
  deselletItemALLForTrailList(item){
    this.desellectTrailItems();
  }
  onItemDeSelectForTrailList(item){
   this.desellectTrailItems();
  }
  //--------------------------------------Sponsor List Change Event------------------------------------------------------------
  onItemSelectForSponsorList(item){
      this.selectSponsorItems();  
  }
  onItemALLSelectForSponsorList(items){
    this.selectedItemsSponsorList = items
    this.selectSponsorItems()
  
  }
  deselletItemALLForSponsorList(item){
    this.deSelectedSponsorItems();
  }
  onItemDeSelectForForSponsorList(item){
    this.deSelectedSponsorItems()
  }
  //-----------------------------------Protocol Name Change Event--------------------------------------------------------------   
  onItemSelectForProtocolNameList(){
    this.selectProtocolName();    
  }
  onItemALLSelectForProtocolNameList(items){    
    this.selectedItemsProtocolNameList = items;
    this.selectProtocolName();   
  }
  deselletItemALLForProtocolNameList(item){
    this.deselectProtocolName()
  }
  onItemDeSelectForProtocolNameList(item){
    this.deselectProtocolName()
  }
  //------------------------------------TrailList List Select And Desellect------------------------------------
  selectTrailItems(){
    if(this.selectedItemsTrailList.length>0){
      var trailItems = []
      for(let i= 0;i<this.selectedItemsTrailList.length;i++){
       trailItems.push(this.selectedItemsTrailList[i].TrialListType)
      }
      if(this._selectedItemsStoreForSponsor == null || this._selectedItemsStoreForSponsor == '' || this._selectedItemsStoreForSponsor == undefined
      || this._selectedItemsStoreForProtocolName == null || this._selectedItemsStoreForProtocolName == '' || this._selectedItemsStoreForProtocolName == undefined) 
      {
        this._selectedItemsStoreForSponsor =[[],[]]
        this._selectedItemsStoreForProtocolName =[[],[]]
      }

     if(this._selectedItemsStore[0][1] == ''){      
        this._selectedTypeForTrail= this._selectedFilterClickrelationship[0];
        this._selectedItemsStoreForTrailType = [trailItems,[this._selectedFilterClickrelationship[0]]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
        this._selectedFilterClickrelationship.splice(0,1)
      }else{
        this._selectedItemsStoreForTrailType = [trailItems,[this._selectedTypeForTrail]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
      }
    }
    this.getCascadingFiltersItemTrailType();
  }
  desellectTrailItems(){
    if(this.selectedItemsTrailList.length>0){
      var trailItems = []
      for(let i= 0;i<this.selectedItemsTrailList.length;i++){
       trailItems.push(this.selectedItemsTrailList[i].TrialListType)
      }
      if(this._selectedItemsStoreForSponsor == null || this._selectedItemsStoreForSponsor == '' || this._selectedItemsStoreForSponsor == undefined
      || this._selectedItemsStoreForProtocolName == null || this._selectedItemsStoreForProtocolName == '' || this._selectedItemsStoreForProtocolName == undefined) 
      {
        this._selectedItemsStoreForSponsor =[[],[]]
        this._selectedItemsStoreForProtocolName =[[],[]]
      }

     if(this._selectedItemsStore[0][1] == ''){      
        this._selectedTypeForTrail= this._selectedFilterClickrelationship[0];
        this._selectedItemsStoreForTrailType = [trailItems,[this._selectedFilterClickrelationship[0]]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
        this._selectedFilterClickrelationship.splice(0,1)
      }else{
        this._selectedItemsStoreForTrailType = [trailItems,[this._selectedTypeForTrail]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
      }

      this.getCascadingFiltersItemTrailType();

    }else if(this.selectedItemsTrailList.length==0){
      console.log(this._selectedItemsStore[0][1])
      if(this._selectedItemsStore[0][1] == 'Parent'){
        this._selectedFilterClickrelationship=[]
        this._selectedFilterClickrelationship =['Parent','Child','']
        this._selectedItemsStoreForTrailType =[[],[]]
        this._selectedItemsStoreForSponsor =[[],[]]
        this._selectedItemsStoreForProtocolName =[[],[]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
        this._sponsorList =[]
        this._protocolNameList=[];
        this.selectedItemsTrailList=[] 
        this.selectedItemsSponsorList=[]
        this.selectedItemsProtocolNameList =[]
        
        this._trailTypeList= this._tempStoreTrailType
        this._sponsorList = this._tempStoreSponsorName
        this._protocolNameList = this._tempStoreProtocolName;
      }else if(this._selectedItemsStore[0][1] == 'Child'){
        this._selectedFilterClickrelationship=[]
        this._selectedItemsStoreForTrailType = [[],[]]
        this._selectedItemsStore =[]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
        this._selectedFilterClickrelationship =['Child','']
       
       if(this.sponsorType == 'Parent'){
       this.getCascadingFiltersItemSponsirName()
       console.log('@@@@@@@@')
       }else if(this.protocolNameType == 'Parent'){
       this.getCascadingFiltersItemProtocolName();
       console.log('@@@@@@@@')
       }
       console.log(this._selectedItemsStore[0][1])

      }
    }
  }
  //------------------------------------Sponsor List Select And Desellect------------------------------------
  selectSponsorItems(){
    if(this.selectedItemsSponsorList.length >0){
      var sponsorItems = []
      for(let i= 0;i<this.selectedItemsSponsorList.length;i++){
        sponsorItems.push(this.selectedItemsSponsorList[i].CleanSponsor)
      }
      if(this._selectedItemsStoreForTrailType == null || this._selectedItemsStoreForTrailType == '' || this._selectedItemsStoreForTrailType == undefined
      || this._selectedItemsStoreForProtocolName == null || this._selectedItemsStoreForProtocolName == '' || this._selectedItemsStoreForProtocolName == undefined) 
      {
        this._selectedItemsStoreForTrailType =[[],[]]
        this._selectedItemsStoreForProtocolName =[[],[]]
      }
      if(this._selectedItemsStore[1][0] == ''){
        this._selectTypeForSponsor =this._selectedFilterClickrelationship[0];
        this._selectedItemsStoreForSponsor= [sponsorItems,[this._selectedFilterClickrelationship[0]]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
        this._selectedFilterClickrelationship.splice(0,1)
      }else{
        this._selectedItemsStoreForSponsor= [sponsorItems,[this._selectTypeForSponsor]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
      }  
    }
    this.getCascadingFiltersItemSponsirName()
  }
  deSelectedSponsorItems(){
  if(this.selectedItemsSponsorList.length >0){
      var sponsorItems = []
      for(let i= 0;i<this.selectedItemsSponsorList.length;i++){
        sponsorItems.push(this.selectedItemsSponsorList[i].CleanSponsor)
      }
      if(this._selectedItemsStoreForTrailType == null || this._selectedItemsStoreForTrailType == '' || this._selectedItemsStoreForTrailType == undefined
      || this._selectedItemsStoreForProtocolName == null || this._selectedItemsStoreForProtocolName == '' || this._selectedItemsStoreForProtocolName == undefined) 
      {
        this._selectedItemsStoreForTrailType =[[],[]]
        this._selectedItemsStoreForProtocolName =[[],[]]
      }
      if(this._selectedItemsStore[1][0] == ''){
        this._selectTypeForSponsor =this._selectedFilterClickrelationship[0];
        this._selectedItemsStoreForSponsor= [sponsorItems,[this._selectedFilterClickrelationship[0]]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
        this._selectedFilterClickrelationship.splice(0,1)
      }else{
        this._selectedItemsStoreForSponsor= [sponsorItems,[this._selectTypeForSponsor]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
      }  
      this.getCascadingFiltersItemSponsirName()
    }else if(this.selectedItemsSponsorList.length==0){
      console.log(this._selectedItemsStore[1][1])
      if(this._selectedItemsStore[1][1] == 'Parent'){
        this._selectedFilterClickrelationship=[]
        this._selectedFilterClickrelationship =['Parent','Child','']
        this._selectedItemsStoreForTrailType =[[],[]]
        this._selectedItemsStoreForSponsor =[[],[]]
        this._selectedItemsStoreForProtocolName =[[],[]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
        this._sponsorList =[]
        this._protocolNameList=[];
        this.selectedItemsTrailList=[] 
        this.selectedItemsSponsorList=[]
        this.selectedItemsProtocolNameList =[]
        
        this._trailTypeList= this._tempStoreTrailType
        this._sponsorList = this._tempStoreSponsorName
        this._protocolNameList = this._tempStoreProtocolName;
      }else if(this._selectedItemsStore[1][1] == 'Child'){
        this._selectedFilterClickrelationship=[]
        this._selectedItemsStoreForSponsor = [[],[]]
        this._selectedItemsStore =[]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
        this._selectedFilterClickrelationship =['Child','']
       
       if(this.Trailtype == 'Parent'){
       this.getCascadingFiltersItemTrailType()
       console.log('@@@@@@@@')
       }else if(this.protocolNameType == 'Parent'){
       this.getCascadingFiltersItemProtocolName();
       console.log('@@@@@@@@')
       }
       console.log(this._selectedItemsStore[0][1])

      }
    }
    
  }
  //------------------------------------Sponsor List Select And Desellect------------------------------------
  selectProtocolName(){
    if(this.selectedItemsProtocolNameList.length >0){
      var protocolItems = []
      for(let i= 0;i<this.selectedItemsProtocolNameList.length;i++){
        protocolItems.push(this.selectedItemsProtocolNameList[i].protocolName)
      }

      if(this._selectedItemsStoreForTrailType == null || this._selectedItemsStoreForTrailType == '' || this._selectedItemsStoreForTrailType == undefined
          || this._selectedItemsStoreForSponsor == null || this._selectedItemsStoreForSponsor == '' || this._selectedItemsStoreForSponsor == undefined) 
          {
            this._selectedItemsStoreForTrailType =[[],[]]
            this._selectedItemsStoreForSponsor =[[],[]]
          }

      if(this._selectedItemsStore[2][1] == ''){
        this._selectTypeForProtocolName =this._selectedFilterClickrelationship[0]
        this._selectedItemsStoreForProtocolName = [protocolItems,[this._selectedFilterClickrelationship[0]]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
        this._selectedFilterClickrelationship.splice(0,1)
      }else{
        this._selectedItemsStoreForProtocolName = [protocolItems,[this._selectTypeForProtocolName]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
      }  
    }
    this.getCascadingFiltersItemProtocolName();
  }  
  deselectProtocolName(){
    if(this.selectedItemsProtocolNameList.length >0){
      var protocolItems = []
      for(let i= 0;i<this.selectedItemsProtocolNameList.length;i++){
        protocolItems.push(this.selectedItemsProtocolNameList[i].protocolName)
      }

      if(this._selectedItemsStoreForTrailType == null || this._selectedItemsStoreForTrailType == '' || this._selectedItemsStoreForTrailType == undefined
          || this._selectedItemsStoreForSponsor == null || this._selectedItemsStoreForSponsor == '' || this._selectedItemsStoreForSponsor == undefined) 
          {
            this._selectedItemsStoreForTrailType =[[],[]]
            this._selectedItemsStoreForSponsor =[[],[]]
          }

      if(this._selectedItemsStore[2][1] == ''){
        this._selectTypeForProtocolName =this._selectedFilterClickrelationship[0]
        this._selectedItemsStoreForProtocolName = [protocolItems,[this._selectedFilterClickrelationship[0]]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
        this._selectedFilterClickrelationship.splice(0,1)
      }else{
        this._selectedItemsStoreForProtocolName = [protocolItems,[this._selectTypeForProtocolName]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
      }  
      this.getCascadingFiltersItemProtocolName();
    }else if(this.selectedItemsProtocolNameList.length ==0){
      console.log(this._selectedItemsStore[1][1])
      if(this._selectedItemsStore[2][1] == 'Parent'){
        this._selectedFilterClickrelationship=[]
        this._selectedFilterClickrelationship =['Parent','Child','']
        this._selectedItemsStoreForTrailType =[[],[]]
        this._selectedItemsStoreForSponsor =[[],[]]
        this._selectedItemsStoreForProtocolName =[[],[]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
        this._sponsorList =[]
        this._protocolNameList=[];
        this.selectedItemsTrailList=[] 
        this.selectedItemsSponsorList=[]
        this.selectedItemsProtocolNameList =[]
        
        this._trailTypeList= this._tempStoreTrailType
        this._sponsorList = this._tempStoreSponsorName
        this._protocolNameList = this._tempStoreProtocolName;
      }else if(this._selectedItemsStore[2][1] == 'Child'){
        this._selectedFilterClickrelationship=[]
        this._selectedItemsStoreForProtocolName = [[],[]]
        this._selectedItemsStore =[]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
        this._selectedFilterClickrelationship =['Child','']
       
       if(this.Trailtype == 'Parent'){
       this.getCascadingFiltersItemTrailType()
       }else if(this.sponsorType == 'Parent'){
       this.getCascadingFiltersItemSponsirName();
       }
      }
    }    
  }
  //--------------------------------------------------------------------------------------------
  getCascadingFiltersItemTrailType(){
     
     this.Trailtype = this._selectedItemsStore[0][1]
     this.sponsorType = this._selectedItemsStore[1][1]
     this.protocolNameType = this._selectedItemsStore[2][1]
     this._temSponsorList =[]
     this._tempProtolName=[]
     this._ctProtocolID =[]
      this.outputCleanSponsorForEachTimeValueLoad =[]
      this.outputTrialListTypeForEachTimeValueLoad =[]
      this.outputProtocolNameForEachTimeValueLoad =[]

      this._tempMultilevelFilterForProtocolname =[]
      this._tempMultilevelFilterForSponsor =[]
      this._tempMultilevelFilterForTrailType=[]

     if(this.Trailtype == 'Parent'){
      this._sponsorList =[]
      this._protocolNameList =[]
      for(let i=0;i<this.selectedItemsTrailList.length;i++){
        for(const allList of this._AllFilterList){
          if(allList.TrialListType == this.selectedItemsTrailList[i].TrialListType){
            this._temSponsorList.push({CleanSponsor:allList.CleanSponsor,ProtocolName:allList.ProtocolName})
          }
        }
      }
      this.flags =[]
      for (let i = 0; i <this._temSponsorList.length; i++) {
        if (this.flags[this._temSponsorList[i].CleanSponsor])
        continue;
        this.flags[this._temSponsorList[i].CleanSponsor] = true;
        this.outputCleanSponsorForEachTimeValueLoad.push({item_id: i,CleanSponsor:this._temSponsorList[i].CleanSponsor})
       } 
      this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad
      this.selectedItemsSponsorList =[]   
      this.selectedItemsSponsorList = this._sponsorList 
      for(let i=0;i<this.selectedItemsTrailList.length;i++){
        for(const allList of this._AllFilterList){
          if(allList.TrialListType == this.selectedItemsTrailList[i].TrialListType){
            this._tempProtolName.push({ProtocolName:allList.ProtocolName})
          }
        }
      }
      this.flags =[]
      for (let i = 0; i <this._tempProtolName.length; i++) {
        if (this.flags[this._tempProtolName[i].ProtocolName])
        continue;
        this.flags[this._tempProtolName[i].ProtocolName] = true;
        this.outputProtocolNameForEachTimeValueLoad.push({item_id: i,protocolName:this._tempProtolName[i].ProtocolName})
       } 
       this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad   
       this.selectedItemsProtocolNameList =[]
       this.selectedItemsProtocolNameList = this._protocolNameList
     }else if(this.Trailtype =='Child'){     
      if(this.sponsorType == 'Parent'){
        this._protocolNameList =[]
        for(let i=0;i<this.selectedItemsTrailList.length;i++){
          for(const allList of this._AllFilterList){
            if(allList.TrialListType == this.selectedItemsTrailList[i].TrialListType){
              this._tempMultilevelFilterForTrailType.push({protocolName:allList.ProtocolName})
            }
          }
        }
        for(let i=0;i<this.selectedItemsSponsorList.length;i++){
          for(const _allList of this._AllFilterList){
            if(_allList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
              this._tempMultilevelFilterForSponsor.push({protocolName:_allList.ProtocolName})
            }
          }
        }
        for(const _tempProtocolTrailType of this._tempMultilevelFilterForTrailType){
          for(const _protolName of this._tempMultilevelFilterForSponsor){
            if(_protolName.protocolName == _tempProtocolTrailType.protocolName){
              this._tempMultilevelFilterForProtocolname.push({protocolName:_protolName.protocolName})
            }
          }
        }
        this.flags =[]
        for (let i = 0; i <this._tempMultilevelFilterForProtocolname.length; i++) {
          if (this.flags[this._tempMultilevelFilterForProtocolname[i].protocolName])
          continue;
          this.flags[this._tempMultilevelFilterForProtocolname[i].protocolName] = true;
          this.outputProtocolNameForEachTimeValueLoad.push({item_id: i,protocolName:this._tempMultilevelFilterForProtocolname[i].protocolName})
         } 
        this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad
        this.selectedItemsProtocolNameList =[]
       this.selectedItemsProtocolNameList = this._protocolNameList
      } else if(this.protocolNameType == "Parent"){
        this._sponsorList =[]
          for(let i=0;i<this.selectedItemsTrailList.length;i++){
          for(const allList of this._AllFilterList){
            if(allList.TrialListType == this.selectedItemsTrailList[i].TrialListType){
              this._tempMultilevelFilterForTrailType.push({CleanSponsor:allList.CleanSponsor})
            }
          }
         }

         for(let i=0;i<this.selectedItemsProtocolNameList.length;i++){
           for(const _allList of this._AllFilterList){
             if(_allList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName){
               this._tempMultilevelFilterForProtocolname.push({CleanSponsor:_allList.CleanSponsor})
             }
           }
         }

         for(const _tempSponsorTrailType of this._tempMultilevelFilterForTrailType){
          for(const _sponsor of this._tempMultilevelFilterForProtocolname){
            if(_sponsor.CleanSponsor == _tempSponsorTrailType.CleanSponsor){
              this._tempMultilevelFilterForSponsor.push({CleanSponsor:_sponsor.CleanSponsor})
            }
          }
        }

        this.flags =[]
        for (let i = 0; i <this._tempMultilevelFilterForSponsor.length; i++) {
          if (this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor])
          continue;
          this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor] = true;
          this.outputCleanSponsorForEachTimeValueLoad.push({item_id: i,CleanSponsor:this._tempMultilevelFilterForSponsor[i].CleanSponsor})
         } 
         this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad  
         this.selectedItemsSponsorList =[]   
         this.selectedItemsSponsorList = this._sponsorList 
     }      
    }else {

     }

  }
  getCascadingFiltersItemSponsirName(){
   
    this.Trailtype = this._selectedItemsStore[0][1]
    this.sponsorType = this._selectedItemsStore[1][1]
    this.protocolNameType = this._selectedItemsStore[2][1]
    this._temSponsorList =[]
    this._tempProtolName =[]
    this._ctProtocolID =[]
    this.outputCleanSponsorForEachTimeValueLoad =[]
    this.outputTrialListTypeForEachTimeValueLoad =[]
    this.outputProtocolNameForEachTimeValueLoad =[]
    this._tempMultilevelFilterForProtocolname =[]
    this._tempMultilevelFilterForSponsor =[]
    this._tempMultilevelFilterForTrailType=[]
    if(this.sponsorType == 'Parent'){
      this._trailTypeList =[]
      this._protocolNameList =[]
      for(let i=0;i<this.selectedItemsSponsorList.length;i++){
        for(const allList of this._AllFilterList){
          if(allList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
            this._temSponsorList.push({TrialListType:allList.TrialListType})
          }
        }
      }
      this.flags =[]
      for (let i = 0; i <this._temSponsorList.length; i++) {
        if (this.flags[this._temSponsorList[i].TrialListType])
        continue;
        this.flags[this._temSponsorList[i].TrialListType] = true;
        this.outputTrialListTypeForEachTimeValueLoad.push({item_id: i,TrialListType:this._temSponsorList[i].TrialListType})
       } 
      this._trailTypeList = this.outputTrialListTypeForEachTimeValueLoad   
      this.selectedItemsTrailList =[]
      this.selectedItemsTrailList = this._trailTypeList

      for(let i=0;i<this.selectedItemsSponsorList.length;i++){
        for(const allList of this._AllFilterList){
          if(allList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
            this._tempProtolName.push({ProtocolName:allList.ProtocolName})
          }
        }
      }
      this.flags =[]
      for (let i = 0; i <this._tempProtolName.length; i++) {
        if (this.flags[this._tempProtolName[i].ProtocolName])
        continue;
        this.flags[this._tempProtolName[i].ProtocolName] = true;
        this.outputProtocolNameForEachTimeValueLoad.push({item_id: i,protocolName:this._tempProtolName[i].ProtocolName})
       } 
       this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad   
       this.selectedItemsProtocolNameList =[]
       this.selectedItemsProtocolNameList = this._protocolNameList
     }else if(this.sponsorType =='Child'){     
      if(this.Trailtype == 'Parent'){
        this._protocolNameList =[]
        for(let i=0;i<this.selectedItemsTrailList.length;i++){
          for(const _allList of this._AllFilterList){
            if(_allList.TrialListType == this.selectedItemsTrailList[i].TrialListType){
              this._tempMultilevelFilterForTrailType.push({protocolName:_allList.ProtocolName})
            }
          }
        }
        for(let i=0;i<this.selectedItemsSponsorList.length;i++){
          for(const allList of this._AllFilterList){
            if(allList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
              this._tempMultilevelFilterForSponsor.push({protocolName:allList.ProtocolName})
            }
          }
        }
        for(const _multiLevelSponsor of this._tempMultilevelFilterForSponsor){
          for(const _multiLevelTrailType of this._tempMultilevelFilterForTrailType){
            if(_multiLevelSponsor.protocolName==_multiLevelTrailType.protocolName){
              this._tempMultilevelFilterForProtocolname.push({protocolName:_multiLevelSponsor.protocolName})
            }
          }
        }

        this.flags =[]
        for (let i = 0; i <this._tempMultilevelFilterForProtocolname.length; i++) {
          if (this.flags[this._tempMultilevelFilterForProtocolname[i].protocolName])
          continue;
          this.flags[this._tempMultilevelFilterForProtocolname[i].protocolName] = true;
          this.outputProtocolNameForEachTimeValueLoad.push({item_id: i,protocolName:this._tempMultilevelFilterForProtocolname[i].protocolName})
         } 
        this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad
        this.selectedItemsProtocolNameList =[]
       this.selectedItemsProtocolNameList = this._protocolNameList
      } else if(this.protocolNameType == "Parent"){
        this._trailTypeList =[]
        
        for(let i=0;i<this.selectedItemsProtocolNameList.length;i++){
          for(const _allList of this._AllFilterList){
            if(_allList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName){
              this._tempMultilevelFilterForProtocolname.push({TrialListType:_allList.TrialListType})
            }
          }
        }

        for(let i=0;i<this.selectedItemsSponsorList.length;i++){
          for(const allList of this._AllFilterList){
            if(allList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
              this._tempMultilevelFilterForSponsor.push({TrialListType:allList.TrialListType})
            }
          }
         }

         for(const _multiSelectSpnsorName of this._tempMultilevelFilterForSponsor){
           for(const _multiSelectProtocolName of this._tempMultilevelFilterForProtocolname){
             if(_multiSelectProtocolName.TrialListType == _multiSelectSpnsorName.TrialListType){
               this._tempMultilevelFilterForTrailType.push({TrialListType:_multiSelectProtocolName.TrialListType})
             }
           }
         }

        this.flags =[]
        for (let i = 0; i <this._tempMultilevelFilterForTrailType.length; i++) {
          if (this.flags[this._tempMultilevelFilterForTrailType[i].TrialListType])
          continue;
          this.flags[this._tempMultilevelFilterForTrailType[i].TrialListType] = true;
          this.outputTrialListTypeForEachTimeValueLoad.push({item_id: i,TrialListType:this._tempMultilevelFilterForTrailType[i].TrialListType})
         } 
         this._trailTypeList = this.outputTrialListTypeForEachTimeValueLoad  
         this.selectedItemsTrailList =[]
         this.selectedItemsTrailList = this._trailTypeList
     }      
    }else {

     }


  }
  getCascadingFiltersItemProtocolName(){

    this.Trailtype = this._selectedItemsStore[0][1]
    this.sponsorType = this._selectedItemsStore[1][1]
    this.protocolNameType = this._selectedItemsStore[2][1]
    this._tempTrialTypeList =[]
    this._temSponsorList =[]
    this._tempProtolName =[]
    this._tempSponsorList = []
    this._ctProtocolID =[]
    this.outputCleanSponsorForEachTimeValueLoad =[]
    this.outputTrialListTypeForEachTimeValueLoad =[]
    this.outputProtocolNameForEachTimeValueLoad =[]
    this._tempMultilevelFilterForProtocolname =[]
    this._tempMultilevelFilterForSponsor =[]
    this._tempMultilevelFilterForTrailType=[]

    if(this.protocolNameType == 'Parent'){
      this._trailTypeList =[]
      this._sponsorList =[]
      for(let i=0;i<this.selectedItemsProtocolNameList.length;i++){
        for(const allList of this._AllFilterList){
          if(allList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName){
            this._tempTrialTypeList.push({TrialListType:allList.TrialListType})
          }
        }
      }
      this.flags =[]
      for (let i = 0; i <this._tempTrialTypeList.length; i++) {
        if (this.flags[this._tempTrialTypeList[i].TrialListType])
        continue;
        this.flags[this._tempTrialTypeList[i].TrialListType] = true;
        this.outputTrialListTypeForEachTimeValueLoad.push({item_id: i,TrialListType:this._tempTrialTypeList[i].TrialListType})
       } 
      this._trailTypeList = this.outputTrialListTypeForEachTimeValueLoad  
      this.selectedItemsTrailList =[]
      this.selectedItemsTrailList = this._trailTypeList    
      for(let i=0;i<this.selectedItemsProtocolNameList.length;i++){
        for(const allList of this._AllFilterList){
          if(allList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName){
            this._tempSponsorList.push({CleanSponsor:allList.CleanSponsor})
          }
        }
      }
      this.flags =[]
      for (let i = 0; i <this._tempSponsorList.length; i++) {
        if (this.flags[this._tempSponsorList[i].CleanSponsor])
        continue;
        this.flags[this._tempSponsorList[i].CleanSponsor] = true;
        this.outputCleanSponsorForEachTimeValueLoad.push({item_id: i,CleanSponsor:this._tempSponsorList[i].CleanSponsor})
       } 
       this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad   
       this.selectedItemsSponsorList =[]   
       this.selectedItemsSponsorList = this._sponsorList 
     }else if(this.protocolNameType == 'Child'){
      if(this.Trailtype =='Parent'){
         this._sponsorList =[];
         for(let i=0;i<this.selectedItemsTrailList.length;i++){
           for(const _allList of this._AllFilterList){
             if(_allList.TrialListType == this.selectedItemsTrailList[i].TrialListType){
               this._tempMultilevelFilterForTrailType.push({CleanSponsor:_allList.CleanSponsor})
             }
           }
         }

         for(let i=0;i<this.selectedItemsProtocolNameList.length;i++){
           for(const _allList of this._AllFilterList){
            if(_allList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName){
              this._tempMultilevelFilterForProtocolname.push({CleanSponsor :_allList.CleanSponsor})
            }
           }
         }

         for(const _multiTrailTypeForTrailType of this._tempMultilevelFilterForTrailType){
            for(const _multiProtocolName of this._tempMultilevelFilterForProtocolname){
              if(_multiProtocolName.CleanSponsor == _multiTrailTypeForTrailType.CleanSponsor){
                this._tempMultilevelFilterForSponsor.push({CleanSponsor :_multiProtocolName.CleanSponsor})
              }
            }
         }

         this.flags =[]
         for (let i = 0; i <this._tempMultilevelFilterForSponsor.length; i++) {
           if (this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor])
           continue;
           this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor] = true;
           this.outputCleanSponsorForEachTimeValueLoad.push({item_id: i,CleanSponsor:this._tempMultilevelFilterForSponsor[i].CleanSponsor})
          } 
          console.log('@@@@@@@'+ this._trailTypeList )
          this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad  
          this.selectedItemsSponsorList =[]   
         this.selectedItemsSponsorList = this._sponsorList 
      }else if(this.sponsorType =='Parent'){
        this._trailTypeList =[]

        for(let i=0;i<this.selectedItemsSponsorList.length;i++){
          for(const _allList of this._AllFilterList){
            if(_allList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
              this._tempMultilevelFilterForSponsor.push({TrialListType:_allList.TrialListType})
            }
          }
        }
      
     
      for(let i=0;i<this.selectedItemsProtocolNameList.length;i++){
        for(const _allList of this._AllFilterList){
          if(_allList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName){
            this._tempMultilevelFilterForProtocolname.push({TrialListType:_allList.TrialListType})
          }
        }
      }

      for(const multiSelectSponsorType of this._tempMultilevelFilterForSponsor){
        for(const multiSelectProtocolName of this._tempMultilevelFilterForProtocolname){
          if(multiSelectProtocolName.TrialListType == multiSelectSponsorType.TrialListType){
            this._tempMultilevelFilterForTrailType.push({TrialListType:multiSelectProtocolName.TrialListType})
          }
        }
      }

        this.flags =[]
        for (let i = 0; i <this._tempMultilevelFilterForTrailType.length; i++) {
          if (this.flags[this._tempMultilevelFilterForTrailType[i].TrialListType])
          continue;
          this.flags[this._tempMultilevelFilterForTrailType[i].TrialListType] = true;
          this.outputTrialListTypeForEachTimeValueLoad.push({item_id: i,TrialListType:this._tempMultilevelFilterForTrailType[i].TrialListType})
         } 
         this._trailTypeList = this.outputTrialListTypeForEachTimeValueLoad  
         this.selectedItemsTrailList =[]
         this.selectedItemsTrailList = this._trailTypeList
        }
     }
  }
  //---------------------------------------------------------------------------------------------
   Apply(){
      if(this.selectedItemsTrailList.length >0 && this.selectedItemsSponsorList.length ==0 && this.selectedItemsProtocolNameList.length ==0){
      this._ctProtocolID =[]
      this._selectedType =[]
      for(let i=0; i< this.selectedItemsTrailList.length;i++){
        for(const allList of this._AllFilterList){
          if(allList.TrialListType === this.selectedItemsTrailList[i].TrialListType){
            this._ctProtocolID.push(allList.CTProtocolID)
          }
        }
      }
 
      if(this._tempCTProtoColIDLength == this._ctProtocolID.length){
        this._ctProtocolID =['ALL']
      }else{
        this._ctProtocolID = this._ctProtocolID;
      }
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this._selectedType =[{
        name:'Trial Type List'
      }]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
     
      this.IsCascadeTrailType = false;
      this.IsCascadeSponsorName = false;
      this.IsCasecadeProtocolName = false;
      this.dashService.selectType('true')
      this.dashService.drawerState('true')
      this.ResetALL();
        // this.selectedItemsTrailList =[]
        // this.selectedItemsSponsorList=[]
        // this.selectedItemsProtocolNameList =[]
        // this._trailTypeList=[]
        // this._sponsorList =[]
        // this._protocolNameList=[]
        // this._ctProtocolID=[]
        // this._trailTypeList = this._tempTrialTypeList
        // this._sponsorList = this._tempSponsorList
        // this._protocolNameList = this._tempSaveCasdingProtocolNameFilter       
      }else if(this.selectedItemsTrailList.length ==0 && this.selectedItemsSponsorList.length > 0 && this.selectedItemsProtocolNameList.length ==0){
      
      this._ctProtocolID =[]
      this._selectedType =[]
      for(let i=0; i< this.selectedItemsSponsorList.length;i++){
          for(const allList of this._AllFilterList){
            if(allList.CleanSponsor === this.selectedItemsSponsorList[i].CleanSponsor){
              this._ctProtocolID.push(allList.CTProtocolID)
              }
          }
        }
      if(this._tempCTProtoColIDLength == this._ctProtocolID.length){
          this._ctProtocolID =['ALL']
      }else{
          this._ctProtocolID = this._ctProtocolID;
      }
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.set_allSelectedElement();
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this._selectedType =[{
        name:'Sponsor'
      }]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.IsCascadeTrailType = false;
      this.IsCascadeSponsorName = false;
      this.IsCasecadeProtocolName = false;
      this.dashService.selectType('true');
      this.dashService.drawerState('true');
      this.ResetALL();
      // this.selectedItemsTrailList =[]
      // this.selectedItemsSponsorList=[]
      // this.selectedItemsProtocolNameList =[]
      // this._trailTypeList=[]
      // this._sponsorList =[]
      // this._protocolNameList=[]
      // this._ctProtocolID=[]
      // this._trailTypeList = this._tempTrialTypeList
      // this._sponsorList = this._tempSponsorList
      // this._protocolNameList = this._tempSaveCasdingProtocolNameFilter;
      
      
      }else if(this.selectedItemsTrailList.length == 0 && this.selectedItemsSponsorList.length == 0 && this.selectedItemsProtocolNameList.length >0){
      
      this._ctProtocolID =[];
      this._protocolNameList =[]
      this._selectedType =[]
      for(let i=0;i<this.selectedItemsProtocolNameList.length;i++){
          for(const allListProtocolName of this._AllFilterList){
            if(allListProtocolName.ProtocolName === this.selectedItemsProtocolNameList[i].protocolName){
              this._ctProtocolID.push(allListProtocolName.CTProtocolID)            
            }
          }
        }
      this.IsCascadeTrailType = false;
      this.IsCascadeSponsorName = false;
      this.IsCasecadeProtocolName = false;
      if(this._tempCTProtoColIDLength == this._ctProtocolID.length){
        this._ctProtocolID =['ALL']
      }else{
        this._ctProtocolID = this._ctProtocolID;
      }
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this._selectedType =[{name :'Protocol Name'}]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('true');
      this.dashService.drawerState('true');
      this.ResetALL();
      // console.log(this._ctProtocolID)
      // this.selectedItemsTrailList =[]
      // this.selectedItemsSponsorList=[]
      // this.selectedItemsProtocolNameList =[]
      // this._trailTypeList=[]
      // this._sponsorList =[]
      // this._protocolNameList=[]
      // this._ctProtocolID=[]
      // this._trailTypeList = this._tempTrialTypeList
      // this._sponsorList = this._tempSponsorList
      // this._protocolNameList = this._tempSaveCasdingProtocolNameFilter;
      
      }else if(this.selectedItemsTrailList.length>0 && this.selectedItemsSponsorList.length >0 && this.selectedItemsProtocolNameList.length == 0){

      this._tempCIProtocolIDForTrailType =[]
      this._tempCIProtocolIDForSponsor =[]
      this._tempCIProtocolIDForProtocolName =[]
      this._ctProtocolID =[]
      this._selectedType =[]

      for(let i=0;i< this.selectedItemsTrailList.length;i++){
        for(const allListTrailType of this._AllFilterList){
          if(allListTrailType.TrialListType == this.selectedItemsTrailList[i].TrialListType){
            this._tempCIProtocolIDForTrailType.push(allListTrailType.CTProtocolID)
          }
        }
      }

      for(let i=0;i< this.selectedItemsSponsorList.length;i++){
        for(const allListSponsorList of this._AllFilterList){
          if(allListSponsorList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
            this._tempCIProtocolIDForSponsor.push(allListSponsorList.CTProtocolID)
          }
        }
      }

      for(const _tempCTPIDForTrailType of this._tempCIProtocolIDForTrailType){
        for(const _tempCTPIDForSponsor of this._tempCIProtocolIDForSponsor){
          if(_tempCTPIDForTrailType == _tempCTPIDForSponsor ){
            this._ctProtocolID.push(_tempCTPIDForTrailType)
          }

        }
        
      }
      this.IsCascadeTrailType = false;
      this.IsCascadeSponsorName = false;
      this.IsCasecadeProtocolName = false;
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this._selectedType =[{name :'Trial Type List'},{name :'Sponsor'}]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('true')
      this.dashService.drawerState('true');
      this.ResetALL();
      // this._trailTypeList=[]
      // this._sponsorList =[]
      // this._protocolNameList=[]
      // this._ctProtocolID=[]
      // this.selectedItemsTrailList =[]
      // this.selectedItemsSponsorList =[]
      // this.selectedItemsProtocolNameList =[]
      // this._trailTypeList = this._tempTrialTypeList
      // this._sponsorList = this._tempSponsorList
      // this._protocolNameList = this._tempSaveCasdingProtocolNameFilter;      

      }else if(this.selectedItemsTrailList.length >0 && this.selectedItemsSponsorList.length ==0 && this.selectedItemsProtocolNameList.length >0){
      
      this._tempCIProtocolIDForTrailType =[]
      this._tempCIProtocolIDForSponsor =[]
      this._tempCIProtocolIDForProtocolName =[]
      this._ctProtocolID =[]

      for(let i=0;i< this.selectedItemsTrailList.length;i++){
        for(const allListTrailType of this._AllFilterList){
          if(allListTrailType.TrialListType == this.selectedItemsTrailList[i].TrialListType){
            this._tempCIProtocolIDForTrailType.push(allListTrailType.CTProtocolID)
          }
        }
      }

      for(let i=0;i< this.selectedItemsProtocolNameList.length;i++){
        for(const allListSponsorList of this._AllFilterList){
          if(allListSponsorList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName){
            this._tempCIProtocolIDForProtocolName.push(allListSponsorList.CTProtocolID)
          }
        }
      }

      for(const _tempCTPIDForTrailType of this._tempCIProtocolIDForTrailType){
        for(const _tempCTPIDForProtocolName of this._tempCIProtocolIDForProtocolName){
          if(_tempCTPIDForTrailType == _tempCTPIDForProtocolName ){
            this._ctProtocolID.push(_tempCTPIDForTrailType)
          }
        }        
      }
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this.IsCascadeTrailType = false;
      this.IsCascadeSponsorName = false;
      this.IsCasecadeProtocolName = false;
      this._selectedType =[{name :'Trial Type List'},{name :'Protocol Name'}]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('true');
      this.dashService.drawerState('true');
      this.ResetALL();
      // this.selectedItemsTrailList =[]
      //   this.selectedItemsSponsorList=[]
      //   this.selectedItemsProtocolNameList =[]
      // this._trailTypeList=[]
      // this._sponsorList =[]
      // this._protocolNameList=[]
      // this._ctProtocolID=[]
      // this._trailTypeList = this._tempTrialTypeList
      // this._sponsorList = this._tempSponsorList
      // this._protocolNameList = this._tempSaveCasdingProtocolNameFilter; 

      }else if(this.selectedItemsTrailList.length >0 && this.selectedItemsSponsorList.length >0 && this.selectedItemsProtocolNameList.length >0){      

      this._tempCIProtocolIDForTrailType =[]
      this._tempCIProtocolIDForSponsor =[]
      this._tempCIProtocolIDForProtocolName =[]
      this._ctProtocolID =[]
      this._tempForAllSponsor =[]

      for(let i=0;i< this.selectedItemsTrailList.length;i++){
        for(const allListTrailType of this._AllFilterList){
          if(allListTrailType.TrialListType == this.selectedItemsTrailList[i].TrialListType){
            this._tempCIProtocolIDForTrailType.push(allListTrailType.CTProtocolID)
          }
        }
      }

      for(let i=0;i< this.selectedItemsSponsorList.length;i++){
        for(const allListSponsorList of this._AllFilterList){
          if(allListSponsorList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
            this._tempCIProtocolIDForSponsor.push(allListSponsorList.CTProtocolID)
          }
        }
      }

      for(let i=0;i< this.selectedItemsProtocolNameList.length;i++){
        for(const allListSponsorList of this._AllFilterList){
          if(allListSponsorList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName){
            this._tempCIProtocolIDForProtocolName.push(allListSponsorList.CTProtocolID)
          }
        }
      }

      for(const _tempCTPIDForTrailType of this._tempCIProtocolIDForTrailType){
        for(const _tempCTPIDForSponsor of this._tempCIProtocolIDForSponsor){
          if(_tempCTPIDForTrailType == _tempCTPIDForSponsor ){
            this._tempForAllSponsor.push(_tempCTPIDForTrailType)
          }

        }
        
      }

      for(const _tempForAllSponsorCTProtocolID of this._tempForAllSponsor){
        for(const _tempCTPIDForProtocolName of this._tempCIProtocolIDForProtocolName){
          if(_tempForAllSponsorCTProtocolID == _tempCTPIDForProtocolName ){
            this._ctProtocolID.push(_tempForAllSponsorCTProtocolID)
          }
        }        
      }

      this.IsCascadeTrailType = false;
      this.IsCascadeSponsorName = false;
      this.IsCasecadeProtocolName = false;
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
        this._selectedType =[{name :'Trial Type List'},{name :'Sponsor'},{name :'Protocol Name'}]
        localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
        this.dashService.selectType('true');
        this.dashService.drawerState('true');
        this.ResetALL();
      // this._trailTypeList=[]
      // this._sponsorList =[]
      // this._protocolNameList=[]
      // this._ctProtocolID=[]
      // this.selectedItemsTrailList =[]
      //   this.selectedItemsSponsorList=[]
      //   this.selectedItemsProtocolNameList =[]
      // this._trailTypeList = this._tempTrialTypeList
      // this._sponsorList = this._tempSponsorList
      // this._protocolNameList = this._tempSaveCasdingProtocolNameFilter; 

      
      }else if(this.selectedItemsTrailList.length ==0 && this.selectedItemsSponsorList.length > 0 && this.selectedItemsProtocolNameList.length >0){
      this._tempCIProtocolIDForSponsor =[]
      this._tempCIProtocolIDForProtocolName =[]
      this._ctProtocolID =[]
      this._selectedType =[]
      for(let i=0; i< this.selectedItemsSponsorList.length;i++){
          for(const allList of this._AllFilterList){
            if(allList.CleanSponsor === this.selectedItemsSponsorList[i].CleanSponsor){
              this._tempCIProtocolIDForSponsor.push(allList.CTProtocolID)
              }
          }
        }
        for(let i=0;i<this.selectedItemsProtocolNameList.length;i++){
          for(const allListProtocolName of this._AllFilterList){
            if(allListProtocolName.ProtocolName === this.selectedItemsProtocolNameList[i].protocolName){
              this._tempCIProtocolIDForProtocolName.push(allListProtocolName.CTProtocolID)            
            }
          }
        }
        for(const _tempCTPIDForSponsor of this._tempCIProtocolIDForSponsor){
          for(const _tempCTPIDForProtocolName of this._tempCIProtocolIDForProtocolName){
            if(_tempCTPIDForSponsor == _tempCTPIDForProtocolName ){
              this._ctProtocolID.push(_tempCTPIDForSponsor)
            }  
          }          
        }
        this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this.IsCascadeTrailType = false;
      this.IsCascadeSponsorName = false;
      this.IsCasecadeProtocolName = false;
      this._selectedType =[{
        name:'Sponsor'
      },
      {
        name:'Protocol Name'
      }]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('true');
      this.dashService.drawerState('true');
      this.ResetALL();
      // this.selectedItemsTrailList =[]
      // this.selectedItemsSponsorList=[]
      // this.selectedItemsProtocolNameList =[]
      // this._trailTypeList=[]
      // this._sponsorList =[]
      // this._protocolNameList=[]
      // this._ctProtocolID=[]
      // this._trailTypeList = this._tempTrialTypeList
      // this._sponsorList = this._tempSponsorList
      // this._protocolNameList = this._tempProtocolNameList
      
      }else{
        this.drawer.emit();
      this.errorMessage = "Please select filter value to apply.";
      setTimeout(() => {
        this.errorMessage = "";
      }, 3000);
      }
   }
   ResetALL(){    
    // if(this.selectedItemsTrailList.length >0 || this.selectedItemsSponsorList.length || this.selectedItemsProtocolNameList.length>0){
      

      this.IsCascadeTrailType = false;
      this.IsCascadeSponsorName = false;
      this.IsCasecadeProtocolName = false;
      this._trailTypeList =[]
      this._selectedFilterClickrelationship =[]
      this._sponsorList =[]
      this._protocolNameList=[];
      this.selectedItemsTrailList=[] 
      this.selectedItemsSponsorList=[]
      this.selectedItemsProtocolNameList =[]
      this._selectedFilterClickrelationship =['Parent','Child','']
      this._selectedItemsStoreForTrailType =[[],[]]
      this._selectedItemsStoreForSponsor =[[],[]]
      this._selectedItemsStoreForProtocolName =[[],[]]
      this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
      this._trailTypeList= this._tempStoreTrailType
      this._sponsorList = this._tempStoreSponsorName
      this._protocolNameList = this._tempStoreProtocolName;
      this.selectedItemsTrailList =[]
      this.selectedItemsSponsorList=[]
      this.selectedItemsProtocolNameList=[]

      this.selectedItemsTrailList = this._trailTypeList
      this.selectedItemsSponsorList = this._sponsorList
      this.selectedItemsProtocolNameList = this._protocolNameList

      this.dropdownSettingsForTrailType = {
        singleSelection: false,
        idField: "item_id",
        textField: "TrialListType",
        selectAllText: "Select All",
        unSelectAllText: "UnSelect All",
        itemsShowLimit: 0,
        allowSearchFilter: true,
        maxHeight:160,
        defaultOpen: "true",
      };
  
      this.dropdownSettingsForSponsor = {
        singleSelection: false,
        idField: "item_id",
        textField: "CleanSponsor",
        selectAllText: "All",
        unSelectAllText: "Unselect All",
        itemsShowLimit: 0,
        allowSearchFilter: true,
        maxHeight:160,
        defaultOpen: "true",
      };
  
      this.dropdownSettingsForProtocolName = {
        singleSelection: false,
        defaultOpen: true,
        idField: "item_id",
        textField: "protocolName",
        selectAllText: "All",
        unSelectAllText: "Unselect All",
        itemsShowLimit: 0,
        allowSearchFilter: true,
        maxHeight:150         
      };

   }

   ResetButton(){

    if(this.selectedItemsTrailList.length>0 || this.selectedItemsProtocolNameList.length>0 || this.selectedItemsSponsorList.length >0){
      this._ctProtocolID =['ALL']
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this._selectedType =[{
        name:''
      }]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
     
      this.dashService.selectType('')
      this.dashService.drawerState('true')
  
      this.IsCascadeTrailType = false;
        this.IsCascadeSponsorName = false;
        this.IsCasecadeProtocolName = false;
        this._trailTypeList =[]
        this._selectedFilterClickrelationship =[]
        this._sponsorList =[]
        this._protocolNameList=[];
        this.selectedItemsTrailList=[] 
        this.selectedItemsSponsorList=[]
        this.selectedItemsProtocolNameList =[]
        this._selectedFilterClickrelationship =['Parent','Child','']
        this._selectedItemsStoreForTrailType =[[],[]]
        this._selectedItemsStoreForSponsor =[[],[]]
        this._selectedItemsStoreForProtocolName =[[],[]]
        this._selectedItemsStore =[this._selectedItemsStoreForTrailType,this._selectedItemsStoreForSponsor,this._selectedItemsStoreForProtocolName]
        this._trailTypeList= this._tempStoreTrailType
        this._sponsorList = this._tempStoreSponsorName
        this._protocolNameList = this._tempStoreProtocolName;

        this.selectedItemsTrailList =[]
        this.selectedItemsSponsorList=[]
        this.selectedItemsProtocolNameList=[]

        this.selectedItemsTrailList = this._trailTypeList
        this.selectedItemsSponsorList = this._sponsorList
        this.selectedItemsProtocolNameList = this._protocolNameList

        this.dropdownSettingsForTrailType = {
          singleSelection: false,
          idField: "item_id",
          textField: "TrialListType",
          selectAllText: "Select All",
          unSelectAllText: "UnSelect All",
          itemsShowLimit: 0,
          allowSearchFilter: true,
          maxHeight:160,
          defaultOpen: "true",
        };
    
        this.dropdownSettingsForSponsor = {
          singleSelection: false,
          idField: "item_id",
          textField: "CleanSponsor",
          selectAllText: "All",
          unSelectAllText: "Unselect All",
          itemsShowLimit: 0,
          allowSearchFilter: true,
          maxHeight:160,
          defaultOpen: "true",
        };
    
        this.dropdownSettingsForProtocolName = {
          singleSelection: false,
          defaultOpen: true,
          idField: "item_id",
          textField: "protocolName",
          selectAllText: "All",
          unSelectAllText: "Unselect All",
          itemsShowLimit: 0,
          allowSearchFilter: true,
          maxHeight:150         
        };

    }else{
      this.drawer.emit();
      this.errorMessage = "Please select filter value to reset.";
      setTimeout(() => {
        this.errorMessage = "";
      }, 3000);
    }
     

    
   }
  //  trailType(event){

  // //  event.stopPropagation();
  //   this.dropdownSettingsForSponsor = {
  //     singleSelection: false,
  //     idField: "item_id",
  //     textField: "TrialListType",
  //     selectAllText: "Select All",
  //     unSelectAllText: "UnSelect All",
  //     itemsShowLimit: 0,
  //     allowSearchFilter: true,
  //     maxHeight:160,
  //     defaultOpen: "true",
  //   };
  //  }
   expandTrailType(){
     this.expandEDTrailType = true;
     this.dropdownSettingsForTrailType = {
      singleSelection: false,
      idField: "item_id",
      textField: "TrialListType",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:160,
      defaultOpen: "true",
    };

    this.dropdownSettingsForSponsor = {
      singleSelection: false,
      idField: "item_id",
      textField: "CleanSponsor",
      selectAllText: "All",
      unSelectAllText: "Unselect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:160,
      defaultOpen: "true",
    };

    this.dropdownSettingsForProtocolName = {
      singleSelection: false,
      defaultOpen: true,
      idField: "item_id",
      textField: "protocolName",
      selectAllText: "All",
      unSelectAllText: "Unselect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:150         
    };
   }
   expandSponsorTYpe(){
    this.expandEDSponsorTYpe = true
    this.dropdownSettingsForTrailType = {
      singleSelection: false,
      idField: "item_id",
      textField: "TrialListType",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:160,
      defaultOpen: "true",
    };

    this.dropdownSettingsForSponsor = {
      singleSelection: false,
      idField: "item_id",
      textField: "CleanSponsor",
      selectAllText: "All",
      unSelectAllText: "Unselect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:160,
      defaultOpen: "true",
    };

    this.dropdownSettingsForProtocolName = {
      singleSelection: false,
      defaultOpen: true,
      idField: "item_id",
      textField: "protocolName",
      selectAllText: "All",
      unSelectAllText: "Unselect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:150         
    };
   }

   expandProtocolTYpe(){
    this.expandEDProtocolTYpe = true

    this.dropdownSettingsForTrailType = {
      singleSelection: false,
      idField: "item_id",
      textField: "TrialListType",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:160,
      defaultOpen: "true",
    };

    this.dropdownSettingsForSponsor = {
      singleSelection: false,
      idField: "item_id",
      textField: "CleanSponsor",
      selectAllText: "All",
      unSelectAllText: "Unselect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:160,
      defaultOpen: "true",
    };

    this.dropdownSettingsForProtocolName = {
      singleSelection: false,
      defaultOpen: true,
      idField: "item_id",
      textField: "protocolName",
      selectAllText: "All",
      unSelectAllText: "Unselect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:150         
    };
   }

   openFiltersItems(){
    
    this.dropdownSettingsForTrailType = {
      singleSelection: false,
      idField: "item_id",
      textField: "TrialListType",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:160,
      defaultOpen: "true",
    };

    this.dropdownSettingsForSponsor = {
      singleSelection: false,
      idField: "item_id",
      textField: "CleanSponsor",
      selectAllText: "All",
      unSelectAllText: "Unselect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:160,
      defaultOpen: "true",
    };

    this.dropdownSettingsForProtocolName = {
      singleSelection: false,
      defaultOpen: true,
      idField: "item_id",
      textField: "protocolName",
      selectAllText: "All",
      unSelectAllText: "Unselect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:150         
    };
   }

   openGroup(e){
    console.log(e)
   }
   set_allSelectedElement(){
     this.dataStoreServices.set_accerateFilterALLResponse(this._AllFilterList)
     this.dataStoreServices.set_TrailTypeSetFilterElement(this.selectedItemsTrailList)
     this.dataStoreServices.set_SponTypeSetFilterElement(this.selectedItemsSponsorList)
     this.dataStoreServices.set_ProtocolTypeFilterElement(this.selectedItemsProtocolNameList)
   }
   ngOnDestroy() { 
    if(this._sponsorAPIResponse != undefined)
    this._sponsorAPIResponse.unsubscribe();  
    if(this._stopPropogateResponse != undefined)
    this._stopPropogateResponse.unsubscribe(); 
   }
}
