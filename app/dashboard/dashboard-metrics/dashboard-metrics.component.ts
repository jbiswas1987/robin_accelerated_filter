import { Component, OnInit, ViewChild } from "@angular/core";
import { ProtocolSiteSunComponent } from "../dashboard-metrics/protocol-site-sun/protocol-site-sun.component";
import { DashboardSiteTableComponent } from "../dashboard-metrics/dashboard-site-table/dashboard-site-table.component";
import { Router } from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common'
import {InfoDetailsComponent} from '../../common/info-details/info-details.component'
@Component({
  selector: "app-dashboard-metrics",
  templateUrl: "./dashboard-metrics.component.html",
  styleUrls: ["./dashboard-metrics.component.less"],
})
export class DashboardMetricsComponent implements OnInit {

  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay_site_enroll = this.getBaseUrl()+"/assets/pdf/site_enrollment_breakdown.pdf"
  info_dispay_site_screen = this.getBaseUrl()+"/assets/pdf/site_screen_breakdown.pdf"

  @ViewChild("enrollment") enrollmentComp: ProtocolSiteSunComponent;
  @ViewChild("screen") screenComp: ProtocolSiteSunComponent;
  @ViewChild("siteTable") siteTable: DashboardSiteTableComponent;

  protocols: string[];
  public reset(protocolList: string[], createSponsorSub: boolean) {
    this.enrollmentComp.createSponsorSubWithData = createSponsorSub;
    this.enrollmentComp.populateProtocolSiteSun(protocolList);
    this.screenComp.createSponsorSubWithData = createSponsorSub;
    this.screenComp.populateProtocolSiteSun(protocolList);
    this.protocols = protocolList;
   // this.siteTable.hide();
  }

  public initializeViewWithData(
    protocols: string[],
    createSponsorSub: boolean
  ) {
    this.enrollmentComp.createSponsorSubWithData = createSponsorSub;
    this.enrollmentComp.serviceCall(protocols);
    this.screenComp.createSponsorSubWithData = createSponsorSub;
    this.screenComp.serviceCall(protocols);
  }
  constructor(public dialog: MatDialog,private router: Router) {}
  isEnrollment: string = "enrollment";
  isScreen: string = "screen";
  rowheight: string;
  siteSunRowspan: string;
  siteTableRowspan: string;
  ngOnInit() {
    var windowH = window.screen.height;
    this.setPanelSize(windowH);
  }

  setPanelSize(height: number) {
    switch (height) {
      case 768:
        this.rowheight = "25vh";
        this.siteSunRowspan = "1.5";
        this.siteTableRowspan = "4";
        break;
      case 900:
        this.rowheight = "21vh";
        this.siteSunRowspan = "1.5";
        this.siteTableRowspan = "4";
        break;
      case 1050:
        this.rowheight = "35vh";
        this.siteSunRowspan = "1";
        this.siteTableRowspan = "2";
        break;
      case 1080:
        this.rowheight = "35vh";
        this.siteSunRowspan = "1";
        this.siteTableRowspan = "2";
        break;
      case 1200:
        this.rowheight = "32vh";
        this.siteSunRowspan = "1";
        this.siteTableRowspan = "2";
        break;
    }
  }
  onpieselected($event) {
    this.siteTable.setParametersForPaging($event.totalRows);    
   this.siteTable.reset(this.protocols, $event.chart, $event.name);
  }

  info_dispay_sitsenroll(){
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
      disableClose: true,
      data: { message: this.info_dispay_site_enroll},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
    });
  }

  info_dispay_sitescreen(){
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
      disableClose: true,
      data: { message: this.info_dispay_site_screen},
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
}
