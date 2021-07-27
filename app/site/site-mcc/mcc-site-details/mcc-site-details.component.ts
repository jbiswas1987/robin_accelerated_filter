import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-mcc-site-details",
  templateUrl: "./mcc-site-details.component.html",
  styleUrls: ["./mcc-site-details.component.less"],
})
export class MccSiteDetailsComponent implements OnInit {
  constructor() {}

  kpi_CL02bTP: string = "CL02bTP";
  kpi_CL02dQP: string = "CL02dQP";
  kpi_CL03bTP: string = "CL03bTP";
  kpi_CL08bTP: string = "CL08bTP";
  kpi_CL08dTP: string = "CL08dTP";
  kpi_CL09bTP: string = "CL09bTP";
  showLoading: boolean = false;

  ngOnInit() {}
}
