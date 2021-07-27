import { Component, OnInit } from '@angular/core';
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Router } from "@angular/router";
import { DataService } from '../../common/data.service'
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import * as moment from 'moment';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { ExcelService } from '../../forcast-dashboard/excel.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common'
import { InfoDetailsComponent } from '../../common/info-details/info-details.component'
@Component({
  selector: 'app-months-forward',
  templateUrl: './months-forward.component.html',
  styleUrls: ['./months-forward.component.less']
})
export class MonthsForwardComponent implements OnInit {

  navUrl: any
  flags = [];
  output = [];
  private paginationNumberFormatter;
  private gridApi;
  private gridColumnApi;
  public modules: any[] = AllModules;
  private options: string[];
  selectedQuantity = "10";
  _protocoltableAPIResponse: any = []
  _newProtocolresponse: any = [];
  private columnDefs: any;
  private defaultColDef: any;
  private rowData = [];
  private columnDef = [];
  private sideBar;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private rowSelection;
  private rowDatas: any = []
  private paginationPageSize;
  private autoHeights: boolean
  private domLayout;
  private sortingOrder;
  private pfdate: any;
  tooltipShowDelay: any;
  showLoading: boolean = false;
  _newProtocolsList: any = []
  forecast_zero: any
  _forecastCondition: any = false;
  obj: any
  private rowHeight;

  _sponsorName: any
  _sponsorNameResponse: any
  sponsor: any;

  download: any = this.getBaseUrl() + "/assets/icon/download.png";
  info: any = this.getBaseUrl() + "/assets/icon/info.png"
  info_dispay = this.getBaseUrl() + "/assets/pdf/3_months_Forward_Details_Supplies.pdf"
  constructor(private dataService: DashboardService, private excelService: ExcelService,
    private router: Router, public dialog: MatDialog) {
    this.options = ["10", "50", "100", "200", "500", "1000"]
  }

  ngOnInit() {
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  onPageSizeChanged(newPageSize) {
    // const inputElement = document.getElementById('page-size') as HTMLInputElement
    // var value = inputElement.value;
    this.gridApi.paginationSetPageSize(this.selectedQuantity);
  }

  onGridReady(params) {
    this.showLoading = true
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.columnApi.autoSizeAllColumns();

  }

  ngAfterViewInit() {
    this._sponsorName = this.dataService.sponsorNameRestDashB.subscribe((response) => {
      this._sponsorNameResponse = response;

      if (this._sponsorNameResponse != '') {
        this.showLoading = true;
        // this.defaultColDef =''
        this.columnDefs = []
        this.getDataPopulating();
      }
    });

  }

  getDataPopulating() {
    this.rowDatas = []
    this._newProtocolresponse = []
    this._protocoltableAPIResponse = []
    this.flags = []
    this.output = []
    this._newProtocolsList = []
    this.sponsor = {
      sponsor: this._sponsorNameResponse
    }
    this.dataService.getkitSupplier3monthfwdgridparetogrid(this.sponsor).subscribe((dataRows) => {
      this._protocoltableAPIResponse = dataRows

      for (let i = 0; i < this._protocoltableAPIResponse.length; i++) {
        if (this.flags[this._protocoltableAPIResponse[i].ForecastMonth])
          continue;
        this.flags[this._protocoltableAPIResponse[i].ForecastMonth] = true;
        this.output.push(this._protocoltableAPIResponse[i].ForecastMonth);
      }

      //     this._protocoltableAPIResponse =[{"ProductId":"99278","ProductDescription":"3ML UTM,10ML TUBE, 3 BEADS, JSN ","ForecastMonth":"Apr-2021","Value":111.0,"MoMGrowth":0.0},{"ProductId":"99278","ProductDescription":"3ML UTM,10ML TUBE, 3 BEADS, JSN ","ForecastMonth":"May-2021","Value":114.0,"MoMGrowth":2.0},{"ProductId":"99278","ProductDescription":"3ML UTM,10ML TUBE, 3 BEADS, JSN ","ForecastMonth":"Jun-2021","Value":112.0,"MoMGrowth":-1.0}]

      for (let k = 0; k < this._protocoltableAPIResponse.length; k++) {
        if (this._protocoltableAPIResponse[k].ForecastMonth == this.output[0]) {
          this._forecastCondition = true
          var obj_zero = {
            'forecast_date_zero': this.output[0],
            'ForcastActual_zero': this._protocoltableAPIResponse[k].Value,
            'KO_MoMGrowth_zero': 'MoM Growth:' + this._protocoltableAPIResponse[k].MoMGrowth + '%',
          }
        } else if (this._protocoltableAPIResponse[k].ForecastMonth == this.output[1]) {
          var obj_first = {
            'forecast_date_zero': obj_zero.forecast_date_zero,
            'forecast_date_first': this.output[1],
            'ForcastActual_zero': obj_zero.ForcastActual_zero,
            'ForcastActual_first': this._protocoltableAPIResponse[k].Value,
            'KO_MoMGrowth_sero': obj_zero.KO_MoMGrowth_zero,
            'KO_MoMGrowth_first': 'MoM Growth:' + this._protocoltableAPIResponse[k].MoMGrowth + '%',
          }

        } else if (this._protocoltableAPIResponse[k].ForecastMonth == this.output[2]) {
          var obj_second = {
            'forecast_date_zero': obj_first.forecast_date_zero,
            'forecast_date_first': obj_first.forecast_date_first,
            'forecast_date_second': this.output[2],
            'ForcastActual_zero': obj_first.ForcastActual_zero,
            'ForcastActual_first': obj_first.ForcastActual_first,
            'ForcastActual_second': this._protocoltableAPIResponse[k].Value,
            'KO_MoMGrowth_zero': obj_first.KO_MoMGrowth_sero,
            'KO_MoMGrowth_first': obj_first.KO_MoMGrowth_first,
            'KO_MoMGrowth_second': 'MoM Growth:' + this._protocoltableAPIResponse[k].MoMGrowth + '%',
          }

        } else if (this._protocoltableAPIResponse[k].ForecastMonth == this.output[3]) {

          if (this._forecastCondition == true) {
            this.forecast_zero = obj_second.ForcastActual_zero
          } else {
            this.forecast_zero = 0
          }

          // if(obj_second.ForcastActual_zero == 40){
          //   this.forecast_zero = 0
          // }else{
          //   this.forecast_zero = obj_second.ForcastActual_zero
          // }

          var obj_third = {
            'ProductId': this._protocoltableAPIResponse[k].ProductId,
            'ProductDescription': this._protocoltableAPIResponse[k].ProductDescription,
            'forecast_date_zero': obj_second.forecast_date_zero,
            'forecast_date_first': obj_second.forecast_date_first,
            'forecast_date_second': obj_second.forecast_date_second,
            'forecast_date_third': this.output[3],
            'ForcastActual_zero': this.forecast_zero,
            'ForcastActual_first': obj_second.ForcastActual_first,
            'ForcastActual_second': obj_second.ForcastActual_second,
            'ForcastActual_third': this._protocoltableAPIResponse[k].Value,
            'KO_MoMGrowth_zero': obj_second.KO_MoMGrowth_zero,
            'KO_MoMGrowth_first': obj_second.KO_MoMGrowth_first,
            'KO_MoMGrowth_second': obj_second.KO_MoMGrowth_second,
            'KO_MoMGrowth_thir': 'MoM Growth:' + this._protocoltableAPIResponse[k].MoMGrowth + '%',
            //  }
          }
          this._newProtocolsList.push(obj_third)
          this._forecastCondition = false;
        }
      }
      this.rowData = this._newProtocolsList
      this.getPaertoGridPlot();
    });
  }

  getPaertoGridPlot() {
    this.columnDefs = [
      {
        groupId: 'leftPinId',
        children: [
          {
            field: 'ProductId',
            width: 130,
            headerName: 'Product ID',
            // resizable: true,
            pinned: 'left',
            cellStyle: { color: '#212121', 'font-size': '13px', 'height': '40px' }
          },
          {
            field: 'ProductDescription',
            width: 350,
            // wrapText: true,
            // autoHeight: true,
            headerName: 'Product Description',
            resizable: true,
            pinned: 'left',
            cellStyle: { color: '#212121', 'font-size': '13px', 'height': '40px', 'white-space': 'normal' },

          },

        ],
      },
      {
        groupId: 'actual',
        headerName: 'Actual',
        cellStyle: { color: '#212121', 'font-size': '13px', 'height': '40px', 'margin-left': '80px' },
        children: [
          {
            field: 'ForcastActual_zero', headerName: this.output[0], tooltipField: 'KO_MoMGrowth_zero',
            type: 'rightAligned', valueFormatter:
              '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
            cellStyle: { color: '#212121', 'font-size': '13px', 'height': '40px' }
          },
        ],
      },
      {
        groupId: 'Forecast',
        headerName: 'Forecast',
        type: 'rightAligned',
        cellClass: "grid-cell-centered",
        children: [
          {
            field: 'ForcastActual_first', headerName: this.output[1], type: 'rightAligned', tooltipField: 'KO_MoMGrowth_first', sort: 'desc', valueFormatter:
              '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")', tooltipComponentParams: { color: '#ececec' },
            cellStyle: { color: '#212121', 'font-size': '13px', 'height': '40px' }
          },
          {
            field: 'ForcastActual_second', headerName: this.output[2], type: 'rightAligned', tooltipField: 'KO_MoMGrowth_second', valueFormatter:
              '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")', tooltipClass: 'my-tooltip',
            cellStyle: { color: '#212121', 'font-size': '13px', 'height': '40px' }
          },
          {
            field: 'ForcastActual_third', headerName: this.output[3], type: 'rightAligned', tooltipField: 'KO_MoMGrowth_thir', valueFormatter:
              '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
            cellStyle: { color: '#212121', 'font-size': '13px', 'height': '40px' }
          },

        ],
      },
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      flex: 1,
      autoHeight: true,
      filter: true,
      enablePivot: true,
      enableValue: true,
      tooltipComponent: 'CustomTooltip',
    };
    this.rowHeight = 40;
    this.paginationPageSize = 10;
    this.rowSelection = 'multiple';
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };
    this.sideBar = {
      toolPanels: [{
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      }]
    };
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
    this.domLayout = "autoHeight";
    this.sortingOrder = ['desc', 'asc', null];
    this.tooltipShowDelay = 0;
    this.showLoading = false;
  }

  downloadexcel() {
    this.excelService.exportAsExcelFile(this._protocoltableAPIResponse, '3 months forward');
  }
  infoDetails(content) {
    // this._infoDisplay = true
    const dialogRef = this.dialog.open(InfoDetailsComponent, {

      disableClose: true,
      data: { message: this.info_dispay },
      panelClass: ['animate__animated', 'animate__slideInLeft', 'my-class']

    });
  }
  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }
  ngOnDestroy() {
    if (this._sponsorName != undefined)
      this._sponsorName.unsubscribe();
  }
}
