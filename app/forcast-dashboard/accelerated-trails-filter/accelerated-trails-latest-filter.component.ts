import {
  Component, OnInit, AfterViewInit, OnDestroy, HostListener,
  ViewChild, ViewChildren, ElementRef, EventEmitter, Output, QueryList
} from '@angular/core';
import { Subject, Subscription ,interval} from 'rxjs';
// import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { DataService } from '../../../app/common/data.service'
import { DashboardService } from "../../dashboard/dashboard.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from "@angular/router";
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-accelerated-trails-filter',
  templateUrl: './accelerated-trails-filter.component.html',
  styleUrls: ['./accelerated-trails-filter.component.less']
})
export class AcceleratedTrailsFilterComponent implements OnInit {

  checked: boolean;
  accelarateFilter: any
  outputCleanSponsorForEachTimeValueLoad = [];
  outputTrialListTypeForEachTimeValueLoad = [];
  outputProtocolNameForEachTimeValueLoad = []
  _ctProtocolID: any
  _tempSponsorList = []
  _tempTrialTypeList = []
  _tempProtocolNameList = []
  flags = [];
  selectedItemsTrailList = [];
  selectedItemsSponsorList = [];
  selectedItemsProtocolNameList = []
  _AllFilterList: any = []
  _selectedFilterClickrelationship: any = ['Parent', 'Child', '']
  _selectedItemsStore: any
  _selectedItemsStoreForTrailType: any
  _selectedItemsStoreForSponsor: any
  _selectedItemsStoreForProtocolName: any
  _selectTypeForSponsor: any;
  _selectedTypeForTrail: any;
  _selectTypeForProtocolName: any
  _temSponsorList = []
  _tempProtolName = []
  _tempStoreTrailType = []
  _tempStoreSponsorName = []
  _tempStoreProtocolName = []
  _tempMultilevelFilterForSponsor: any = []
  _tempMultilevelFilterForTrailType: any = []
  _tempMultilevelFilterForProtocolname: any = []
  Trailtype: any;
  sponsorType: any;
  protocolNameType: any;
  _tempCTProtoColIDLength: any;
  //------------------------------------------------------------------
  errorMessage: any;
  _stopPropogateResponse: any
  _selectFilterLength: any

  _selectSponsorName: any
  _sponsorAPIResponse: any;
  _sponsorList: any = [];
  _protocolNameList: any = []
  dropdownSettingsForSponsor = {};
  dropdownSettingsForProtocolName = {};
  _TrailFilterType: any = [];
  _accelarateFilterResponse: any = [];
  _selectedType = []
  showLoading: boolean = false;
  _delectProtocolName = []
  _sponsorDropDownLength: any;
  _protocolDropDownLength: any
  _selectedSponsorLength: any
  _selectedProtocolLength: any;
  panelOpenState: boolean = false;
  panelOpenStateSponsor: boolean = false;
  isPanelClick: boolean = false;
  _tempCTProtocolID: any = []

  download: any = this.getBaseUrl() + "/assets/icon/active.png";
  down: any = this.getBaseUrl() + "/assets/icon/down.png";
  up: any = this.getBaseUrl() + "/assets/icon/up.png";
  search: any = this.getBaseUrl() + "/assets/icon/search.png";
  _sponsorFilterActiveState: any = 'false';
  _protocolFilterActiveState: any = 'false'
  _isStatus: any = false
  _isActive: any = false
  _isActiveType: any = false
  _toggleResponse: any;
  _toggleServices: any
  sponsorExpandCollapse: boolean = false
  protoColExpandCollapse: boolean = false
  searchTextSponsor: any = ''
  searchTextProtcol: any = ''
  _sponsorNameList: any = ''
  areAllSelected = true;
  areAllSelectedProtocol = true;
  _protocolList: any = []

  _tempSponsorListStoe :any=[]
  _tempProtocolNameListStore :any =[]
  _isfocusForSearchSponsor =false
  _isfocusForSearchProtocol = false
  isLoading :any
  value:any
  constructor(private dashService: DashboardService, private formBuilder: FormBuilder,
    private dataStoreServices: DataService, private router: Router) {

    this._ctProtocolID = []
    this._tempSponsorList = []
    this._tempTrialTypeList = []
    this._tempProtocolNameList = []
    this._AllFilterList = []
    this._accelarateFilterResponse = []
    this._sponsorNameList = []
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this._sponsorAPIResponse = this.dashService.accerateFilter.subscribe((response) => {
      this.accelarateFilter = response;
      if (this.accelarateFilter == 'true') {
        this._TrailFilterType = []
        this._accelarateFilterResponse = []
        this._sponsorNameList = []
        this._AllFilterList = []
        this._tempSponsorList = []
        this._tempProtocolNameList = []
        this.dashService.getAccelarateFilterExternalSource().subscribe((response) => {
          this._accelarateFilterResponse = response
          this._AllFilterList = this._accelarateFilterResponse;
          this._tempCTProtoColIDLength = this._accelarateFilterResponse.length
          // this._isActiveType = false
          this._TrailFilterType = ['Other', 'Accelerated']
          this.getInitialFilterPopulated();
        })
      }
    })
    this._stopPropogateResponse = this.dashService.stopPropogateCollapge.subscribe((response) => {
      if (response == 'true') {
      }
    })
  }
  changeAccelarateToggle(e) {
    this._TrailFilterType = []
    this._isActiveType = e

    setTimeout(() => {
      if (this._isActiveType == true) {
        this._TrailFilterType = ['Accelerated']
        this.getDashBoardLoad()
      } else if (this._isActiveType == false) {
        this._TrailFilterType = ['Other', 'Accelerated']
        this.getDashBoardLoad()
      }
      console.log('checked' + e)
      this.showLoading = true
      this.getInitialFilterPopulated();
    }, 100);
  }
  getInitialFilterPopulated() {
    this._tempMultilevelFilterForSponsor = []
    this._tempMultilevelFilterForTrailType = []
    this._tempMultilevelFilterForProtocolname = []
    this._sponsorList = []
    this._protocolNameList = []
    this._protocolList = []
    this._ctProtocolID = []
    this._tempTrialTypeList = []
    this._tempStoreTrailType = []
    this._tempStoreSponsorName = []
    this._tempStoreProtocolName = []
    this._sponsorNameList = []
    this.outputCleanSponsorForEachTimeValueLoad = []
    this.outputTrialListTypeForEachTimeValueLoad = []
    this.outputProtocolNameForEachTimeValueLoad = []
    this._tempSponsorList = []
    this._tempProtocolNameList = []
    this.selectedItemsSponsorList = [];
    this.selectedItemsProtocolNameList = []
    this.flags = []
    this.areAllSelectedProtocol = true
    this.areAllSelected = true
    this._sponsorFilterActiveState = 'false';
    this._protocolFilterActiveState = 'false'
    this._isfocusForSearchSponsor =false
    this._isfocusForSearchProtocol = false
    this._tempSponsorListStoe=[]
    this._tempProtocolNameListStore=[]
    if (this._TrailFilterType.length > 1) {

      
    

      // if(this._tempSponsorList.length>0){
      //     this._sponsorList =[]
      //     this._protocolNameList =[]
      //     this._sponsorList = this._tempSponsorList
      //     this._protocolNameList = this._tempProtocolNameList
      // }else{
      // this.outputCleanSponsorForEachTimeValueLoad.push({id:0,CleanSponsor:'ALL',selected: true})
      this._accelarateFilterResponse.map((obj1: any, index: any) => {
        if (this.flags[obj1.CleanSponsor])
          this.flags[obj1.CleanSponsor] = true;
        if (!this.outputCleanSponsorForEachTimeValueLoad.find(element => element.CleanSponsor == obj1.CleanSponsor)) {
          this.outputCleanSponsorForEachTimeValueLoad.push({ id: index, CleanSponsor: obj1.CleanSponsor, selected: true })
          this._sponsorNameList.push(obj1.CleanSponsor)
        }


      });
      this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad
      this._tempSponsorList = this._sponsorList
      this._tempStoreSponsorName = this._sponsorNameList
      this._sponsorDropDownLength = this._tempStoreSponsorName.length
      // this.outputProtocolNameForEachTimeValueLoad.push({id:0,protocolName:'ALL',selected: true})
      this._accelarateFilterResponse.map((obj2: any, index: any) => {
        this.outputProtocolNameForEachTimeValueLoad.push({ id: index, protocolName: obj2.ProtocolName, selected: true })
        this._protocolList.push(obj2.ProtocolName)

      });
      this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad
      this._tempProtocolNameList = this._protocolNameList
      this._tempStoreProtocolName = this._protocolList
      this._protocolDropDownLength = this._tempStoreProtocolName.length
      // }

      // this._accelarateFilterResponse.map((obj1 : any,index:any) => {
      //   if (this.flags[obj1.CleanSponsor])
      //   this.flags[obj1.CleanSponsor] = true;
      //   if(!this.outputCleanSponsorForEachTimeValueLoad.find(element => element.CleanSponsor ==  obj1.CleanSponsor))
      //   this.outputCleanSponsorForEachTimeValueLoad.push({id:index,CleanSponsor:obj1.CleanSponsor})
      //  }); 
      //   this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad 
      //   this._tempSponsorList = this._sponsorList
      //   this._tempStoreSponsorName = this._sponsorList
      //   this._accelarateFilterResponse.map((obj2 : any,index:any) => {
      //     this.outputProtocolNameForEachTimeValueLoad.push({id:index,protocolName:obj2.ProtocolName})
      //   }); 
      // this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad 
      // this._tempProtocolNameList = this._protocolNameList
      // this._tempStoreProtocolName = this._protocolNameList      

    } else {
      this.flags = [];
      this._accelarateFilterResponse.map((obj1: any, index: any) => {
        if (this._TrailFilterType[0] == obj1.TrialListType) {
          if (this.flags[obj1.CleanSponsor])
            //continue;        
            this.flags[obj1.CleanSponsor] = true;
          if (!this.outputCleanSponsorForEachTimeValueLoad.find(element => element.CleanSponsor == obj1.CleanSponsor)) {
            this.outputCleanSponsorForEachTimeValueLoad.push({ id: index, CleanSponsor: obj1.CleanSponsor, selected: true })
            this._sponsorNameList.push(obj1.CleanSponsor)
          }
        }
      });
      this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad
      this._tempSponsorList = this._sponsorList
      this._tempStoreSponsorName = this._sponsorNameList
      this._sponsorDropDownLength = this._tempStoreSponsorName.length
      for (let i = 0; i < this._accelarateFilterResponse.length; i++) {
        if (this._TrailFilterType[0] == this._accelarateFilterResponse[i].TrialListType) {
          this.outputProtocolNameForEachTimeValueLoad.push({ id: i, protocolName: this._accelarateFilterResponse[i].ProtocolName, selected: true })
          this._protocolList.push(this._accelarateFilterResponse[i].ProtocolName)
        }
      }
      this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad
      this._tempProtocolNameList = this._protocolNameList
      this._tempStoreProtocolName = this._protocolList
      this._protocolDropDownLength = this._tempStoreProtocolName.length
    }

    //this.getDashBoardLoad();
    this.showLoading = false
  }
  sponsorSelected(e2, e1) {
    // this.areAllSelected = !this.areAllSelected;
    console.log(this.areAllSelected)
    if (e1.target.checked == true) {
      this._sponsorNameList.push(e2)
      if (this._sponsorDropDownLength == this._sponsorNameList.length) {
        this.areAllSelected = true;
      } else {
        this.areAllSelected = false;
      }
    } else if (e1.target.checked == false) {
      this.areAllSelected = false;
      var _NewsponsorNameList = this._sponsorNameList.filter(e => e !== e2);
      // var _sponsorNameList = this._sponsorList.filter((item) => item.CleanSponsor !== e2);    
      this._sponsorNameList = []
      this._sponsorNameList = _NewsponsorNameList
      console.log(this._sponsorList)
    }
  }
  protocolSelected(e2, e1) {
    if (e1.target.checked == true) {
      this._protocolList.push(e2)
      if (this._protocolDropDownLength == this._protocolList.length) {
        this.areAllSelectedProtocol = true;
      } else {
        this.areAllSelectedProtocol = false;
      }
    } else if (e1.target.checked == false) {
      this.areAllSelectedProtocol = false;
      var _NewprotocolNameList = this._protocolList.filter(e => e !== e2);
      // var _sponsorNameList = this._sponsorList.filter((item) => item.CleanSponsor !== e2);    
      this._protocolList = []
      this._protocolList = _NewprotocolNameList
      console.log(this._protocolList)
    }
  }
  toggleAllSelectionSponsor() {
    this.areAllSelected = !this.areAllSelected;
    console.log(this.areAllSelected)
    if (this.areAllSelected == true) {
      this._sponsorList = []
      this._sponsorList = this._tempSponsorList.map(item => ({ ...item, selected: this.areAllSelected }));
      this._sponsorNameList = this._tempStoreSponsorName
      this._isfocusForSearchSponsor = false
    } else if (this.areAllSelected == false) {

      this._sponsorList = this._tempSponsorList.map(item => ({ ...item, selected: this.areAllSelected }));
      this._sponsorNameList = []
      console.log(this._sponsorList)
    }
  }
  toggleAllSelectionProtocol() {
    this.areAllSelectedProtocol = !this.areAllSelectedProtocol;
    if (this.areAllSelectedProtocol == true) {
      this._protocolNameList = []
      this._protocolNameList = this._tempProtocolNameList.map(item => ({ ...item, selected: this.areAllSelectedProtocol }));
      this._protocolList = this._tempStoreProtocolName
      this._isfocusForSearchProtocol = false
    } else if (this.areAllSelectedProtocol == false) {

      this._protocolNameList = this._tempProtocolNameList.map(item => ({ ...item, selected: this.areAllSelectedProtocol }));
      this._protocolList = []
      console.log(this._protocolNameList)
    }
  }
  expandcollapseState() {
    if (this.sponsorExpandCollapse == false) {
      this.sponsorExpandCollapse = true;
    } else if(this.sponsorExpandCollapse == true){
      this.sponsorExpandCollapse = false
    }
  }
  expandcollapseProtocolState() {
    if (this.protoColExpandCollapse == false) {
      this.protoColExpandCollapse = true;
    } else {
      this.protoColExpandCollapse = false
    }

  }
  onKeySearchSponsor(event :any){
    if(this.searchTextSponsor.length>0 && this._isfocusForSearchSponsor == false){
      this.areAllSelected = false;
      this._sponsorList = this._tempSponsorList.map(item => ({ ...item, selected: this.areAllSelected }));
      this._sponsorNameList = []
      this._isfocusForSearchSponsor = true
    }
  }

  onKeySearchProtocolName(event :any){
    if(this.searchTextProtcol.length>0 && this._isfocusForSearchProtocol == false){
      this.areAllSelectedProtocol = false;
      this._protocolNameList = this._tempProtocolNameList.map(item => ({ ...item, selected: this.areAllSelectedProtocol }));
      this._protocolList = []
      this._isfocusForSearchProtocol = true
    }
  }
  ApplyForSponsor() {
     
    if(this.areAllSelected == false){
    this._tempProtocolNameListStore=[]
    this._protocolNameList = []
    this._protocolList = []
    this._ctProtocolID = []
    this.outputCleanSponsorForEachTimeValueLoad = []
    this.outputTrialListTypeForEachTimeValueLoad = []
    this.outputProtocolNameForEachTimeValueLoad = []
    this._tempProtocolNameList = []
    this.selectedItemsProtocolNameList = []
    this.flags = []
    this._tempStoreProtocolName = []
    this.areAllSelectedProtocol = true
    var j = 0;
    this.areAllSelectedProtocol = true
    this._tempSponsorList.push(this._sponsorNameList)
    if (this._TrailFilterType.length > 1) {
      this._sponsorFilterActiveState = 'true';  
      for (let i = 0; i < this._sponsorNameList.length; i++) {
        for (const _allList of this._accelarateFilterResponse) {
          if (_allList.CleanSponsor == this._sponsorNameList[i]) {
            this.outputProtocolNameForEachTimeValueLoad.push({ id: j, protocolName: _allList.ProtocolName, selected: true })
            this._protocolList.push(_allList.ProtocolName)
            this._ctProtocolID.push(_allList.CTProtocolID)
            
          }
          j++;
        }
      }

      this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad
      this._tempProtocolNameListStore = this._protocolList
      this._tempProtocolNameList = this._protocolNameList
      this._tempStoreProtocolName = this._protocolList
      this._protocolDropDownLength = this._tempStoreProtocolName.length
      if (this._tempCTProtoColIDLength == this._ctProtocolID.length) {
        this._ctProtocolID = ['ALL']
      } else {
        this._ctProtocolID = this._ctProtocolID;
      }
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this._selectedType = [{ name: 'Sponsor' }]
      localStorage.setItem('dashBoardActiveType', JSON.stringify(this._selectedType))
      this.dashService.selectType('');
    } else {
      this._sponsorFilterActiveState = 'true';  
      for (let i = 0; i < this._sponsorNameList.length; i++) {
        for (const _allList of this._accelarateFilterResponse) {
          if (_allList.CleanSponsor == this._sponsorNameList[i] && _allList.TrialListType == this._TrailFilterType[0]) {
            this.outputProtocolNameForEachTimeValueLoad.push({ id: j, protocolName: _allList.ProtocolName, selected: true })
            this._protocolList.push(_allList.ProtocolName)
            this._ctProtocolID.push(_allList.CTProtocolID)
          }
          j++;
        }
      }
      this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad
      this._tempProtocolNameList = this._protocolNameList
      this._tempProtocolNameListStore = this._protocolList
      this._tempStoreProtocolName = this._protocolList
      this._protocolDropDownLength = this._tempStoreProtocolName.length
      if (this._tempCTProtoColIDLength == this._ctProtocolID.length) {
        this._ctProtocolID = ['ALL']
      } else {
        this._ctProtocolID = this._ctProtocolID;
      }
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this._selectedType = [{ name: 'Sponsor' }]
      localStorage.setItem('dashBoardActiveType', JSON.stringify(this._selectedType))
      this.dashService.selectType('');
    }
  }

  }

  ApplyForProtocol() {
    if(this.areAllSelectedProtocol == false){
    this._sponsorList = []
    this._ctProtocolID = []
    this._tempTrialTypeList = []
    this._sponsorNameList = []
    this._tempSponsorListStoe=[]
    this.outputCleanSponsorForEachTimeValueLoad = []
    this._tempMultilevelFilterForSponsor = []
    this._tempSponsorList = []
    this._tempStoreSponsorName = []
    this.selectedItemsSponsorList = [];
    this.flags = []
    this.areAllSelected = true
    var j = 0;
    if (this._TrailFilterType.length > 1) {
      this._protocolFilterActiveState= 'true'
      for (let i = 0; i < this._protocolList.length; i++) {
        for (const _allResponse of this._accelarateFilterResponse) {
          if (_allResponse.ProtocolName == this._protocolList[i]) {
            this._tempMultilevelFilterForSponsor.push({ id: j, CleanSponsor: _allResponse.CleanSponsor })
            this._ctProtocolID.push(_allResponse.CTProtocolID)
          }
          j++
        }
      }

      for (let i = 0; i < this._tempMultilevelFilterForSponsor.length; i++) {
        if (this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor])
          continue;
        this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor] = true;
        this.outputCleanSponsorForEachTimeValueLoad.push({ item_id: i, CleanSponsor: this._tempMultilevelFilterForSponsor[i].CleanSponsor, selected: true })
        this._sponsorNameList.push(this._tempMultilevelFilterForSponsor[i].CleanSponsor)
      }

      this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad

      this._tempSponsorList = this._sponsorList
      this._tempStoreSponsorName = this._sponsorNameList
      this._tempSponsorListStoe = this._sponsorNameList
      this._sponsorDropDownLength = this._tempStoreSponsorName.length
      if (this._tempCTProtoColIDLength == this._ctProtocolID.length) {
        this._ctProtocolID = ['ALL']
      } else {
        this._ctProtocolID = this._ctProtocolID;
      }
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this._selectedType = [{ name: 'Sponsor' }]
      localStorage.setItem('dashBoardActiveType', JSON.stringify(this._selectedType))
      this.dashService.selectType('');

    } else {
      this._protocolFilterActiveState= 'true'
      for (let i = 0; i < this._protocolList.length; i++) {
        for (const _allResponse of this._accelarateFilterResponse) {
          if (_allResponse.ProtocolName == this._protocolList[i] && _allResponse.TrialListType == this._TrailFilterType[0]) {
            this._tempMultilevelFilterForSponsor.push({ id: j, CleanSponsor: _allResponse.CleanSponsor })
            this._ctProtocolID.push(_allResponse.CTProtocolID)
          }
          j++
        }
      }

      for (let i = 0; i < this._tempMultilevelFilterForSponsor.length; i++) {
        if (this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor])
          continue;
        this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor] = true;
        this.outputCleanSponsorForEachTimeValueLoad.push({ item_id: i, CleanSponsor: this._tempMultilevelFilterForSponsor[i].CleanSponsor, selected: true })
        this._sponsorNameList.push(this._tempMultilevelFilterForSponsor[i].CleanSponsor)
      }
      this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad
      this._tempSponsorList = this._sponsorList
      this._tempStoreSponsorName = this._sponsorNameList
      this._tempSponsorListStoe = this._sponsorNameList
      this._sponsorDropDownLength = this._tempStoreSponsorName.length
      if (this._tempCTProtoColIDLength == this._ctProtocolID.length) {
        this._ctProtocolID = ['ALL']
      } else {
        this._ctProtocolID = this._ctProtocolID;
      }
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this._selectedType = [{ name: 'Sponsor' }]
      localStorage.setItem('dashBoardActiveType', JSON.stringify(this._selectedType))
      this.dashService.selectType('');
    }
  }

  }
  ResetButtonForSponsor() {
    if(this._sponsorFilterActiveState == 'true'  && this._protocolFilterActiveState == 'false'){
      this._sponsorFilterActiveState == 'false'
     this.commonResetFunction();
    }else if(this._sponsorFilterActiveState == 'true' && this._protocolFilterActiveState == 'true'){
      this._sponsorFilterActiveState = 'false';        
        this.resetForProtocol();
    }
   // this.commonResetFunction();
  }
  ResetButtonForProtocol() {
    if(this._sponsorFilterActiveState == 'false' && this._protocolFilterActiveState == 'true'){
      this._protocolFilterActiveState = 'false'
      this.commonResetFunction();  
  }else if(this._sponsorFilterActiveState == 'true' && this._protocolFilterActiveState == 'true'){
      this._protocolFilterActiveState = 'false'
      this.resetForSponsor();
  }
  }

  resetForProtocol() {     
    this._protocolNameList = []
   // this._protocolList = []
    this._ctProtocolID = []
    this.outputCleanSponsorForEachTimeValueLoad = []
    this.outputTrialListTypeForEachTimeValueLoad = []
    this.outputProtocolNameForEachTimeValueLoad = []
    this._tempMultilevelFilterForSponsor=[]
    this._tempProtocolNameList = []
    this.selectedItemsProtocolNameList = []
    this.flags = []
    this._tempStoreProtocolName = []
    this.areAllSelectedProtocol = true
    var j = 0;

    this._sponsorList = []
    this._tempTrialTypeList = []
   // this._sponsorNameList = []
    this._tempSponsorList = []
    //this._tempStoreSponsorName = []
    this.areAllSelected = true
  
    if (this._TrailFilterType.length > 1) {
      for (let i = 0; i < this._protocolList.length; i++) {
        for (const _allList of this._accelarateFilterResponse) {
          if (_allList.ProtocolName == this._protocolList[i]) {
            this.outputProtocolNameForEachTimeValueLoad.push({ id: i, protocolName: _allList.ProtocolName, selected: true })
          //  this._protocolList.push(_allList.ProtocolName)
           // this._tempMultilevelFilterForSponsor.push({ id: j, CleanSponsor: _allList.CleanSponsor })
           this._ctProtocolID.push(_allList.CTProtocolID)
          }
          j++;
        }
      }

      var i=0;
      for(const sponsorList of this._sponsorNameList){
        this._tempMultilevelFilterForSponsor.push({ id: i, CleanSponsor: sponsorList ,selected: true})
      }
      i++
      
      for (let i = 0; i < this._tempMultilevelFilterForSponsor.length; i++) {
        if (this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor])
          continue;
        this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor] = true;
        this.outputCleanSponsorForEachTimeValueLoad.push({ item_id: i, CleanSponsor: this._tempMultilevelFilterForSponsor[i].CleanSponsor, selected: true })
        this._sponsorNameList.push(this._tempMultilevelFilterForSponsor[i].CleanSponsor)
      }
      
      this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad
      this._tempSponsorList = this._sponsorList
      //this._tempSponsorListStoe = this._sponsorNameList
      this._sponsorDropDownLength = this._tempStoreSponsorName.length

      this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad
      this._tempProtocolNameList = this._protocolNameList
      this._tempStoreProtocolName = this._protocolList
      this._protocolDropDownLength = this._tempStoreProtocolName.length
      if (this._tempCTProtoColIDLength == this._ctProtocolID.length) {
        this._ctProtocolID = ['ALL']
      } else {
        this._ctProtocolID = this._ctProtocolID;
      }
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this._selectedType = [{ name: '' }]
      localStorage.setItem('dashBoardActiveType', JSON.stringify(this._selectedType))
      this.dashService.selectType('');
    } else {
      for (let i = 0; i < this._protocolList.length; i++) {
        for (const _allList of this._accelarateFilterResponse) {
          if (_allList.ProtocolName == this._protocolList[i] && _allList.TrialListType == this._TrailFilterType[0]) {
            this.outputProtocolNameForEachTimeValueLoad.push({ id: i, protocolName: _allList.ProtocolName, selected: true })
          //  this._protocolList.push(_allList.ProtocolName)
           // this._tempMultilevelFilterForSponsor.push({ id: j, CleanSponsor: _allList.CleanSponsor })
           this._ctProtocolID.push(_allList.CTProtocolID)
          }
          j++;
        }
      }

      var i=0;
      for(const sponsorList of this._sponsorNameList){
        this._tempMultilevelFilterForSponsor.push({ id: i, CleanSponsor: sponsorList ,selected: true})
      }
      i++
      
      for (let i = 0; i < this._tempMultilevelFilterForSponsor.length; i++) {
        if (this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor])
          continue;
        this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor] = true;
        this.outputCleanSponsorForEachTimeValueLoad.push({ item_id: i, CleanSponsor: this._tempMultilevelFilterForSponsor[i].CleanSponsor, selected: true })
        this._sponsorNameList.push(this._tempMultilevelFilterForSponsor[i].CleanSponsor)
      }
      
      this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad
      this._tempSponsorList = this._sponsorList
      //this._tempSponsorListStoe = this._sponsorNameList
      this._sponsorDropDownLength = this._tempStoreSponsorName.length

      this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad
      this._tempProtocolNameList = this._protocolNameList
      this._tempStoreProtocolName = this._protocolList
      this._protocolDropDownLength = this._tempStoreProtocolName.length
      if (this._tempCTProtoColIDLength == this._ctProtocolID.length) {
        this._ctProtocolID = ['ALL']
      } else {
        this._ctProtocolID = this._ctProtocolID;
      }
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this._selectedType = [{ name: 'Sponsor' }]
      localStorage.setItem('dashBoardActiveType', JSON.stringify(this._selectedType))
      this.dashService.selectType('');
    }

  }
 
  resetForSponsor() {
   
    this._sponsorList = []
    this._ctProtocolID = []
    this._tempTrialTypeList = []
    this._sponsorNameList = []

    this.outputCleanSponsorForEachTimeValueLoad = []
    this._tempMultilevelFilterForSponsor = []
    this._tempMultilevelFilterForProtocolname=[]
    this._tempSponsorList = []
    this._tempStoreSponsorName = []
    this.selectedItemsSponsorList = [];
    this.flags = []
    this.areAllSelected = true


    this._protocolNameList = []
    this._protocolList = []
    this.outputProtocolNameForEachTimeValueLoad = []
    this._tempProtocolNameList = []
    this.flags = []
    this._tempStoreProtocolName = []
    this.areAllSelectedProtocol = true

    var j = 0;
    if (this._TrailFilterType.length > 1) {
      for (let i = 0; i < this._tempProtocolNameListStore.length; i++) {
        for (const _allResponse of this._accelarateFilterResponse) {
          if (_allResponse.ProtocolName == this._tempProtocolNameListStore[i]) {
            this._tempMultilevelFilterForSponsor.push({ id: j, CleanSponsor: _allResponse.CleanSponsor })
            this._tempMultilevelFilterForProtocolname.push({ id: j, protocolName: _allResponse.ProtocolName, selected: true })
            // this._protocolList.push(_allResponse.ProtocolName)
            this._ctProtocolID.push(_allResponse.CTProtocolID)
          }
          j++
        }
      }

      for (let i = 0; i < this._tempMultilevelFilterForSponsor.length; i++) {
        if (this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor])
          continue;
        this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor] = true;
        this.outputCleanSponsorForEachTimeValueLoad.push({ item_id: i, CleanSponsor: this._tempMultilevelFilterForSponsor[i].CleanSponsor, selected: true })
        this._sponsorNameList.push(this._tempMultilevelFilterForSponsor[i].CleanSponsor)
      }

      this.flags=[]

      for (let i = 0; i < this._tempMultilevelFilterForProtocolname.length; i++) {
        if (this.flags[this._tempMultilevelFilterForProtocolname[i].protocolName])
          continue;
        this.flags[this._tempMultilevelFilterForProtocolname[i].protocolName] = true;
        this.outputProtocolNameForEachTimeValueLoad.push({ item_id: i, protocolName: this._tempMultilevelFilterForProtocolname[i].protocolName, selected: true })
        this._protocolList.push(this._tempMultilevelFilterForSponsor[i].protocolName)
      }

      this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad
      this._tempSponsorList = this._sponsorList
      this._tempStoreSponsorName = this._sponsorNameList
      this._sponsorDropDownLength = this._tempStoreSponsorName.length

      this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad
      this._tempProtocolNameList = this._protocolNameList
      this._tempStoreProtocolName = this._protocolList
      this._protocolDropDownLength = this._tempStoreProtocolName.length

      if (this._tempCTProtoColIDLength == this._ctProtocolID.length) {
        this._ctProtocolID = ['ALL']
      } else {
        this._ctProtocolID = this._ctProtocolID;
      }
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this._selectedType = [{ name: '' }]
      localStorage.setItem('dashBoardActiveType', JSON.stringify(this._selectedType))
      this.dashService.selectType('');

    } else {
      for (let i = 0; i < this._tempProtocolNameListStore.length; i++) {
        for (const _allResponse of this._accelarateFilterResponse) {
          if (_allResponse.ProtocolName == this._tempProtocolNameListStore[i] && _allResponse.TrialListType == this._TrailFilterType[0]) {
            this._tempMultilevelFilterForSponsor.push({ id: j, CleanSponsor: _allResponse.CleanSponsor })
            this.outputProtocolNameForEachTimeValueLoad.push({ id: j, protocolName: _allResponse.ProtocolName, selected: true })
            this._protocolList.push(_allResponse.ProtocolName)
            this._ctProtocolID.push(_allResponse.CTProtocolID)
          }
          j++
        }
      }

      for (let i = 0; i < this._tempMultilevelFilterForSponsor.length; i++) {
        if (this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor])
          continue;
        this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor] = true;
        this.outputCleanSponsorForEachTimeValueLoad.push({ item_id: i, CleanSponsor: this._tempMultilevelFilterForSponsor[i].CleanSponsor, selected: true })
        this._sponsorNameList.push(this._tempMultilevelFilterForSponsor[i].CleanSponsor)
      }
      this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad
      this._tempSponsorList = this._sponsorList
      this._tempStoreSponsorName = this._sponsorNameList
      this._sponsorDropDownLength = this._tempStoreSponsorName.length

      this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad
      this._tempProtocolNameList = this._protocolNameList
      this._tempStoreProtocolName = this._protocolList
      this._protocolDropDownLength = this._tempStoreProtocolName.length

      if (this._tempCTProtoColIDLength == this._ctProtocolID.length) {
        this._ctProtocolID = ['ALL']
      } else {
        this._ctProtocolID = this._ctProtocolID;
      }
      this.set_allSelectedElement();
      this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
      this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
      this._selectedType = [{ name: '' }]
      localStorage.setItem('dashBoardActiveType', JSON.stringify(this._selectedType))
      this.dashService.selectType('');
    }

  }

  ResetButtonALL() {
    this.commonResetFunction();
  }
  commonResetFunction() {
    this._tempSponsorList = []
    this._tempProtocolNameList = []
    this._ctProtocolID = []
    this.sponsorExpandCollapse = false
    this.protoColExpandCollapse = false
    if (this._TrailFilterType.length > 1) {
      this._ctProtocolID.length = this._accelarateFilterResponse.length
    } else {
      this._accelarateFilterResponse.map((obj1: any) => {
        if (this._TrailFilterType[0] == obj1.TrialListType) {
          this._ctProtocolID.push(obj1.CTProtocolID)
        }
      });
    }
    if (this._tempCTProtoColIDLength == this._ctProtocolID.length) {
      this._ctProtocolID = ['ALL']
    } else {
      this._ctProtocolID = this._ctProtocolID;
    }
    this.set_allSelectedElement();
    this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
    this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
    this._selectedType = [{ name: '' }]
    localStorage.setItem('dashBoardActiveType', JSON.stringify(this._selectedType))
    this.dashService.selectType('');
    this.getInitialFilterPopulated();
  }
  getDashBoardLoad() {
    this._tempMultilevelFilterForSponsor = []
    this._tempMultilevelFilterForTrailType = []
    this._tempMultilevelFilterForProtocolname = []
    this.outputProtocolNameForEachTimeValueLoad = []
    this.outputCleanSponsorForEachTimeValueLoad = []
    this._ctProtocolID = []
    if (this._TrailFilterType.length > 1) {
      this._ctProtocolID.length = this._accelarateFilterResponse.length
    } else {
      this._accelarateFilterResponse.map((obj1: any) => {
        if (this._TrailFilterType[0] == obj1.TrialListType) {
          this._ctProtocolID.push(obj1.CTProtocolID)
        }
      });
    }
    if (this._tempCTProtoColIDLength == this._ctProtocolID.length) {
      this._ctProtocolID = ['ALL']
    } else {
      this._ctProtocolID = this._ctProtocolID;
    }
    this.set_allSelectedElement();
    this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
    this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
    this._selectedType = [{ name: '' }]
    localStorage.setItem('dashBoardActiveType', JSON.stringify(this._selectedType))
    this.dashService.selectType('');
  }
  set_allSelectedElement() {
    this.dataStoreServices.set_AccelarateFilterType(this._TrailFilterType)
    this.dataStoreServices.set_accerateFilterALLResponse(this._accelarateFilterResponse)
    this.dataStoreServices.set_TrailTypeSetFilterElement(this._TrailFilterType)
    this.dataStoreServices.set_SponTypeSetFilterElement(this.selectedItemsSponsorList)
    this.dataStoreServices.set_ProtocolTypeFilterElement(this.selectedItemsProtocolNameList)
  }
  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }
  ngOnDestroy() {
    if (this._sponsorAPIResponse != undefined)
      this._sponsorAPIResponse.unsubscribe();
    if (this._stopPropogateResponse != undefined)
      this._stopPropogateResponse.unsubscribe();

  }
}
