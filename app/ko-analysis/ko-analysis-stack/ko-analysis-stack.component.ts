import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";
import { DashboardService } from "../../dashboard/dashboard.service";
import { ProtocolService } from "src/app/protocol/protocol.service";
import { Breakdown, BreakdownInt } from "src/app/common/common";
import { ActivatedRoute } from "@angular/router"
import { Observable, of, throwError } from "rxjs";
import { MatTableDataSource, MatTableModule } from '@angular/material';
import { DataService } from '../../common/data.service'
import { ExcelService } from '../../forcast-dashboard/excel.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-ko-analysis-stack',
  templateUrl: './ko-analysis-stack.component.html',
  styleUrls: ['./ko-analysis-stack.component.less']
})
export class KoAnalysisStackComponent implements OnInit, AfterViewInit, OnDestroy {

  private _filterChange: any

  ko_object: any
  change_ship_date: any;
  change_filter_response: any
  change_desease_area: any
  private ship_date: any = [];
  private ship_date_filter: any = []
  private disease_area: any = [];
  private on_going: any = [];
  private new_sale: any = [];
  private carried_over: any = [];
  private new_sale_demand_area: any = [];
  private carried_over_demand_area: any = []
  echartsIntance: any;
  echartsIntance_line :any
  showLoading: boolean = false;
  private _ko_demand_analysis : any;
  ko_demand_type_select :any
  _date_filter_multiSelect : any =[];
  flags = [];
  select_filter_date :any =[]
  _sponsorName :any
  _sponsorNameResponse:any
  sponsor:any;
  download: any = this.getBaseUrl() + "/assets/icon/download.png";

  constructor(private dashService: DashboardService,
    private route: ActivatedRoute, private dataServices:  DataService,private router: Router,private excelService:ExcelService) {
    this.showLoading = true;
   // this._sponsorNameResponse ='ROCHE'    
    //this.getKOAnalysisData()
    this.ship_date = [];
    this.on_going = [];
    this.new_sale = [];
    this.carried_over = [];
    this.new_sale_demand_area = [];
    this.carried_over_demand_area = []
  }

  ngOnInit() {  
  }
  ngAfterViewInit() {
    this.change_filter_response = ''
    
    this._filterChange = this.dashService.ship_desease_filter_change.subscribe(response => {
      this.change_filter_response = response
      if (Object.keys(this.change_filter_response).length > 0) {
        this.showLoading = true;
        this.ship_date = [];
        this.on_going = [];
        this.new_sale = [];
        this.carried_over = [];
        this.new_sale_demand_area = [];
        this.carried_over_demand_area = []


          this.change_ship_date = this.change_filter_response.selectShip,
          this.change_desease_area = this.change_filter_response.selectArea

         if(this.change_ship_date == ''){
            for (let i = 0; i < this.ko_object.kobarlinechart.length; i++) {
              if (this.ko_object.kobarlinechart[i].DiseaseArea == this.change_desease_area) {
                this.ship_date.push(this.formatDate(this.ko_object.kobarlinechart[i].Due_Date))
                this.on_going.push(this.ko_object.kobarlinechart[i].OnGoing)
                this.new_sale.push(this.ko_object.kobarlinechart[i].NewSales)
                this.carried_over.push(this.ko_object.kobarlinechart[i].CarriedOver)
                this.new_sale_demand_area.push(this.ko_object.kobarlinechart[i].PercentageNewSales)
                this.carried_over_demand_area.push(this.ko_object.kobarlinechart[i].PercentageCarriedOver)
              }
    
            }
          }else if(this.change_ship_date.length >0){

            for(let k=0;k<this.change_ship_date.length;k++){
              for (let i = 0; i < this.ko_object.kobarlinechart.length; i++) {
                if (this.ko_object.kobarlinechart[i].DiseaseArea == this.change_desease_area && this.formatDate(this.ko_object.kobarlinechart[i].Due_Date) == this.change_ship_date[k].item_text) {
                  this.ship_date.push(this.formatDate(this.ko_object.kobarlinechart[i].Due_Date))
                  this.on_going.push(this.ko_object.kobarlinechart[i].OnGoing)
                  this.new_sale.push(this.ko_object.kobarlinechart[i].NewSales)
                  this.carried_over.push(this.ko_object.kobarlinechart[i].CarriedOver)
                  this.new_sale_demand_area.push(this.ko_object.kobarlinechart[i].PercentageNewSales)
                  this.carried_over_demand_area.push(this.ko_object.kobarlinechart[i].PercentageCarriedOver)
                }
      
              }
            }

          }else{
            for (let i = 0; i < this.ko_object.kobarlinechart.length; i++) {
              if (this.ko_object.kobarlinechart[i].DiseaseArea == this.change_desease_area && this.formatDate(this.ko_object.kobarlinechart[i].Due_Date) == this.change_ship_date) {
                this.ship_date.push(this.formatDate(this.ko_object.kobarlinechart[i].Due_Date))
                this.on_going.push(this.ko_object.kobarlinechart[i].OnGoing)
                this.new_sale.push(this.ko_object.kobarlinechart[i].NewSales)
                this.carried_over.push(this.ko_object.kobarlinechart[i].CarriedOver)
                this.new_sale_demand_area.push(this.ko_object.kobarlinechart[i].PercentageNewSales)
                this.carried_over_demand_area.push(this.ko_object.kobarlinechart[i].PercentageCarriedOver)
              }
    
            }
          }

       
        let newSaleCarriedObj = {
          ship_date: this.ship_date,
          newSale: this.new_sale_demand_area,
          carriedOverDemand: this.carried_over_demand_area,
          _response :this.ko_object.kobarlinechart
          // areaType : this.disease_area
        }

        this.dashService.newSales_carriedOver_Total(newSaleCarriedObj)
        this.chartOption.xAxis.data = this.ship_date;

        // this.chartOption.series[0].name = 'On-Going Demand'+''+'('+ this.change_desease_area+')'
        // this.chartOption.series[1].name = 'New Sale Demand'+''+'('+ this.change_desease_area+')'
        // this.chartOption.series[2].name = 'Carried Over Demand'+''+'('+ this.change_desease_area+')'

        this.chartOption.series[0].data = this.on_going;
        this.chartOption.series[1].data = this.new_sale;
        this.chartOption.series[2].data = this.carried_over;
        this.echartsIntance.setOption(this.chartOption);
        this.showLoading = false;
              
      }
    })

    this._sponsorName = this.dashService.sponsorNameRestDashB.subscribe((response) =>{
      this._sponsorNameResponse = response;
     
      if(this._sponsorNameResponse != ''){
        this.showLoading = true;
        this.getKOAnalysisData();
    }
    });


  }
  getKOAnalysisData() {
    
    this.ship_date = [];
    this.ship_date_filter = []
    this.disease_area = [];
    this.on_going = [];
    this.new_sale = [];
    this.carried_over = [];
    this.new_sale_demand_area = [];
    this.carried_over_demand_area = []
    this._date_filter_multiSelect =[]  
    this.showLoading = true;
    this.sponsor ={
      sponsor : this._sponsorNameResponse
    }
    this._ko_demand_analysis = this.dashService.getkohistoricaldemandData(this.sponsor).subscribe(response =>{
      this.ko_object = response;
      if(this.ko_object.kobarlinechart.length == 0){
        this.dashService.messageSection(this.ko_object.kobarlinechart.length)
      }else{
        this.dashService.messageSection(this.ko_object.kobarlinechart.length)
      }
      
      this.dataServices.setKo_AnalysisObj(this.ko_object)
      for(let i=0; i<this.ko_object.kobarlinechart.length; i++) {
        if(this.flags[this.ko_object.kobarlinechart[i].Due_Date]) 
        continue;
        this.flags[this.ko_object.kobarlinechart[i].Due_Date] = true;
        this._date_filter_multiSelect.push({
         id:i,
         item_text: this.formatDate(this.ko_object.kobarlinechart[i].Due_Date)});
        }
       this.ship_date_filter.push('Select Date')
      for (let i = 0; i < this.ko_object.kobarlinechart.length; i++) {
        this.ship_date_filter.push(this.formatDate(this.ko_object.kobarlinechart[i].Due_Date))
        if (this.ko_object.kobarlinechart[i].DiseaseArea == 'All') {
          this.ship_date.push(this.formatDate(this.ko_object.kobarlinechart[i].Due_Date))
          this.on_going.push(this.ko_object.kobarlinechart[i].OnGoing)
          this.new_sale.push(this.ko_object.kobarlinechart[i].NewSales)
          this.carried_over.push(this.ko_object.kobarlinechart[i].CarriedOver)
          this.new_sale_demand_area.push(this.ko_object.kobarlinechart[i].PercentageNewSales)
          this.carried_over_demand_area.push(this.ko_object.kobarlinechart[i].PercentageCarriedOver)
        }
  
      }
      this.chartOption.xAxis.data = this.ship_date;
      // this.chartOption.series[0].name = 'On-Going Demand'+''+'('+'All'+')'
      // this.chartOption.series[1].name = 'New Sale Demand'+''+'('+'All'+')'
      // this.chartOption.series[2].name = 'Carried Over Demand'+''+'('+'All'+')'
      this.chartOption.series[0].data = this.on_going;
      this.chartOption.series[1].data = this.new_sale;
      this.chartOption.series[2].data = this.carried_over;
      if(this.echartsIntance != undefined){
        this.echartsIntance.setOption(this.chartOption);        
      }
     let newSaleCarriedObj = {
        ship_date: this.ship_date,
        newSale: this.new_sale_demand_area,
        carriedOverDemand: this.carried_over_demand_area,
        ship_date_filter: this.ship_date_filter,
        _dataMultiselectFilter : this._date_filter_multiSelect,
        _response : this.ko_object.kobarlinechart
         }
      this.select_filter_date = this.dataServices.get_filter_date() 
      this.ko_demand_type_select ={
        obj : this.ko_object.koareachart,
        demand_type : 'Total',
        selectdate: this.select_filter_date
      }
      this.dashService.ko_demand_function(this.ko_demand_type_select)
      this.dashService.newSales_carriedOver_Total(newSaleCarriedObj)
      this.showLoading = false;
    })   
  }
formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

  formatDate(date) {
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = new Date(date),
        month = '' + strArray[d.getMonth()],
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, year].join('-');
}
  onChartInit(ec) {
    this.echartsIntance = ec;
    
  } 
  chartOption: any = {
     tooltip: {
      trigger: "axis",

      axisPointer: {
        data: [],
        reverse: true,
        axisLabel: {
          interval: 0,

        },
      },
      textStyle: {
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 14,
      },
      formatter: function (params) {
        let returnType;
        console.log(params)
        if(params.length == 1){
          returnType =  `
          <b> ${params[0].axisValue}</b><br/>
           ${params[0].seriesName}: ${params[0].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
          `
        }else if(params.length == 2){
          returnType =  `
          <b> ${params[0].axisValue}</b><br/>
          ${params[0].seriesName}: ${params[0].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
          ${params[1].seriesName}: ${params[1].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
         `
        }else if(params.length == 3){
          returnType =  `
          <b> ${params[0].axisValue}</b><br/>
          ${params[0].seriesName}: ${params[0].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
          ${params[1].seriesName}: ${params[1].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
          ${params[2].seriesName}: ${params[2].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
        }
  

        // if(params[2].data != 'undefined'){
        //   returnType =  `
        //   <b> ${params[0].axisValue}</b><br/>
        //    On-going Demand : ${params[0].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
        //    New Sale Demand: ${params[1].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
        //    `
        // }else if(params[1].data != 'undefined'){
        //   returnType =  `
        //   <b> ${params[0].axisValue}</b><br/>
        //    On-going Demand : ${params[0].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
        //   Carried Over Demand: ${params[2].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
        // }else if(params[0].data != 'undefined'){
        //   returnType =  `
        //   <b> ${params[0].axisValue}</b><br/>
           
        //    New Sale Demand: ${params[1].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
        //    Carried Over Demand: ${params[2].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
        
        // }else{
        //   returnType =  `
        //   <b> ${params[0].axisValue}</b><br/>
        //    On-going Demand : ${params[0].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
        //    New Sale Demand: ${params[1].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
        //    Carried Over Demand: ${params[2].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
        // }
      
  
            return returnType
            },
    },

    


    legend: {
      orient: 'horizontal',
      data: ["On-Going Demand", "New Sale Demand", "Carried Over Demand"],
      // selectedMode: false
    },
    grid: {
      left: "5%",
      right: "3%",
      bottom: "14%",
      top : "15%",
      containLabel: true,
      show: true
    },
    nameTextStyle: {
      fontSize: 14,
      padding: 5
      
    },

    xAxis: {
      type: 'category',
      // name: "Months from First Kit Received",
      // nameLocation: "middle",

      data: [],
      axisLabel: {
        rotate: 45, 
        fontSize: '13'
      },
      
    },
    yAxis: {
     // nameGap: 30,
     // name :'Kits',
      axisLabel: {        
        fontSize: '13',
              
      },  
      show:true,
      showMinLabel:true,
      showMaxLabel:true,
     // nameLocation : "center",
    //  left: '26%',
      axisTick: {
        alignWithLabel: true
      },
    },
    // yAxis: {
    //     type: 'value',
    //     name :'% Cumulative Kits-In',
    //     nameRotate: 90,
    //     nameLocation: "center",
    //     drawAxisLineEnabled : 'no',
    //     drawGridLinesEnabled : 'no',
    //     // padding:10,


    // },
    series: [
      {
        data: [],
        type: 'bar',
        // name:[],
        name: "On-Going Demand",
        stack: 'one',
        itemStyle: { color: "#449cae" },


      },
      {

        data: [],
        type: 'bar',
        // name:[],
        name: "New Sale Demand",
        stack: 'one',
        itemStyle: { color: "#b1b3b7" },

      },
      {
        data: [],
        type: 'bar',
        // name:[],
        name: "Carried Over Demand",
        stack: 'one',
        itemStyle: { color: "#91a150" },

      },
    ],
  };
  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }
  ngOnDestroy() {
    if (this._filterChange != undefined)
      this._filterChange.unsubscribe();
      if(this._sponsorName != undefined)
      this._sponsorName.unsubscribe();
  }
 
}
