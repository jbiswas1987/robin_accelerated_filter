import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
 import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
 import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
 import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
 import { AgGridModule } from 'ag-grid-angular';
 import { DashboardService } from "src/app/dashboard/dashboard.service";
 import { Router } from "@angular/router";
 import { formatDate } from '@angular/common';
 import * as moment from 'moment';
 import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import {ExcelService} from '../excel.service';


@Component({
  selector: 'app-kits-protocol',
  templateUrl: './kits-protocol.component.html',
 
  styleUrls: ['./kits-protocol.component.less']
})
export class KitsProtocolComponent  {
  private paginationNumberFormatter;

  private gridApi;
  private gridColumnApi;
  showLoading: boolean = false;
  public modules: any[] = AllModules;
  private options: string[];
  selectedQuantity = "10";
  _protocoltableAPIResponse : any =[]
   //public modules: any[] = AllCommunityModules;
  //  public modules: any[] = [
  //   ClientSideRowModelModule,
  //   MultiFilterModule,
  //   MenuModule,
    
  // ];

   //  public module: any[] = MultiFilterModule;
  // public modules: any[] = [
  
  //   MultiFilterModule,
  //   MenuModule,
   
  // ];
  private columnDefs : any;
  private defaultColDef : any;
  private rowData= [];
  private columnDef = [];
  private sideBar;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private rowSelection;

  private rowDatas :any = []
  private paginationPageSize;
  private autoHeights:boolean
  download: any = this.getBaseUrl() + "/assets/icon/download.png";

  constructor(private dataService: DashboardService,
    private excelService:ExcelService,private router: Router,) {
    this.options = ["10", "50", "100","200","500","1000"]
    this.columnDefs = [
     
      {
        field: 'details',
        headerName: 'Link',
        width: 90,
        
        // minWidth: 50,
        // maxWidth: 150,
        // resizable: true,
        // filter: 'agNumberColumnFilter',
        cellStyle: {color: '#212121', 'text-decoration':'underline','cursor':'pointer','font-size':'13px','height':'40px','text-underline-offset':'2px'},
        pinned: 'left'
         
      },
      {
        field: 'ProtocolName',
         width: 150,
       // resizable: true,
        pinned: 'left',
        // filter: 'agMultiColumnFilter',
        cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'},
        
      },
      {
        field: 'CTProtocolID',
        width: 130,
        //resizable: true,
        // filter: 'agMultiColumnFilter',
      //   valueFormatter:
      //   '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
      // valueParser: 'Number(newValue)',
        pinned: 'left',
        cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'}
      },
      {
        field: 'KitsInForecastCurrentMonth',
        headerName: 'Kits In Forecast Current Month',
        resizable: true,
        type: 'rightAligned',
        valueFormatter:
        '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
      valueParser: 'Number(newValue)',
        // filter: 'agNumberColumnFilter',
        cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'}
      },
      
      {
        field: 'KitsInActualPreviousMonth',
        headerName: 'Kits In Actual Previous Month',
        // width: 100,
        resizable: true,
        type: 'rightAligned',
        // filter: 'agNumberColumnFilter',
        valueFormatter:
        '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
      valueParser: 'Number(newValue)',
        cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} 
      },
      {
        field: 'PercentageVarianceKitsIn',
        headerName: '% MoM Growth Kits In',
        // width: 100,
        resizable: true,
        type: 'rightAligned',
        valueFormatter:
          'Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+""+"%"',
        valueParser: 'Number(newValue)',
        cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} 
      },
      {
        field: 'KitsOutForecastCurrentMonth',
        headerName: 'Kits Out Forecast Current Month',
        // width: 100,
        resizable: true,
        type: 'rightAligned',
        valueFormatter:
        '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
      valueParser: 'Number(newValue)',
        cellStyle: {color: '#212121', 'font-size':'13px','height':'35px'} 
      },
      {
        field: 'KitsOutActualPreviousMonth',
        headerName: 'Kits Out Actual Previous Month',
        // width: 100,
        resizable: true,
        type: 'rightAligned',
        valueFormatter:
        '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
      valueParser: 'Number(newValue)',
        cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} 
      },
      {
        field: 'PercentageVarianceKitsOut',
        headerName: '% MoM Growth Kits Out',
        // width: 100,
        resizable: true,
        type: 'rightAligned',
        valueFormatter:
          'Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"" +"%"',
        valueParser: 'Number(newValue)',
        cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} 
      },
      {
        field: 'NCT',
        // width: 110,
        resizable: true,
        cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} 
      },
      {
        field: 'Sponsor',
        // width: 110,
        resizable: true,
        cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} 
      },
      {
        field: 'PFDate',
        // width: 100,
        resizable: true,
        valueFormatter: function (params) {
          return moment(params.value).format('MM/DD/YYYY');
      },
        cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} 
      },
    ];
  

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      // flex: 1,
      autoHeight: true,
      // wraptext: true
      // width: 150,
      filter: true,
     
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
     
    };
    this.paginationPageSize = 10;
    this.rowSelection = 'multiple';
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };
    this.sideBar = { toolPanels: [{ id: 'filters',
    labelDefault: 'Filters',
    labelKey: 'filters',
    iconKey: 'filter',
    toolPanel: 'agFiltersToolPanel',}] };
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';

  }

  

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  onPageSizeChanged(newPageSize) {
    const inputElement = document.getElementById('page-size') as HTMLInputElement

    var value = inputElement.value;
    this.gridApi.paginationSetPageSize(this.selectedQuantity);

    // const inputElement = document.getElementById('page-size') as HTMLInputElement
    // const value = inputElement.value
  //  this.gridApi.paginationSetPageSize(Number(value));
  }

  autoSizeAll(skipHeader) {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  onGridReady(params) {
    this.showLoading = true
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.columnApi.autoSizeAllColumns();
    // params.columnApi.sizeColumnsToFit();
    // params.columnApi.resetRowHeights();
   this.rowDatas =[]
   this._protocoltableAPIResponse =[]
 
 // this.rowData = [{"athlete":"Michael Phelps","age":23,"country":"United States","year":2008,"date":"24/08/2008","sport":"Swimming","gold":8,"silver":0,"bronze":0,"total":8},{"athlete":"Michael Phelps","age":19,"country":"United States","year":2004,"date":"29/08/2004","sport":"Swimming","gold":6,"silver":0,"bronze":2,"total":8},{"athlete":"Michael Phelps","age":27,"country":"United States","year":2012,"date":"12/08/2012","sport":"Swimming","gold":4,"silver":2,"bronze":0,"total":6},{"athlete":"Natalie Coughlin","age":25,"country":"United States","year":2008,"date":"24/08/2008","sport":"Swimming","gold":1,"silver":2,"bronze":3,"total":6},{"athlete":"Aleksey Nemov","age":24,"country":"Russia","year":2000,"date":"01/10/2000","sport":"Gymnastics","gold":2,"silver":1,"bronze":3,"total":6},{"athlete":"Alicia Coutts","age":24,"country":"Australia","year":2012,"date":"12/08/2012","sport":"Swimming","gold":1,"silver":3,"bronze":1,"total":5},{"athlete":"Missy Franklin","age":17,"country":"United States","year":2012,"date":"12/08/2012","sport":"Swimming","gold":4,"silver":0,"bronze":1,"total":5},{"athlete":"Ryan Lochte","age":27,"country":"United States","year":2012,"date":"12/08/2012","sport":"Swimming","gold":2,"silver":2,"bronze":1,"total":5},{"athlete":"Allison Schmitt","age":22,"country":"United States","year":2012,"date":"12/08/2012","sport":"Swimming","gold":3,"silver":1,"bronze":1,"total":5},{"athlete":"Natalie Coughlin","age":21,"country":"United States","year":2004,"date":"29/08/2004","sport":"Swimming","gold":2,"silver":2,"bronze":1,"total":5}]
    this.dataService.getprotocolsKitsInOut().subscribe((dataRows) => {
      this._protocoltableAPIResponse = dataRows
      for(const rows of dataRows){
        if(rows.HasProtocolId == 1){
          this.rowDatas.push({
            'details':'details',
            'Link':rows.Link,
            'ProtocolName':rows.ProtocolName,
            'CTProtocolID':rows.CTProtocolID,
            'NCT':rows.NCT,
            'Sponsor':rows.Sponsor,
            'PFDate':rows.PFDate,
            'KitsInForecastCurrentMonth':rows.KitsInForecastCurrentMonth,
            'KitsInActualPreviousMonth':rows.KitsInActualPreviousMonth,
            'PercentageVarianceKitsIn':rows.PercentageVarianceKitsIn,
            'KitsOutForecastCurrentMonth':rows.KitsOutForecastCurrentMonth,
            'KitsOutActualPreviousMonth':rows.KitsOutActualPreviousMonth,
            'PercentageVarianceKitsOut':rows.PercentageVarianceKitsOut
          })
        }else if(rows.HasProtocolId == 0){
          this.rowDatas.push({
            'details':'-',
            'Link':rows.Link,
            'ProtocolName':rows.ProtocolName,
            'CTProtocolID':rows.CTProtocolID,
            'NCT':rows.NCT,
            'Sponsor':rows.Sponsor,
            'PFDate':rows.PFDate,
            'KitsInForecastCurrentMonth':rows.KitsInForecastCurrentMonth,
            'KitsInActualPreviousMonth':rows.KitsInActualPreviousMonth,
            'PercentageVarianceKitsIn':rows.PercentageVarianceKitsIn,
            'KitsOutForecastCurrentMonth':rows.KitsOutForecastCurrentMonth,
            'KitsOutActualPreviousMonth':rows.KitsOutActualPreviousMonth,
            'PercentageVarianceKitsOut':rows.PercentageVarianceKitsOut
          })
        }
        // this.rowDatas.push({
        //   'details':'details',
        //   'Link':rows.Link,
        //   'ProtocolName':rows.ProtocolName,
        //   'CTProtocolID':rows.CTProtocolID,
        //   'NCT':rows.NCT,
        //   'Sponsor':rows.Sponsor,
        //   'PFDate':rows.PFDate,
        //   'KitsInForecastCurrentMonth':rows.KitsInForecastCurrentMonth,
        //   'KitsInActualPreviousMonth':rows.KitsInActualPreviousMonth,
        //   'PercentageVarianceKitsIn':rows.PercentageVarianceKitsIn,
        //   'KitsOutForecastCurrentMonth':rows.KitsOutForecastCurrentMonth,
        //   'KitsOutActualPreviousMonth':rows.KitsOutActualPreviousMonth,
        //   'PercentageVarianceKitsOut':rows.PercentageVarianceKitsOut
        // })
      }

      console.log('new value' + JSON.stringify(this.rowDatas))

      // var fakeServer = new FakeServer(dataRows);
      // var datasource = new ServerSideDatasource(fakeServer);
      // params.api.setServerSideDatasource(datasource);
      
       this.rowData = dataRows
      this.rowData = this.rowDatas
       this.showLoading = false;
  });
}



onRowClick(event) {
console.log(event)
if(event.value == 'details'){
  let navUrl: string = event.data.Link;
//navUrl = navUrl.replace("..", "home");
navUrl = navUrl.replace("../protocol", "protocols");

var currentAbsoluteUrl = window.location.href;
var currentRelativeUrl = this.router.url;
var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
var baseUrl = currentAbsoluteUrl.substring(0, index);

const url = this.router.serializeUrl(this.router.createUrlTree([navUrl]));
window.open(baseUrl + url + "/" + btoa(event.data.Sponsor), "_blank");

}

// let navUrl: string = event.data.Link;
// //navUrl = navUrl.replace("..", "home");
// navUrl = navUrl.replace("../protocol", "protocols");

// var currentAbsoluteUrl = window.location.href;
// var currentRelativeUrl = this.router.url;
// var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
// var baseUrl = currentAbsoluteUrl.substring(0, index);

// const url = this.router.serializeUrl(this.router.createUrlTree([navUrl]));
// window.open(baseUrl + url + "/" + btoa(event.data.Sponsor), "_blank");

}

// onRowClicked(event: any) { console.log('row', event); }

  //   this.http
  //     .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
  //     .subscribe((data) => {
  //       this.rowData = data;
  //     });
  // }


  formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

downloadexcel(){
  this.excelService.exportAsExcelFile(this._protocoltableAPIResponse,  'protocol');
}

getBaseUrl(): string {
  var currentAbsoluteUrl = window.location.href;
  var currentRelativeUrl = this.router.url;
  var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
  var baseUrl: string = currentAbsoluteUrl.substring(0, index);
  return baseUrl;
}

}
function ServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      setTimeout(function () {
        if (response.success) {
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 1000);
    },
  };
}

