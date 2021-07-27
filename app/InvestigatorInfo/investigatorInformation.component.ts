import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "inv-info",
  templateUrl: "./investigatorInformation.component.html",
  styleUrls: ["./investigatorInformation.component.less"],
})
export class InvestigatorInformation implements OnInit {
  logo: any = this.getBaseUrl() + "/assets/icon/covance_logo.png";
  constructor(private route: ActivatedRoute, private router: Router) {}
  _qryStrSponsor: any = "";
  

  ngOnInit() {
    console.log("investigator info Initialized");
    this.route.params.subscribe((params) => {
      if (params.hasOwnProperty("sponsor")) {
        this._qryStrSponsor = atob(params["sponsor"]);
      }
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
