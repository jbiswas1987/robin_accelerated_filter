import { Component, OnInit, OnDestroy } from "@angular/core";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { ChangeDetectorRef } from "@angular/core";
import { ProtocolPerformanceDetails, EchartLang } from "src/app/common/common";

@Component({
  selector: "app-all-kpi",
  templateUrl: "./all-kpi.component.html",
  styleUrls: ["./all-kpi.component.less"],
})
export class AllKpiComponent implements OnInit, OnDestroy {
  echartsIntance: any;
  showLoading: boolean = false;
  sponsor: any;
  data$: ProtocolPerformanceDetails[];
  echartLang: EchartLang = new EchartLang();
  sponsorSub: any;
  protocolPerformanceData_sub: any;
  sponsorVariableSub: any;
  public createSponsorSubWithData: boolean = false;

  constructor(
    private dataService: DashboardService,
    private cdRef: ChangeDetectorRef
  ) {}
  onChartInit(ec) {
    this.echartsIntance = ec;
  }

  ngOnInit() {
    this.setSponsorVariable();
    //this.serviceCall([]);
    //this.showLoading = true;
    //this.cdRef.detectChanges();
  }

  public reset(protocolList: string[]) {
    this.serviceCall(protocolList);
    this.showLoading = true;
    this.cdRef.detectChanges();
  }

  resetGraph(obj: any) {
  //  this.echartsIntance.clear();
  this.showLoading = false;
    let sponsorData = [];
    let comparatorData = [];
    if (obj[0]["sponsor"] && obj[0]["sponsor"] == "s") {
      sponsorData = [
        obj[0]["fks"],
        obj[0]["fpi"],
        obj[0]["lks"],
        obj[0]["lpi"],
        obj[0]["fpilpi"],
      ];
    }
    if (obj[1]["sponsor"] && obj[1]["sponsor"] == "c") {
      comparatorData = [
        obj[1]["fks"],
        obj[1]["fpi"],
        obj[1]["lks"],
        obj[1]["lpi"],
        obj[1]["fpilpi"],
      ];
    }
    this.option.series[0].data = sponsorData;
    this.option.series[1].data = comparatorData;

    if(this.echartsIntance != undefined){
      this.echartsIntance.setOption(this.option);
    }

    // this.echartsIntance.setOption(this.option);

    this.showLoading = false;
    this.cdRef.detectChanges();
  }

  option: any = {
    
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Sponsor", "Comparator"],
    },
    toolbox: {
      language: "en",
      show: true,
      feature: {
        dataView: {
          title: "Data View",
          readOnly: false,
          lang: ["Data View", "Close", "Refresh"],
        },
        magicType: {
          show: true,
          type: ["line", "bar"],
          title: {
            line: "Line",
            bar: "Bar",
          },
        },
        saveAsImage: { show: true, title: "save" },
      },
    },
    aria: this.echartLang.aria,
    calculable: true,
    xAxis: [
      {
        type: "category",
        data: ["PF-FKS", "PF-FPI", "PF-100%FKS", "PF-LPI", "FPI-LPI"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Sponsor",
        type: "bar",
        data: [],
      },
      {
        name: "Comparator",
        type: "bar",
        data: [],
      },
    ],
  };

  serviceCall(protocolList: string[]) {
    this.sponsorSub = this.dataService.sponsorName.subscribe((data) => {
      this.sponsor = data;
      console.log('@@@@@@@@@@@@@@' + this.sponsor)
      console.log('#################' + protocolList)
      this.getProtocolPerformanceData(protocolList, this.sponsor);
    });
  }

  populateProtocolPerformanceKPI(protocolList: string[]) {
    this.getProtocolPerformanceData(protocolList, this.sponsor);
  }

  getProtocolPerformanceData(protocolList: string[], sponsor: any) {
    this.showLoading = true;

    if (this.createSponsorSubWithData == true) {
      this.protocolPerformanceData_sub = this.dataService
        .protocolPerformance(protocolList, this.sponsor)
        .subscribe((obj) => this.resetGraph(obj));
    }
  }

  setSponsorVariable() {
    this.sponsorVariableSub = this.dataService.sponsorName.subscribe((data) => {
      this.sponsor = data;
    });
  }

  ngOnDestroy() {
    if (this.sponsorSub != undefined) this.sponsorSub.unsubscribe();
    if (this.protocolPerformanceData_sub != undefined)
      this.protocolPerformanceData_sub.unsubscribe();
    if (this.sponsorVariableSub != undefined)
      this.sponsorVariableSub.unsubscribe();
  }
}
