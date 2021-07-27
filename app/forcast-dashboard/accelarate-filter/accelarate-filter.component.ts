import { Component, OnInit ,AfterViewInit,OnDestroy,HostListener,
  ViewChild, ViewChildren, ElementRef,EventEmitter, Output,   QueryList} from '@angular/core';
  import { Subject,Subscription } from 'rxjs';
// import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import{DataService} from '../../../app/common/data.service'
import { DashboardService } from "../../dashboard/dashboard.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from "@angular/router";

@Component({
  selector: 'app-accelarate-filter',
  templateUrl: './accelarate-filter.component.latest.html',
  styleUrls: ['./accelarate-filter.component.latest.less']
})
export class AccelarateFilterComponent implements OnInit {
  checked: boolean;
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
 expandEDSponsorTYpes :any=false
  errorMessage :any;
  _stopPropogateResponse :any
  _selectFilterLength:any

  _selectSponsorName :any  
  _sponsorAPIResponse:any;
  _sponsorList :any =[];
  _protocolNameList :any =[]
  dropdownSettingsForSponsor={};
  dropdownSettingsForProtocolName ={};
  _TrailFilterType :any =[];
  _accelarateFilterResponse :any =[];
  _selectedType =[]
  showLoading: boolean = false;
  _delectProtocolName =[]
  _sponsorDropDownLength :any;
  _protocolDropDownLength :any
  _selectedSponsorLength :any
  _selectedProtocolLength :any;
  panelOpenState: boolean = false;
  panelOpenStateSponsor :boolean = false;
  isPanelClick : boolean =false;
  _tempCTProtocolID :any=[]

  download: any = this.getBaseUrl() + "/assets/icon/active.png";
  _sponsorFilterActiveState : any = 'false';
  _protocolFilterActiveState :any = 'false'
  _isStatus :any = false
  _isActive :any =false 
  _isActiveType :any = false
  _toggleResponse:any;
  _toggleServices :any
  t0:any 
  t1:any

  constructor(private dashService: DashboardService, private formBuilder: FormBuilder,
    private dataStoreServices : DataService,private router: Router) { 
    this._ctProtocolID =[]
    this._tempSponsorList =[]
    this._tempTrialTypeList =[]
    this._tempProtocolNameList =[]
    this._AllFilterList =[]
    this._accelarateFilterResponse =[]
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
        this._TrailFilterType =[]
        this._accelarateFilterResponse =[]
        this._AllFilterList =[]
        this.dashService.getAccelarateFilterExternalSource().subscribe((response)=>{
          this._accelarateFilterResponse= response
          this._AllFilterList = this._accelarateFilterResponse;
          this._tempCTProtoColIDLength = this._accelarateFilterResponse.length
         // this._isActiveType = false
          this._TrailFilterType = ['Other','Accelerated']
          this.getInitialFilterPopulated();         
          })
      }
    })  
    this._stopPropogateResponse = this.dashService.stopPropogateCollapge.subscribe((response)=>{
        if(response == 'true'){
          //this.defaultDropDownList()
          // this.expandEDSponsorTYpe = false
          // this.expandEDProtocolTYpe = false
          // this.isPanelClick=false
          // this.panelOpenState = false;
          // this.panelOpenStateSponsor  = false
        }
    })

    // this._toggleServices = this.dashService.toggleFilterValue.subscribe((response)=>{
    //   this._toggleResponse =''
    //   this._toggleResponse = response
    //   if(this._toggleResponse != '' || this._toggleResponse == false){
    //     this._TrailFilterType =[]
    //     this._isActiveType = this._toggleResponse
    //     this.showLoading = true
    //     this.expandEDSponsorTYpe = false
    //     this.expandEDProtocolTYpe = false
    //     this.isPanelClick=false
    //     this.panelOpenState = false;
    //     this.panelOpenStateSponsor  = false
    //     this._sponsorFilterActiveState = 'false';
    //     this._protocolFilterActiveState = 'false'
    //     this.getInitialFilterPopulated();
    //   }
    // })
  }
  changeAccelarateToggle(e){
    this._TrailFilterType =[]
    this._isActiveType = e
    // if(e == true){
    //   this._TrailFilterType = ['Accelerated']
    //   //this.getDashBoardLoad();
    // }else if(e == false){
    //   this._TrailFilterType = ['Other','Accelerated']
    //   //this.getDashBoardLoad();
    // }

    this.t0 = performance.now()

   // <---- measured code goes between t0 and t1
   setTimeout(() => {
  
    if(this._isActiveType == true){
      this._TrailFilterType = ['Accelerated']
     // this.getDashBoardLoad();
    }else if(this._isActiveType == false){
     this._TrailFilterType = ['Other','Accelerated']
   //   this.getDashBoardLoad();
    }

    console.log('checked'+e)
    this.showLoading = true
    this.expandEDSponsorTYpe = false
    this.expandEDProtocolTYpe = false
    this.isPanelClick=false
    this.panelOpenState = false;
    this.panelOpenStateSponsor  = false
    this._sponsorFilterActiveState = 'false';
    this._protocolFilterActiveState = 'false'
    this.getInitialFilterPopulated();
  },100);


  //   if(this._isActiveType == true){
  //     this._TrailFilterType = ['Accelerated']
  //    // this.getDashBoardLoad();
  //   }else if(this._isActiveType == false){
  //    this._TrailFilterType = ['Other','Accelerated']
  //  //   this.getDashBoardLoad();
  //   }

  //   console.log('checked'+e)
  //   this.showLoading = true
  //   this.expandEDSponsorTYpe = false
  //   this.expandEDProtocolTYpe = false
  //   this.isPanelClick=false
  //   this.panelOpenState = false;
  //   this.panelOpenStateSponsor  = false
  //   this._sponsorFilterActiveState = 'false';
  //   this._protocolFilterActiveState = 'false'
  //   this.getInitialFilterPopulated();
  // this.getDashBoardLoad();
   
    // var t1 = performance.now()
    // console.log("Call to doSomething took " + (this.t1 - this.t0) + " milliseconds.")
  }
   getInitialFilterPopulated(){
    
    this._tempMultilevelFilterForSponsor =[]
    this._tempMultilevelFilterForTrailType =[]
    this._tempMultilevelFilterForProtocolname =[]
    this._sponsorList =[]
    this._protocolNameList =[]
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

    this.selectedItemsSponsorList = [];
    this.selectedItemsProtocolNameList =[]
    this.flags =[]

    // if(this._isActiveType == true){
    //   this._TrailFilterType = ['Accelerated']
    //   //this.getDashBoardLoad();
    // }else if(this._isActiveType == false){
    //   this._TrailFilterType = ['Other','Accelerated']
    //   this.getDashBoardLoad();
    // }

    if(this._TrailFilterType.length>1){
      var i=0;
      // for(const _allList of this._accelarateFilterResponse){
      //     this._tempMultilevelFilterForSponsor.push({CleanSponsor:_allList.CleanSponsor})  
      // }
      var t0 = performance.now() 
      this._accelarateFilterResponse.map((obj1 : any,index:any) => {
        if (this.flags[obj1.CleanSponsor])
        this.flags[obj1.CleanSponsor] = true;
        if(!this.outputCleanSponsorForEachTimeValueLoad.find(element => element.CleanSponsor ==  obj1.CleanSponsor))
        this.outputCleanSponsorForEachTimeValueLoad.push({item_id: index,CleanSponsor:obj1.CleanSponsor})
       }); 
        // var t1 = performance.now()
        // console.log("Call to doSomething took Sonsor " + (t1 - t0) + " milliseconds.")
        this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad 
        this._tempSponsorList = this._sponsorList
        this._tempStoreSponsorName = this._sponsorList
        this._accelarateFilterResponse.map((obj2 : any,index:any) => {
          this.outputProtocolNameForEachTimeValueLoad.push({item_id: index,protocolName:obj2.ProtocolName})
          // if (this.flags[obj2.protocolName])
          // this.flags[obj2.protocolName] = true;
          // if(!this.outputProtocolNameForEachTimeValueLoad.find(element => element.ProtocolName ==  obj2.protocolName))
          // this.outputProtocolNameForEachTimeValueLoad.push({item_id: index,protocolName:obj2.ProtocolName})
         }); 
        //  for(let i=0;i<this._accelarateFilterResponse.length;i++){        
        //   // if(this._TrailFilterType[0] == this._accelarateFilterResponse[i].TrialListType){
        //     this.outputProtocolNameForEachTimeValueLoad.push({item_id: i,protocolName :this._accelarateFilterResponse[i].ProtocolName })
           
        //   // }
        // }
        
      //   this.showLoading = false
      // }
  
      // for (let i = 0; i <this._accelarateFilterResponse.length; i++) {
      //   if (this.flags[this._accelarateFilterResponse[i].CleanSponsor])
      //   continue;
      //   this.flags[this._accelarateFilterResponse[i].CleanSponsor] = true;
      //   this.outputCleanSponsorForEachTimeValueLoad.push({item_id: i,CleanSponsor:this._accelarateFilterResponse[i].CleanSponsor})
      //  } 
      // this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad 
      // this._tempSponsorList = this._sponsorList
      // this._tempStoreSponsorName = this._sponsorList
      // for(let i=0;i<this._accelarateFilterResponse.length;i++){        
      //     // if(this._TrailFilterType[0] == this._accelarateFilterResponse[i].TrialListType){
      //       this.outputProtocolNameForEachTimeValueLoad.push({item_id: i,protocolName :this._accelarateFilterResponse[i].ProtocolName })
           
      //     // }
      //   }
        
      //   this.showLoading = false
      // }
     
      this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad 
      this._tempProtocolNameList = this._protocolNameList
      this._tempStoreProtocolName = this._protocolNameList      
      this.selectedItemsSponsorList = this._sponsorList;
      this.selectedItemsProtocolNameList =this._protocolNameList      
      this.t1 = performance.now()
      console.log("Call to doSomething took Sonsor " + (this.t1 - this.t0) + " milliseconds.")
    }else{
      this.flags =[];
      // for(const _allList of this._accelarateFilterResponse){
      //   // for(let j=0;j<this._TrailFilterType.length;j++){
      //     if(this._TrailFilterType[0] == _allList.TrialListType){
      //       this._tempMultilevelFilterForSponsor.push({CleanSponsor:_allList.CleanSponsor})         
      //     // }
      //   }        
      // }

      //  this._tempMultilevelFilterForSponsor = this._accelarateFilterResponse.filter(CleanSponsor => CleanSponsor.TrialListType == this._TrailFilterType[0]);
      // console.log(this._tempMultilevelFilterForSponsor);

      let time1 = new Date().getTime(); 
      var i=0; 
      this._accelarateFilterResponse.map((obj1 : any,index:any) => {
        if(this._TrailFilterType[0] == obj1.TrialListType){
        if (this.flags[obj1.CleanSponsor])
        //continue;        
        this.flags[obj1.CleanSponsor] = true;
        if (!this.outputCleanSponsorForEachTimeValueLoad.find(element => element.CleanSponsor ==  obj1.CleanSponsor)) {
        // this._tempMultilevelFilterForSponsor.push({CleanSponsor:obj1.CleanSponsor})
         this.outputCleanSponsorForEachTimeValueLoad.push({item_id: index,CleanSponsor:obj1.CleanSponsor})
        //  i++;
        }  
        // this.outputCleanSponsorForEachTimeValueLoad.push({item_id: i++,CleanSponsor:obj1.CleanSponsor})
         // this._tempMultilevelFilterForSponsor.push({CleanSponsor:obj1.CleanSponsor})
        } 
        i++     
      });

      // this._tempMultilevelFilterForSponsor = this._accelarateFilterResponse.filter(CleanSponsor => CleanSponsor.TrialListType == this._TrailFilterType[0]);
      // console.log(this._tempMultilevelFilterForSponsor);    

      // for(const _allList of this._accelarateFilterResponse){
      //   // for(let j=0;j<this._TrailFilterType.length;j++){
      //     if(this._TrailFilterType[0] == _allList.TrialListType){
      //       this._tempMultilevelFilterForSponsor.push({CleanSponsor:_allList.CleanSponsor})         
      //     // }
      //   }        
      // }

      let timetaken = new Date().getTime() - time1; 
      console.log( 'Total Time', timetaken, time1);
  
      // for (let i = 0; i <this._tempMultilevelFilterForSponsor.length; i++) {
      //   if (this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor])
      //   continue;
      //   this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor] = true;
      //   this.outputCleanSponsorForEachTimeValueLoad.push({item_id: i,CleanSponsor:this._tempMultilevelFilterForSponsor[i].CleanSponsor})
      //  } 
      this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad 
      this._tempSponsorList = this._sponsorList
      this._tempStoreSponsorName = this._sponsorList           
      for(let i=0;i<this._accelarateFilterResponse.length;i++){        
        if(this._TrailFilterType[0] == this._accelarateFilterResponse[i].TrialListType){
          this.outputProtocolNameForEachTimeValueLoad.push({item_id: i,protocolName :this._accelarateFilterResponse[i].ProtocolName })
         }
      }
      this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad 
      this._tempProtocolNameList = this._protocolNameList
      this._tempStoreProtocolName = this._protocolNameList      
      this.selectedItemsSponsorList = this._sponsorList;
      this.selectedItemsProtocolNameList =this._protocolNameList
    }
    this.dropdownSettingsForSponsor = {
      singleSelection: false,
      defaultOpen: false,
      idField: "item_id",
      textField: "CleanSponsor",
      selectAllText: "All",
      unSelectAllText: "Unselect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:120,
     
    };    
    
    this.dropdownSettingsForProtocolName = {
      singleSelection: false,
      defaultOpen: false,
      idField: "item_id",
      textField: "protocolName",
      selectAllText: "All",
      unSelectAllText: "Unselect All",
      itemsShowLimit: 0,
      allowSearchFilter: true,
      maxHeight:120         
    };
    this._selectedSponsorLength = this._sponsorList.length;
    this._selectedProtocolLength = this._protocolNameList.length
   //this.getDashBoardLoad();
   this.showLoading = false
  }
  onItemSelectForSponsorList(item){
  this.selectSponsorItems();  
 // this.expandSponsorTYpe()

 // this.autoscrollList();

  }
  onItemALLSelectForSponsorList(items){
  this.selectedItemsSponsorList = items
 this.selectSponsorItems()
 if(this._selectedSponsorLength == this.selectedItemsSponsorList.length){
  this._protocolNameList=[];
  this._sponsorList =[]
  this.selectedItemsProtocolNameList =[]
  this.selectedItemsSponsorList =[]
  this._protocolNameList = this._tempProtocolNameList;
  this._sponsorList = this._tempSponsorList;
  this.selectedItemsProtocolNameList = this._protocolNameList;
  this.selectedItemsSponsorList = this._sponsorList
}else {
  this.selectSponsorItems();  
}
// this.dropdownSettingsForProtocolName = {
//   singleSelection: false,
//   defaultOpen: true,
//   idField: "item_id",
//   textField: "protocolName",
//   selectAllText: "All",
//   unSelectAllText: "Unselect All",
//   itemsShowLimit: 0,
//   allowSearchFilter: true,
//   maxHeight:150         
// };

// this.dropdownSettingsForSponsor = {
//   singleSelection: false,
//   idField: "item_id",
//   textField: "CleanSponsor",
//   selectAllText: "All",
//   unSelectAllText: "Unselect All",
//   itemsShowLimit: 0,
//   allowSearchFilter: true,
//   maxHeight:160,
//   defaultOpen: "true",
// };
this.autoscrollList();
  }
  deselletItemALLForSponsorList(item){
    this.selectedItemsSponsorList = item
  if(this.selectedItemsSponsorList.length > 0){
    this.selectSponsorItems();

  }
  //this.expandSponsorTYpe()
  this.autoscrollList();
  }
  onItemDeSelectForForSponsorList(item){
    // this.selectedItemsSponsorList = item
  if(this.selectedItemsSponsorList.length > 0){
   this.selectSponsorItems(); 

  }
//  this.expandSponsorTYpe()
  this.autoscrollList();
  }
//-----------------------------------Protocol Name Change Event--------------------------------------------------------------    
  onItemSelectForProtocolNameList(){
  this.selectProtocolItems();  
  this.autoscrollList();
  }
  onItemALLSelectForProtocolNameList(items){    
  this.selectedItemsProtocolNameList = items;
//  this.selectProtocolItems();  
  if(this._selectedProtocolLength == this.selectedItemsProtocolNameList.length){
    this._protocolNameList=[];
    this._sponsorList =[]
    this.selectedItemsProtocolNameList =[]
    this.selectedItemsSponsorList =[]
    this._protocolNameList = this._tempProtocolNameList;
    this._sponsorList = this._tempSponsorList;
    this.selectedItemsProtocolNameList = this._protocolNameList;
    this.selectedItemsSponsorList = this._sponsorList
  }else {
    this.selectProtocolItems();  
  }
  
  this.autoscrollList();
  }
  deselletItemALLForProtocolNameList(itemSelect :any){
  this.selectedItemsProtocolNameList = itemSelect;
  if(this.selectedItemsProtocolNameList.length > 0){
    this.selectProtocolItems();
  }
  //this.expandSponsorTYpe()
  this.autoscrollList();
  }
  onItemDeSelectForProtocolNameList(itemDeselct :any){
//  this.selectedItemsProtocolNameList = itemDeselct;
    this._delectProtocolName =[]
    this._delectProtocolName = itemDeselct
    if(this.selectedItemsProtocolNameList.length > 0){
   this.selectProtocolItems();
 //  this.deleSelectSponsor();
  }
 // this.expandSponsorTYpe()
  this.autoscrollList();
  }
//-----------------------------------------------------

selectSponsorItems(){
  this._tempMultilevelFilterForSponsor =[]
  this._tempMultilevelFilterForTrailType =[]
  this._tempMultilevelFilterForProtocolname =[]
  this.outputProtocolNameForEachTimeValueLoad =[]
  this._protocolNameList =[]
  this.selectedItemsProtocolNameList =[]
  var i=0

  if(this._TrailFilterType.length>1){

  //   var arr = this._accelarateFilterResponse.filter((value,  index) => {    
  //     return value.CleanSponsor === this.selectedItemsSponsorList[0].CleanSponsor})
  //  {
  //   this._tempMultilevelFilterForProtocolname.push({protocolName :_allType.ProtocolName})
    
  //  } 
    for(const sponsorName of this.selectedItemsSponsorList){
      for(const _allType of this._accelarateFilterResponse){
        if(sponsorName.CleanSponsor == _allType.CleanSponsor){
          this._tempMultilevelFilterForProtocolname.push({protocolName :_allType.ProtocolName})
        }
      }
    }
  }else {
    for(const sponsorName of this.selectedItemsSponsorList){
      for(const _allType of this._accelarateFilterResponse){
        if(sponsorName.CleanSponsor == _allType.CleanSponsor && this._TrailFilterType[0] == _allType.TrialListType){
          this._tempMultilevelFilterForProtocolname.push({protocolName :_allType.ProtocolName})
        }
      }
    }
  }
 
//   for(let i=0;i<this._TrailFilterType.length;i++){
//     for(const _allType of this._accelarateFilterResponse){
//       if(_allType.TrialListType == this._TrailFilterType[i]){
//         this._tempMultilevelFilterForTrailType.push({protocolName:_allType.ProtocolName})
//       }
//     }
//   }  

//  for(const sponsorName of this.selectedItemsSponsorList){
//     for(const _allType of this._accelarateFilterResponse){
//       if(sponsorName.CleanSponsor == _allType.CleanSponsor){
//         this._tempMultilevelFilterForSponsor.push({protocolName :_allType.ProtocolName})
//       }
//     }
//   }

//   for(const _protocolNameTrailType of this._tempMultilevelFilterForTrailType){
//     for(const _protolNameSponsor of this._tempMultilevelFilterForSponsor){
//       if(_protolNameSponsor.protocolName == _protocolNameTrailType.protocolName){
//         this._tempMultilevelFilterForProtocolname.push({protocolName:_protolNameSponsor.protocolName})
//       }
//     }
//   }
  this.flags =[]
  for (let i = 0; i <this._tempMultilevelFilterForProtocolname.length; i++) {
    if (this.flags[this._tempMultilevelFilterForProtocolname[i].protocolName])
    continue;
    this.flags[this._tempMultilevelFilterForProtocolname[i].protocolName] = true;
    this.outputProtocolNameForEachTimeValueLoad.push({item_id: i,protocolName:this._tempMultilevelFilterForProtocolname[i].protocolName})
   } 
  this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad

  this._protocolNameList = this.outputProtocolNameForEachTimeValueLoad
  this.selectedItemsProtocolNameList = this._protocolNameList;
  if(this._protocolNameList.length >3){
    this._protocolDropDownLength = 'true' 
  }else{
    this._protocolDropDownLength = 'false' 
  }
}
selectProtocolItems(){
  this._tempMultilevelFilterForSponsor =[]
  this._tempMultilevelFilterForTrailType =[]
  this._tempMultilevelFilterForProtocolname =[]
  this.outputCleanSponsorForEachTimeValueLoad =[]
  this._sponsorList =[];
  this.selectedItemsSponsorList =[]
  var i=0

  if(this._TrailFilterType.length>1){


    for(const protocolName of this.selectedItemsProtocolNameList){
      for(const _allType of this._accelarateFilterResponse){
        
        if(protocolName.protocolName == _allType.ProtocolName){
          this._tempMultilevelFilterForSponsor.push({CleanSponsor :_allType.CleanSponsor})
        }
      }
    }

  }else {
    for(const protocolName of this.selectedItemsProtocolNameList){
      for(const _allType of this._accelarateFilterResponse){
        if(protocolName.protocolName == _allType.ProtocolName && this._TrailFilterType[0] == _allType.TrialListType){
          this._tempMultilevelFilterForSponsor.push({CleanSponsor :_allType.CleanSponsor})
        }
      }
    }
  }

//   for(let i=0;i<this._TrailFilterType.length;i++){
//     for(const _allType of this._accelarateFilterResponse){
//       if(_allType.TrialListType == this._TrailFilterType[i]){
//         this._tempMultilevelFilterForTrailType.push({CleanSponsor:_allType.CleanSponsor})
//       }
//     }
//   }
  

//  for(const protocolName of this.selectedItemsProtocolNameList){
//     for(const _allType of this._accelarateFilterResponse){
//       if(protocolName.protocolName == _allType.ProtocolName){
//         this._tempMultilevelFilterForProtocolname.push({CleanSponsor :_allType.CleanSponsor})
//       }
//     }
//   }

//   for(const _sponsorNameTrailType of this._tempMultilevelFilterForTrailType){
//     for(const _sponsorNameProtocol of this._tempMultilevelFilterForProtocolname){
//       if(_sponsorNameProtocol.protocolName == _sponsorNameTrailType.protocolName){
//         this._tempMultilevelFilterForSponsor.push({CleanSponsor:_sponsorNameProtocol.CleanSponsor})
//       }
//     }
//   }
  this.flags =[]
  for (let i = 0; i <this._tempMultilevelFilterForSponsor.length; i++) {
    if (this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor])
    continue;
    this.flags[this._tempMultilevelFilterForSponsor[i].CleanSponsor] = true;
    this.outputCleanSponsorForEachTimeValueLoad.push({item_id: i,CleanSponsor:this._tempMultilevelFilterForSponsor[i].CleanSponsor})
   } 
  this._sponsorList = this.outputCleanSponsorForEachTimeValueLoad
  this.selectedItemsSponsorList = this._sponsorList;
  if(this._sponsorList.length >3){
    this._sponsorDropDownLength = 'true' 
  }else{
    this._sponsorDropDownLength = 'false' 
  }
}

deleSelectSponsor(){
  this._tempMultilevelFilterForSponsor =[]
  this._tempMultilevelFilterForTrailType =[]
  this._tempMultilevelFilterForProtocolname =[]
  this.outputCleanSponsorForEachTimeValueLoad =[]
  this._sponsorList =[]
  this.selectedItemsSponsorList =[]
  var i=0

  for(const _allType of this._accelarateFilterResponse){
    if(_allType.TrialListType == this._TrailFilterType){
      this._tempMultilevelFilterForTrailType.push({CleanSponsor:_allType.CleanSponsor})
    }
  }

  var arr = this._accelarateFilterResponse.filter((value,  index) => {    
    return value.ProtocolName != this._delectProtocolName[0].protocolName})
 {
   console.log("CONTAINS" + JSON.stringify(arr))
 } 


//   let value = this._delectProtocolName[0].protocolName

//    let arr = this._tempMultilevelFilterForSponsor.CleanSponsor

//    arr = arr.filter(function(item) {
//     return item !== value
//    })


//  console.log(arr)

 for(const protocolName of this.selectedItemsProtocolNameList){
    for(const _allType of this._accelarateFilterResponse){
      if(protocolName.protocolName == _allType.ProtocolName){
        this._tempMultilevelFilterForProtocolname.push({CleanSponsor :_allType.CleanSponsor})
      }
    }
  }

  for(const _sponsorNameTrailType of this._tempMultilevelFilterForTrailType){
    for(const _sponsorNameProtocol of this._tempMultilevelFilterForProtocolname){
      if(_sponsorNameProtocol.protocolName == _sponsorNameTrailType.protocolName){
        this._tempMultilevelFilterForSponsor.push({CleanSponsor:_sponsorNameProtocol.CleanSponsor})
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

  this.selectedItemsSponsorList = this._sponsorList;
}

Apply(){
if(this.selectedItemsProtocolNameList.length>0 && this.selectedItemsSponsorList.length>0){
  this._tempMultilevelFilterForSponsor =[]
  this._tempMultilevelFilterForTrailType =[]
  this._tempMultilevelFilterForProtocolname =[]
  this.outputProtocolNameForEachTimeValueLoad =[]
  this.outputCleanSponsorForEachTimeValueLoad =[]
  this._ctProtocolID =[]
  this.flags=[]
  this._tempCTProtocolID =[]
  this._isStatus = false
  if(this._TrailFilterType.length>1){
    if(this.selectedItemsProtocolNameList.length == this._accelarateFilterResponse.length){
      this._ctProtocolID.length = this.selectedItemsProtocolNameList.length
      this._isStatus = true
    }else if(this.selectedItemsSponsorList.length == this._tempSponsorList.length){
      this._ctProtocolID.length = this.selectedItemsSponsorList.length
      this._isStatus = true
    }else{
      if(this._isStatus == false){
        for(let i=0;i< this.selectedItemsSponsorList.length;i++){
          for(const allListSponsorList of this._accelarateFilterResponse){
            if(allListSponsorList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
              this._tempMultilevelFilterForSponsor.push(allListSponsorList.CTProtocolID)
            }
          }
        } 
    
        for(let i=0;i<this.selectedItemsProtocolNameList.length;i++){
          for(const _allListProtocolList of this._accelarateFilterResponse){
            if(_allListProtocolList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName){
              this._tempMultilevelFilterForProtocolname.push(_allListProtocolList.CTProtocolID)
            }
          }
        }
    
        for(const _sponsorCTProtocolID of this._tempMultilevelFilterForSponsor){
          for(const _protocolCTProtocolID of this._tempMultilevelFilterForProtocolname){
            if(_protocolCTProtocolID == _sponsorCTProtocolID){
              this._tempCTProtocolID.push(_protocolCTProtocolID)
            }
          }
        }
    
        for (let i = 0; i <this._tempCTProtocolID.length; i++) {
          if (this.flags[this._tempCTProtocolID[i]])
          continue;
          this.flags[this._tempCTProtocolID[i]] = true;
          this._ctProtocolID.push(this._tempCTProtocolID[i])
         } 
      }
      // for(let i=0;i< this.selectedItemsSponsorList.length;i++){
      //   for(const allListSponsorList of this._accelarateFilterResponse){
      //     if(allListSponsorList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
      //       this._tempMultilevelFilterForSponsor.push(allListSponsorList.CTProtocolID)
      //     }
      //   }
      // } 
  
      // for(let i=0;i<this.selectedItemsProtocolNameList.length;i++){
      //   for(const _allListProtocolList of this._accelarateFilterResponse){
      //     if(_allListProtocolList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName){
      //       this._tempMultilevelFilterForProtocolname.push(_allListProtocolList.CTProtocolID)
      //     }
      //   }
      // }
  
      // for(const _sponsorCTProtocolID of this._tempMultilevelFilterForSponsor){
      //   for(const _protocolCTProtocolID of this._tempMultilevelFilterForProtocolname){
      //     if(_protocolCTProtocolID == _sponsorCTProtocolID){
      //       this._tempCTProtocolID.push(_protocolCTProtocolID)
      //     }
      //   }
      // }
  
      // for (let i = 0; i <this._tempCTProtocolID.length; i++) {
      //   if (this.flags[this._tempCTProtocolID[i]])
      //   continue;
      //   this.flags[this._tempCTProtocolID[i]] = true;
      //   this._ctProtocolID.push(this._tempCTProtocolID[i])
      //  } 
    }

    // for(let i=0;i< this.selectedItemsSponsorList.length;i++){
    //   for(const allListSponsorList of this._accelarateFilterResponse){
    //     if(allListSponsorList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
    //       this._tempMultilevelFilterForSponsor.push(allListSponsorList.CTProtocolID)
    //     }
    //   }
    // } 

    // for(let i=0;i<this.selectedItemsProtocolNameList.length;i++){
    //   for(const _allListProtocolList of this._accelarateFilterResponse){
    //     if(_allListProtocolList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName){
    //       this._tempMultilevelFilterForProtocolname.push(_allListProtocolList.CTProtocolID)
    //     }
    //   }
    // }

    // for(const _sponsorCTProtocolID of this._tempMultilevelFilterForSponsor){
    //   for(const _protocolCTProtocolID of this._tempMultilevelFilterForProtocolname){
    //     if(_protocolCTProtocolID == _sponsorCTProtocolID){
    //       this._tempCTProtocolID.push(_protocolCTProtocolID)
    //     }
    //   }
    // }

    // for (let i = 0; i <this._tempCTProtocolID.length; i++) {
    //   if (this.flags[this._tempCTProtocolID[i]])
    //   continue;
    //   this.flags[this._tempCTProtocolID[i]] = true;
    //   this._ctProtocolID.push(this._tempCTProtocolID[i])
    //  } 

    

  }else {
    for(let i=0;i< this.selectedItemsSponsorList.length;i++){
      for(const allListSponsorList of this._accelarateFilterResponse){
        if(allListSponsorList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor && this._TrailFilterType[0] == allListSponsorList.TrialListType){
          this._ctProtocolID.push(allListSponsorList.CTProtocolID)
        }
      }
    } 
  }

    
  //   for(let i=0;i<this._TrailFilterType.length;i++){
  //     for(const allListTrailType of this._accelarateFilterResponse){
  //       if(allListTrailType.TrialListType == this._TrailFilterType[i]){
  //         this._tempMultilevelFilterForTrailType.push(allListTrailType.CTProtocolID)
  //       }
  //     } 
  //   }
     

  //   for(let i=0;i< this.selectedItemsSponsorList.length;i++){
  //     for(const allListSponsorList of this._accelarateFilterResponse){
  //       if(allListSponsorList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
  //         this._tempMultilevelFilterForSponsor.push(allListSponsorList.CTProtocolID)
  //       }
  //     }
  //   } 

  // for(let i=0;i< this.selectedItemsProtocolNameList.length;i++){
  //   for(const allListProtocolList of this._accelarateFilterResponse){
  //     if(allListProtocolList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName){
  //       this._tempMultilevelFilterForProtocolname.push(allListProtocolList.CTProtocolID)
  //     }
  //   }
  // }

  // for(const _tempCTProtocolIDFortrailType of this._tempMultilevelFilterForTrailType){
  //   for(const __tempCTProtocolIDForSponsor of this._tempMultilevelFilterForSponsor){
  //     if(__tempCTProtocolIDForSponsor == _tempCTProtocolIDFortrailType){
  //       this.outputProtocolNameForEachTimeValueLoad.push(__tempCTProtocolIDForSponsor)
  //     }
  //   }
  // }

  // for(const _ctProtocolIDs of this.outputProtocolNameForEachTimeValueLoad){
  //   for(const _ctprotocolIDForProtocol of this._tempMultilevelFilterForProtocolname){
  //     if(_ctprotocolIDForProtocol == _ctProtocolIDs){
  //       this._ctProtocolID.push(_ctprotocolIDForProtocol);
  //     }
  //   }
  // }
  if(this._tempCTProtoColIDLength == this._ctProtocolID.length){
    this._ctProtocolID =['ALL']
    localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
    this.dashService.selectType('');
  }else{
    this._ctProtocolID = this._ctProtocolID;
    if((this.selectedItemsSponsorList.length == this._selectedSponsorLength) 
      && (this.selectedItemsProtocolNameList.length !=this._selectedProtocolLength)){
      this._selectedType =[{name :'Protocol Name'}]

      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('true');

    }else if((this.selectedItemsProtocolNameList.length == this._selectedProtocolLength) 
           && (this.selectedItemsSponsorList.length != this._selectedSponsorLength)){
      this._selectedType =[{name :'Sponsor'}]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('true');
    }else if((this.selectedItemsProtocolNameList.length != this._selectedProtocolLength) &&
             (this.selectedItemsSponsorList.length != this._selectedSponsorLength)){
      // this._selectedType =[{name :'Sponsor'},{name :'Protocol Name'}]
      this._selectedType =[{name :''}]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('');
    }else if((this.selectedItemsProtocolNameList.length == this._selectedProtocolLength) && 
             (this.selectedItemsSponsorList.length == this._selectedSponsorLength)){
      this._selectedType =[{name :''}]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('');
    }
   
  }
  this._sponsorFilterActiveState = 'true';
  this._protocolFilterActiveState = 'true'
  this.set_allSelectedElement();
  this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
  this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
  this.dashService.drawerState('true')
  // this._selectedType =[{name :'Trial Type List'},{name :'Sponsor'},{name :'Protocol Name'}]
 // this._selectedType =[{name :''}]
  // localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
  // this.dashService.selectType('true');
  // this.dashService.drawerState('true'); 
  //this._TrailFilterType = 'Other'
 // this.dashService.accelarateFilter('true') 
 // this.dashService.defaultToggle('true');
}else if(this.selectedItemsProtocolNameList.length>0 && this.selectedItemsSponsorList.length==0){
    this._tempMultilevelFilterForSponsor =[]
    this._tempMultilevelFilterForTrailType =[]
    this._tempMultilevelFilterForProtocolname =[]
    this.outputProtocolNameForEachTimeValueLoad =[]
    this.outputCleanSponsorForEachTimeValueLoad =[]
    this._ctProtocolID =[]

    if(this._TrailFilterType.length>1){

      if(this.selectedItemsProtocolNameList.length == this._accelarateFilterResponse.length){
        this._ctProtocolID.length = this.selectedItemsProtocolNameList.length
      }else{
        for(let i=0;i< this.selectedItemsProtocolNameList.length;i++){
          for(const allListSponsorList of this._accelarateFilterResponse){
            if(allListSponsorList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName){
              this._ctProtocolID.push(allListSponsorList.CTProtocolID)
            }
          }
        } 
      }      
    }else {
      for(let i=0;i< this.selectedItemsProtocolNameList.length;i++){
        for(const allListSponsorList of this._accelarateFilterResponse){
          if(allListSponsorList.ProtocolName == this.selectedItemsProtocolNameList[i].protocolName && this._TrailFilterType[0] == allListSponsorList.TrialListType){
            this._ctProtocolID.push(allListSponsorList.CTProtocolID)
          }
        }
      } 
    }
  
 
  if(this._tempCTProtoColIDLength == this._ctProtocolID.length){
    this._ctProtocolID =['ALL']
    if(this.selectedItemsProtocolNameList.length == this._selectedProtocolLength){
      this._selectedType =[{name :'Protocol Name'}]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('true');
    }else if(this.selectedItemsProtocolNameList.length>0 && this.selectedItemsProtocolNameList.length != this._selectedProtocolLength){
      this._selectedType =[{name :'Protocol Name'}]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('true');
    }else{
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('');
    }
    
  }else{
    this._ctProtocolID = this._ctProtocolID;

    if(this.selectedItemsProtocolNameList.length == this._selectedProtocolLength){
      this._selectedType =[{name :'Protocol Name'}]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('true');
    }else if(this.selectedItemsProtocolNameList.length>0 && this.selectedItemsProtocolNameList.length != this._selectedProtocolLength){
      this._selectedType =[{name :'Protocol Name'}]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('true');
    }
  }
  this._sponsorFilterActiveState = 'false';
  this._protocolFilterActiveState = 'true'
  this.set_allSelectedElement();
  this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
  this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
 // this._selectedType =[{name :'Trial Type List'},{name :'Protocol Name'}]
  // localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
  // this.dashService.selectType('true');
  this.dashService.drawerState('true'); 
  //this._TrailFilterType = 'Other'
 // this.dashService.accelarateFilter('true') 
  this.dashService.defaultToggle('true');

}else if(this.selectedItemsProtocolNameList.length==0 && this.selectedItemsSponsorList.length>0){
  this._tempMultilevelFilterForSponsor =[]
  this._tempMultilevelFilterForTrailType =[]
  this._tempMultilevelFilterForProtocolname =[]
  this.outputProtocolNameForEachTimeValueLoad =[]
  this.outputCleanSponsorForEachTimeValueLoad =[]
  this._ctProtocolID =[]

  if(this._TrailFilterType.length>1){
    if(this.selectedItemsSponsorList.length == this._accelarateFilterResponse.length){
      this._ctProtocolID.length = this.selectedItemsSponsorList.length
    }else{
    for(let i=0;i< this.selectedItemsSponsorList.length;i++){
      for(const allListSponsorList of this._accelarateFilterResponse){
        if(allListSponsorList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
          this._ctProtocolID.push(allListSponsorList.CTProtocolID)
        }
      }
    } 
  }
  }else {
    for(let i=0;i< this.selectedItemsSponsorList.length;i++){
      for(const allListSponsorList of this._accelarateFilterResponse){
        if(allListSponsorList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor && this._TrailFilterType[0] == allListSponsorList.TrialListType){
          this._ctProtocolID.push(allListSponsorList.CTProtocolID)
        }
      }
    } 
  }
 
//   for(let i=0;i<this._TrailFilterType.length;i++){
//     for(const allListTrailType of this._accelarateFilterResponse){
//       if(allListTrailType.TrialListType == this._TrailFilterType[i]){
//         this._tempMultilevelFilterForTrailType.push(allListTrailType.CTProtocolID)
//       }
//     }  
//   }
 

//   for(let i=0;i< this.selectedItemsSponsorList.length;i++){
//     for(const allListSponsorList of this._accelarateFilterResponse){
//       if(allListSponsorList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
//         this._tempMultilevelFilterForSponsor.push(allListSponsorList.CTProtocolID)
//       }
//     }
//   } 


// for(const _tempCTProtocolIDFortrailType of this._tempMultilevelFilterForTrailType){
//   for(const __tempCTProtocolIDForSponsor of this._tempMultilevelFilterForSponsor){
//     if(__tempCTProtocolIDForSponsor == _tempCTProtocolIDFortrailType){
//       this._ctProtocolID.push(__tempCTProtocolIDForSponsor)
//     }
//   }
// }
if(this._tempCTProtoColIDLength == this._ctProtocolID.length){
  this._ctProtocolID =['ALL']
  if(this.selectedItemsSponsorList.length == this._selectedSponsorLength){
    this._selectedType =[{name :'Sponsor'}]
    localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
    this.dashService.selectType('true');
  }else if(this.selectedItemsSponsorList.length >0){
    this._selectedType =[{name :'Sponsor'}]
    localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
   this.dashService.selectType('true');
  }else {
    localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
    this.dashService.selectType('');
  }  
}else{
  this._ctProtocolID = this._ctProtocolID;
  if(this.selectedItemsSponsorList.length == this._selectedSponsorLength){
      this._selectedType =[{name :'Sponsor'}]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
      this.dashService.selectType('true');
    }else if(this.selectedItemsSponsorList.length >0 && this.selectedItemsSponsorList.length != this._selectedSponsorLength){
      this._selectedType =[{name :'Sponsor'}]
      localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
     this.dashService.selectType('true');
    }
}
this._sponsorFilterActiveState = 'true';
this._protocolFilterActiveState = 'false'
this.set_allSelectedElement();
this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
//this._selectedType =[{name :'Trial Type List'},{name :'Sponsor'}]
// localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
// this.dashService.selectType('true');
this.dashService.drawerState('true'); 
//this._TrailFilterType = 'Other'
//this.dashService.accelarateFilter('true') 
this.dashService.defaultToggle('true');
}else if(this.selectedItemsProtocolNameList.length==0 && this.selectedItemsSponsorList.length==0){
  this._tempMultilevelFilterForSponsor =[]
  this._tempMultilevelFilterForTrailType =[]
  this._tempMultilevelFilterForProtocolname =[]
  this.outputProtocolNameForEachTimeValueLoad =[]
  this.outputCleanSponsorForEachTimeValueLoad =[]
  this._ctProtocolID =[]


  
   for(let i=0;i<this._TrailFilterType.length;i++){
    for(const allListTrailType of this._accelarateFilterResponse){
      if(allListTrailType.TrialListType == this._TrailFilterType[i]){
        this._ctProtocolID.push(allListTrailType.CTProtocolID)
      }
    }
   }
     
    
    if(this._tempCTProtoColIDLength == this._ctProtocolID.length){
      this._ctProtocolID =['ALL']
    }else{
      this._ctProtocolID = this._ctProtocolID;
      this._selectedType =[{name :''}]
    }
   
    this.set_allSelectedElement();
    this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
    this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
   // this._selectedType =[{name :''}]
    localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
    this.dashService.selectType('false');
    this.dashService.drawerState('true'); 
   // this._TrailFilterType = 'Other'
   // this.dashService.accelarateFilter('true') 
    this.dashService.defaultToggle('true');
}  

}
ResetButton(){
  this._ctProtocolID =[]
  this.dashService.drawerState('true')
  if(this._TrailFilterType.length>1){
    this._ctProtocolID =['ALL']
    this.set_allSelectedElement();
    this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
    this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
    this._selectedType =[{
      name:''
    }]
    localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
   
    this.dashService.selectType('')
    // this.dashService.drawerState('true')
    // //this._TrailFilterType = 'Other'
    // this.dashService.defaultToggle('true');
  //  this.dashService.accelarateFilter('true')
  // this.dashService.drawerState('true')
  this.getInitialFilterPopulated();

  }else {
    for(const _allResponse of this._accelarateFilterResponse){
      if(_allResponse.TrialListType == this._TrailFilterType[0]){
        this._ctProtocolID.push(_allResponse.CTProtocolID)
      }
    }

    this.set_allSelectedElement();
    this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
    this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
    this._selectedType =[{
      name:''
    }]
    localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))   
    this.dashService.selectType('')
    //this.dashService.accelarateFilter('true')
    // this.dashService.drawerState('true')
    this.getInitialFilterPopulated();
    
  }
  this._sponsorFilterActiveState = 'false';
  this._protocolFilterActiveState = 'false'
  //this.dashService.drawerState('true')
  // this._ctProtocolID =['ALL']
  // this.set_allSelectedElement();
  // this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
  // this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
  // this._selectedType =[{
  //   name:''
  // }]
  // localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
 
  // this.dashService.selectType('')
  // this.dashService.drawerState('true')
  // //this._TrailFilterType = 'Other'
  // this.dashService.defaultToggle('true');
  // this.dashService.accelarateFilter('true')
//  this.showLoading = true;
//  this._TrailFilterType = 'Other'
//  this.getInitialFilterPopulated();
}
//-----------------------------------------------------
set_allSelectedElement(){
  this.dataStoreServices.set_AccelarateFilterType(this._TrailFilterType)
  this.dataStoreServices.set_accerateFilterALLResponse(this._accelarateFilterResponse)
  // this.dataStoreServices.set_TrailTypeSetFilterElement(this.selectedItemsTrailList)
  this.dataStoreServices.set_TrailTypeSetFilterElement(this._TrailFilterType)
  this.dataStoreServices.set_SponTypeSetFilterElement(this.selectedItemsSponsorList)
  this.dataStoreServices.set_ProtocolTypeFilterElement(this.selectedItemsProtocolNameList)
}


defaultDropDownList(){
  this.dropdownSettingsForSponsor = {
    singleSelection: false,
    defaultOpen: false,
    idField: "item_id",
    textField: "CleanSponsor",
    selectAllText: "All",
    unSelectAllText: "Unselect All",
    itemsShowLimit: 0,
    allowSearchFilter: true,
    maxHeight:130,
   
  };    
  
  this.dropdownSettingsForProtocolName = {
    singleSelection: false,
    defaultOpen: false,
    idField: "item_id",
    textField: "protocolName",
    selectAllText: "All",
    unSelectAllText: "Unselect All",
    itemsShowLimit: 0,
    allowSearchFilter: true,
    maxHeight:120         
  };
}



getDashBoardLoad(){
  this.expandEDSponsorTYpe = false
  this.expandEDProtocolTYpe = false

  this._tempMultilevelFilterForSponsor =[]
  this._tempMultilevelFilterForTrailType =[]
  this._tempMultilevelFilterForProtocolname =[]
  this.outputProtocolNameForEachTimeValueLoad =[]
  this.outputCleanSponsorForEachTimeValueLoad =[]
  this._ctProtocolID =[]


  if(this._TrailFilterType.length>1){
    // for(let i=0;i< this.selectedItemsSponsorList.length;i++){
    //   for(const allListSponsorList of this._accelarateFilterResponse){
    //     if(allListSponsorList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor){
    //       this._ctProtocolID.push(allListSponsorList.CTProtocolID)
    //     }
    //   }
    // } 
    this._ctProtocolID.length = this._accelarateFilterResponse.length
  }else {
    // for(let i=0;i< this.selectedItemsSponsorList.length;i++){
    //   for(const allListSponsorList of this._accelarateFilterResponse){
    //     if(allListSponsorList.CleanSponsor == this.selectedItemsSponsorList[i].CleanSponsor 
    //       && this._TrailFilterType[0] == allListSponsorList.TrialListType){
    //       this._ctProtocolID.push(allListSponsorList.CTProtocolID)
    //     }
    //   }
    // } 

    
      this._accelarateFilterResponse.map((obj1 : any) => {
        if(this._TrailFilterType[0] == obj1.TrialListType){
          this._ctProtocolID.push(obj1.CTProtocolID)
        }      
      });

  }

   
  if(this._tempCTProtoColIDLength == this._ctProtocolID.length){
    this._ctProtocolID =['ALL']
  }else{
    this._ctProtocolID = this._ctProtocolID;
  }
 
  this.set_allSelectedElement();
  this.dataStoreServices.set_city_protocolID(this._ctProtocolID)
  this.dashService.updateSponsorNameRestDashboard(this._ctProtocolID);
  // this._selectedType =[{name :'Trial Type List'},{name :'Sponsor'},{name :'Protocol Name'}]
  this._selectedType =[{name :''}]
  localStorage.setItem('dashBoardActiveType',JSON.stringify(this._selectedType))
  this.dashService.selectType('');
 // this.dashService.drawerState('true'); 
  //this._TrailFilterType = 'Other'
 // this.dashService.accelarateFilter('true') 
//  this.dashService.defaultToggle('true');
}
autoscrollList(){
  if(this.selectedItemsProtocolNameList.length >3){
    this._protocolDropDownLength = 'true' 
  }else{
    this._protocolDropDownLength = 'false' 
  }

if(this.selectedItemsSponsorList.length >3){
    this._sponsorDropDownLength = 'true' 
  }else{
    this._sponsorDropDownLength = 'false' 
  }
}

getBaseUrl(): string {
  var currentAbsoluteUrl = window.location.href;
  var currentRelativeUrl = this.router.url;
  var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
  var baseUrl: string = currentAbsoluteUrl.substring(0, index);
  return baseUrl;
}

ngOnDestroy() { 
    if(this._sponsorAPIResponse != undefined)
    this._sponsorAPIResponse.unsubscribe();  
    if(this._stopPropogateResponse != undefined)
    this._stopPropogateResponse.unsubscribe(); 
    // if(this._toggleServices != undefined)
    // this._toggleServices.unsubscribe();
}
}
