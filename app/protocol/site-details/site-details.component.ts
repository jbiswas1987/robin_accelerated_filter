import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { SiteDetails } from "src/app/common/common";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { ActivatedRoute } from "@angular/router";
import { ChangeDetectorRef } from "@angular/core";
import { finalize } from "rxjs/operators";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { Router } from "@angular/router";
import { GridComponent } from "ng2-qgrid";
import {BackServiceService} from '../../common/back-service.service'
@Component({
  selector: "app-site-details",
  templateUrl: "./site-details.component.html",
  styleUrls: ["./site-details.component.less"],
})
export class SiteDetailsComponent implements OnInit, AfterViewInit {
  rows$: Observable<SiteDetails[]>;
  showLoading: boolean;
  protocolId: string;
  _qryStrSponsor: any = "";
  _sponsorName: string;
  @ViewChild(GridComponent) myGrid: GridComponent;

  constructor(
    private service: ProtocolService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dataService: DashboardService,
    private router: Router,private siteDetailsLinkVisible : BackServiceService
  ) {}

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.protocolId = params["id"];
      if (this.protocolId != localStorage.getItem("robin_PId")) {
        localStorage.setItem("robin_PSfilters", "");
      }
      if (params.hasOwnProperty("sponsor")) {
        this._qryStrSponsor = atob(params["sponsor"]);
      }

      this.reset(this.protocolId);
    });

    // this.route.params.subscribe((params) => {
    //   this.protocolId = params["id"];
    //   if (this.protocolId != localStorage.getItem("robin_PId")) {
    //     localStorage.setItem("robin_PSfilters", "");
    //   }
    //   this.reset(this.protocolId);
    // });
  }

  ngAfterViewInit() {
    const { model } = this.myGrid;

    model.filterChanged.on((e) => {
      localStorage.setItem("robin_PSfilters", JSON.stringify(e.state.by));
      localStorage.setItem("robin_PId", this.protocolId);
    });
  }

  // public reset(protocolId: string): any {
  //   this.showLoading = true;
  //   this.cdRef.detectChanges();
  //   this.dataService.sponsorName.subscribe((resdata) => {
  //     this.showLoading = true;
  //     this.rows$ = this.service.getSiteDetails(protocolId, resdata).pipe(
  //       finalize(() => {
  //         if (localStorage.getItem("robin_PSfilters") != "") {
  //           let protocolsSiteFilters = JSON.parse(
  //             localStorage.getItem("robin_PSfilters")
  //           );
  //           this.myGrid.model.filter({
  //             by: protocolsSiteFilters,
  //           });
  //         }
  //         this.showLoading = false;
  //         this.cdRef.detectChanges();
  //       })
  //     );
  //   });
  // }


  public reset(protocolId: string): any {
    this.showLoading = true;
    
    this.cdRef.detectChanges();
    this.dataService.sponsorName.subscribe((resdata) => {
      this.showLoading = true;
      this._sponsorName =
      this._qryStrSponsor != "" ? this._qryStrSponsor : resdata;
      this.rows$ = this.service.getSiteDetails(protocolId, this._sponsorName).pipe(
        finalize(() => {
          if (localStorage.getItem("robin_PSfilters") != "") {
            let protocolsSiteFilters = JSON.parse(
              localStorage.getItem("robin_PSfilters")
            );
            this.myGrid.model.filter({
              by: protocolsSiteFilters,
            });
          }
          this.showLoading = false;
          this.cdRef.detectChanges();
        })
      );
    });
  }

  // getSiteID(cellvalue) {
  //   let navUrl: string = cellvalue;
  //   navUrl = navUrl.replace("/site", "home/site");
  //   console.log(navUrl);
  //   this.router.navigate([navUrl]);

  // }

  getSiteID(cellvalue) {
    let navUrl: string = cellvalue;
    //navUrl = navUrl.replace("..", "home");
    localStorage.setItem('visibleLink' ,'true')
    navUrl = navUrl.replace("/site", "investigator");
    // console.log(navUrl);
    // this.router.navigate([navUrl]);
    // console.log(this.router);
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl = currentAbsoluteUrl.substring(0, index);
    // console.log(baseUrl);
    this.siteDetailsLinkVisible.setsiteDetailsLinkVisibility('true')
    
    const url = this.router.serializeUrl(this.router.createUrlTree([navUrl]));
    window.open(baseUrl + url + "/" + btoa(this._qryStrSponsor), "_blank");
  }
}
