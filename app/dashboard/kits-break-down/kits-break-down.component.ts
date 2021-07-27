import { Component, OnInit, OnDestroy } from "@angular/core";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { GroupData } from "src/app/common/common";
import { ChangeDetectorRef } from "@angular/core";
@Component({
  selector: 'app-kits-break-down',
  templateUrl: './kits-break-down.component.html',
  styleUrls: ['./kits-break-down.component.less']
})
export class KitsBreakDownComponent implements OnInit {
  echartsIntance: any;
  showLoading: boolean = false;
  sponsor: any;
  sponsorSub: any;
  sponsorVariableSub: any;
  groupsData_sub: any;
  public createSponsorSubWithData: boolean = false;

  constructor(
    private dataService: DashboardService,
    private cdRef: ChangeDetectorRef
  ) {
    this.setSponsorVariable();
    // this.serviceCall([]);
    // this.showLoading = true;
  }
  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  ngOnInit() {}
  data$: GroupData[];

  chartOptionTA: any = {
    color: ["#008000"],

    series: [
      {
        type: "treemap",
        roam: "move",
        leafDepth: 1,
        itemStyle: {
          color: "#008000",
          borderWidth: 1,
        },
        label: {
          formatter: "{b}: {c}",
        },
        data: this.data$,
      },
    ],
    tooltip: {
      showDelay: 0,
      formatter: (params) => {
        return (
          '<div class="tooltip-title">' +
          params.name +
          "<br/>" +
          params.value +
          "</div>"
        );
      },
    },
  };

  public reset(protocolList: string[]) {
    this.serviceCall(protocolList);
    this.showLoading = true;
  }
  resetGraph(obj: any) {
    {
    
      console.log('Log' + JSON.stringify(obj))
      this.showLoading = false;
      this.cdRef.detectChanges();
      this.data$ = [
        {
          name: "All",
          id: "All",
          colorSaturation: [0.3, 1],
          color: [
            "#1f78b4",
            "#D3D3D3",
            "#008000",
            // "#33a02c",
            // "#fb9a99",
            // "#e31a1c",
            // "#fdbf6f",
            // "#ff7f00",
            // "#cab2d6",
            // "#a6cee3",
          ],
          children: obj,
        },
      ];
      this.chartOptionTA.series[0].data = this.data$;
      this.echartsIntance.setOption(this.chartOptionTA);
    }
  }

  serviceCall(protocolList: string[]) {
    this.sponsorSub = this.dataService.sponsorName.subscribe((data) => {
      this.sponsor = data;
      this.getGroupsData(protocolList, this.sponsor);
    });
  }

  populateSiteBreakdown(protocolList: string[]) {
    this.getGroupsData(protocolList, this.sponsor);
  }

  getGroupsData(protocolList: string[], sponsor: any) {
    this.showLoading = true;
    if (this.createSponsorSubWithData == true) {
      this.groupsData_sub = this.dataService
        .getGroups(protocolList, this.sponsor)
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

    if (this.groupsData_sub != undefined) this.groupsData_sub.unsubscribe();

    if (this.sponsorVariableSub != undefined)
      this.sponsorVariableSub.unsubscribe();
  }
}
