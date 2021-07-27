import { Component, OnInit } from "@angular/core";
import { AllKpiComponent } from "src/app/dashboard/dashboard-protocol-metrics/all-kpi/all-kpi.component";
import { ViewChild } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { ViewChildren } from "@angular/core";
import { MccKpiComponent } from "src/app/common/mcc-kpi/mcc-kpi.component";
import { QueryList } from "@angular/core";
import { DataService } from "src/app/common/data.service";
import { MccDetail } from "src/app/common/common";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common'
import {InfoDetailsComponent} from '../../common/info-details/info-details.component'
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard-protocol-metrics",
  templateUrl: "./dashboard-protocol-metrics.component.html",
  styleUrls: ["./dashboard-protocol-metrics.component.less"],
})
export class DashboardProtocolMetricsComponent implements OnInit {
  @ViewChild(AllKpiComponent) allKpiComponent: AllKpiComponent;
  @ViewChildren(MccKpiComponent) private _childrenMcc: QueryList<
    MccKpiComponent
  >;

  mccDetails: MccDetail = new MccDetail();

  mccPortfolio: any = this.mccDetails.mccPortfolio;
  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay_site_enroll = this.getBaseUrl()+"/assets/pdf/portfolio_level_matrix.pdf"
  info_dispay_site_screen = this.getBaseUrl()+"/assets/pdf/mcc_details.pdf"
  constructor(private protocolService: DataService, public dialog: MatDialog,private router: Router) {}

  ngOnInit() {}
  public reset(protocolList: string[], createSponsorSub: boolean) {
    this.allKpiComponent.createSponsorSubWithData = createSponsorSub;
    this.allKpiComponent.populateProtocolPerformanceKPI(protocolList);
    this._childrenMcc.forEach((element) => {
      //Populate MCC bar data for dashboard
      element.populateAllMCCValues(protocolList, "a");
    });
    this.protocolService.setProtocolList(protocolList);
  }

  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }

  public initializeViewWithData(
    protocols: string[],
    createSponsorSub: boolean
  ) {
    this.allKpiComponent.createSponsorSubWithData = createSponsorSub;
    this.allKpiComponent.reset(protocols);
    this._childrenMcc.forEach((element) => {
      //Populate MCC bar data for dashboard
      element.createSponsorSubWithData = createSponsorSub;
      element.reset(protocols, "a");
    });
  }

  info_dispay_protocol_left(){
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
      disableClose: true,
      data: { message: this.info_dispay_site_enroll},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
    });
  }

  info_dispay_protocol_right(){
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
      disableClose: true,
      data: { message: this.info_dispay_site_screen},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
    });
  }
}
