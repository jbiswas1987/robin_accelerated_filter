import { Component, OnInit, OnDestroy } from "@angular/core";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { GroupData } from "src/app/common/common";
import { ChangeDetectorRef } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common'
import {InfoDetailsComponent} from '../../common/info-details/info-details.component'
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard-groups",
  templateUrl: "./dashboard-groups.component.html",
  styleUrls: ["./dashboard-groups.component.less"],
})
export class DashboardGroupsComponent implements OnInit, OnDestroy {
  echartsIntance: any;
  showLoading: boolean = false;
  sponsor: any;
  sponsorSub: any;
  sponsorVariableSub: any;
  groupsData_sub: any;
  public createSponsorSubWithData: boolean = false;
  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/site_count_breakdown.pdf"
  constructor(
    private dataService: DashboardService,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router
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
    color: ["#005D78"],

    series: [
      {
        type: "treemap",
        roam: "move",
        leafDepth: 1,
        itemStyle: {
          color: "#68A4C2",
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
      this.showLoading = false;
      this.cdRef.detectChanges();
      this.data$ = [
        {
          name: "All",
          id: "All",
          colorSaturation: [0.3, 1],
          color: [
            "#1f78b4",
            "#5E9EBC",
            "#b2df8a",
            "#33a02c",
            "#fb9a99",
            "#e31a1c",
            "#fdbf6f",
            "#ff7f00",
            "#cab2d6",
            "#a6cee3",
          ],
          children: obj,
        },
      ];

      console.log('JSONValue' + JSON)

      this.chartOptionTA.series[0].data = this.data$;
      if(this.echartsIntance != undefined){
        this.echartsIntance.setOption(this.chartOptionTA);
      }
      // this.echartsIntance.setOption(this.chartOptionTA);
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
  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }

  infoDetails(content){
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
      disableClose: true,
      data: { message: this.info_dispay},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
    });

  }

  ngOnDestroy() {
    if (this.sponsorSub != undefined) this.sponsorSub.unsubscribe();

    if (this.groupsData_sub != undefined) this.groupsData_sub.unsubscribe();

    if (this.sponsorVariableSub != undefined)
      this.sponsorVariableSub.unsubscribe();
  }
}
