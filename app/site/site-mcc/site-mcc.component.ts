import { Component, OnInit } from "@angular/core";
import { MccDetail } from "src/app/common/common";
@Component({
  selector: "app-site-mcc",
  templateUrl: "./site-mcc.component.html",
  styleUrls: ["./site-mcc.component.less"],
})
export class SiteMccComponent implements OnInit {
  CL03cQI: string = "CL-03cQ-I";
  CL04aTI: string = "CL-04aT-I";
  CL04dQS: string = "CL-04dQ-S";
  CL05aQI: string = "CL-05aQ-I";
  CL05cCI: string = "CL-05cC-I";
  CL05eTI: string = "CL-05eT-I";
  CL06aQI: string = "CL-06aQ-I";
  showLoading: boolean = false;

  mccDetails: MccDetail = new MccDetail();
  mccPortfolio: any = this.mccDetails.mccPortfolio;
  level: string = "Site Level";
  constructor() {}

  ngOnInit() {}
}
