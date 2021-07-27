import { Component, OnDestroy, OnInit ,AfterViewInit,ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { NavigationEnd } from "@angular/router";
import { ElementRef } from "@angular/core";
import { DashboardService } from "../dashboard/dashboard.service";
import * as _ from "lodash";
import { Observable } from "rxjs";
import { AuthenticationService } from "./../auth/auth.service";
import { ViewportScroller } from "@angular/common";
import {SharedSessionService} from '../common/sharedsession.service'
import {SiteDetailsComponent} from '../../../src/app/dashboard/site-details/site-details.component'
import{DataService} from '../../app/common/data.service'

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy,AfterViewInit {
  isLoggedIn$: Observable<boolean>;
  sessionId: string;
  XSRFToken: string;
  @ViewChild("body") body: ElementRef;
  siteMapClear: SiteDetailsComponent
  logo: any = this.getBaseUrl() + "/assets/icon/covance_logo.png";
  headerHide : any;
  _headerHide:any;
  _sponsorName:any;
  _headerStatus :any;
  _header:any;
  sponsorName:any;
  sponsorSelect :any;
  sponsorListResponse =[]
  sponsorList =[]

  listHidden = true;
  showError = false;
  selectedIndex = -1;
  list :any =[]
  filteredList: string[] = [];
  keyword = 'name';
  tempSponsorname :any =''
  _headerSupplier :any
  _headerStatusSupplier :any
  @ViewChild('autoComplete') autoComplete;
  flags = [];
  flagsTralType =[]
  outputCleanSponsor = [];
  outputTrialListType =[];
  outputProtocolName =[]
  constructor(
    private dashservice: DashboardService,
    private authService: AuthenticationService,
    private sharedService: SharedSessionService,
    readonly viewportScroller: ViewportScroller,
    private router: Router,
    private dataStoreServices : DataService
  ) {
    this._headerStatus = ''
    this._headerStatusSupplier =''
  }
  scrollTop(event) {
    console.log("scrolling to top of page", event);
    window.scrollTo(0, 0);
    this.viewportScroller.scrollToPosition([0, 0]);
  }
  selectedSponsor: string = "ROCHE";
  //selectedSponsor: string;
  Sponsors = [
    "ABBVIE",
    "ASTRAZENECA",
    "BAYER",
    "BOEHRINGER INGELHEIM",
    "BRISTOL-MYERS SQUIBB",
    "CELGENE",
    "ELI LILLY",
    "GILEAD",
    "JANSSEN",
    "MERCK",
    "NOVARTIS",
    "PFIZER",
    "ROCHE",
    "SANOFI",
  ];

  onSponsSelection() {
    console.log("Header - Sponsor selection changed" + this.selectedSponsor);
    // debugger
    
    this.dashservice.updateSponsor(this.selectedSponsor);
    let protocolsList =''
    this.dashservice.protolNumberUpdate(protocolsList)
    this.dashservice.loadER('true')
  }
  onsponsornameChanged(inputChanged){
    this.sponsorSelect = inputChanged.name;
    this.tempSponsorname = this.sponsorSelect
    localStorage.setItem('selectedSponsor', this.sponsorSelect)
    this.dashservice.updateSponsorNameRestDashboard(this.sponsorSelect);
  }

  onFocused(e) {
    // do something
      this.autoComplete.clear();
  //  this.countries = this.countries;
  }

  ngOnInit() {
    console.log("header component OnInit");
   
    let sponsor = localStorage.getItem("sponsor_name");
    if(sponsor === '' || sponsor === null){
      this.selectedSponsor = 'ROCHE';
    }else{
      this.selectedSponsor = sponsor
    }
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }


  onFocusedout(){
    if(this.sponsorSelect == ''){
      this.sponsorSelect = this.tempSponsorname
    }
    
  }

  ngAfterViewInit(){   
   
    this._headerHide =  this.dashservice.headerInformation.subscribe((response) =>{     
      this.headerHide  = response;
      console.log('header information' + this.headerHide)
   });

   //---------------Forecasting Dashboard-------------------------

   this._header = this.dashservice.headerComing.subscribe((response)=>{
    this.list =[]
   this.sponsorList =[]; 
   this.filteredList =[];
   this.sponsorListResponse =[];
    this._headerStatus = response
   this.tempSponsorname =''
     this.sponsorSelect =''
     if(this._headerStatus == 'forecasting'){

      this.sponsorSelect = ['ALL'];  
      //  this.sponsorSelect = 'ALL';
       localStorage.setItem('selectedSponsor', this.sponsorSelect)
      this.tempSponsorname = this.sponsorSelect
      // this.dashservice.accelarateFilter('true')
      this.dashservice.updateSponsorNameRestDashboard(this.sponsorSelect);

      //  this.dashservice.getsponsor().subscribe((responseSponsor)=>{
      //    this.sponsorListResponse = responseSponsor;
      //    for(let i=0;i<this.sponsorListResponse.length;i++){
      //    this.list.push({name:this.sponsorListResponse[i].Sponsor})
      //    } 
      //    this.sponsorSelect = ['ALL'];  
      //   //  this.sponsorSelect = 'ALL';
      //    localStorage.setItem('selectedSponsor', this.sponsorSelect)
      //   this.tempSponsorname = this.sponsorSelect
      //   this.dashservice.accelarateFilter('true')
      //   this.dashservice.updateSponsorNameRestDashboard(this.sponsorSelect);
      //  });
     }     
  });

  
   //-------------KO-Dashboard ------------------------------------
   this._header = this.dashservice.headerComing.subscribe((response)=>{
     this.list =[]
    this.sponsorList =[]; 
    this.filteredList =[];
    this.sponsorListResponse =[];
     this._headerStatus = response
    this.tempSponsorname =''
      this.sponsorSelect =''
      if(this._headerStatus == 'true'){
        this.dashservice.getsponsor().subscribe((responseSponsor)=>{
          this.sponsorListResponse = responseSponsor;
          for(let i=0;i<this.sponsorListResponse.length;i++){
            // this.sponsorList.push(this.sponsorListResponse[i].Sponsor)
            this.list.push({name:this.sponsorListResponse[i].Sponsor})
          }   
      //  let sponsorListName = JSON.parse(localStorage.getItem('sponsorList'))
        //  console.log(value)
        //  this.list = sponsorListName
          this.sponsorSelect = 'ALL';
          localStorage.setItem('selectedSponsor', this.sponsorSelect)
         this.tempSponsorname = this.sponsorSelect
          //this.sponsorSelect = this.list[0].name
       //   this.dashservice.batchSecondLoadMethod('true')
         this.dashservice.updateSponsorNameRestDashboard(this.sponsorSelect);
        });
    
       
      }
      // this.dashservice.getsponsor().subscribe((response)=>{
      //   this.sponsorListResponse = response;
      //   for(let i=0;i<this.sponsorListResponse.length;i++){
      //     this.sponsorList.push(this.sponsorListResponse[i].Sponsor)
      //   }      

      // });
  
      // this.sponsorSelect = this.sponsorList[0]
      // this.dashservice.updateSponsorNameRestDashboard(this.sponsorSelect);
   });
   //-------------KO-Supplier ------------------------------------
   this._headerSupplier = this.dashservice.headerComingSuppler.subscribe((response)=>{
    this.list =[]
    this.sponsorList =[]; 
    this.filteredList =[];
    this.sponsorListResponse =[];
     this._headerStatusSupplier = response
    this.tempSponsorname =''
      this.sponsorSelect =''
      if(this._headerStatusSupplier == 'true'){
        this.dashservice.getsponsorForSupplier().subscribe((responseSponsor)=>{
          this.sponsorListResponse = responseSponsor;
          for(let i=0;i<this.sponsorListResponse.length;i++){
             this.list.push({name:this.sponsorListResponse[i].Sponsor})
          }    
          // this.sponsorSelect = 'ROCHE';
          this.sponsorSelect = 'ALL';
          this.tempSponsorname = this.sponsorSelect
          this.dashservice.updateSponsorNameRestDashboard(this.sponsorSelect);
        });       
      }
   })

  }

  onLogout() {
    console.log("header component OnLogout");
    this._header.unsubscribe();
    this._headerStatus = ''
    this._headerStatusSupplier =''
    this.authService.logout();
   //this.siteMapClear.clearMapData();
  // this.dashservice.updateGoogleMapdata().
    //this.dashservice.updateSponsor("Roche");
  }

  sponsorChangeVisible(): boolean {
    if (this.sharedService.changeSponsor == true) return true;
    else return false;
  }

  ngOnDestroy() {
    if (this._headerHide != undefined)
    this._headerHide.unsubscribe();
   if(this._header != undefined)
   this._header.unsubscribe()
   if(this._headerSupplier != undefined)
   this._headerSupplier.unsubscribe()
  }
  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }

 
//------------------------------------------------------------

getFilteredList() {

  this.listHidden = false;
  // this.selectedIndex = 0;
  if (!this.listHidden && this.sponsorSelect !== undefined) {
    this.filteredList = this.list.filter((item) => item.toLowerCase().startsWith(this.sponsorSelect.toLowerCase()));
  //   this.filteredList = this.list
  }
}

// select highlighted item when enter is pressed or any item that is clicked
selectItem(ind) {

  this.sponsorSelect = this.filteredList[ind];
  this.listHidden = true;
  this.selectedIndex = ind;
  
  this.dashservice.updateSponsorNameRestDashboard(this.sponsorSelect);
}

// navigate through the list of items
onKeyPress(event) {
 
  if (!this.listHidden) {
    if (event.key === 'Escape') {
      this.selectedIndex = -1;
      this.toggleListDisplay(0);
    }

    if (event.key === 'Enter') {

      this.toggleListDisplay(0);
    }
    if (event.key === 'ArrowDown') {

      this.listHidden = false;
      this.selectedIndex = (this.selectedIndex + 1) % this.filteredList.length;
      if (this.filteredList.length > 0 && !this.listHidden) {
        document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
      }
    } else if (event.key === 'ArrowUp') {

      this.listHidden = false;
      if (this.selectedIndex <= 0) {
        this.selectedIndex = this.filteredList.length;
      }
      this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;

      if (this.filteredList.length > 0 && !this.listHidden) {

        document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
      }
    }
  } 
}

// show or hide the dropdown list when input is focused or moves out of focus
toggleListDisplay(sender: number) {

  if (sender === 1) {
    // this.selectedIndex = -1;
    this.listHidden = false;
    this.getFilteredList();
  } else {
    // helps to select item by clicking
    setTimeout(() => {
      this.selectItem(this.selectedIndex);
      this.listHidden = true;
      if (!this.list.includes(this.sponsorSelect)) {
        this.showError = true;
        this.filteredList = this.list;
      } else {
        this.showError = false;
      }
    }, 500);
  }
}

}
