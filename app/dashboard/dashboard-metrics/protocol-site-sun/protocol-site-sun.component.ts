import { Component, OnInit, OnDestroy } from "@angular/core";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { ChangeDetectorRef } from "@angular/core";
import { Input } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { EchartLang } from "src/app/common/common";

@Component({
  selector: "app-protocol-site-sun",
  templateUrl: "./protocol-site-sun.component.html",
  styleUrls: ["./protocol-site-sun.component.less"],
})
export class ProtocolSiteSunComponent implements OnInit, OnDestroy {
  @Input() chartname: string;
  @Output() someCustomEvent = new EventEmitter<any>();
  echartsIntance: any;
  echartLang: EchartLang = new EchartLang();
  showLoading: boolean = false;
  title: string;
  sponsor: any;
  sponsorSub: any;
  protocolSun_Sub: any;
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
    //this.serviceCall([]);
    this.setSponsorVariable();
    this.showLoading = true;
    if (this.chartname == "screen") {
      this.title = "Site Screen BreakDown";
    } else {
      this.title = "Site Enroll BreakDown";
    }
  }
  sponsorNonEnroller: number = 0;
  comparatorNonEnroller: number = 0;
  sponsorHighEnroller: number = 0;
  comparatorHighEnroller: number = 0;
  sponsorMediumEnroller: number = 0;
  comparatorMediumEnroller: number = 0;
  sponsorLowEnroller: number = 0;
  comparatorLowEnroller: number = 0;
  totalCount : any;
  option = {
    series: {
      type: "sunburst",
      data: [],
      radius: [0, "90%"],
      label: {
        rotate: "radial",
      },
    },
  };

  chartOptionSites: any = {
    aria: this.echartLang.aria,
    title: {
      text: this.title,
      // subtext: "Click to get Details",
    },
    tooltip: {
      trigger: "item",
      position: function (params) {
        return [params[0] + 10, params[1] - 10];
      },
      formatter: "{b} : {c} ({d}%)",
      //formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    toolbox: {
      language: "en",
      show: true,
      feature: {
        dataView: {
          title: "Data View",
          lang: ["Data View", "Close", "Refresh"],
        },
        saveAsImage: { show: true, title: "save" },
      },
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  serviceCall(protocolList: string[]) {
    this.sponsorSub = this.dataService.sponsorName.subscribe((resdata) => {
      this.someCustomEvent.emit();
      this.sponsor = resdata;
      this.showLoading = true;

      this.getSunServiceCall(protocolList, this.chartname, resdata);
    });
  }

  setSponsorVariable() {
    this.sponsorVariableSub = this.dataService.sponsorName.subscribe((data) => {
      this.sponsor = data;
    });
  }

  resetGraph(obj: any) {
    // this.echartsIntance.clear();
    this.showLoading = false;
    this.cdRef.detectChanges();
   
    this.totalCount = (obj.sponsorNon+obj.sponsorLow+obj.sponsorMedium+obj.sponsorHigh)
    localStorage.setItem('totalCount',this.totalCount)
    this.dataService.paginationNumberUpdate(this.totalCount)
    let data = [
      { value: obj.sponsorNon, name: "Non-Performers" },
      { value: obj.sponsorLow, name: "Low-Performers" },
      { value: obj.sponsorMedium, name: "Medium-Performers" },
      { value: obj.sponsorHigh, name: "High-Performers" },
    ];

    this.chartOptionSites.series[0].data = data;
    this.chartOptionSites.title.text = this.title;
    if(this.echartsIntance != undefined){
      this.echartsIntance.setOption(this.chartOptionSites);
    }
    // this.echartsIntance.setOption(this.chartOptionSites);
  }
  public reset(protocolList: string[]) {
    this.serviceCall(protocolList);
    this.showLoading = true;
  }

  public populateProtocolSiteSun(protocolList: string[]) {
    this.someCustomEvent.emit();
    this.showLoading = true;

    this.getSunServiceCall(protocolList, this.chartname, this.sponsor);
  }

  //Service call to fetch protocol Site Sun data
  public getSunServiceCall(
    protocolList: string[],
    chartname: string,
    sponsor: any
  ) {
    if (this.createSponsorSubWithData == true) {
      this.protocolSun_Sub = this.dataService
        .getSun(protocolList, chartname, sponsor)
        .subscribe((obj) => this.resetGraph(obj));
    }
  }

  @Output() onpieselectedOut: EventEmitter<any> = new EventEmitter<any>();
  onpieselected($event) {
    let data = {
      name: $event.data.name,
      chart: this.chartname,
      totalRows: $event.data.value,
    };
    this.onpieselectedOut.emit(data);
  }

  ngOnDestroy() {
    if (this.sponsorSub != undefined) this.sponsorSub.unsubscribe();

    if (this.protocolSun_Sub != undefined) this.protocolSun_Sub.unsubscribe();

    if (this.sponsorVariableSub != undefined)
      this.sponsorVariableSub.unsubscribe();
  }
}
