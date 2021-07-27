import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  RoutesRecognized,
  NavigationEnd,
} from "@angular/router";
import { SiteService } from "src/app/site/site.service";
import { ChangeDetectorRef } from "@angular/core";
import { Investigator } from "src/app/site/siteCommon";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogOverviewExampleDialog } from "../../common/dialog-overview";
import { map } from "rxjs/operators";

@Component({
  selector: "app-site-info",
  templateUrl: "./site-info.component.html",
  styleUrls: ["./site-info.component.less"],
})
export class SiteInfoComponent implements OnInit, OnDestroy {
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  constructor(
    private service: SiteService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dataService: DashboardService,
    public dialog: MatDialog
  ) {}

  investigatorId: string;
  investigator: Investigator;
  tooltipPosition: string = "right";
  _qryStrSponsor: any = "";
  _sponsorName: string;
  public _investigatorSub;
  public _inv_InfoDataSub;

  showLoading: boolean = false;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.investigatorId = params["sid"];

      if (params.hasOwnProperty("sponsor")) {
        this._qryStrSponsor = atob(params["sponsor"]);
      }

      this.reset(this.investigatorId);
    });
  }
  ngOnDestroy() {
    this._investigatorSub.unsubscribe();
    if (this._inv_InfoDataSub != undefined) this._inv_InfoDataSub.unsubscribe();
  }

  public reset(invId): any {
    this.showLoading = true;
    this.cdRef.detectChanges();
    this._investigatorSub = this.dataService.sponsorName.subscribe(
      (resdata) => {
        this.showLoading = true;

        this._sponsorName =
          this._qryStrSponsor != "" ? this._qryStrSponsor : resdata;

        this.route.paramMap
          .pipe(map(() => window.history.state))
          .subscribe((dataid) => {
            this.showLoading = true;
            this._inv_InfoDataSub = this.service
              .getInvestigatorInfo(invId, this._sponsorName)
              .subscribe((data: Investigator) => {
                if (data.firstname == null && data.lastname == null) {
                  this.openDialog("No Investigator Information available");
                }
                this.investigator = data;
                this.showLoading = false;
                this.cdRef.detectChanges();
              });
          });
      }
    );
  }

  openDialog(message): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      //width: "25vw",
      //height: "25vh",
      disableClose: true,
      data: { message: message },
    });
  }
}
