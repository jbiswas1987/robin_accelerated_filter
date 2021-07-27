import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Input, Output, EventEmitter } from "@angular/core";
import { DashboardService } from "../../dashboard/dashboard.service";

import {ExcelService} from '../../forcast-dashboard/excel.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common'
import {InfoDetailsComponent} from '../../common/info-details/info-details.component'
@Component({
  selector: 'app-ko-demand',
  templateUrl: './ko-demand.component.html',
  styleUrls: ['./ko-demand.component.less']
})
export class KoDemandComponent implements OnInit, AfterViewInit, OnDestroy {
  echartsIntance: any;
  ko_demand_object: any = [];
  date: any = [];
  covid_carried_over: any = [];
  covid_new_sale: any = []
  covid_on_going: any = []
  covid_total: any = []
  non_covid_carried_over: any = []
  non_covid_new_sale: any = []
  non_covid_on_going: any = []
  non_covid_total: any = []
  _ko_demand: any;
  _ko_demand_type: any;
  ko_demand: any = []
  flags = [];
  output = [];
  output_ship_date: any = [];
  select_filter_date: any = []
  areaType : any =[]
  _sponsorName :any
  _sponsorNameResponse:any
  sponsor:any;
  showLoading:any = false;
  download: any = this.getBaseUrl() + "/assets/icon/download.png";
  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/Covid_Non-Covid_Demand.pdf"
  constructor(private dashService: DashboardService,private excelService:ExcelService,private router: Router,public dialog: MatDialog) {
    this._sponsorNameResponse ='ROCHE'
    this.output_ship_date = []
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.showLoading =true;

    this._ko_demand = this.dashService.ko_demand_obj.subscribe(response => {
      this.date = [];
      this.covid_carried_over = [];
      this.covid_new_sale = []
      this.covid_on_going = []
      this.covid_total = []
      this.non_covid_carried_over = []
      this.non_covid_new_sale = []
      this.non_covid_on_going = []
      this.non_covid_total = []
      this.output = []
      this.select_filter_date = []
      this.ko_demand = response;
      this.areaType =[]
      this.flags = [];

      this.ko_demand_object = this.ko_demand.obj
      this._ko_demand_type = this.ko_demand.demand_type;
      this.select_filter_date = this.ko_demand.selectdate
      if (this.ko_demand_object != undefined) {
        for (let i = 0; i < this.ko_demand_object.length; i++) {
          if (this.flags[this.ko_demand_object[i].Due_Date])
            continue;
          this.flags[this.ko_demand_object[i].Due_Date] = true;
          this.output.push(this.ko_demand_object[i].Due_Date);
        }
      }
      if (this.output.length > 0) {
        this.output_ship_date = this.output
      }

      if (this.select_filter_date == undefined || this.select_filter_date.length == 0) {
        if (this._ko_demand_type == 'All' && this.output_ship_date.length > 0) {
          for (let k = 0; k < this.output_ship_date.length; k++) {
            this.date.push(this.formatDate(this.output_ship_date[k]))
           
            for (let i = 0; i < this.ko_demand_object.length; i++) {
              if (this.ko_demand_object[i].Due_Date === this.output_ship_date[k]) {
                if (this.ko_demand_object[i].Demand == 'CarriedOver') {
                  this.covid_carried_over.push(this.ko_demand_object[i].Covid)
                  this.non_covid_carried_over.push(this.ko_demand_object[i].NonCovid)
                  this.areaType.push(this._ko_demand_type)
                }
                else if (this.ko_demand_object[i].Demand == 'NewSales') {
                  this.covid_new_sale.push(this.ko_demand_object[i].Covid)
                  this.non_covid_new_sale.push(this.ko_demand_object[i].NonCovid)
                  
                } else if (this.ko_demand_object[i].Demand == 'OnGoing') {
                  this.covid_on_going.push(this.ko_demand_object[i].Covid)
                  this.non_covid_on_going.push(this.ko_demand_object[i].NonCovid)
                  
                } else if (this.ko_demand_object[i].Demand == 'Total') {
                  this.covid_total.push(this.ko_demand_object[i].Covid)
                  this.non_covid_total.push(this.ko_demand_object[i].NonCovid)
                 
                }
              }
            }
          }
          this.chartOption.xAxis.data = this.date;
          this.chartOption.series[0].data = this.covid_carried_over;
          this.chartOption.series[1].data = this.covid_new_sale;
          this.chartOption.series[2].data = this.covid_on_going;
          this.chartOption.series[3].data = this.covid_total
          this.chartOption.series[4].data = this.non_covid_carried_over;
          this.chartOption.series[5].data = this.non_covid_new_sale;
          this.chartOption.series[6].data = this.non_covid_on_going;
          this.chartOption.series[7].data = this.non_covid_total;
          this.chartOption.series[8].data =this.areaType
         
          if (this.echartsIntance != undefined) {
            this.echartsIntance.setOption(this.chartOption);
          }
        } else if (this._ko_demand_type == 'Carried Over' && this.output_ship_date.length > 0) {
          for (let k = 0; k < this.output_ship_date.length; k++) {
            
            this.date.push(this.formatDate(this.output_ship_date[k]))
            for (let i = 0; i < this.ko_demand_object.length; i++) {
              if (this.ko_demand_object[i].Due_Date === this.output_ship_date[k]) {
                if (this.ko_demand_object[i].Demand == 'CarriedOver') {
                  this.covid_carried_over.push(this.ko_demand_object[i].Covid)
                  this.non_covid_carried_over.push(this.ko_demand_object[i].NonCovid)
                  this.areaType.push(this._ko_demand_type)
                } else if (this.ko_demand_object[i].Demand == 'NewSales') {
                  this.covid_new_sale.push('')
                  this.non_covid_new_sale.push('')
                  
                } else if (this.ko_demand_object[i].Demand == 'OnGoing') {
                  this.covid_on_going.push('')
                  this.non_covid_on_going.push('')
                 
                } else if (this.ko_demand_object[i].Demand == 'Total') {
                  this.covid_total.push('')
                  this.non_covid_total.push('')

                }
              }
            }
          }
          this.chartOption.xAxis.data = this.date;
          this.chartOption.series[0].data = this.covid_carried_over;
          this.chartOption.series[1].data = this.covid_new_sale;
          this.chartOption.series[2].data = this.covid_on_going;
          this.chartOption.series[3].data = this.covid_total
          this.chartOption.series[4].data = this.non_covid_carried_over;
          this.chartOption.series[5].data = this.non_covid_new_sale;
          this.chartOption.series[6].data = this.non_covid_on_going;
          this.chartOption.series[7].data = this.non_covid_total;
          this.chartOption.series[8].data =this.areaType
          if (this.echartsIntance != undefined) {
            this.echartsIntance.setOption(this.chartOption);
          }
        }
        else if (this._ko_demand_type == 'New Sale' && this.output_ship_date.length > 0) {
          for (let k = 0; k < this.output_ship_date.length; k++) {
           
            this.date.push(this.formatDate(this.output_ship_date[k]))
            for (let i = 0; i < this.ko_demand_object.length; i++) {
              if (this.ko_demand_object[i].Due_Date === this.output_ship_date[k]) {
                if (this.ko_demand_object[i].Demand == 'CarriedOver') {
                  this.covid_carried_over.push('')
                  this.non_covid_carried_over.push('')
                  this.areaType.push(this._ko_demand_type)
                } else if (this.ko_demand_object[i].Demand == 'NewSales') {
                  this.covid_new_sale.push(this.ko_demand_object[i].Covid)
                  this.non_covid_new_sale.push(this.ko_demand_object[i].NonCovid)
                 
                } else if (this.ko_demand_object[i].Demand == 'OnGoing') {
                  this.covid_on_going.push('')
                  this.non_covid_on_going.push('')
                  
                } else if (this.ko_demand_object[i].Demand == 'Total') {
                  this.covid_total.push('')
                  this.non_covid_total.push('')
                  
                }

              }
            }

          }
          this.chartOption.xAxis.data = this.date;
          this.chartOption.series[0].data = this.covid_carried_over;
          this.chartOption.series[1].data = this.covid_new_sale;
          this.chartOption.series[2].data = this.covid_on_going;
          this.chartOption.series[3].data = this.covid_total
          this.chartOption.series[4].data = this.non_covid_carried_over;
          this.chartOption.series[5].data = this.non_covid_new_sale;
          this.chartOption.series[6].data = this.non_covid_on_going;
          this.chartOption.series[7].data = this.non_covid_total;
          this.chartOption.series[8].data =this.areaType
          if (this.echartsIntance != undefined) {
            this.echartsIntance.setOption(this.chartOption);
          }
        }
        else if (this._ko_demand_type == 'On-going' && this.output_ship_date.length > 0) {
          for (let k = 0; k < this.output_ship_date.length; k++) {
            
            this.date.push(this.formatDate(this.output_ship_date[k]))
            for (let i = 0; i < this.ko_demand_object.length; i++) {
              if (this.ko_demand_object[i].Due_Date === this.output_ship_date[k]) {
                if (this.ko_demand_object[i].Demand == 'CarriedOver') {
                  this.covid_carried_over.push('')
                  this.non_covid_carried_over.push('')
                  this.areaType.push(this._ko_demand_type)
                } else if (this.ko_demand_object[i].Demand == 'NewSales') {
                  this.covid_new_sale.push('')
                  this.non_covid_new_sale.push('')
                  this.areaType.push(this._ko_demand_type)
                } else if (this.ko_demand_object[i].Demand == 'OnGoing') {
                  this.covid_on_going.push(this.ko_demand_object[i].Covid)
                  this.non_covid_on_going.push(this.ko_demand_object[i].NonCovid)
                  this.areaType.push(this._ko_demand_type)
                } else if (this.ko_demand_object[i].Demand == 'Total') {
                  this.covid_total.push('')
                  this.non_covid_total.push('')
                  this.areaType.push(this._ko_demand_type)
                }

              }
            }

          }
          this.chartOption.xAxis.data = this.date;
          this.chartOption.series[0].data = this.covid_carried_over;
          this.chartOption.series[1].data = this.covid_new_sale;
          this.chartOption.series[2].data = this.covid_on_going;
          this.chartOption.series[3].data = this.covid_total
          this.chartOption.series[4].data = this.non_covid_carried_over;
          this.chartOption.series[5].data = this.non_covid_new_sale;
          this.chartOption.series[6].data = this.non_covid_on_going;
          this.chartOption.series[7].data = this.non_covid_total;
          this.chartOption.series[8].data =this.areaType
          if (this.echartsIntance != undefined) {
            this.echartsIntance.setOption(this.chartOption);
          }
        }
        else if (this._ko_demand_type == 'Total' && this.output_ship_date.length > 0) {
          for (let k = 0; k < this.output_ship_date.length; k++) {
           
            this.date.push(this.formatDate(this.output_ship_date[k]))
            for (let i = 0; i < this.ko_demand_object.length; i++) {
              if (this.ko_demand_object[i].Due_Date === this.output_ship_date[k]) {
                if (this.ko_demand_object[i].Demand == 'CarriedOver') {
                  this.covid_carried_over.push('')
                  this.non_covid_carried_over.push('')
                  this.areaType.push(this._ko_demand_type)
                } else if (this.ko_demand_object[i].Demand == 'NewSales') {
                  this.covid_new_sale.push('')
                  this.non_covid_new_sale.push('')
                  this.areaType.push(this._ko_demand_type)
                } else if (this.ko_demand_object[i].Demand == 'OnGoing') {
                  this.covid_on_going.push('')
                  this.non_covid_on_going.push('')
                  this.areaType.push(this._ko_demand_type)
                } else if (this.ko_demand_object[i].Demand == 'Total') {
                  this.covid_total.push(this.ko_demand_object[i].Covid)
                  this.non_covid_total.push(this.ko_demand_object[i].NonCovid)
                  this.areaType.push(this._ko_demand_type)
                }

              }
            }

          }
          this.chartOption.xAxis.data = this.date;
          this.chartOption.series[0].data = this.covid_carried_over;
          this.chartOption.series[1].data = this.covid_new_sale;
          this.chartOption.series[2].data = this.covid_on_going;
          this.chartOption.series[3].data = this.covid_total
          this.chartOption.series[4].data = this.non_covid_carried_over;
          this.chartOption.series[5].data = this.non_covid_new_sale;
          this.chartOption.series[6].data = this.non_covid_on_going;
          this.chartOption.series[7].data = this.non_covid_total;
          this.chartOption.series[8].data =this.areaType
          if (this.echartsIntance != undefined) {
            this.echartsIntance.setOption(this.chartOption);
          }
        }

      } else {
        if (this.select_filter_date.length > 0) {
          for (let k = 0; k < this.select_filter_date.length; k++) {
           
            this.date.push(this.select_filter_date[k].item_text)
            for (let i = 0; i < this.ko_demand_object.length; i++) {
              if (this.formatDate(this.ko_demand_object[i].Due_Date) == this.select_filter_date[k].item_text) {
                if (this._ko_demand_type == 'All' && this.output_ship_date.length > 0) {
                  if (this.ko_demand_object[i].Demand == 'CarriedOver') {
                    this.covid_carried_over.push(this.ko_demand_object[i].Covid)
                    this.non_covid_carried_over.push(this.ko_demand_object[i].NonCovid)
                    this.areaType.push(this._ko_demand_type)
                  }
                  else if (this.ko_demand_object[i].Demand == 'NewSales') {
                    this.covid_new_sale.push(this.ko_demand_object[i].Covid)
                    this.non_covid_new_sale.push(this.ko_demand_object[i].NonCovid)
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'OnGoing') {
                    this.covid_on_going.push(this.ko_demand_object[i].Covid)
                    this.non_covid_on_going.push(this.ko_demand_object[i].NonCovid)
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'Total') {
                    this.covid_total.push(this.ko_demand_object[i].Covid)
                    this.non_covid_total.push(this.ko_demand_object[i].NonCovid)
                    this.areaType.push(this._ko_demand_type)
                  }
                } else if (this._ko_demand_type == 'Carried Over' && this.output_ship_date.length > 0) {

                  if (this.ko_demand_object[i].Demand == 'CarriedOver') {
                    this.covid_carried_over.push(this.ko_demand_object[i].Covid)
                    this.non_covid_carried_over.push(this.ko_demand_object[i].NonCovid)
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'NewSales') {
                    this.covid_new_sale.push('')
                    this.non_covid_new_sale.push('')
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'OnGoing') {
                    this.covid_on_going.push('')
                    this.non_covid_on_going.push('')
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'Total') {
                    this.covid_total.push('')
                    this.non_covid_total.push('')
                    this.areaType.push(this._ko_demand_type)
                  }

                } else if (this._ko_demand_type == 'New Sale' && this.output_ship_date.length > 0) {

                  if (this.ko_demand_object[i].Demand == 'CarriedOver') {
                    this.covid_carried_over.push('')
                    this.non_covid_carried_over.push('')
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'NewSales') {
                    this.covid_new_sale.push(this.ko_demand_object[i].Covid)
                    this.non_covid_new_sale.push(this.ko_demand_object[i].NonCovid)
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'OnGoing') {
                    this.covid_on_going.push('')
                    this.non_covid_on_going.push('')
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'Total') {
                    this.covid_total.push('')
                    this.non_covid_total.push('')
                    this.areaType.push(this._ko_demand_type)
                  }

                } else if (this._ko_demand_type == 'On-going' && this.output_ship_date.length > 0) {

                  if (this.ko_demand_object[i].Demand == 'CarriedOver') {
                    this.covid_carried_over.push('')
                    this.non_covid_carried_over.push('')
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'NewSales') {
                    this.covid_new_sale.push('')
                    this.non_covid_new_sale.push('')
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'OnGoing') {
                    this.covid_on_going.push(this.ko_demand_object[i].Covid)
                    this.non_covid_on_going.push(this.ko_demand_object[i].NonCovid)
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'Total') {
                    this.covid_total.push('')
                    this.non_covid_total.push('')
                    this.areaType.push(this._ko_demand_type)
                  }

                } else if (this._ko_demand_type == 'Total' && this.output_ship_date.length > 0) {

                  if (this.ko_demand_object[i].Demand == 'CarriedOver') {
                    this.covid_carried_over.push('')
                    this.non_covid_carried_over.push('')
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'NewSales') {
                    this.covid_new_sale.push('')
                    this.non_covid_new_sale.push('')
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'OnGoing') {
                    this.covid_on_going.push('')
                    this.non_covid_on_going.push('')
                    this.areaType.push(this._ko_demand_type)
                  } else if (this.ko_demand_object[i].Demand == 'Total') {
                    this.covid_total.push(this.ko_demand_object[i].Covid)
                  this.non_covid_total.push(this.ko_demand_object[i].NonCovid)
                  this.areaType.push(this._ko_demand_type)
                  }

                }
              }

            }
          }
          this.chartOption.xAxis.data = this.date;
          this.chartOption.series[0].data = this.covid_carried_over;
          this.chartOption.series[1].data = this.covid_new_sale;
          this.chartOption.series[2].data = this.covid_on_going;
          this.chartOption.series[3].data = this.covid_total
          this.chartOption.series[4].data = this.non_covid_carried_over;
          this.chartOption.series[5].data = this.non_covid_new_sale;
          this.chartOption.series[6].data = this.non_covid_on_going;
          this.chartOption.series[7].data = this.non_covid_total;
          this.chartOption.series[8].data =this.areaType
          if (this.echartsIntance != undefined) {
            this.echartsIntance.setOption(this.chartOption);
          }
        }

      }
    })
    this.showLoading = false;
  }

  formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  formatDate(date) {
    var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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

  chartOption = {

    tooltip: {
      trigger: "axis",
      textStyle: {
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 14,
      },
      axisPointer: {
        data: [],
        reverse: true,
        axisLabel: {
          interval: 0,

        },
      },
      formatter: function (params) {

        console.log(params)
        let returnType;
        if(params.length == 9){

          if(params[8].data == 'All'){
            returnType =  `
            <b style="margin-left:35;"> ${params[0].name}</b> <br/>
            Covid Carried Over  : ${params[0].data}<br/>
            Covid Covid New Sale : ${params[1].data}<br/>
            Covid On Going : ${params[2].data}<br/>
            Covid Total : ${params[3].data}<br/>
            Non Covid Carried Over : ${params[4].data}<br/>
            Non Covid Covid New Sale : ${params[5].data}<br/>
            Non Covid On Going : ${params[6].data}<br/>
            Non Covid Total : ${params[7].data}<br/>`
            
          }else if(params[8].data == 'Carried Over'){
            returnType =  `
            <b style="margin-left:35;">${params[0].name}</b> <br/>
            Covid Carried Over Demand: ${params[0].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
            Non-Covid Carried Over Demand: ${params[4].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>`
          }else if(params[8].data == 'New Sale'){
            returnType =  `
            <b style="margin-left:35;"> ${params[0].name}</b><br/>
            Covid New Sale Demand: ${params[1].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
            Non-Covid New Sale Demand: ${params[5].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>`
          }else if(params[8].data == 'On-going'){
            returnType =  `
            <b style="margin-left:35;">${params[0].name}</b> <br/>
            Covid On-Going Demand: ${params[2].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
            Non-Covid On-Going Demand: ${params[6].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>`
          }else if(params[8].data == 'Total'){
            returnType =  `
            <b style="margin-left:35;">${params[0].name}</b> <br/>
            Covid Total Demand: ${params[3].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
            Non-Covid Total Demand: ${params[7].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>`
          }

        }else if(params.length == 5){

           if(params[4].data == 'Carried Over'){
            returnType =  `
            <b style="margin-left:35;">${params[0].name}</b> <br/>
            ${params[0].seriesName} Carried Over Demand: ${params[0].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
          }else if(params[4].data == 'New Sale'){
            returnType =  `
            <b style="margin-left:35;"> ${params[0].name}</b><br/>
            ${params[0].seriesName} New Sale Demand: ${params[1].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
          }else if(params[4].data == 'On-going'){
            returnType =  `
            <b style="margin-left:35;">${params[0].name}</b> <br/>
            ${params[0].seriesName} On-Going Demand: ${params[2].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
          }else if(params[4].data == 'Total'){
            returnType =  `
            <b style="margin-left:35;">${params[0].name}</b> <br/>
            ${params[0].seriesName} Total Demand: ${params[3].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
          }

        }
        
        // if(params[8].data == 'All'){
        //   returnType =  `
        //   <b style="margin-left:35;"> ${params[0].name}</b> <br/>
        //   Covid Carried Over  : ${params[0].data}<br/>
        //   Covid Covid New Sale : ${params[1].data}<br/>
        //   Covid On Going : ${params[2].data}<br/>
        //   Covid Total : ${params[3].data}<br/>
        //   Non Covid Carried Over : ${params[4].data}<br/>
        //   Non Covid Covid New Sale : ${params[5].data}<br/>
        //   Non Covid On Going : ${params[6].data}<br/>
        //   Non Covid Total : ${params[7].data}<br/>`
          
        // }else if(params[8].data == 'Carried Over'){
        //   returnType =  `
        //   <b style="margin-left:35;">${params[0].name}</b> <br/>
        //   Covid Carried Over Demand : ${params[0].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
        //   Non-Covid Carried Over Demand: ${params[4].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>`
        // }else if(params[8].data == 'New Sale'){
        //   returnType =  `
        //   <b style="margin-left:35;"> ${params[0].name}</b><br/>
        //   Covid New Sale Demand: ${params[1].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
        //   Non-Covid New Sale Demand: ${params[5].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>`
        // }else if(params[8].data == 'On-going'){
        //   returnType =  `
        //   <b style="margin-left:35;">${params[0].name}</b> <br/>
        //   Covid On-Going Demand: ${params[2].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
        //   Non-Covid On-Going Demand: ${params[6].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>`
        // }else if(params[8].data == 'Total'){
        //   returnType =  `
        //   <b style="margin-left:35;">${params[0].name}</b> <br/>
        //   Covid Total Demand: ${params[3].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>
        //   Non-Covid Total Demand: ${params[7].data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br/>`
        // }
      
       
        return returnType;
      },

    },
    legend: {
      orient: 'horizontal',
      data: ['Covid','Non-Covid'],
      //  selectedMode: false
    },
    grid: {
      left: "5%",
      right: "3%",
      bottom: "14%",
      top: "15%",
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
    
      startOnTick: false,
      data: [],
      axisLabel: {
        rotate: 45,
        fontSize: '13'
      },
      boundaryGap: false,
     },
     
    yAxis: {
      nameGap: 20,
     // name :'Kits',     
    //  nameLocation : "center",
     // left: '27%',
      axisTick: {
        alignWithLabel: true
      },
      show:true,
      showMinLabel:true,
      showMaxLabel:true,
    },
    series: [
      {
        data: [],
        type:'line',
        name: 'Covid',
        areaStyle: {},
        stack: 'one',
        dataType:[],
        emphasis: {
          focus: [],
         
        },
        itemStyle: { color: "#98413f" },
      },
      {

        data: [],
        name: 'Covid',
        type: 'line',
        stack: 'one',
        areaStyle: {},
       
        itemStyle: { color: "#98413f" },
        // itemStyle: { color: "#98413f" },

      },
      {
        data: [],
        name: 'Covid',
        type: 'line',
        stack: 'one',
        areaStyle: {},
        itemStyle: { color: "#98413f" },
        // itemStyle: { color: "#91a150" },

      },
      {
        data: [],
        name: 'Covid',
        type: 'line',
        stack: 'one',
        areaStyle: {},
        itemStyle: { color: "#98413f" },
        

      },

      {
        data: [],
        name: 'Non-Covid',
        type: 'line',
        stack: 'one',
        areaStyle: {},
       itemStyle: { color: "#5f7c9c" },
        // itemStyle: { color: "#334b62" },
      },
      {

        data: [],
        name: 'Non-Covid',
        type: 'line',
        stack: 'one',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        itemStyle: { color: "#5f7c9c" },
        // itemStyle: { color: "#a46b6d" },
      },
      {
        data: [],
        name: 'Non-Covid',
        type: 'line',
        stack: 'one',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        itemStyle: { color: "#5f7c9c" },
        // itemStyle: { color: "#8c937a" },
      },
      {
        data: [],
        name: 'Non-Covid',
        type: 'line',
        stack: 'one',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        itemStyle: { color: "#5f7c9c" },
        // itemStyle: { color: "#98413f" },
      },
      {
        data: [],
        type: 'line',
        
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

  downloadexcel(){
     this.excelService.exportAsExcelFile(this.ko_demand_object,'demand_break_down')
        
  }
  infoDetails(content){
    // this._infoDisplay = true
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
       
      disableClose: true,
      data: { message: this.info_dispay},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
      
    });
  }

  ngOnDestroy() {
    if (this._ko_demand != undefined)
      this._ko_demand.unsubscribe();
  }

}
