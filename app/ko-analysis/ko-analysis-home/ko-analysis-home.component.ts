import { Component, OnInit ,AfterViewInit,OnDestroy,HostListener,
  ViewChild, ViewChildren, ElementRef,   QueryList} from '@angular/core';
 import { DashboardService } from "../../dashboard/dashboard.service";
import { Router } from "@angular/router";
import {DataService} from '../../common/data.service'
import {DialogSessionComponent} from '../../common/dialog-session/dialog-session.component'
import { MatDialog } from "@angular/material/dialog";
import { AuthenticationService } from "../../auth/auth.service";
import { Idle, DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";
import { Subject,Subscription } from 'rxjs';
// import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
@Component({
  selector: 'app-ko-analysis-home',
  templateUrl: './ko-analysis-home.component.html',
  styleUrls: ['./ko-analysis-home.component.less']
})
export class KoAnalysisHomeComponent implements OnInit {
  interval :any =0;
  interValTimeOut;
  _forCastsessionTimeOut:any
  _stopSessionBackGroundServices : any;
  userInactive: Subject<any> = new Subject();
  Isexacta : any;
  dynamicMessage :any
  messageResponse :any
  private IsexactaTableDisplay : any;
  private _IsExacata :any;
  sponsorName:any =[];
  sponsorSelect :any;
  sponsorListResponse:any
 // list:any =[]
  public data = [];
  public settings = {};
  public selectedItems = [];
  @ViewChild('scrollframe',{static: false}  as any) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  showFiller = false;
  @ViewChild('multiSelect') multiSelect;
  filter: any = this.getBaseUrl() + "/assets/icon/filter_item.png";
  checkboxGroup: FormGroup;
  checkboxGroupTrialListType:FormGroup
  checkboxGroupProtocolName:FormGroup
  submittedValue: any;
  subscription: Subscription;
  subscriptionTrialType:Subscription
  subscriptionProtocol:Subscription;
  _sponsorAccFilter :any
  //checkboxes:any =[]
  checkboxesSponsorFilter :any =[]
  checkboxesTrialFilter :any =[]
  checkboxesProtolName :any =[]
  _AllFilterList :any

  _tempSponsorList =[]
  _tempTrialTypeList =[]
  _tempProtocolNameList =[]

  _selectSponsorName :any
  
  _sponsorAPIResponse:any;
  checkboxes = [{
    name: 'Value 1',
    value: 'value-1'
  }, {
    name: 'Value 2',
    value: 'value-2'
  }, {
    name: 'Value 3',
    value: 'value-3'
  },{
    name: 'Value 1',
    value: 'value-1'
  }, {
    name: 'Value 2',
    value: 'value-2'
  }, {
    name: 'Value 3',
    value: 'value-3'
  },{
    name: 'Value 1',
    value: 'value-1'
  }, {
    name: 'Value 2',
    value: 'value-2'
  }, {
    name: 'Value Demo 3',
    value: 'value Demo-3'
  }, {
    name: 'Memo 3',
    value: 'Memo-3'
  }];
  searchText: string;
  searchTextSponsor:any
  isBooleanSideDrawer :any =''
    
  constructor(private dashService: DashboardService,private route: Router ,private dataServices: DataService,public dialog: MatDialog,
    private fb: FormBuilder,private formBuilder: FormBuilder) {
    this.checkboxesSponsorFilter =[]
    this.checkboxesTrialFilter  =[]
    this.checkboxesProtolName  =[]
    this._tempSponsorList =[]
    this._tempTrialTypeList =[]
    this._tempProtocolNameList =[]
    this.dashService.headerStatusValue('true') 
    // this.dashService.headerStatusValue('true')  
    
    this.Isexacta = false;
    this.IsexactaTableDisplay = false
    this.startTime();
    this.userInactive.subscribe(() => 
    this.getDialog()
    );

  //   //-----------------To Generate the sponsors-------------------------------
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
  //   this._AllFilterList = JSON.parse(localStorage.getItem('accelarateFilterRes'))
  //   this.checkboxesSponsorFilter = JSON.parse(localStorage.getItem('disticntSponsorList'))
  //   return this.checkboxesSponsorFilter
  // }

  // getTrailType(){
  //   this.checkboxesTrialFilter = JSON.parse(localStorage.getItem('disticntTrialListType'))
  //   this._tempTrialTypeList = this.checkboxesTrialFilter;
  //   return this.checkboxesTrialFilter
  // }

  // getProtocolName(){
  //   this.checkboxesProtolName = JSON.parse(localStorage.getItem('disticntprotolColName'))
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

  //   // this.checkboxesProtolName =[]
  //   // this._tempProtocolNameList =[]
  //   // this.checkboxesProtolName = JSON.parse(localStorage.getItem('disticntprotolColName'))
  //   // this._tempProtocolNameList = this.checkboxesProtolName;
  // }

  //----------------------------------------------------------------
   @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.interval);
    this.startTime();
  }

  ngOnInit() {
    // this._tempSponsorList =[]
    // this._tempTrialTypeList =[]
    // this._tempProtocolNameList =[]
    // //this._AllFilterList = JSON.parse(localStorage.getItem('accelarateFilterRes'))
    // this.checkboxesSponsorFilter = JSON.parse(localStorage.getItem('disticntSponsorList'))
    // this._tempSponsorList = this.checkboxesSponsorFilter;
    // this.checkboxGroup = this.fb.group({
    //   checkboxesSponsorFilter: this.fb.array(this.checkboxesSponsorFilter.map(x => false))
    //   // Form Array to set default values
    //   // checkboxes: this.fb.array(this.checkboxes.map(x => this.defaultValues.includes(x.value) ? x.value : null))
    // });

    // const checkboxControl = (this.checkboxGroup.controls.checkboxesSponsorFilter as FormArray);
    // this.subscription = checkboxControl.valueChanges.subscribe(checkbox => {
    //   checkboxControl.setValue(
    //     checkboxControl.value.map((CleanSponsor, i) => CleanSponsor ? this.checkboxesSponsorFilter[i].CleanSponsor : ''),
    //     { emitEvent: false }
    //   );

    //   this._selectSponsorName = this.checkboxGroup.controls.checkboxesSponsorFilter.value
    //   console.log(this._selectSponsorName)

    // });

    // //---------------------------------------------------------------------
    //  this.checkboxesTrialFilter = JSON.parse(localStorage.getItem('disticntTrialListType'))
    //  this._tempTrialTypeList = this.checkboxesTrialFilter;
    // this.checkboxGroupTrialListType = this.fb.group({
    //   checkboxesTrialFilter: this.fb.array(this.checkboxesTrialFilter.map(x => false))
    //   // Form Array to set default values
    //   // checkboxes: this.fb.array(this.checkboxes.map(x => this.defaultValues.includes(x.value) ? x.value : null))
    // });

    // const checkboxControlTrialType = (this.checkboxGroupTrialListType.controls.checkboxesTrialFilter as FormArray);
    // this.subscriptionTrialType = checkboxControlTrialType.valueChanges.subscribe(checkbox => {
    //   checkboxControlTrialType.setValue(
    //     checkboxControlTrialType.value.map((TrialListType, i) => TrialListType ? this.checkboxesTrialFilter[i].TrialListType : false),
    //     { emitEvent: false }
    //   );
    // });

    //--------------------------------------------
    // this.checkboxesProtolName = JSON.parse(localStorage.getItem('disticntprotolColName'))
    // this._tempProtocolNameList = this.checkboxesProtolName;
    // this.checkboxGroupProtocolName = this.fb.group({
    //   checkboxesProtolName: this.fb.array(this.checkboxesProtolName.map(x => false))
    //   // Form Array to set default values
    //   // checkboxes: this.fb.array(this.checkboxes.map(x => this.defaultValues.includes(x.value) ? x.value : null))
    // });

    // const checkboxControlprotolColName = (this.checkboxGroupProtocolName.controls.checkboxesProtolName as FormArray);
    // this.subscriptionProtocol = checkboxControlprotolColName.valueChanges.subscribe(checkbox => {
    //   checkboxControlprotolColName.setValue(
    //     checkboxControlprotolColName.value.map((protocolName, i) => protocolName ? this.checkboxesProtolName[i].protocolName : false),
    //     { emitEvent: false }
    //   );
    // });
  }
   getDialog(){
  
    let message = '';
    clearInterval(this.interval);
    let username = localStorage.getItem('UserName')
    if(username == '' || username == null){
      this.userInactive.unsubscribe();
    }else{
      const dialogRef = this.dialog.open(DialogSessionComponent, {
     
        disableClose: true,
        data: { message: 'message' },
      });
    }
   
  }

   startTime() {
  this.interval = setTimeout(() => this.userInactive.next(undefined), 6000000);     
   }

  backButtonActivity(){
    this.dashService.headerStatusValue('')
    this.dashService.forCastDate('')
    this.dashService.exactaDisplayTable('false')
    localStorage.removeItem('noOfClick')
    clearTimeout(this.interval);
    clearInterval(this.interval)
    localStorage.setItem('clearSession','true')
    localStorage.removeItem('noOfClick')
    // this.idle.clearInterrupts();
    // this.dashBoard.clearsessionTimeOut('true')
    this.dashService.updateSponsorNameRestDashboard('');
    this.userInactive.unsubscribe();
    this.dataServices.set_ko_demand_type('')
    this.dataServices.set_filter_date('')
    this.dashService.ship_desease_filter('')
     this.route.navigate(["home/landing"]);
  }
  ngAfterViewInit() {

    // this._sponsorAPIResponse = this.dashService.sponsorNameRestDashB.subscribe((response)=>{
    //   this.checkboxesProtolName =[]
    //   this._sponsorAccFilter = localStorage.getItem('accelarateFilterRes');
    //   this.checkboxesSponsorFilter =JSON.parse(this._sponsorAccFilter)

    //   // this.checkboxesProtolName = JSON.parse(localStorage.getItem('disticntprotolColName'))
    //   // this._tempProtocolNameList = this.checkboxesProtolName;

    //   this.checkboxGroupProtocolName = this.formBuilder.group({
    //     checkboxesProtolName: new FormArray([])
    //   });
    //   of(this.getProtocolNameLoadMenu()).subscribe(checkboxesProtolName => {
    //     this.checkboxesProtolName = checkboxesProtolName;
    //     this.addCheckboxesProtocolName();
    //   });

    // })
    // this._sponsorAPIResponse = this.dashService.sponsorNameRestDashB.subscribe((response)=>{
    //   let sponsorName = response;
    //   if(sponsorName != ''){
    //     this.isBooleanSideDrawer = 'true'
    //   }
    // })
    

        this._IsExacata = this.dashService.exactaDisplay.subscribe((response) =>{       
    }) 

    this.dynamicMessage = this.dashService.dynamicMessageSection.subscribe((response)=>{
      let messageItem = response
      if(messageItem == '0'){
        this.messageResponse = 'No Record Found'
      }else {
        this.messageResponse = ''
      }
    })
  }

onsponsornameChanged(){  
  this.dashService.updateSponsorNameRestDashboard(this.sponsorSelect);
}
submit() {
  // const checkboxControl = (this.checkboxGroup.controls.checkboxes as FormArray);
  // const formValue = {
  //   ...this.checkboxGroup.value,
  //   checkboxes: checkboxControl.value.filter(value => !!value)
  // }
  // this.submittedValue = formValue;
}
ngOnDestroy() {
 if (this._IsExacata != undefined)
  this._IsExacata.unsubscribe();
  if(this.dynamicMessage != undefined)
  this.dynamicMessage.unsubscribe();  
  if(this.subscription != undefined) 
  this.subscription.unsubscribe();
  if(this._sponsorAPIResponse != undefined)
  this._sponsorAPIResponse.unsubscribe()
  if(this.subscriptionTrialType != undefined)
  this.subscriptionTrialType.unsubscribe();
  if(this.subscriptionProtocol != undefined)
  this.subscriptionProtocol.unsubscribe();
}

getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.route.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }

}
