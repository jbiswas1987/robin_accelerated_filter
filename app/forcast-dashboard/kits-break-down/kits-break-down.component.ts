import { Component, OnInit, OnDestroy } from "@angular/core";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { GroupData } from "src/app/common/common";
import { ChangeDetectorRef } from "@angular/core";
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

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
  forCastKitsIN : any;
  forCastKitsOut : any;
  forCastActual : any;
  forCastkitsInOutActual : any;
  forCastKitsInActual:any;
  public createSponsorSubWithData: boolean = false;
  
  buttonBGColorActual :any;


  buttonBGColorKitsIN: any;
  textColorKitsIN : any;
  textdecorationKitsIN:any;
  textUnderLinePosKitsIN : any;
  textUnderLineColorCodeKitsIN: any;
  underLineTicknessKitsIN : any;

  buttonBGColorKitsOut: any;
  buttonBGColorKitsOUT: any;
  textColorKitsOut : any;
  textdecorationKitsOut:any
  textUnderLinePosKitsOut : any;
  textUnderLineColorCodeKitsOut: any;
  underLineTicknessKitsOut : any;

  buttonBGColorKitsActual: any;
  textColorKitsActual : any;
  textdecorationKitsActual:any
  textUnderLinePosKitsActual : any;
  textUnderLineColorCodeKitsActual: any;
  underLineTicknessKitsActual : any;

  buttonBGColorKitsForecast: any;
  textColorKitsForecast : any;
  textdecorationKitsForecast:any
  textUnderLinePosKitsForecast : any;
  textUnderLineColorCodeKitsForecast: any;
  underLineTicknessKitsForecast : any;

  textunderlineoffsetKitsIN :any ;
  textunderlineoffsetKitsOut:any;
  textunderlineoffsetKitsActual :any ;
  textunderlineoffsetKitsForcast:any;

  type:boolean = false;
  defaultKitsINOUTType : boolean = false;

  constructor(
    private dataService: DashboardService,
    private cdRef: ChangeDetectorRef
  ) {
  
    this.type = true;
    this.defaultKitsINOUTType = false;
    this.buttonBGColorKitsIN = '#FFFFFF'
    this.buttonBGColorKitsOUT = '#FFFFFF'
    this.buttonBGColorKitsActual = '#FFFFFF'

    this.textColorKitsIN = '#000000'
    this.textColorKitsOut = '#4ba4be'
    this.textColorKitsActual = '#000000'
    this.textColorKitsForecast = '#4ba4be'
    
    this.textdecorationKitsIN ='none'
    this.textdecorationKitsOut = 'underline'
    this.textdecorationKitsActual ='none'
    this.textdecorationKitsForecast ='underline'
    
    this.textUnderLinePosKitsIN ='none'
    this.textUnderLineColorCodeKitsIN='none' 
    this.underLineTicknessKitsIN = 'none'
      
    this.textUnderLinePosKitsOut ='under';
    this.textUnderLineColorCodeKitsOut ='#005d78';
    this.underLineTicknessKitsOut ='3px'

    // this.textColorKitsActual ='none';
    this.textUnderLineColorCodeKitsActual ='none';
    this.underLineTicknessKitsActual ='none'

    this.textUnderLinePosKitsForecast ='under'
    this.textUnderLineColorCodeKitsForecast='#005d78' 
    this.underLineTicknessKitsForecast = '3px'

    this.buttonBGColorActual = '#FFFFFF'

    this.textunderlineoffsetKitsIN ='none' ;
    this.textunderlineoffsetKitsOut ='6px'
    this.textunderlineoffsetKitsActual = 'none'
    this.textunderlineoffsetKitsForcast = '6px'

    this.setSponsorVariable();
    // this.serviceCall([]);
     this.showLoading = true;
  }
  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  ngOnInit() {
    this.getKitsINOUTTreeMapInformation();
     
    //  this.resetGraph(obj)
  }

  getKitsINOUTTreeMapInformation(){
    this.dataService.getTreeMapKitsInOut('').subscribe((dataRows) => {
      this.forCastkitsInOutActual= dataRows
      this.forCastKitsIN = this.forCastkitsInOutActual.KitsOutForecast
      this.resetGraph(this.forCastKitsIN)
    })
  }
  data$: GroupData[];

  chartOptionTA: any = {
    color: ["#85af78","ffa771","ffecc1"],  

    series: [
      {
        type: "treemap",
        roam: "move",
        leafDepth: 1,
        itemStyle: {
          color: "#85af78",
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
        console.log('@@@@'+ JSON.stringify(params));
        localStorage.setItem('value', params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
        return (
          '<div class="tooltip-title">' +
          params.name +
          "<br/>" +
          params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+
          // params.value +
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
    
      // console.log('Log' + JSON.stringify(obj))
      this.showLoading = false;
    //  this.cdRef.detectChanges();
      this.data$ = [
        {
          name: "All",
          id: "All",
          colorSaturation: [0.3, 1],
          color: [
            "#85af78",
            "#ffa771",
            "#dbdbdb",
          ],
          children: obj,
        },
      ];
      this.chartOptionTA.series[0].data = this.data$;
      this.echartsIntance.setOption(this.chartOptionTA);
      this.showLoading = false;
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
      // this.groupsData_sub = this.dataService
      //   .getGroups(protocolList, this.sponsor)
      //   .subscribe((obj) => this.resetGraph(obj));

      this.getKitsINOUTTreeMapInformation();
   //   this.resetGraph(obj)

    }
  }

  setSponsorVariable() {
    this.sponsorVariableSub = this.dataService.sponsorName.subscribe((data) => {
      this.sponsor = data;
    });
  }

  kitsIN() {
    this.showLoading = true;
    this.defaultKitsINOUTType = true
    // this.buttonBGColorKitsIN = '#D3D3D3';
    // this.buttonBGColorKitsOUT = '#FFFFFF'

    this.buttonBGColorKitsIN = '#D3D3D3';
    this.buttonBGColorKitsOUT = '#FFFFFF'

    this.textColorKitsIN = '#4ba4be'
    this.textColorKitsOut = '#000000'
   // this.textColorKitsActual = '#000000'
    this.textdecorationKitsIN ='underline'
    this.textdecorationKitsOut = 'none'
   // this.textdecorationKitsActual ='none'

    this.textUnderLinePosKitsIN ='under'
    this.textUnderLineColorCodeKitsIN='#005d78' 
    this.underLineTicknessKitsIN = '3px'

    this.textUnderLinePosKitsOut ='none';
    this.textUnderLineColorCodeKitsOut ='none';
    this.underLineTicknessKitsOut ='none'

    this.textunderlineoffsetKitsIN ='6px' ;
    this.textunderlineoffsetKitsOut ='none'
    

    // this.textUnderLinePosKitsActual ='none';
    // this.textUnderLineColorCodeKitsActual ='none';
    // this.underLineTicknessKitsActual ='none'

    if(this.type == true){
      this.forCastKitsIN = this.forCastkitsInOutActual.KitsInForecast
      this.resetGraph(this.forCastKitsIN)
    }else{
      this.forCastKitsIN = this.forCastkitsInOutActual.KitsInActual
      this.resetGraph(this.forCastKitsIN)
    }

    // this.forCastKitsIN = this.forCastkitsInOutActual.KitsInForecast
    // this.resetGraph(this.forCastKitsIN)
  }

  kitsOUT() {
    this.showLoading = true;
    this.defaultKitsINOUTType = false

    this.buttonBGColorKitsIN = '#FFFFFF';
    this.buttonBGColorKitsOUT = '#D3D3D3'
    this.textColorKitsIN = '#000000'
    this.textColorKitsOut = '#4ba4be'
   // this.textColorKitsActual = '#000000'
   
    this.textdecorationKitsIN ='none'
    this.textdecorationKitsOut = 'underline'
   // this.textdecorationKitsActual ='none'

    this.textUnderLinePosKitsIN ='none'
    this.textUnderLineColorCodeKitsIN='none' 
    this.underLineTicknessKitsIN = 'none'

    this.textUnderLinePosKitsOut ='under';
    this.textUnderLineColorCodeKitsOut ='#005d78';
    this.underLineTicknessKitsOut ='3px'

    this.textunderlineoffsetKitsIN ='none' ;
    this.textunderlineoffsetKitsOut ='6px'

    // this.textUnderLinePosKitsActual ='none';
    // this.textUnderLineColorCodeKitsActual ='none';
    // this.underLineTicknessKitsActual ='none'

    if(this.type == true){
      this.forCastKitsOut = this.forCastkitsInOutActual.KitsOutForecast
      this.resetGraph(this.forCastKitsOut)
    }else{
      this.forCastKitsOut = this.forCastkitsInOutActual.KitsOutActual
      this.resetGraph(this.forCastKitsOut)
    }


    // this.forCastKitsOut = this.forCastkitsInOutActual.KitsOutForecast
    // this.resetGraph(this.forCastKitsOut)
  }

  actual(){
    this.showLoading = true;
    
    this.type = false;

    this.textColorKitsActual = '#4ba4be'
    this.textColorKitsForecast = '#000000'
   
    this.textdecorationKitsActual ='underline'
    this.textdecorationKitsForecast ='none'    

    this.textUnderLinePosKitsActual ='under';
    this.textUnderLineColorCodeKitsActual ='#005d78';
    this.underLineTicknessKitsActual ='3px'

    this.textUnderLinePosKitsForecast ='none'
    this.textUnderLineColorCodeKitsForecast='none' 
    this.underLineTicknessKitsForecast = 'none'

    this.textunderlineoffsetKitsActual = '6px'
    this.textunderlineoffsetKitsForcast = 'none'

    this.kitsINDefaultActual();
  

    // this.forCastKitsInActual = this.forCastkitsInOutActual.KitsInActual
    // this.resetGraph(this.forCastKitsInActual)
  }

  kitsForecast(){

    this.type = true;
    this.kitsINDefaultForecast();

    this.textColorKitsForecast = '#4ba4be'
    this.textdecorationKitsForecast ='underline'
    this.textUnderLinePosKitsForecast ='under'
    this.textUnderLineColorCodeKitsForecast='#005d78' 
    this.underLineTicknessKitsForecast = '3px'

    this.textColorKitsActual = '#000000'
    this.textdecorationKitsActual ='none'
    this.textdecorationKitsActual ='none'
    this.textUnderLinePosKitsActual ='none';
    this.textUnderLineColorCodeKitsActual ='none';
    this.underLineTicknessKitsActual ='none'

    
    this.textunderlineoffsetKitsActual = 'none'
    this.textunderlineoffsetKitsForcast = '6px'

  }

  kitsINDefaultActual() {
    this.showLoading = true;
    // this.buttonBGColorKitsIN = '#D3D3D3';
    // this.buttonBGColorKitsOUT = '#FFFFFF'
  debugger
    this.buttonBGColorKitsIN = '#D3D3D3';
    this.buttonBGColorKitsOUT = '#FFFFFF'
    if(this.defaultKitsINOUTType == true){

    this.textColorKitsIN = '#4ba4be'
    this.textColorKitsOut = '#000000'
  
    this.textdecorationKitsIN ='underline'
    this.textdecorationKitsOut = 'none'
    
    this.textUnderLinePosKitsIN ='under'
    this.textUnderLineColorCodeKitsIN='#005d78' 
    this.underLineTicknessKitsIN = '3px'

    this.textUnderLinePosKitsOut ='none';
    this.textUnderLineColorCodeKitsOut ='none';
    this.underLineTicknessKitsOut ='none'

    this.textunderlineoffsetKitsIN ='6px' ;
    this.textunderlineoffsetKitsOut ='none'
   
    this.forCastKitsIN = this.forCastkitsInOutActual.KitsInActual 
    }else{
      this.textColorKitsIN = '#000000'
      this.textColorKitsOut = '#4ba4be'
      
      this.textdecorationKitsIN ='none'
      this.textdecorationKitsOut = 'underline'
       
      this.textUnderLinePosKitsIN ='none'
      this.textUnderLineColorCodeKitsIN='none' 
      this.underLineTicknessKitsIN = 'none'
  
      this.textUnderLinePosKitsOut ='under';
      this.textUnderLineColorCodeKitsOut ='#005d78';
      this.underLineTicknessKitsOut ='3px'

      this.textunderlineoffsetKitsIN ='none' ;
      this.textunderlineoffsetKitsOut ='6px'
      

      this.forCastKitsIN = this.forCastkitsInOutActual.KitsOutActual 
    }
  

    // this.textUnderLinePosKitsActual ='under';
    // this.textUnderLineColorCodeKitsActual ='#005d78';
    // this.underLineTicknessKitsActual ='3px'

    // this.textUnderLinePosKitsForecast ='none'
    // this.textUnderLineColorCodeKitsForecast='none' 
    // this.underLineTicknessKitsForecast = 'none'

    // this.forCastKitsIN = this.forCastkitsInOutActual.KitsInActual
    this.resetGraph(this.forCastKitsIN)
  }

  kitsINDefaultForecast(){
    this.buttonBGColorKitsIN = '#D3D3D3';
    this.buttonBGColorKitsOUT = '#FFFFFF'

    
    if(this.defaultKitsINOUTType == true){

      this.textColorKitsIN = '#4ba4be'
      this.textColorKitsOut = '#000000'
      
      this.textdecorationKitsIN ='underline'
      this.textdecorationKitsOut = 'none'
       
      this.textUnderLinePosKitsIN ='under'
      this.textUnderLineColorCodeKitsIN='#005d78' 
      this.underLineTicknessKitsIN = '3px'
  
      this.textUnderLinePosKitsOut ='none';
      this.textUnderLineColorCodeKitsOut ='none';
      this.underLineTicknessKitsOut ='none'
      
    this.forCastKitsIN = this.forCastkitsInOutActual.KitsInForecast
    }else{

    this.textColorKitsIN = '#000000'
    this.textColorKitsOut = '#4ba4be'
    
    this.textdecorationKitsIN ='none'
    this.textdecorationKitsOut = 'underline'
    
    this.textUnderLinePosKitsIN ='none'
    this.textUnderLineColorCodeKitsIN='none' 
    this.underLineTicknessKitsIN = 'none'

    this.textUnderLinePosKitsOut ='under';
    this.textUnderLineColorCodeKitsOut ='#005d78';
    this.underLineTicknessKitsOut ='3px'
    this.forCastKitsIN = this.forCastkitsInOutActual.KitsOutForecast
    }
  

    // this.forCastKitsIN = this.forCastkitsInOutActual.KitsInForecast
    this.resetGraph(this.forCastKitsIN)
  }


  ngOnDestroy() {
    if (this.sponsorSub != undefined) this.sponsorSub.unsubscribe();

    if (this.groupsData_sub != undefined) this.groupsData_sub.unsubscribe();

    if (this.sponsorVariableSub != undefined)
      this.sponsorVariableSub.unsubscribe();
  }
}
