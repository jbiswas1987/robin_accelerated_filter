import { Component, OnInit, ViewChild } from "@angular/core";
import { MccKpiService } from "src/app/common/mcc-kpi/mcc-kpi.service";
import { SiteMccMetricsDetailsComponent } from "./site-mcc-metrics-details/site-mcc-metrics-details.component";
@Component({
  selector: "app-protocol-mcc-metrics",
  templateUrl: "./protocol-mcc-metrics.component.html",
  styleUrls: ["./protocol-mcc-metrics.component.less"],
})
export class ProtocolMccMetricsComponent implements OnInit {
  constructor(private service: MccKpiService) {}
  tabIndex: number;
  siteTabFlag: boolean = true;
  @ViewChild("sitemcc") siteComponent: SiteMccMetricsDetailsComponent;
  ngOnInit() {}
}
