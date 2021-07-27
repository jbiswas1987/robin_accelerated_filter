import { Component, OnInit, ChangeDetectorRef, OnDestroy,HostListener, ViewChildren, ElementRef,   QueryList } from "@angular/core";
import { Router } from "@angular/router";
import { GridComponent, Grid } from "ng2-qgrid";
import { ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { AfterViewInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";
import { DashboardGroupsComponent } from "src/app/dashboard/dashboard-groups/dashboard-groups.component";
import {KitsBreakDownComponent} from '../../app/forcast-dashboard/kits-break-down/kits-break-down.component'
import { DashboardMetricsComponent } from "src/app/dashboard/dashboard-metrics/dashboard-metrics.component";
import { DashboardProtocolMetricsComponent } from "src/app/dashboard/dashboard-protocol-metrics/dashboard-protocol-metrics.component";
import { finalize } from "rxjs/operators";
import { isEmpty } from "lodash";
import { SharedSessionService } from "../common/sharedsession.service";
import { DashboardSiteTableComponent } from "../../app/dashboard/dashboard-metrics/dashboard-site-table/dashboard-site-table.component";
import { BackServiceService } from "../../../src/app/common/back-service.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common'
import {InfoDetailsComponent} from '../common/info-details/info-details.component'
import { Subject } from 'rxjs';
import {DialogSessionComponent} from '../common/dialog-session/dialog-session.component'

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private label = "details";
  showHead: any;
  myLabel: (row: any, value?: any) => string | undefined;
  userInput: any;
  showLoading: boolean = false;
  rows$: Observable<any[]>;
  protcount: any;
  sessionId: string;
  XSRFToken: string;
  @ViewChild(GridComponent) myGrid: GridComponent;
  @ViewChild(DashboardGroupsComponent)dashboardgroups: DashboardGroupsComponent;
  @ViewChild(KitsBreakDownComponent) kitsDashBoardGroup : KitsBreakDownComponent;
  @ViewChild(DashboardMetricsComponent)
  metricsComponent: DashboardMetricsComponent;
  @ViewChild(DashboardProtocolMetricsComponent)
  protocolPerformance: DashboardProtocolMetricsComponent;
  @ViewChild("siteTable") siteTable: DashboardSiteTableComponent;

  filterChanged: boolean = false;
  rowDataChanged: boolean = false;
  showProtocolTable: boolean = true;
  sponsorSub: any;
  _componentInitialized: boolean = false;
  protocolsNumber: any = [];
  IszoomLevelFiletr: string = "false";
  backButtonStatus: string = "false";
  backStatus: any = false;
  sponsorName : any ;

  interval :any =0;
  interValTimeOut;
  _forCastsessionTimeOut:any
  _stopSessionBackGroundServices : any;
  userInactive: Subject<any> = new Subject();
  Isexacta : any;
  private _IsExacata :any;

  private IsexactaTableDisplay : any;


  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/protocol_list.pdf"

  constructor(
    private dataService: DashboardService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private qgrid: Grid,
    private sharedService: SharedSessionService,
    private backServices: BackServiceService,
    public dialog: MatDialog
  ) {
    this.showHead = "true";
    this.sharedService.changeSponsor = true;
    localStorage.setItem("showHeader", this.showHead);
    this.IszoomLevelFiletr = this.backServices.getZoomLevelFilter();
    this.dataService.headerInformationDis(false);

    this.Isexacta = false;
    this.IsexactaTableDisplay = false
    this.startTime();
    this.userInactive.subscribe(() => 
    this.getDialog()
    );
    // this.getProtocolRows();
  }
  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.interval);
    this.startTime();
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
  ngOnInit() {
    console.log("calling getProtocols");
    this._componentInitialized = true;
    //Populate Protocol table data
    this.getProtocolRows();

    if (localStorage.getItem("robin_filters") == "") {
      this.populateDataForChildComponents([], true);
    } else {
      this.populateDataForChildComponents([], false);
    }

    //Initializing dashboard view
    const self = this;
    this.myLabel = (args) => {
      const [_, value] = args;
      if (args.length > 1) {
        self.label = value;
        return;
      }

      return self.label;
    };

   //this.dataService.headerInformationDis(false);

  }

  populateDataForChildComponents(
    protocols: string[],
    createSponsorSub: boolean
  ) {
    //Populate Dashboard group data
    this.dashboardgroups.createSponsorSubWithData = createSponsorSub;
    // this.kitsDashBoardGroup.createSponsorSubWithData = createSponsorSub;
    this.dashboardgroups.reset([]);
    // this.kitsDashBoardGroup.reset([]);
    //Populate site Metrics Data
    this.metricsComponent.initializeViewWithData([], createSponsorSub);
    //Populate protocol performance - portfolio level data and MCC Data
    this.protocolPerformance.initializeViewWithData([], createSponsorSub);
  }

  ngAfterViewInit() {

    const { model } = this.myGrid;
    model.pagination({
      size: 10,
    });

    model.filterChanged.on((e) => {
      // console.log("by", e.state.by);
      // console.log("tag", e.tag);
      // localStorage.setItem("robin_filters", JSON.stringify(e.state.by));
      localStorage.setItem(
        "robin_filters",
        isEmpty(e.state.by) ? "" : JSON.stringify(e.state.by)
      );

      //Check for filters, if set either manually or via code
      let filteredBy: any = e.state.by;
      //Check for filter type
      let filteredTag: any = e.tag;
      // this.backServices.setZoomLevelFilter('false')

      if (isEmpty(filteredBy) && isEmpty(filteredTag)) {
        this.filterChanged = false;
      } else {
        this.filterChanged = true;
      }

      // if (this._componentInitialized == false) {
      //   this.filterChanged = true;
      // } else this._componentInitialized = false;
    });

    model.rowListChanged.on((e) => {});

    model.dataChanged.on((e) => {
      if (e.state.rows[0]) {
        this.showLoading = false;
      } else {
        this.cdRef.detectChanges();
      }
    });

    model.viewChanged.on((e) => {
      if (this.filterChanged) {
        let protocols = e.state.rows.map((x) => x.protocolId);
      }
      this.filterChanged = false;
    });

    model.pipeChanged.watch((e) => {
      if (
        e.hasChanges("effect") &&
        e.tag.source === "filter.pipe" &&
        this.filterChanged == true
      ) {
        let protocols = e.state.effect.filter.map((x) => x.protocolId);
        localStorage.setItem("robin_protocols", protocols.join("~"));
        this.dashboardgroups.createSponsorSubWithData = true;
        this.dashboardgroups.populateSiteBreakdown(protocols);

        // this.kitsDashBoardGroup.createSponsorSubWithData = true;
        // this.kitsDashBoardGroup.populateSiteBreakdown(protocols);

        this.metricsComponent.reset(protocols, true);
        this.protocolPerformance.reset(protocols, true);
        console.log("protocols length" + protocols.length);
        let protolColsID = "[" + protocols + "]";
        localStorage.setItem("protoColID", JSON.stringify(protocols));
        // debugger
        if (this.filterChanged) {
          let obj = {
            protcolsList: protocols,
            protocolRes: "true",
          };
          this.dataService.protolNumberUpdate(obj);
          this.dataService.loadER('true')
        }
        this.filterChanged = false;
      } else {
        this.IszoomLevelFiletr = "false";
        this.backServices.setBackButtonValue("false");
        this.backServices.setZoomLevelFilter("false");
      }
    });

    this._IsExacata = this.dataService.exactaDisplay.subscribe((response) =>{   
    }) 

  }

  // getProtocolID(cellvalue) {
  //   this.dataService.updateGoogleMapdata("");
  //   this.dataService.protolNumberUpdate("");

  //   let navUrl: string = cellvalue;
  //   navUrl = navUrl.replace("..", "home");
  //   console.log(navUrl);

  //   //save the protocol id for filter on site table in protoocl details page
  //   localStorage.setItem(
  //     "robin_PId",
  //     navUrl.substring(navUrl.lastIndexOf("/") + 1, navUrl.length)
  //   );
  //   //reset the protocol site filters
  //   localStorage.setItem("robin_PSfilters", "");

  //   this.router.navigate([navUrl]);
  // }


  //-------------------------New Window--------------------

  getProtocolID(cellvalue) {
    // this.dataService.updateGoogleMapdata("");
    // this.dataService.protolNumberUpdate("");

    // let navUrl: string = cellvalue;
    // navUrl = navUrl.replace("..", "home");
    // console.log(navUrl);

    // //save the protocol id for filter on site table in protoocl details page
    // localStorage.setItem(
    //   "robin_PId",
    //   navUrl.substring(navUrl.lastIndexOf("/") + 1, navUrl.length)
    // );
    // //reset the protocol site filters
    // localStorage.setItem("robin_PSfilters", "");

    // this.router.navigate([navUrl]);

    let navUrl: string = cellvalue;
    //navUrl = navUrl.replace("..", "home");
    navUrl = navUrl.replace("../protocol", "protocols");
    // console.log(navUrl);
    // this.router.navigate([navUrl]);
    // console.log(this.router);
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl = currentAbsoluteUrl.substring(0, index);
    // console.log(baseUrl);

    const url = this.router.serializeUrl(this.router.createUrlTree([navUrl]));
    window.open(baseUrl + url + "/" + btoa(this.sponsorName), "_blank");

  }


  //-----------------------------------------------

  getProtocolRows() {
    this.sponsorSub = this.dataService.sponsorName.subscribe((resdata) => {
      this.dashboardgroups.createSponsorSubWithData = true;

      // this.kitsDashBoardGroup.createSponsorSubWithData = true;

      this.showLoading = true;
      this.cdRef.detectChanges();
      console.log("sponsor Subscribe inside dashboard");
      this.sponsorName = resdata
      localStorage.setItem('sponsor_name',this.sponsorName)
      this.rows$ = this.dataService.getRows(resdata).pipe(
        finalize(() => {
          if (localStorage.getItem("robin_filters") != "") {
            let protocolsFilters = JSON.parse(
              localStorage.getItem("robin_filters")
            );
            this.filterChanged = true;
            this.myGrid.model.filter({
              by: protocolsFilters,
            });
          } else {
            this.myGrid.model.filter({
              by: {},
            });
          }
          this.cdRef.detectChanges();
        })
      );
      console.log("@#" + JSON.stringify(this.rows$));
    });

    console.log("sponsorSub", this.sponsorSub);
  }
  backButtonActivity(){

    this.dataService.forCastDate('')
    this.dataService.exactaDisplayTable('false')
    localStorage.removeItem('noOfClick')
    clearTimeout(this.interval);
    clearInterval(this.interval)
    localStorage.setItem('clearSession','true')
    localStorage.removeItem('noOfClick')
    // this.idle.clearInterrupts();
    // this.dashBoard.clearsessionTimeOut('true')
    this.userInactive.unsubscribe();

    this.router.navigate(["home/landing"]);
  }

  infoDetails(content){
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
      disableClose: true,
      data: { message: this.info_dispay},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
    });

  }

  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }

  ngOnDestroy() {
     if (this._IsExacata != undefined)
  this._IsExacata.unsubscribe();   
    this.sharedService.changeSponsor = false;
    this.sponsorSub.unsubscribe();
  }
}
