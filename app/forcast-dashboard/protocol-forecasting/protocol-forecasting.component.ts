import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { DashboardService } from "src/app/dashboard/dashboard.service";
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
import { isEmpty } from "lodash";


@Component({
  selector: 'app-protocol-forecasting',
  templateUrl: './protocol-forecasting.component.html',
  styleUrls: ['./protocol-forecasting.component.less']
})
export class ProtocolForecastingComponent implements OnInit {
  private label = "details";
  sponsorSub: any;
  showLoading: boolean = false;
  sponsorName : any ;
  rows$: Observable<any[]>;
  filterChanged: boolean = false;
  @ViewChild(GridComponent) myGrid: GridComponent;
  _getSiteDetailsForMapSub: any;
  protocols: any = [];
  rowsPerPage: number = 10;
  pageNumber: number = 1;
  totalcount: any;
  totalPages: number;
  numberOfRows: number;
  _componentInitialized: boolean = false;
  myLabel: (row: any, value?: any) => string | undefined;
  constructor(private dataService: DashboardService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
   ) { }

  ngOnInit() {
    // this.rowsPerPage = 10;
    //   this.pageNumber = 1;    
    this._componentInitialized = true;
    

    this.getProtocolRows();

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
      
      }
    });
  }

  getProtocolRows() {
  

      this.showLoading = true;
      this.cdRef.detectChanges();
    
     
      this.rows$ = this.dataService.getprotocolsKitsInOut().pipe(
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
   

  }

  getProtocolID(cellvalue, sponsor) {

    
    console.log(JSON.stringify(cellvalue))
    console.log(sponsor)

    let navUrl: string = cellvalue;
    //navUrl = navUrl.replace("..", "home");
    navUrl = navUrl.replace("../protocol", "protocols");
    
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl = currentAbsoluteUrl.substring(0, index);
  
    const url = this.router.serializeUrl(this.router.createUrlTree([navUrl]));
    window.open(baseUrl + url + "/" + btoa(sponsor), "_blank");

  }

  backButtonActivity(){
    this.router.navigate(["home/landing"]);
  }

  ngOnDestroy() {
    if (this._getSiteDetailsForMapSub != undefined)
    this._getSiteDetailsForMapSub.unsubscribe();
  }

}
