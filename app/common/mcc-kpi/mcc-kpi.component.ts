import { Component, OnInit, OnDestroy } from "@angular/core";
import { Input } from "@angular/core";
import { Router } from "@angular/router";
import { MccKpiService } from "src/app/common/mcc-kpi/mcc-kpi.service";
import { DataService } from "src/app/common/data.service";
import { ActivatedRoute } from "@angular/router";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { DashboardService } from "../../dashboard/dashboard.service";
import { MccDetail } from "src/app/common/common";

@Component({
  selector: "app-mcc-kpi",
  templateUrl: "./mcc-kpi.component.html",
  styleUrls: ["./mcc-kpi.component.less"],
})
export class MccKpiComponent implements OnInit, OnDestroy {
  echartsIntance: any;
  echartsIntance_compare: any;
  @Input() id: string;
  @Input() name: string;
  @Input() desc: string;
  @Input() level: string;
  data: number;
  comparator: number;
  sponsor: any;
  showLoading: boolean = false;
  nameUI: string;
  protocolId: any;
  mcclevel: string;
  _mccBarValueSub: any;
  _sponsorSub: any;
  mccDetails: MccDetail = new MccDetail();
  color: any;
  mccPortfolio: any = this.mccDetails.mccPortfolio;
  sponsorVariableSub: any;
  _qryStrSponsor: string = "";
  //default case will be true
  public createSponsorSubWithData: boolean = true;

  constructor(
    private router: Router,
    private service: MccKpiService,
    private protocolService: DataService,
    private route: ActivatedRoute,
    private protservice: ProtocolService,
    private dataService: DashboardService
  ) {}

  ngOnInit() {
    let nameMap = {
      "CL-04aT-I": {
        name: "Samples within 2 days",
        desc: "% of samples from site received within 2 calendar days of visit",
      },
      "CL-04bT-S": {
        name: "On-Target Supplies Shipped",
        desc: "% of initial supplies shipped by the target date",
      },
      "CL-02dQ-P": {
        name: "Shipment with No Errors",
        desc: "% of shipments to sites that are received with no errors",
      },
      "CL-03bT-P": {
        name: "On-Target Re-supplies",
        desc: "% of re-supplies shipped by the target date",
      },
      "CL-08bT-P": {
        name: "On-Target Panic Alerts",
        desc: "% of panic alerts communicated to sites per requirement",
      },
      "CL-08dT-P": {
        name: "On-Time Test reported",
        desc: "% lab tests reported within expected turnaround time",
      },
      "CL-09bT-P": {
        name: "On-Target Final Data Transfer",
        desc:
          "Proportion of studies where Final Data Transfer occurs by target",
      },
      "CL-09dQ-P": {
        name: "Avg Data Trasfer Correction",
        desc:
          "Average number of times Final Data Transfer had to be corrected/repeated per study",
      },
      "CL-03cQ-I": {
        name: "Expedited Shipments",
        desc: "% of expedited shipments of lab supplies to Site",
      },
      "CL-04dQ-S": {
        name: "Quality Requirement",
        desc: "% of samples from the site that meet quality requierment",
      },
      "CL-05aQ-I": {
        name: "Lab Queries",
        desc: "% of requisition that generate lab queries",
      },
      "CL-05cC-I": {
        name: "Open-Close",
        desc: "Median days from open to closed for the site",
      },
      "CL-05eT-I": {
        name: "Queries Resolved within 7 days",
        desc: "% of queries resolved within 7 calendar days",
      },
      "CL-06aQ-I": {
        name: "Sample Reportable",
        desc: "% of sample reportable for all required tests",
      },
    };
    this.description = this.desc;
    this.nameUI = this.name;
    // this.reset([]);
    this.setSponsorVariable();
    this.route.params.subscribe((params) => {
      //console.log(params);
      if (Object.keys(params).length == 0) {
        this.mcclevel = "a";
        //this.reset([], this.mcclevel);
      } else {
        //console.log(params);
        if (params.hasOwnProperty("id")) {
          this.protocolId = params["id"];
          this.mcclevel = "p";
        } else if (params.hasOwnProperty("sid")) {
          this.protocolId = params["sid"];
          this.mcclevel = "s";
          if (params.hasOwnProperty("sponsor")) {
            this._qryStrSponsor = atob(params["sponsor"]);
          }
        }
        if (params.hasOwnProperty("sponsor")) {
          this._qryStrSponsor = atob(params["sponsor"]);
        }
  
        var protid = [];
        protid.push(this.protocolId);
        this.reset(protid, this.mcclevel);
      }
    });
  }

  getMccMetric(protocolList, mcclevel) {
    console.log("getMccMetric");
    this._sponsorSub = this.dataService.sponsorName.subscribe((data) => {
      this.showLoading = true;
     // this.sponsor = data;
    
      this._qryStrSponsor != "" ? this._qryStrSponsor : data;
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@' + data +'@@'+ this._qryStrSponsor)
      // this.mcclevel === "s" &&
      if ( this._qryStrSponsor != "") {
        this.sponsor = this._qryStrSponsor;
      }else{
        this.sponsor = data;
      }


      if (this.createSponsorSubWithData == true) {
        this._mccBarValueSub = this.service
          .getMccBar(this.id, protocolList, mcclevel,  this.sponsor )
          .subscribe((data) => {
            this.showLoading = false;
            this.data =
              Math.round((data["value"] + Number.EPSILON) * 100 * 100) / 100;
            this.comparator =
              Math.round(
                (data["comparatorvalue"] + Number.EPSILON) * 100 * 100
              ) / 100;
            if (mcclevel === "a" || mcclevel === "s") {
              this.color = "#005D78";
              this.option.series[0].itemStyle.color = this.color;
            } else if (mcclevel === "p") {
              let percentage = (this.comparator * 20) / 100;
              let modifyValue = this.comparator - percentage;

              if (this.data > this.comparator) {
                this.color = "#336600";
                this.option.series[0].itemStyle.color = this.color;
              } else if (
                this.data < this.comparator &&
                this.data > modifyValue
              ) {
                this.color = "#FFA500";
                this.option.series[0].itemStyle.color = this.color;
              } else if (this.data < modifyValue) {
                this.color = "#CC0000";
                this.option.series[0].itemStyle.color = this.color;
              }
            }

            // let percentage = (this.comparator *20)/100
            // let modifyValue = (this.comparator - percentage);

            // if(this.data >this.comparator ){
            //   this.color = "#336600"
            //   this.option.series[0].itemStyle.color= this.color;
            // }else if(this.data < this.comparator && this.data >modifyValue){
            //   this.color = "#FFA500"
            //   this.option.series[0].itemStyle.color= this.color;
            // }else if(this.data < modifyValue){
            //   this.color = "#CC0000"
            //   this.option.series[0].itemStyle.color= this.color;
            // }

            // let diff = (this.data - this.comparator)
            // let percentage = (this.comparator *20)/100
            // let modifyValue = (this.comparator - percentage);

            // if(diff >25.00){
            //   this.color = "#336600"
            //   this.option.series[0].itemStyle.color= this.color;
            // }else if(diff >15.00 && diff <25.00){
            //   this.color = "#CC6600"
            //   this.option.series[0].itemStyle.color= this.color;
            // }else if(diff < 15.00){
            //   this.color = "#CC0000"
            //   this.option.series[0].itemStyle.color= this.color;
            // }
            //   else{
            //   this.color = "#000000"
            //   this.option.series[0].itemStyle.color= this.color;
            // }
            this.option.series[0].data[0] = this.data;
            this.option_comparesion.series[0].data[0] = this.comparator;

            //  this.echartsIntance.setOption(this.option, true);
           
            // this.echartsIntance.setOption(this.option_comparesion, true);
            if (this.echartsIntance_compare != undefined)
              this.echartsIntance_compare.setOption(
                this.option_comparesion,
                true
              );
               this.echartsIntance.setOption(this.option, true);
          });
      }
      //reset the flag to true
      this.createSponsorSubWithData = true;
    });
  }

  public reset(protocolList: string[], mcclevel: string) {
    // alert(protocolList);
    this.getMccMetric(protocolList, mcclevel);
    this.showLoading = true;
  }

  setSponsorVariable() {
    this.sponsorVariableSub = this.dataService.sponsorName.subscribe((data) => {
      this.sponsor = data;
    });
  }

  populateAllMCCValues(protocolList: string[], mcclevel: string) {
    console.log("populateAllMCCValues");
    this.showLoading = true;
    this._mccBarValueSub = this.service
      .getMccBar(this.id, protocolList, mcclevel, this.sponsor)
      .subscribe((data) => {
        this.showLoading = false;
        this.data =
          Math.round((data["value"] + Number.EPSILON) * 100 * 100) / 100;

        if (this.data > 25.0) {
          this.color = "#005D78";
        } else {
          this.color = "#000000";
        }
        //default color for the MCC bar
        this.color = "#005D78";
        this.option.series[0].itemStyle.color = this.color;

        this.option.series[0].data[0] = this.data;
        this.option_comparesion.series[0].data[0] = 25.0;

        this.echartsIntance.setOption(this.option, true);
        //this.echartsIntance_compare.setOption(this.option_comparesion, true);
        this.showLoading = true;
      });
  }

  getMCCBarValues() {}

  onChartInit(ec) {
    //console.log(this.level);
    this.echartsIntance = ec;
    if (this.mcclevel === "s" || this.mcclevel === "a") {
      this.option.title.text = "MCC: " + this.nameUI;
      this.option.title.subtext = this.description;
    }
    // this.option.title.text = "MCC: " + this.nameUI;
    // this.option.title.subtext = this.description;
    // this.option.title.text = 'Protocol'

    this.option.series[0].data[0] = 0 * 100;
    this.option.series[0].id = this.id;
    this.option.series[0].name = this.level;
    this.echartsIntance.setOption(this.option, true);
  }

  onChartInit_comparesion(ec) {
    //console.log(this.level);
    this.echartsIntance_compare = ec;
    // this.option.title.text = "MCC: " + this.nameUI;
    // this.option.title.subtext = this.description;
    // this.option.title.subtext ="Comparator";
    // this.option.title.text = 'Comparator'

    this.option_comparesion.series[0].data[0] = 0 * 100;
    this.option_comparesion.series[0].id = this.id;
    this.option_comparesion.series[0].name = this.level;
    this.echartsIntance_compare.setOption(this.option_comparesion, true);
  }

  description: string;

  option = {
    name: "gau",
    title: {
      text: "",
      textStyle: {
        fontSize: 13,
      },
      subtext: "",
    },
    tooltip: {
      trigger: "axis",
      position: ["35%", "32%"],
      // position: function (params) {
      //   return [params[1] + 15, params[1] + 10];
      // },
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["2011"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      middle: "20%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      max: 100,
      minInterval: 10,
    },
    yAxis: {
      type: "category",
      data: [""],
    },
    series: [
      {
        name: "percentage",
        id: "",
        type: "bar",
        data: [25],
        itemStyle: {
          // color:"#005D78",

          color: "",
        },
      },
    ],
  };

  //-------------------Comparison------------------------------------------------------

  option_comparesion = {
    name: "gau",
    title: {
      text: "",
      textStyle: {
        fontSize: 13,
      },
      subtext: "",
    },
    tooltip: {
      trigger: "axis",
      position: function (params) {
        return [params[1] + 10, params[1] + 10];
      },
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["2011"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      max: 100,
      minInterval: 10,
    },
    yAxis: {
      type: "category",
      data: [""],
    },
    series: [
      {
        name: "percentage",
        id: "",
        type: "bar",
        data: [25],
        itemStyle: {
          color: "#005D78",
        },
      },
    ],
  };

  //------------------------------------------------------------------------------------

  onpieselected($event) {
    console.log($event);
    debugger
    
    if ($event.seriesName === "Protocol Level") {
      // this.protocolService.setMetric($event.seriesId);
      //  this.service.setIndexSelected(1);
      var prot,sponsor;
      console.log(this.route.params)
      this.route.params.subscribe((params) => {
        //console.log("protocol ID:"+params['id']);
        prot = params["id"];
        sponsor = this.sponsor
        // this.protservice.getProtocolInfo(prot).subscribe((data:ProtocolInfo) =>  {
        //    console.log(data.protocolId);
        var protArr = [];
        protArr.push(prot);
        this.protocolService.setProtocolList(protArr);
        localStorage.setItem('sponsor_name',this.sponsor)
        console.log("home/protocol", prot, $event.seriesId);
        this.router.navigate(["protocol", prot, $event.seriesId]);
        // this.router.navigate(["home/protocol", prot, $event.seriesId]);
        // });
      });
    } else if ($event.seriesName === "Site Level") {
      // alert("Site");
      return;
    } else {
      this.protocolService.setProtocolList([]);
      this.router.navigate(["home/mcc", $event.seriesId]);
    }
  }

  ngOnDestroy() {
    if (this._sponsorSub != undefined) this._sponsorSub.unsubscribe();
    if (this._mccBarValueSub != undefined) this._mccBarValueSub.unsubscribe();
    if (this.sponsorVariableSub != undefined)
      this.sponsorVariableSub.unsubscribe();
  }
}
