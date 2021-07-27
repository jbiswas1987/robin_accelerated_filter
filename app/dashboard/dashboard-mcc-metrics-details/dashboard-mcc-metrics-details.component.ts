import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BackServiceService } from "../../common/back-service.service";
import { LocationStrategy } from "@angular/common";
import { Location } from "@angular/common";

@Component({
  selector: "app-dashboard-mcc-metrics-details",
  templateUrl: "./dashboard-mcc-metrics-details.component.html",
  styleUrls: ["./dashboard-mcc-metrics-details.component.less"],
})
export class DashboardMccMetricsDetailsComponent implements OnInit {
  _qryStrSponsor: any;
  _protocolID: any;
  _backURL: any;
  logo: any = this.getBaseUrl() + "/assets/icon/covance_logo.png";
  constructor(
    private route: ActivatedRoute,
    private backServices: BackServiceService,
    private location: LocationStrategy,
    private router: Router
  ) {
    this._qryStrSponsor = localStorage.getItem("sponsor_name");
    this._protocolID = localStorage.getItem("robin_PId");
    this._backURL =
      "protocols" + "/" + this._protocolID + "/" + btoa(this._qryStrSponsor);
    console.log("Back URl" + this._backURL);
  }
  gobackFlag: boolean;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params);
      if (Object.keys(params).length > 1) {
        this.gobackFlag = false;
      } else {
        this.gobackFlag = true;
      }
    });

    // history.pushState(null, null, window.location.href);
    // this.location.onPopState(() => {
    //   history.pushState(null, null, window.location.href);
    // });
  }
  backButtonActivity() {
    this.backServices.setBackButtonValue("true");
    this.backServices.setZoomLevelFilter("true");
    //this.location.back();
  }
  navigate() {
    //  debugger
    this.location.back();
  }

  backButtonHome(){
    this.router.navigate(["home/landing"]);
  }

  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }
}
