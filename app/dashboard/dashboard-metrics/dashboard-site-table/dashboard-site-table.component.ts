import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { ChangeDetectorRef } from "@angular/core";
import { ViewChild } from "@angular/core";
import { GridComponent, Shortcut } from "ng2-qgrid";
import { AfterViewInit } from "@angular/core";
import { finalize, catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
} from "@angular/material";
import { DialogOverviewExampleDialog } from "../../../common/dialog-overview";
import { ConfirmationDialogComponent } from "../../../common/confirmation-dialog/confirmation-dialog.component";
import { SiteDetailsComponent } from "../../site-details/site-details.component";
import { BackServiceService } from "../../../common/back-service.service";
import {Location} from '@angular/common'
import {InfoDetailsComponent} from '../../../common/info-details/info-details.component'
@Component({
  selector: "app-dashboard-site-table",
  templateUrl: "./dashboard-site-table.component.html",
  styleUrls: ["./dashboard-site-table.component.less"],
})
export class DashboardSiteTableComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(GridComponent) myGrid: GridComponent;

  showLoading: boolean = false;
  siteDetailsAvailable: boolean = false;
  disableNavClick: boolean = false;
  rowsPerPage: number = 10;
  rowsPerPageSizeList = [5, 10]; // , 20, 30, 40, 50
  pageNumber: number = 1;
  type: string = "";
  name: string = "";
  protocolList: string[];
  totalPages: number;
  rows$: Observable<any[]>;
  values: any;

  numberOfRows: number;
  _sponsorSub: any;
  _current: number;
  protocols: any = [];
  rows: any;
  rowsItem: any;
  googleMapresponsedata: any;
  totalcount: any;
  getMapData: any;
  isRecordFound: boolean = false;
  IsMapClicked: boolean = false;
  IsrefreshMap: boolean = false;
  IszoomLevelFilter: boolean = false;
  mapDetailsZoomlevelFilterData: any = [];
  mapDetailsZoomLevelFilterResponse: any = [];
  protoColsID: any;
  data: any;
  showLoaderMap: SiteDetailsComponent;
  protoColCount: any;
  getBackButton: any;
  isMapLoad: any;
  protoColList: any;
  IsMapAlreadyLoaded: boolean = false;
  IszoomLevelFiletr: string = "false";
  temProtolcols: any = [];
  syncDataStatus: string = "";
  _getSiteDetailsForMapSub: any;
  _protocolNumberListSub: any;
  _refreshNumberSub : any;
  _mapSelectdataSub : any;
  _syncdataSub : any;
  hideSuccessMessage = false;
  protocolSelectEnable :any;

  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/site_details.pdf"

  constructor(
    private dataService: DashboardService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar,
    private backServices: BackServiceService,
    public dialog: MatDialog
  ) {
    this.totalcount = localStorage.getItem("totalCount");

    this.setParametersForPaging(this.totalcount);
  }

  ngOnInit() {
    this.current = this.pageNumber;
  }

  ngAfterViewInit() {
    console.log("Dashboard View Initialized");
    this.protocolSelectEnable = false
    this.IszoomLevelFiletr = this.backServices.getZoomLevelFilter();
    this.getBackButton = this.backServices.getBackButtonValue();
    this.isMapLoad = this.backServices.getMapDataLoad();
    this.protoColList = localStorage.getItem("protoColID");
    this.IsMapAlreadyLoaded = false;
    this.syncDataStatus = "";
    this._sponsorSub = this.dataService.sponsorName.subscribe((response) => {
      this.data = response;
      this.IszoomLevelFiletr = this.backServices.getZoomLevelFilter();
    this.getBackButton = this.backServices.getBackButtonValue();
      // this.data = this.data

      // if( this.protoColList != null){
      //   this.protocols =  this.protoColList
      // }else{
      //   this.protocols = [];
      // }
      this.protocols = [];
      this.rowsPerPage = 10;
      this.pageNumber = 1;

      this.protoColCount = this.protocols.length;
      //  this.getSiteDetails(this.rowsPerPage,this.pageNumber)
      if (this.getBackButton == "false" && this.IszoomLevelFiletr != "true" ) {
        this.getSiteDetails(this.rowsPerPage, this.pageNumber);
      }
    });

    //--------------------ProtoCol ID list --------------------
    this._protocolNumberListSub = this.dataService.protocolNumberList.subscribe(
      (response: any) => {
        this.getBackButton = this.backServices.getBackButtonValue();
        this.protoColList = localStorage.getItem("protoColID");
        this.IsMapAlreadyLoaded = false;

        if (
          this.getBackButton == "true" &&
          this.IszoomLevelFiletr != "true" &&
          this.protoColList == ""
        ) {
          this.backServices.setBackButtonValue("false");
          this.protocols = [];
          this.protoColCount = this.protocols.length;
          this.rowsPerPage = 10;
          this.pageNumber = 1;
          console.log('@@@@@@@'+ 145)
          this.getSiteDetails(this.rowsPerPage, this.pageNumber);
        } else if (
          this.getBackButton == "true" &&
          this.IszoomLevelFiletr != "true" &&
          this.protoColList != ""
        ) {
          this.backServices.setBackButtonValue("false");
          this.temProtolcols = [];

          let newProtocolsList = JSON.parse(this.protoColList);
          for (let i = 0; i < newProtocolsList.length; i++) {
            this.temProtolcols.push(newProtocolsList[i]);
          }
          // temProtolcols.push(newProtocolsList)
          this.protocols = this.temProtolcols;
          // this.protoColCount = this.protocols.length
          this.temProtolcols = [];
          this.rowsPerPage = 10;
          this.pageNumber = 1;
          console.log('@@@@@@@'+ 165)
          this.getSiteDetails(this.rowsPerPage, this.pageNumber);
          // && this.IszoomLevelFiletr != "true"
        } else if (
          response.protocolRes == "true" &&
          this.getBackButton == "false" &&
          response.protcolsList != null
        ) {
          this.protocols = response.protcolsList;
          this.IszoomLevelFiletr = "false";

          this.protoColCount = this.protocols.length;
          this.rowsPerPage = 10;
          this.pageNumber = 1;
          console.log('@@@@@@@'+ 179)
          // if(this.protocolSelectEnable != true){
          //   this.getSiteDetails(this.rowsPerPage, this.pageNumber);
          // }
          // this.protocolSelectEnable = false;
           this.getSiteDetails(this.rowsPerPage, this.pageNumber);
        } else if (
          this.getBackButton == "true" &&
          this.IszoomLevelFiletr == "true" && 
          (this.protoColList == "" || this.protoColList.length >0)
        ) {
          this.backServices.setBackButtonValue("false");
          // this.protocolSelectEnable = true;
          if (this.protoColList != "") {
            this.temProtolcols = [];

            let newProtocolsList = JSON.parse(this.protoColList);
            for (let i = 0; i < newProtocolsList.length; i++) {
              this.temProtolcols.push(newProtocolsList[i]);
            }
            // temProtolcols.push(newProtocolsList)
            this.protocols = this.temProtolcols;
            this.temProtolcols = [];
          } else {
            this.protocols = [];
          }

          // this.protocols =[];
          this.protoColCount = this.protocols.length;
          this.rowsPerPage = 10;
          this.pageNumber = 1;
          console.log('@@@@@@@'+ 206)
          // if( this.getBackButton == "true")
          this.getSiteDetails(this.rowsPerPage, this.pageNumber);
        }
      }
    );
    //---------------Refresh Map Information ---------------------------------------------
    this._refreshNumberSub = this.dataService.refreshInfo.subscribe((response: any) => {
      if (response == true) {
        this.IsMapClicked = false;
        this.rowsPerPage = 10;
        this.pageNumber = 1;
        // if(this.protoColList != null){
        //   this.protocols = this.protoColList
        // }else{
        //   this.protocols =[];
        // }
        this.dataService.refreshMapInformationValue("")
        if (this.protoColList != "") {
          this.temProtolcols = [];
          let newProtocolsList = JSON.parse(this.protoColList);
          for (let i = 0; i < newProtocolsList.length; i++) {
            this.temProtolcols.push(newProtocolsList[i]);
          }
          // temProtolcols.push(newProtocolsList)
          this.protocols = this.temProtolcols;
          this.temProtolcols = [];
        } else {
          this.protocols = [];
        }

        // this.protocols =[];
        // this.backServices.setMapData('false')
        this.totalcount = localStorage.getItem("totalCount");
        this.setParametersForPaging(this.totalcount);
        console.log('@@@@@@@'+ 241)
        this.getSiteDetails(this.rowsPerPage, this.pageNumber);
       
      }
    });

    //--------------------------------------------------------------------------------------

   this._mapSelectdataSub= this.dataService.mapSelectData.subscribe((response: any) => {
      this.mapDetailsZoomLevelFilterResponse = [];
      this.mapDetailsZoomlevelFilterData = [];
      //  this._sponsorSub = this.dataService.sponsorName.subscribe((data) => {
      this.showLoading = true;
      this.IszoomLevelFiletr = this.backServices.getZoomLevelFilter();

      //Disabling the next and previous page nav buttons
      this.disableNavClick = true;

      let protocols = [""];
      let rowsPageNumber = this.rowsPerPage;
      let pageNumber = this.pageNumber;
      let zipList = response;
      let sponsor = this.data;

      this.mapDetailsZoomLevelFilterResponse = response;
      this.mapDetailsZoomlevelFilterData = this.data;
      this.rowsPerPage = 10;
      this.pageNumber = 1;
      this.pageNumber = 1;
      // if(this.protoColList != null){
      //   this.protocols = this.protoColList
      // }else{
      //   this.protocols =[];
      // }

      if (this.protoColList != "") {
        this.temProtolcols = [];

        let newProtocolsList = JSON.parse(this.protoColList);
        for (let i = 0; i < newProtocolsList.length; i++) {
          this.temProtolcols.push(newProtocolsList[i]);
        }
        this.protocols = this.temProtolcols;
        this.temProtolcols = [];
      } else {
        this.protocols = [];
      }

      this.getMapData = {
        protocols: this.protocols,
        sponsor: this.data,
        RowsPerPage: this.rowsPerPage,
        PageNumber: this.pageNumber,
        ziplist: response,
      };
      // this.getSelectedMapArea(protocols,rowsPageNumber,pageNumber,zipList,sponsor)

      if (this.mapDetailsZoomLevelFilterResponse.length > 0) {
        this.IsMapClicked = true;
        if (this.IszoomLevelFiletr == "true") {
          let mapOldData = this.backServices.getMapData();
          //  this.backServices.setMapDataLoad('false')
          //  this.dataService.updateGoogleMapdata(mapOldData);
        }
        this.IszoomLevelFiletr = this.backServices.getZoomLevelFilter();

        if (this.IszoomLevelFiletr != "true") {
          this.getSelectedMapArea(this.getMapData);
        }
        this.backServices.setZoomLevelFilter("false");

        // this.getSelectedMapArea(this.getMapData)
      } else {
        this.IsMapClicked = false;
      }

      // })
    });

   this._syncdataSub = this.dataService.syncMapData.subscribe((response: any) => {
      this.hideSuccessMessage = false;
      this.syncDataStatus = response;
      // if (this.syncDataStatus == "true") {
      //   let status = "Data has been sync";
      // } else if (this.syncDataStatus == "false") {
      //   let status = "Data has not been sync";
      // } else if (this.syncDataStatus == "") {
      // }
    });
  }

  public protocolsNumber(protocolsNumber: string[]) {
    // console.log("@@@@@@@" + protocolsNumber);
    this.protoColsID = protocolsNumber;
    this.data = this.data;
    this.rowsPerPage = 10;
    this.pageNumber = 1;
    console.log('@@@@@@@'+ 337)
    this.getSiteDetails(this.rowsPerPage, this.pageNumber);
  }

  ngOnDestroy() {
    if (this._sponsorSub != undefined) 
    this._sponsorSub.unsubscribe();
    if (this._getSiteDetailsForMapSub != undefined)
      this._getSiteDetailsForMapSub.unsubscribe();
    if (this._protocolNumberListSub != undefined)
      this._protocolNumberListSub.unsubscribe();
      if(this._refreshNumberSub != undefined)
      this._refreshNumberSub.unsubscribe();
      if(this._mapSelectdataSub != undefined)
      this._mapSelectdataSub.unsubscribe();
      if(this._syncdataSub != undefined)
      this._syncdataSub.unsubscribe();
  }
 getSiteDetails(rowsPerPage: number, pageNumber: number) {
    //  this.reset(this.protocols, type, name)

    // this._sponsorSub = this.dataService.sponsorName.subscribe((data) => {
    this.showLoading = true;

    //Disabling the next and previous page nav buttons
    this.disableNavClick = true;
    const { model } = this.myGrid;
    this._getSiteDetailsForMapSub = this.dataService
      .getSiteDetailsForMap(this.protocols, this.data, rowsPerPage, pageNumber)
      .subscribe((dataRows) => {
        if (this.protoColCount > 0) {
          this.dataService.totalPagination.subscribe(
            (responsePagination: any) => {
              this.totalcount = responsePagination;
              this.setParametersForPaging(this.totalcount);
            }
          );
        } else {
          this.totalcount = localStorage.getItem("totalCount");
          this.setParametersForPaging(this.totalcount);
        }

        model.data({
          rows: dataRows.SiteDetails,
        });

        // if(this.IszoomLevelFiletr != "true"){
        //   this.googleMapresponsedata = dataRows.SiteMapPlotData;
        //   // console.log(this.googleMapresponsedata.length)
        //   if(!this.IsMapAlreadyLoaded && this.isMapLoad != "true"){
        //     this.dataService.updateGoogleMapdata(this.googleMapresponsedata);
        //   }
        // }
        this.googleMapresponsedata = dataRows.SiteMapPlotData;
        // this.syncDataStatus = this.backServices.getSyncMapData();
        // this.hideSuccessMessage = false;
        // console.log(this.googleMapresponsedata.length)
        if (!this.IsMapAlreadyLoaded && this.isMapLoad != "true") {
          this.dataService.updateGoogleMapdata(this.googleMapresponsedata);
        }
        // this.dataService.updateGoogleMapdata(this.googleMapresponsedata);
        this.showLoading = false;
        this.isMapLoad == "false";
        this.disableNavClick = false;
        this.cdRef.detectChanges();
      });

    this.siteDetailsAvailable = true;
    model.pagination({
      size: this.rowsPerPage,
    });
    // });
  }
  // protocols: any,rowsPageNumber: any,pageNumber: any,zipList: any,sponsor:any
  getSelectedMapArea(selectAreaObj: any) {
    const { model } = this.myGrid;
    this.showLoading = true;

    this.dataService.getMapSelectedArea(selectAreaObj).subscribe((dataRows) => {
      model.data({
        rows: dataRows.SiteDetails,
      });
      this.totalcount = dataRows.SiteDetails[0].TotalSitesCount;
      this.setParametersForPaging(this.totalcount);
      this.IszoomLevelFiletr = "false";
      this.syncDataStatus = this.backServices.getSyncMapData();
      this.hideSuccessMessage = false;
      // if (this.syncDataStatus == "true") {
      //   let status = "Data has been sync";
      // } else if (this.syncDataStatus == "false") {
      //   let status = "Data has not been sync";
      // } else if (this.syncDataStatus == "") {
      // }
      this.showLoading = false;
      this.disableNavClick = false;
      this.cdRef.detectChanges();
    });

    this.siteDetailsAvailable = true;
    model.pagination({
      size: this.rowsPerPage,
    });
  }

  openDialog(message): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "25vw",
      height: "25vh",
      data: { message: message },
    });
  }

  //This method will be called when clicked on any pie
  reset(protocols: string[], type: string, name: string) {
    this.name = name;
    this.type = type;
    this.protocolList = protocols;
    //reset the page number to 1
    this.pageNumber = 1;
    //Call the API with default Rows per page value[i.e. 10]
    this.getSiteTableRowsData(
      protocols,
      type,
      name,
      this.rowsPerPage,
      this.pageNumber
    );
  }

  // This method will be called to fetch the site details table data
  // on page number change or rows per page change
  getSiteTableRowsData(
    protocols: string[],
    type: string,
    name: string,
    rowsPP: number,
    pageNo: number
  ) {
    //Call the API with default Rows per page value[i.e. 10]
    this._sponsorSub = this.dataService.sponsorName.subscribe((data) => {
      this.showLoading = true;

      //Disabling the next and previous page nav buttons
      this.disableNavClick = true;

      this.rows$ = this.dataService
        .getProtocolSites(protocols, type, name, data, rowsPP, pageNo)
        .pipe(
          finalize(() => {
            this.showLoading = false;
            //Re-enabling the next and previous page nav buttons
            this.disableNavClick = false;
            this.cdRef.detectChanges();
          })
        );
    });

    this.siteDetailsAvailable = true;
    //this.cdRef.detectChanges();

    const { model } = this.myGrid;

    model.pagination({
      size: this.rowsPerPage,
    });
  }

  getId(cellvalue) {
    var obj: any = {};
    obj.id = cellvalue.split("home/site/")[1];
    return obj;
  }

  // getSiteId(cellvalue) {
  //   let navUrl: string = cellvalue;
  //   navUrl = navUrl.replace("..", "home");
  //   console.log(navUrl);
  //   this.router.navigate([navUrl]);
  // }
  getSiteId(cellvalue) {
    localStorage.setItem('visibleLink','false')
    let navUrl: string = cellvalue;
    //navUrl = navUrl.replace("..", "home");
    navUrl = navUrl.replace("../site", "investigator");
    // console.log(navUrl);
    // this.router.navigate([navUrl]);
    // console.log(this.router);
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl = currentAbsoluteUrl.substring(0, index);
    // console.log(baseUrl);
    this.backServices.setsiteDetailsLinkVisibility('false')
    
    const url = this.router.serializeUrl(this.router.createUrlTree([navUrl]));
    window.open(baseUrl + url + "/" + btoa(this.data), "_blank");
  }

  // hide() {
  //   this.siteDetailsAvailable = false;
  // }

  getPrevRows() {
    if (this.pageNumber == 1) {
      //If the page is the first page then do nothing
    } else {
      //Increment the page number
      this.pageNumber = this.pageNumber - 1;

      if (this.IsMapClicked == true) {
        let obj = {
          protocols: [""],
          sponsor: this.mapDetailsZoomlevelFilterData,
          RowsPerPage: this.rowsPerPage,
          PageNumber: this.pageNumber,
          ziplist: this.mapDetailsZoomLevelFilterResponse,
        };

        this.getSelectedMapArea(obj);
      } else {
        this.IsMapAlreadyLoaded = true;
        console.log('@@@@@@@'+ 551)
        this.getSiteDetails(this.rowsPerPage, this.pageNumber);
      }
      // this.getSiteDetails(this.rowsPerPage,this.pageNumber)
    }
  }

  getNextRows() {
    if (this.pageNumber >= this.totalPages) {
    } else {
      this.pageNumber = this.pageNumber + 1;
      if (this.IsMapClicked == true) {
        let obj = {
          protocols: [""],
          sponsor: this.mapDetailsZoomlevelFilterData,
          RowsPerPage: this.rowsPerPage,
          PageNumber: this.pageNumber,
          ziplist: this.mapDetailsZoomLevelFilterResponse,
        };
        this.getSelectedMapArea(obj);
      } else {
        this.IsMapAlreadyLoaded = true;
        this.getSiteDetails(this.rowsPerPage, this.pageNumber);
      }
    }
  }

  setParametersForPaging(totalRows: number) {
    this.numberOfRows = totalRows;
    //Find the total number of pages from total rows
    this.CaculateAndSetTotalPagesCount();
  }

  CaculateAndSetTotalPagesCount() {
    //Find the total number of pages from total rows
    this.totalPages = Math.ceil(this.numberOfRows / this.rowsPerPage);
  }

  onSelectionChange(e) {
    //Set the rowsPerPage variable value to selected value
    this.rowsPerPage = e.value;
    //Find the total number of pages possible
    this.CaculateAndSetTotalPagesCount();
    //debugger

    //Populate the site table with data
    this.getSiteDetails(this.rowsPerPage, this.pageNumber);
  }

  menuClosedEvent() {
    if (this.pageNumber != null) {
      if (this.pageNumber != this.current) {
        //API call for populating data
        // this.getSiteDetails(this.rowsPerPage,this.pageNumber)

        if (this.IsMapClicked == true) {
          let obj = {
            protocols: [""],
            sponsor: this.mapDetailsZoomlevelFilterData,
            RowsPerPage: this.rowsPerPage,
            PageNumber: this.pageNumber,
            ziplist: this.mapDetailsZoomLevelFilterResponse,
          };
          this.getSelectedMapArea(obj);
        } else {
          this.getSiteDetails(this.rowsPerPage, this.pageNumber);
        }

        this.current = this.pageNumber;
      }
    } else {
      this.pageNumber = this.current;
    }
  }

  keyDown(e: KeyboardEvent) {
    // console.log(e);
    // console.log(Shortcut.translate(e));
    let code = Shortcut.translate(e);
    if (code.startsWith("numpad")) {
      code = code.slice(6);
    }
    let pageNum = this.pageNumber || 0;

    switch (code) {
      case "enter": {
        break;
      }
      case "up": {
        if (pageNum < this.totalPages) {
          this.pageNumber = this.pageNumber + 1;
        }
        break;
      }
      case "down": {
        if (pageNum > 1) {
          this.pageNumber = this.pageNumber - 1;
        }
        break;
      }
      case "left":
      case "right":
      case "backspace": {
        break;
      }
      default: {
        // console.log("default");
        const digit = Number.parseInt(code, 10);
        const page = Number.parseInt("" + pageNum + digit, 10);
        const min = 1;
        const max = this.totalPages;
        const isValid = page >= min && page <= max && !isNaN(digit);

        if (!isValid) {
          page > this.totalPages
            ? (this.pageNumber = max)
            : page > 1
            ? (this.pageNumber = this.current)
            : (this.pageNumber = min);
          e.preventDefault();
        }
      }
    }
  }

  get current() {
    return this._current;
  }

  set current(val) {
    this._current = val;
  }

  FadeOutSuccessMsg() {
    setTimeout( () => {
        this.hideSuccessMessage = true;
     }, 3000);
     
    }

    getBaseUrl(): string {
      var currentAbsoluteUrl = window.location.href;
      var currentRelativeUrl = this.router.url;
      var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
      var baseUrl: string = currentAbsoluteUrl.substring(0, index);
      return baseUrl;
    }
  
    infoDetails(content){
      const dialogRef = this.dialog.open(InfoDetailsComponent, {
        disableClose: true,
        data: { message: this.info_dispay},
        panelClass:['animate__animated','animate__slideInLeft','my-class'] 
      });
  
    }
}
