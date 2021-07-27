import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { MccService } from "src/app/mcc/mcc.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { supplyTargetRes } from "../../model/supplyTargetRes";
import { SupplyTargetTooltipRes } from "../../model/SupplyTargetTooltipRes";
import { MccProtocolListComponent } from "../../../app/mcc/mcc-protocol-list/mcc-protocol-list.component";
import { DataService } from "src/app/common/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MccDetail } from "src/app/common/common";
import { parseTemplate } from "@angular/compiler";
import { DashboardService } from "../../dashboard/dashboard.service";
@Component({
  selector: 'app-protocol-kits-in-kits-out-scatter',
  templateUrl: './protocol-kits-in-kits-out-scatter.component.html',
  styleUrls: ['./protocol-kits-in-kits-out-scatter.component.less'],
  providers: [MccService],
})
export class ProtocolKitsInKitsOutScatterComponent implements OnInit {
  echartsIntance: any;
  showLoading: boolean = false;
  title: string;
  scatterArray: Array<any>;
  Idata: any;
  id: string;
  protocolList: string[] = [];
  scatData: Array<any>;
  mccDetails: MccDetail = new MccDetail();
  mccObj: any;
  level: string;
  public _mccSub;
  _sponsor: any;
  _scatterDataSub: any;
  @ViewChild("drawer") drawer: MatSidenav;
  @ViewChild("protListComponent") protListComponent: MccProtocolListComponent;

  obj : any = [{"x":100,"y":26,"name":"GAO4753g","id":"2928","SLTInvestigatorId":0},{"x":80.02,"y":41234,"name":"WA25046","id":"2719","SLTInvestigatorId":0},{"x":77.78,"y":42559,"name":"WA21092","id":"2895","SLTInvestigatorId":0},{"x":78.93,"y":41066,"name":"WA21093","id":"2742","SLTInvestigatorId":0},{"x":80.77,"y":2974,"name":"WN25203","id":"2816","SLTInvestigatorId":0},{"x":40,"y":95,"name":"GO27983","id":"2423","SLTInvestigatorId":0},{"x":100,"y":18,"name":"GX28198","id":"2326","SLTInvestigatorId":0},{"x":81.61,"y":87,"name":"GO27834","id":"2356","SLTInvestigatorId":0},{"x":75,"y":16,"name":"NV25719","id":"2491","SLTInvestigatorId":0},{"x":77.62,"y":697,"name":"WA28119","id":"2170","SLTInvestigatorId":0},{"x":88.99,"y":6030,"name":"GN28352","id":"2176","SLTInvestigatorId":0},{"x":28.21,"y":78,"name":"BO25114","id":"2430","SLTInvestigatorId":0},{"x":0,"y":27,"name":"GB28547","id":"2247","SLTInvestigatorId":0},{"x":80,"y":15,"name":"ML28685","id":"2011","SLTInvestigatorId":0},{"x":100,"y":1,"name":"GO28753","id":"2013","SLTInvestigatorId":0},{"x":64.04,"y":1474,"name":"WO29074","id":"2072","SLTInvestigatorId":0},{"x":89.19,"y":2480,"name":"WN28745","id":"2114","SLTInvestigatorId":0},{"x":70.4,"y":1581,"name":"GO28754","id":"1980","SLTInvestigatorId":0},{"x":41.51,"y":53,"name":"GO29044","id":"2187","SLTInvestigatorId":0},{"x":63.4,"y":153,"name":"WP29158","id":"1882","SLTInvestigatorId":0},{"x":76.42,"y":1090,"name":"GO28915","id":"1933","SLTInvestigatorId":0},{"x":80.36,"y":942,"name":"GO29293","id":"1050","SLTInvestigatorId":0},{"x":80.83,"y":1038,"name":"GO27878","id":"2109","SLTInvestigatorId":0},{"x":44.06,"y":202,"name":"GO29213","id":"1869","SLTInvestigatorId":0},{"x":82.17,"y":3140,"name":"WA29330","id":"1751","SLTInvestigatorId":0},{"x":18.37,"y":49,"name":"ML29258","id":"1823","SLTInvestigatorId":0},{"x":100,"y":62,"name":"BO29337","id":"17","SLTInvestigatorId":0},{"x":66.22,"y":148,"name":"GX29176","id":"1806","SLTInvestigatorId":0},{"x":58.54,"y":41,"name":"GX29185","id":"1805","SLTInvestigatorId":0},{"x":54.09,"y":440,"name":"GO29294","id":"1671","SLTInvestigatorId":0},{"x":63.19,"y":5477,"name":"GO29365","id":"1820","SLTInvestigatorId":0},{"x":50.5,"y":1202,"name":"GO29383","id":"1901","SLTInvestigatorId":0},{"x":34.87,"y":3132,"name":"GO29058","id":"1895","SLTInvestigatorId":0},{"x":10.93,"y":8059,"name":"MO29112","id":"1712","SLTInvestigatorId":0},{"x":36.16,"y":954,"name":"WO29479","id":"1766","SLTInvestigatorId":0},{"x":0,"y":12,"name":"TRANSSTUDY01","id":"3706","SLTInvestigatorId":0},{"x":83.86,"y":43495,"name":"GA29144","id":"1799","SLTInvestigatorId":0},{"x":76.61,"y":825,"name":"YO28762","id":"1366","SLTInvestigatorId":0},{"x":42.84,"y":3651,"name":"WO29519","id":"1467","SLTInvestigatorId":0},{"x":37.53,"y":8753,"name":"GO29431","id":"1584","SLTInvestigatorId":0},{"x":49.24,"y":43908,"name":"GO29527","id":"1525","SLTInvestigatorId":0},{"x":92.98,"y":1267,"name":"GN29632","id":"1638","SLTInvestigatorId":0},{"x":0,"y":8,"name":"GO29432","id":"1583","SLTInvestigatorId":0},{"x":42.77,"y":4499,"name":"GO29436","id":"1630","SLTInvestigatorId":0},{"x":48.54,"y":4176,"name":"GO29437","id":"1625","SLTInvestigatorId":0},{"x":45.49,"y":3878,"name":"GO29537","id":"1626","SLTInvestigatorId":0},{"x":72.05,"y":254,"name":"GO29687","id":"1731","SLTInvestigatorId":0},{"x":13.22,"y":121,"name":"BO27938","id":"2434","SLTInvestigatorId":0},{"x":64.62,"y":4514,"name":"GX28228","id":"1666","SLTInvestigatorId":0},{"x":8.92,"y":269,"name":"BO29448","id":"1856","SLTInvestigatorId":0},{"x":77.76,"y":2864,"name":"WO29522","id":"1560","SLTInvestigatorId":0},{"x":0,"y":1,"name":"BO25041","id":"2602","SLTInvestigatorId":0},{"x":84.56,"y":5206,"name":"GO29695","id":"1602","SLTInvestigatorId":0},{"x":42.01,"y":814,"name":"GO29665","id":"1308","SLTInvestigatorId":0},{"x":66.17,"y":7456,"name":"WO29637","id":"1568","SLTInvestigatorId":0},{"x":0,"y":3,"name":"BO28408","id":"1741","SLTInvestigatorId":0},{"x":0,"y":40,"name":"BO25380","id":"3247","SLTInvestigatorId":0},{"x":31.69,"y":549,"name":"MO29518","id":"1778","SLTInvestigatorId":0},{"x":9.34,"y":182,"name":"BO25126","id":"2791","SLTInvestigatorId":0},{"x":92.39,"y":355,"name":"GO29754","id":"1669","SLTInvestigatorId":0},{"x":46.11,"y":65471,"name":"GO29781","id":"1622","SLTInvestigatorId":0},{"x":87.53,"y":3962,"name":"WA29767","id":"1730","SLTInvestigatorId":0},{"x":95.55,"y":5818,"name":"BN29739","id":"1465","SLTInvestigatorId":0},{"x":89.22,"y":13071,"name":"GA29145","id":"1841","SLTInvestigatorId":0},{"x":62.4,"y":7702,"name":"WO29636","id":"1733","SLTInvestigatorId":0},{"x":83.1,"y":1740,"name":"BO29563","id":"1354","SLTInvestigatorId":0},{"x":47.8,"y":6550,"name":"GO29834","id":"1401","SLTInvestigatorId":0},{"x":67.9,"y":5258,"name":"GO29833","id":"1444","SLTInvestigatorId":0},{"x":66.94,"y":121,"name":"BH29812","id":"1536","SLTInvestigatorId":0},{"x":32.7,"y":159,"name":"MA29585","id":"1654","SLTInvestigatorId":0},{"x":57.53,"y":558,"name":"WO29635","id":"1291","SLTInvestigatorId":0},{"x":12.5,"y":8,"name":"ML29366","id":"1434","SLTInvestigatorId":0},{"x":38.18,"y":16862,"name":"BO28407","id":"1991","SLTInvestigatorId":0},{"x":78.42,"y":4921,"name":"RASP-MRC","id":"3833","SLTInvestigatorId":0},{"x":66.94,"y":20590,"name":"WA29748","id":"1509","SLTInvestigatorId":0},{"x":89.23,"y":1912,"name":"GO29831","id":"1390","SLTInvestigatorId":0},{"x":92.01,"y":2679,"name":"BN29854","id":"1530","SLTInvestigatorId":0},{"x":82.91,"y":33923,"name":"BN29552","id":"1361","SLTInvestigatorId":0},{"x":79.78,"y":1647,"name":"GH29914","id":"1362","SLTInvestigatorId":0},{"x":14.19,"y":296,"name":"MO29750","id":"1392","SLTInvestigatorId":0},{"x":2.13,"y":2061,"name":"GX29504-Ballpark","id":"3800","SLTInvestigatorId":0},{"x":53.95,"y":5008,"name":"GO29438","id":"1294","SLTInvestigatorId":0},{"x":56.42,"y":10101,"name":"BH29884","id":"1492","SLTInvestigatorId":0},{"x":89.64,"y":550,"name":"GN30009","id":"1307","SLTInvestigatorId":0},{"x":55.38,"y":3817,"name":"GN29823","id":"1295","SLTInvestigatorId":0},{"x":64.88,"y":1341,"name":"BO29562","id":"1598","SLTInvestigatorId":0},{"x":92.11,"y":3396,"name":"GX29915","id":"1150","SLTInvestigatorId":0},{"x":94.5,"y":6854,"name":"GA29469","id":"1454","SLTInvestigatorId":0},{"x":93.15,"y":146,"name":"GO30139","id":"1094","SLTInvestigatorId":0},{"x":94.55,"y":1614,"name":"BO30013","id":"1132","SLTInvestigatorId":0},{"x":68.89,"y":9501,"name":"ML29966","id":"1516","SLTInvestigatorId":0},{"x":59.37,"y":699,"name":"CO39083","id":"1063","SLTInvestigatorId":0},{"x":50.34,"y":5485,"name":"BH29992","id":"1286","SLTInvestigatorId":0},{"x":58.4,"y":24736,"name":"BH30071","id":"1244","SLTInvestigatorId":0},{"x":98,"y":1452,"name":"MN30035","id":"1311","SLTInvestigatorId":0},{"x":65.14,"y":38546,"name":"WO30070","id":"1378","SLTInvestigatorId":0},{"x":86.24,"y":734,"name":"YO29232","id":"1135","SLTInvestigatorId":0},{"x":70,"y":3217,"name":"GO30081","id":"1165","SLTInvestigatorId":0},{"x":43.57,"y":1244,"name":"GO30182","id":"1250","SLTInvestigatorId":0},{"x":12.36,"y":1983,"name":"MA30005","id":"1275","SLTInvestigatorId":0},{"x":66.4,"y":15335,"name":"GA29350","id":"1151","SLTInvestigatorId":0},{"x":62.75,"y":1828,"name":"YO29449","id":"1146","SLTInvestigatorId":0},{"x":69.35,"y":61000,"name":"GB39242","id":"1217","SLTInvestigatorId":0},{"x":83.52,"y":267,"name":"GX30191","id":"1402","SLTInvestigatorId":0},{"x":82.13,"y":2412,"name":"ML28897","id":"1928","SLTInvestigatorId":0},{"x":79.01,"y":66205,"name":"GA30044","id":"1170","SLTInvestigatorId":0},{"x":81.25,"y":32,"name":"MO29694","id":"980","SLTInvestigatorId":0},{"x":91.78,"y":73,"name":"ML39237","id":"1242","SLTInvestigatorId":0},{"x":45.46,"y":959,"name":"WO30085","id":"1262","SLTInvestigatorId":0},{"x":63.32,"y":29774,"name":"WO39210","id":"1067","SLTInvestigatorId":0},{"x":72.56,"y":44993,"name":"GA30067","id":"1198","SLTInvestigatorId":0},{"x":46.88,"y":4074,"name":"BO39182","id":"1023","SLTInvestigatorId":0},{"x":44.26,"y":10180,"name":"GO39374","id":"3053","SLTInvestigatorId":0},{"x":54.46,"y":112,"name":"ML39356","id":"1037","SLTInvestigatorId":0},{"x":69.01,"y":38539,"name":"CO39385","id":"1027","SLTInvestigatorId":0},{"x":27.81,"y":21957,"name":"CO39262","id":"1169","SLTInvestigatorId":0},{"x":46.92,"y":31523,"name":"YO39523","id":"1140","SLTInvestigatorId":0},{"x":53.12,"y":14964,"name":"MA30143","id":"1011","SLTInvestigatorId":0},{"x":49.29,"y":2873,"name":"WO39409","id":"902","SLTInvestigatorId":0},{"x":94.49,"y":48118,"name":"GC39547","id":"3052","SLTInvestigatorId":0},{"x":69.23,"y":26,"name":"WA39085","id":"163","SLTInvestigatorId":0},{"x":78.26,"y":437,"name":"CR39521","id":"1139","SLTInvestigatorId":0},{"x":83.47,"y":71917,"name":"BN29553","id":"879","SLTInvestigatorId":0},{"x":47.17,"y":2048,"name":"MO29872","id":"892","SLTInvestigatorId":0},{"x":39.6,"y":6371,"name":"CO39721","id":"846","SLTInvestigatorId":0},{"x":0,"y":16,"name":"MO29978","id":"1053","SLTInvestigatorId":0},{"x":45.71,"y":12697,"name":"WO39608","id":"890","SLTInvestigatorId":0},{"x":98.85,"y":87,"name":"NP39403","id":"949","SLTInvestigatorId":0},{"x":35.52,"y":16704,"name":"CO39722","id":"941","SLTInvestigatorId":0},{"x":82.93,"y":2812,"name":"BO29919","id":"1013","SLTInvestigatorId":0},{"x":100,"y":99,"name":"BP29920","id":"1038","SLTInvestigatorId":0},{"x":61.36,"y":41271,"name":"CO39303","id":"987","SLTInvestigatorId":0},{"x":18.64,"y":1572,"name":"MO39107","id":"3822","SLTInvestigatorId":0},{"x":73.83,"y":4693,"name":"BO39813","id":"841","SLTInvestigatorId":0},{"x":92.98,"y":8722,"name":"MO39129","id":"891","SLTInvestigatorId":0},{"x":58.01,"y":8721,"name":"WO39392","id":"928","SLTInvestigatorId":0},{"x":92.75,"y":19592,"name":"BO29554","id":"3048","SLTInvestigatorId":0},{"x":60.87,"y":16927,"name":"MO39196","id":"912","SLTInvestigatorId":0},{"x":87.99,"y":4063,"name":"YA29359","id":"3049","SLTInvestigatorId":0},{"x":85.98,"y":35138,"name":"GN39763","id":"752","SLTInvestigatorId":0},{"x":70.6,"y":3928,"name":"YO39609","id":"741","SLTInvestigatorId":0},{"x":96.75,"y":123,"name":"NP39461","id":"885","SLTInvestigatorId":0},{"x":61.64,"y":7787,"name":"GO39775","id":"769","SLTInvestigatorId":0},{"x":88.83,"y":6349,"name":"GA39688","id":"760","SLTInvestigatorId":0},{"x":89.05,"y":6057,"name":"GA39855","id":"761","SLTInvestigatorId":0},{"x":82.19,"y":71363,"name":"WN39658","id":"822","SLTInvestigatorId":0},{"x":67.95,"y":3557,"name":"CO39611","id":"3063","SLTInvestigatorId":0},{"x":45.2,"y":7697,"name":"GO39932","id":"711","SLTInvestigatorId":0},{"x":98.44,"y":834,"name":"GR39821","id":"749","SLTInvestigatorId":0},{"x":49.69,"y":10488,"name":"CO40016","id":"705","SLTInvestigatorId":0},{"x":100,"y":146,"name":"NP39487","id":"750","SLTInvestigatorId":0},{"x":85.34,"y":60335,"name":"WN29922","id":"821","SLTInvestigatorId":0},{"x":17.26,"y":1315,"name":"MO39171","id":"736","SLTInvestigatorId":0},{"x":74.55,"y":1387,"name":"GO39902","id":"778","SLTInvestigatorId":0},{"x":55.33,"y":3040,"name":"BO39610","id":"3062","SLTInvestigatorId":0},{"x":33.36,"y":2224,"name":"CO40151","id":"292","SLTInvestigatorId":0},{"x":85.44,"y":16967,"name":"GA30066","id":"648","SLTInvestigatorId":0},{"x":16.47,"y":3424,"name":"GA39846","id":"3532","SLTInvestigatorId":0},{"x":67.68,"y":28960,"name":"GO39942","id":"770","SLTInvestigatorId":0},{"x":7.57,"y":1758,"name":"NP39051","id":"758","SLTInvestigatorId":0},{"x":26.39,"y":4517,"name":"CO40115","id":"697","SLTInvestigatorId":0},{"x":84.94,"y":2876,"name":"BN40031","id":"2972","SLTInvestigatorId":0},{"x":76.78,"y":16763,"name":"GA39925","id":"668","SLTInvestigatorId":0},{"x":78.22,"y":1561,"name":"GO39869","id":"616","SLTInvestigatorId":0},{"x":48.92,"y":2034,"name":"GO40311","id":"2975","SLTInvestigatorId":0},{"x":76.92,"y":13,"name":"ML39791","id":"718","SLTInvestigatorId":0},{"x":26.47,"y":10191,"name":"MO39193","id":"798","SLTInvestigatorId":0},{"x":78.14,"y":828,"name":"NP39305","id":"1078","SLTInvestigatorId":0},{"x":58.89,"y":9623,"name":"WO39391","id":"727","SLTInvestigatorId":0},{"x":57.14,"y":6166,"name":"YO39309","id":"838","SLTInvestigatorId":0},{"x":67.64,"y":13627,"name":"YO40245","id":"788","SLTInvestigatorId":0},{"x":92.88,"y":2459,"name":"CA40192","id":"654","SLTInvestigatorId":0},{"x":93.15,"y":18940,"name":"WN39434","id":"773","SLTInvestigatorId":0},{"x":59.35,"y":10196,"name":"WO40242","id":"615","SLTInvestigatorId":0},{"x":87.7,"y":7816,"name":"WA40169","id":"655","SLTInvestigatorId":0},{"x":71.47,"y":1132,"name":"BO40336","id":"591","SLTInvestigatorId":0},{"x":34.45,"y":23387,"name":"WO40324","id":"732","SLTInvestigatorId":0},{"x":69.99,"y":1883,"name":"GO40515","id":"623","SLTInvestigatorId":0},{"x":66.2,"y":2701,"name":"GO40516","id":"3104","SLTInvestigatorId":0},{"x":60.49,"y":1144,"name":"GO40554","id":"3103","SLTInvestigatorId":0},{"x":38.35,"y":206,"name":"YO40482","id":"3101","SLTInvestigatorId":0},{"x":6.76,"y":296,"name":"MO39136","id":"3105","SLTInvestigatorId":0},{"x":60.73,"y":764,"name":"WO40181","id":"494","SLTInvestigatorId":0},{"x":84.33,"y":32666,"name":"GR40349","id":"659","SLTInvestigatorId":0},{"x":75.46,"y":32491,"name":"GR40398","id":"658","SLTInvestigatorId":0},{"x":58.44,"y":1273,"name":"GO40558","id":"3008","SLTInvestigatorId":0},{"x":74.09,"y":440,"name":"CP40559","id":"461","SLTInvestigatorId":0},{"x":77.61,"y":2291,"name":"CP40563","id":"449","SLTInvestigatorId":0},{"x":64.64,"y":10743,"name":"BN40422","id":"543","SLTInvestigatorId":0},{"x":75.74,"y":111848,"name":"BN40423","id":"323","SLTInvestigatorId":0},{"x":76.39,"y":11908,"name":"GR40548","id":"3070","SLTInvestigatorId":0},{"x":87.61,"y":331,"name":"WA40404","id":"295","SLTInvestigatorId":0},{"x":52.67,"y":6755,"name":"BO40747","id":"482","SLTInvestigatorId":0},{"x":31.6,"y":462,"name":"MX39795","id":"728","SLTInvestigatorId":0},{"x":95.9,"y":1512,"name":"GS40868","id":"373","SLTInvestigatorId":0},{"x":78.64,"y":7506,"name":"GS40965","id":"3014","SLTInvestigatorId":0},{"x":51.58,"y":1043,"name":"BP40657","id":"573","SLTInvestigatorId":0},{"x":78.77,"y":21486,"name":"GR40844","id":"3097","SLTInvestigatorId":0},{"x":49.03,"y":569,"name":"GO40800","id":"416","SLTInvestigatorId":0},{"x":23.38,"y":2913,"name":"CP40617","id":"399","SLTInvestigatorId":0},{"x":0,"y":2004,"name":"YP40902","id":"271","SLTInvestigatorId":0},{"x":57.61,"y":243,"name":"GO40987","id":"402","SLTInvestigatorId":0},{"x":28.76,"y":299,"name":"CO40939","id":"3095","SLTInvestigatorId":0},{"x":79.56,"y":1311,"name":"BP40410","id":"142","SLTInvestigatorId":0},{"x":90.83,"y":120,"name":"GA41003","id":"3420","SLTInvestigatorId":0},{"x":83.04,"y":11408,"name":"BN40955","id":"379","SLTInvestigatorId":0},{"x":77.29,"y":458,"name":"GO41036","id":"64","SLTInvestigatorId":0},{"x":99.91,"y":1100,"name":"WP41152","id":"3000","SLTInvestigatorId":0},{"x":97.24,"y":1700,"name":"GR40973","id":"2991","SLTInvestigatorId":0},{"x":100,"y":33,"name":"WP41045","id":"406","SLTInvestigatorId":0},{"x":16.34,"y":1034,"name":"GA41024","id":"3533","SLTInvestigatorId":0},{"x":90.77,"y":336,"name":"CN41144","id":"357","SLTInvestigatorId":0},{"x":2.77,"y":902,"name":"BP40995","id":"188","SLTInvestigatorId":0},{"x":0,"y":6,"name":"CO41101","id":"67","SLTInvestigatorId":0},{"x":93.75,"y":32,"name":"ML40767","id":"3630","SLTInvestigatorId":0},{"x":100,"y":15,"name":"WP40877","id":"3118","SLTInvestigatorId":0},{"x":100,"y":105,"name":"JP41172","id":"3309","SLTInvestigatorId":0},{"x":0,"y":8,"name":"CO41012","id":"95","SLTInvestigatorId":0},{"x":87.9,"y":471,"name":"GB41149","id":"237","SLTInvestigatorId":0}]
  constructor(
    private dataService: MccService,
    private cdRef: ChangeDetectorRef,
    private protocolService: DataService,
    private route: ActivatedRoute,
    private dashService: DashboardService,
    private router: Router
  ) { }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }


  ngOnInit() {
  //  this.reset();

  console.log("investigator info Initialized");
    this.route.params.subscribe((params) => {
      // if (params.hasOwnProperty("sponsor")) {
      //   this._qryStrSponsor = atob(params["sponsor"]);
      // }
    });

  this.resetGraph(this.obj);
  this.mccObj = this.mccDetails.mccPortfolio.find((ele) => {
    return ele.id == this.id;
  });
  }

  resetGraph(data) {
    // this.echartsIntance.dispatchAction({
    //   type: "brush",
    //   command: "clear",
    //   areas: [],
    // });
    this.scatterArray = [];
    data.forEach((arg) => {
      let pointData = [];
      pointData.push(arg["x"], arg["y"]);
      let obj = new SupplyTargetTooltipRes();
      obj.value = [];
      obj.value.push(arg["x"], arg["y"]);
      obj.label = {
        name: arg["name"],
        id: arg["id"],
        hasDetails: arg["SLTInvestigatorId"],
      };
      obj.itemStyle = {};
      pointData.push(obj);
      this.scatterArray.push(pointData);
    });
    this.option.series[0].data = this.scatterArray;
    //localStorage.setItem("scatterData",JSON.stringify(this.scatterArray));
    this.option.title.subtext = this.mccObj;

   // this.option.legend.data = [this.mccObj.xlabel, this.mccObj.ylabel];
    // this.option.xAxis[0].name = this.mccObj.xAxis;
    // this.option.yAxis[0].name = this.mccObj.yAxis;
    // this.option.xAxis[0].axisLabel.formatter = this.mccObj.xformatter;
    // this.option.yAxis[0].axisLabel.formatter = this.mccObj.yformatter;

    let Xavg = data.reduce((r, c) => r + c.x, 0) / data.length;
    this.option.series[0].markLine.data[1].xAxis = Xavg;
  //  this.echartsIntance.setOption(this.option);
    this.showLoading = false;
    this.cdRef.detectChanges();
  }

  option = {
    title: {
      text: "Kits In",
      subtext: "",
    },
    grid: {
      left: "5%",
      right: "7%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      // trigger: 'axis',
      showDelay: 0,
      formatter: (params) => {
        console.log(params.seriesName);
        if (params.componentType == "markLine") {
          params.name = params.name ? params.name : "Average";
          return params.name + " : " + params.value + " ";
        }
        if (params.value.length > 2) {
          return (
            params.seriesName +
            " :<br/> " +
            this.level +
            ": " +
            params.value[2].label.name +
            "<br/>X: " +
            params.value[0] +
            "<br/>Y: " +
            params.value[1] +
            ""
          );
        } else {
          return (
            params.seriesName +
            " :<br/>" +
            params.name +
            " : " +
            params.value +
            "% "
          );
        }
      },
      axisPointer: {
        show: true,
        type: "cross",
        lineStyle: {
          type: "dashed",
          width: 1,
        },
      },
    },
    toolbox: {
      feature: {
        dataZoom: {
          title: {
            zoom: "Zoom",
            back: "Zoom Reset",
          },
        },
        brush: {
          type: ["rect", "polygon", "clear"],
          title: {
            rect: "Box Select",
            polygon: "Lasso Select",
            lineX: "Horizontally Select",
            lineY: "Vertically Select",
            keep: "Keep Selections",
            clear: "Clear Selections",
          },
        },
      },
    },
    brush: {
      xAxisIndex: 0,
      throttleType: "debounce",
    },
    legend: {
      data: ["", ""],
      left: "center",
    },
    xAxis: [
      {
        name: "",
        type: "value",
        nameGap: 22,
        nameLocation: "center",
        nameTextStyle: {
          fontWeight: "bold",
        },
        scale: true,
        axisLabel: {
          formatter: "{value}",
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        name: "",
        type: "value",
        nameGap: 65,
        nameTextStyle: {
          fontWeight: "bold",
        },
        nameLocation: "center",
        scale: true,
        axisLabel: {
          formatter: "{value} %",
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "Kits In",
        type: "scatter",
        data: [],
        markLine: {
          lineStyle: {
            type: "solid",
          },
          data: [
            { type: "average", name: "Average" },
            { xAxis: 0 },
            //[{
            //  // Mark line with a fixed X position in starting point. This is used to generate an arrow pointing to maximum line.
            //  yAxis: 'min',
            //  xAxis: 'average',
            //}, {
            //    yAxis: 'max',
            //    xAxis: 'average',
            //}]
          ],
        },
      },
    ],
  };

}
