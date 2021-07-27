import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { ProtocolInfo } from "src/app/common/common";
import { ChangeDetectorRef } from "@angular/core";
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  NavigationEnd,
} from "@angular/router";
import { DashboardService } from "../../dashboard/dashboard.service";
import { MatDialog } from "@angular/material/dialog";
import { map } from "rxjs/operators";
import { DialogOverviewExampleDialog } from "../../common/dialog-overview";

@Component({
  selector: "app-protocol-info",
  templateUrl: "./protocol-info.component.html",
  styleUrls: ["./protocol-info.component.less"],
  providers: [ProtocolService],
})
export class ProtocolInfoComponent implements OnInit, OnDestroy {
  showLoading: boolean;
  visible: boolean = false;
  protocolId: string;
  protocol: ProtocolInfo;
  public _protSub;
  public _protocolInfoSub;
  investigatorId: string;
  _qryStrSponsor: any = "";
  _sponsorName: string;

  constructor(
    private service: ProtocolService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dataService: DashboardService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  // public reset(pId): any {
  //   this.cdRef.detectChanges();

  //   this._protSub = this.dataService.sponsorName.subscribe((data) => {
  //     console.log(data);
  //     this.route.paramMap
  //       .pipe(map(() => window.history.state))
  //       .subscribe((dataid) => {
  //         this.protocolId = pId;
  //         this.showLoading = true;
  //         this._protocolInfoSub = this.service
  //           .getProtocolInfo(this.protocolId, data)
  //           .subscribe(
  //             (data: ProtocolInfo) => {
  //               console.log(data);
  //               if (Object.keys(data).length == 0) {
  //                 this.openDialog("No data for this protocol");
  //                 this.router.navigate(["/dashboard"]);
  //               }
  //               this.protocol = data;
  //               this.showLoading = false;
  //               this.cdRef.detectChanges();
  //             },
  //             (err) => {
  //               this.showLoading = false;
  //             }
  //           );
  //       });
  //   });
  // }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.protocolId = params["id"];

      if (params.hasOwnProperty("sponsor")) {
        this._qryStrSponsor = atob(params["sponsor"]);
      }

      this.reset(this.protocolId);
    });

    // this.route.params.subscribe((params) => {
    //   this.protocolId = params["id"];
    //   this.reset(this.protocolId);
    // });
  }


  public reset(invId): any {
    this.showLoading = true;
    this.cdRef.detectChanges();
    this._protSub= this.dataService.sponsorName.subscribe(
      (resdata) => {
        this.showLoading = true;

        this._sponsorName =
          this._qryStrSponsor != "" ? this._qryStrSponsor : resdata;

        this.route.paramMap
          .pipe(map(() => window.history.state))
          .subscribe((dataid) => {
            this.showLoading = true;
            this._protocolInfoSub =this.service
                       .getProtocolInfo(this.protocolId, this._sponsorName )
              .subscribe((data: ProtocolInfo) => {
                // if (data.firstname == null && data.lastname == null) {
                //   this.openDialog("No Investigator Information available");
                // }
                this.protocol = data;
                this.showLoading = false;
                this.cdRef.detectChanges();
              });
          });
      }
    );
  }

  ngOnDestroy() {
    this._protSub.unsubscribe();
    this._protocolInfoSub.unsubscribe();
  }

  openDialog(message): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "25vw",
      height: "25vh",
      data: { message: message },
    });
  }
}
