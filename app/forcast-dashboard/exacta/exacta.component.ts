import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { AgGridModule } from 'ag-grid-angular';
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { Router } from "@angular/router";
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { HttpClient } from '@angular/common/http';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import { ExcelService } from '../excel.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common'
import { InfoDetailsComponent } from '../../common/info-details/info-details.component'
import {DataService} from '../../common/data.service'

@Component({
    selector: 'app-exacta',
    templateUrl: './exacta.component.html',
    styleUrls: ['./exacta.component.less']
})
export class ExactaComponent implements OnInit, AfterViewInit, OnDestroy {
    private paginationNumberFormatter;

    private gridApi;
    private gridColumnApi;
    showLoading: boolean = false;
    public modules: any[] = AllModules;
    private columnDefs: any;
    private defaultColDef: any;
    private rowData = [];
    private columnDef = [];
    private sideBar;
    private rowGroupPanelShow;
    private pivotPanelShow;
    private rowSelection;
    private onRowGroupOpened;
    private rowDatas: any = []
    private paginationPageSize;
    private autoHeights: boolean
    private autoGroupColumnDef;
    private datasValue: any = []
    private _IsExacata: any;
    responseExacta: any = []
    private rowHeight: any;
    private domLayout;

    _sponsorName: any
    _sponsorNameResponse: any
    sponsor: any;
    expanded:any 
    batchResponseLoad:any =''
    download: any = this.getBaseUrl() + "/assets/icon/download.png";
    info: any = this.getBaseUrl() + "/assets/icon/info.png"
    info_dispay = this.getBaseUrl() + "/assets/pdf/Historical_Kits_Demand.pdf"
    constructor(private dataService: DashboardService, private excelService: ExcelService, private router: Router, private http: HttpClient,
        public dialog: MatDialog,private dataServices :DataService ) {
       // this._sponsorNameResponse = 'ROCHE'
       
        this.columnDefs = [
            {
                field: 'month',
                headerName: 'Month',
                cellStyle: { color: '#212121', 'font-size': '13px', 'height': '40px', 'font-family': "Roboto, Helvetica Neue, sans-serif" },
                hide: true,
                rowGroup: true,
                type: 'rightAligned',
            },
            {
                field: 'order_type',
                headerName: 'Order Type',
                sort: 'asc',
                cellStyle: { color: '#212121', 'font-size': '13px', 'height': '40px' },
                type: 'rightAligned'
            },
            {
                field: 'kits_requested',
                type: 'rightAligned',
                headerName: 'Requested',
                aggFunc: 'sum',
                valueFormatter:
                    '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
                valueParser: 'Number(newValue)',
                cellStyle: { color: '#212121', 'font-size': '13px', 'height': '40px' }
            },
            {
                field: 'kits_due',
                headerName: 'Due',
                type: 'rightAligned',
                aggFunc: 'sum',
                cellStyle: { color: '#212121', 'font-size': '13px', 'height': '40px' },
                valueFormatter:
                    '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
                valueParser: 'Number(newValue)'
            },
            {
                field: 'kits_shipped',
                headerName: 'Shipped',
                resizable: true,
                type: 'rightAligned',
                aggFunc: 'sum',
                cellStyle: { color: '#212121', 'font-size': '13px', 'height': '40px' },
                valueFormatter:
                    '"" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
                valueParser: 'Number(newValue)'
            },
            {
                field: 'kits_unfulfilled',
                headerName: 'Unfulfilled This Month',
                aggFunc: 'sum',
                resizable: true,
                type: 'rightAligned',
                cellStyle: { color: '#212121', 'font-size': '13px', 'height': '40px' },
                valueFormatter:
                    'Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+""',
                valueParser: 'Number(newValue)'
            }
        ];
        this.autoGroupColumnDef = {
            cellRendererParams: { suppressCount: true }
        }
        this.defaultColDef = {
            sortable: true,
            resizable: true,
            flex: 1,
            autoHeight: true,

            // wraptext: true
            // width: 150,
            filter: true,

            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,

        };

        this.paginationPageSize = 10;
        this.rowSelection = 'single';
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
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

        // this._sponsorName = this.dataService.batchoneLoadWidget.subscribe((response) =>{  
        //     this.expanded = "false";
        //  })
        
        this._sponsorName = this.dataService.batchoneLoadWidget.subscribe((response) => {
            this.responseExacta =[]
            this.rowDatas =[];
           // this._sponsorNameResponse = localStorage.getItem('selectedSponsor');
           this._sponsorNameResponse = this.dataServices.get_city_protocolID();
            if(this._sponsorNameResponse == "ALL"){
            this._sponsorNameResponse =[]
            }else{
            this._sponsorNameResponse = this._sponsorNameResponse
            }
            this.batchResponseLoad =response
            this.sponsor = {
                ctprotocolId : this._sponsorNameResponse
            }
            if (this.batchResponseLoad == 'true') {
                this.showLoading = true
                this.dataService.getExactaOrderData(this.sponsor).subscribe((dataRows) => {
                    this.responseExacta = dataRows;
                    this.rowDatas = dataRows.kitsOrderType;
                    this.showLoading = false
                });
            }
            this.batchResponseLoad = 'false'
          // this.expanded = "false";

        })

    }

    onFirstDataRendered(params) {
        setTimeout(function () {
            params.api.getDisplayedRowAtIndex(1).setExpanded(true);
        }, 0);
    }

    // expand(){
    //     // if(this.expanded == 'true'){
    //         this.responseExacta =[]
    //         this.rowDatas =[];
    //         this._sponsorNameResponse = localStorage.getItem('selectedSponsor');
    //         this.sponsor = {
    //             sponsor: this._sponsorNameResponse
    //         }
    //         if (this._sponsorNameResponse != '') {
    //             this.showLoading = true
    //             this.dataService.getExactaOrderData(this.sponsor).subscribe((dataRows) => {
    //                 this.responseExacta = dataRows;
    //                 this.rowDatas = dataRows.kitsOrderType;
    //                 this.showLoading = false
    //             });
    //         }
    //     // }
    // }


    ngOnDestroy() {

        if (this._IsExacata != undefined)
            this._IsExacata.unsubscribe();
         if(this._sponsorName != undefined)
         this._sponsorName.unsubscribe();   
    }

    onGridReady(params) {
        this.showLoading = true
      
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        // this.dataService.getExactaOrderData(this.sponsor).subscribe((dataRows) => {
        //     this.responseExacta = dataRows;
        //     this.rowDatas = dataRows.kitsOrderType;
        //     this.showLoading = false
        // });
    }

    close(): void {
        this.dataService.exactaDisplayTable('false')
    }
    sizeToFit() {
        this.gridApi.sizeColumnsToFit();
    }

    onPageSizeChanged(newPageSize) {
        //  var value = document.getElementById('page-size').value;
        //var value = document.querySelectorAll<HTMLInputElement>('page-size').value;
        const inputElement = document.getElementById('page-size') as HTMLInputElement
        const value = inputElement.value
        this.gridApi.paginationSetPageSize(Number(value));
    }

    onRowGroupOpeneds(event) {
        var rowNodeIndex = event.node.rowIndex;
        // factor in child nodes so we can scroll to correct position
        var childCount = event.node.childrenAfterSort ? event.node.childrenAfterSort.length : 0;
        var newIndex = rowNodeIndex + childCount;
        this.gridApi.api.ensureIndexVisible(newIndex);
    }
    infoDetails(content) {
        // this._infoDisplay = true
        const dialogRef = this.dialog.open(InfoDetailsComponent, {

            disableClose: true,
            data: { message: this.info_dispay },
            panelClass: ['animate__animated', 'animate__slideInLeft', 'my-class']
        });

    }

    downloadexcel() {
        this.excelService.exportAsExcelFile(this.rowDatas, 'historical_kitsdemand');
    }

    getBaseUrl(): string {
        var currentAbsoluteUrl = window.location.href;
        var currentRelativeUrl = this.router.url;
        var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
        var baseUrl: string = currentAbsoluteUrl.substring(0, index);
        return baseUrl;
    }

}

