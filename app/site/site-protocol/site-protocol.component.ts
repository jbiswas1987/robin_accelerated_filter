import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { SiteService } from "src/app/site/site.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ChangeDetectorRef } from "@angular/core";
import { GridComponent } from "ng2-qgrid";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { ProtocolSite } from "src/app/site/siteCommon";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import {BackServiceService} from '../../common/back-service.service'
@Component({
  selector: "app-site-protocol",
  templateUrl: "./site-protocol.component.html",
  styleUrls: ["./site-protocol.component.less"],
})
export class SiteProtocolComponent implements OnInit, OnDestroy {
  rows$: Observable<ProtocolSite[]>;
  showLoading: boolean;
  investigatorId: string;
  _sponsorSub: any;
  _qryStrSponsor: any = "";
  _sponsorName: string;
  _detailsLinkShow: string;
  @ViewChild(GridComponent) myGrid: GridComponent;
 
  constructor(
    private service: SiteService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dataService: DashboardService,
    private router: Router,
    private siteDetailsLinkVisible : BackServiceService
  ) {
    
  }

  ngOnInit() {
  //  this._detailsLinkShow = this.siteDetailsLinkVisible.getsiteDetailsLinkVisibility();
  this._detailsLinkShow  = localStorage.getItem('visibleLink')
    console.log('++++++++++++' + this._detailsLinkShow)
    this.route.params.subscribe((params) => {
      this.investigatorId = params["sid"];
      if (params.hasOwnProperty("sponsor")) {
        this._qryStrSponsor = atob(params["sponsor"]);
        // this._detailsLinkShow = false;
        // this._detailsLinkShow = this.siteDetailsLinkVisible.getsiteDetailsLinkVisibility();
      }

      this.reset(this.investigatorId);
    });
  }
  ngAfterViewInit() {
    const { model } = this.myGrid;

    model.pagination({
      size: 10,
    });
  }

  public reset(investigatorId: string): any {
    this.showLoading = true;
    this.cdRef.detectChanges();
    this._sponsorSub = this.dataService.sponsorName.subscribe((resdata) => {
      this.showLoading = true;

      this._sponsorName =
        this._qryStrSponsor != "" ? this._qryStrSponsor : resdata;

      this.rows$ = this.service
        .getInvestigatorProtocol(investigatorId, this._sponsorName)
        .pipe(
          finalize(() => {
            this.showLoading = false;
            this.cdRef.detectChanges();
          })
        );
    });
  }

  // getSiteProtocolID(cellvalue) {
  //   let navUrl: string = cellvalue;
  //   //navUrl = navUrl.replace("/site", "home/site");
  //   navUrl = navUrl.replace(
  //     navUrl.substring(0, navUrl.lastIndexOf("./") + 1),
  //     "home"
  //   );
  //   console.log(navUrl);
  //   this.router.navigate([navUrl]);
  // }


  getSiteProtocolID(cellvalue) {
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
    window.open(baseUrl + url + "/" + btoa(this._qryStrSponsor), "_blank");
  }

  ngOnDestroy() {
    this._sponsorSub.unsubscribe();
  }
}
