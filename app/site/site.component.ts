import { Component, OnInit } from "@angular/core";
import { BackServiceService } from "../common/back-service.service";
import { LocationStrategy } from "@angular/common";

@Component({
  selector: "app-site",
  templateUrl: "./site.component.html",
  styleUrls: ["./site.component.less"],
})
export class SiteComponent implements OnInit {
  constructor(
    private backServices: BackServiceService,
    private location: LocationStrategy
  ) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit() {}

  backButtonActivity() {
    this.backServices.setBackButtonValue("true");
    this.backServices.setZoomLevelFilter("true");
  }
}
