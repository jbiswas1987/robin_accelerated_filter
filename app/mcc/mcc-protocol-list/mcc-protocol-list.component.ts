import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import { GridComponent } from "ng2-qgrid";
import {
  protocolDetailRes,
  siteDetailRes,
  protocolDetailScatterRes
} from "../../model/protocolDetailRes";
import { ProtocolService } from "../../protocol/protocol.service";
import { Router } from "@angular/router";
import { BackServiceService } from "src/app/common/back-service.service";
import {DashboardService} from '../../dashboard/dashboard.service'
import { AllModules } from '@ag-grid-enterprise/all-modules';
import * as moment from 'moment';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';

@Component({
  selector: "app-mcc-protocol-list",
  templateUrl: "./mcc-protocol-list.component.html",
  styleUrls: ["./mcc-protocol-list.component.less"],
  providers: [ProtocolService],
})
export class MccProtocolListComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(GridComponent) myGrid: GridComponent;
  showLoading: boolean = false;
  level: string;
  _sponsorName : any;
  sponsor : any;
  type:any;
  scatterForecast:boolean = false;

  private paginationNumberFormatter;

  private gridApi;
  private gridColumnApi;
  public modules: any[] = AllModules;
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
  constructor(
    private service: ProtocolService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private backServices: BackServiceService,
    private dashBoardServices : DashboardService
  ) {
    this.showLoading = true;
    this.scatterForecast = false;
    // this.columnDefs = [
     
    //   {
    //     field: 'details',
    //     headerName: 'Link',
    //     width: 90,
    //     cellStyle: {color: '#212121', 'text-decoration':'underline','cursor':'pointer','font-size':'13px','height':'40px','text-underline-offset':'2px'},
    //     pinned: 'left'
         
    //   },
    //   {
    //      field: 'protocolName',
    //      width: 150,
    //      headerName : 'Protocol Name',
    //      cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'},
        
    //   },
    //   {
    //     field: 'Variance',
    //     headerName:'% Variance',
    //     type: 'rightAligned',
    //     cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'}
    //   },
    //   {
    //     field: 'Total Kits-In OR Kits- Out',
    //     headerName: 'Total Kits-In/Kits- Out',
    //     resizable: true,
    //     type: 'rightAligned',
    //     cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'}
    //   },
      
    //   {
    //     field: 'sponsor',
    //     headerName: 'Sponsor Name',
    //     resizable: true,
    //     cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} 
    //   },
    //   {
    //     field: 'x',
    //     headerName: 'X',
    //     resizable: true,
    //     cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} 
    //   },
    //   {
    //     field: 'y',
    //     headerName: 'Y',
    //     resizable: true,
    //     cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} 
    //   },
      
    // ];
  

    // this.defaultColDef = {
    //   sortable: true,
    //   resizable: true,
    //   // flex: 1,
    //   autoHeight: true,
    //   // wraptext: true
    //   // width: 150,
    //   filter: true,
     
    //   enableRowGroup: true,
    //   enablePivot: true,
    //   enableValue: true,
     
    // };
    // this.paginationPageSize = 10;
    // this.rowSelection = 'single';
    // this.paginationNumberFormatter = function (params) {
    //   return '[' + params.value.toLocaleString() + ']';
    // };
    // this.sideBar = { toolPanels: [{ id: 'filters',
    // labelDefault: 'Filters',
    // labelKey: 'filters',
    // iconKey: 'filter',
    // toolPanel: 'agFiltersToolPanel',}] };
    // this.rowGroupPanelShow = 'always';
    // this.pivotPanelShow = 'always';

  }

 
  rows$: any[];
  ngOnInit() {}
  ngAfterViewInit() {

    this._sponsorName = this.dashBoardServices.sponsorName.subscribe((response)=>{
        this.sponsor = response
    })

    // const { model } = this.myGrid;
    // // model.data
    // model.pagination({
    //   size: 10,
    // });
    // model.style({
    //   row: (row, context) => {
    //     context.class("qRow", {
    //       height: "40px",
    //     });
    //   },
    // });
    // model.dataChanged.on((e) => {
    //   if (e.state.rows[0]) {
    //     this.showLoading = false;
    //     //this.cdRef.detectChanges();
    //   }
    // });
  }

  reset(griddata: Array<any>, level: string) {
    var records = [];    
    this.rowDatas =[]
    
    griddata.forEach((grid) => {
      console.log('hasDetails@@@@' +JSON.stringify(grid))
      if (level === "Protocol" ) {
        this.level = level;
        let obj = new protocolDetailRes();
        
        obj.protocolName = grid[2].label.name;
        obj.details = "../../protocol/" + grid[2].label.id;
        obj.x = grid[0];
        obj.y = grid[1];
        if(grid[2].label.id == undefined){
          obj.hasDetails = 0;
        }else{
          obj.hasDetails = 1;
        }

        // obj.hasDetails = 1;
        this.scatterForecast = false
        records.push(obj);
      } else if(level === "scatterForecastingProtoCol" ){
        this.level = "Protocol";
        let obj = new protocolDetailScatterRes();        
        obj.protocolName = grid[2].label.name;
      
        obj.details = "../../protocol/" + grid[2].label.id;
       
        obj["Variance"] = grid[0] +' ' +'%'
        obj["TotalKitsInORKitsOut"] = grid[1];
        obj.sponsor = grid[2].label.sponsor;
        // obj.scatterForecast = 'true'
        if(grid[2].label.id == undefined){
          obj.hasDetails = 0;
        }else{
          obj.hasDetails = 1;
        }
       
        // obj.hasDetails = 1;
        this.scatterForecast = true
        records.push(obj);
      }
       else {
        this.level = level;
        let obj = new siteDetailRes();
        console.log(typeof grid[2].label.name);
        obj.siteName = " " + grid[2].label.name;
        obj.details = "../../../site/" + grid[2].label.id;
        obj.hasDetails = grid[2].label.hasDetails;
        obj.x = grid[0];
        obj.y = grid[1];
        this.scatterForecast = false
        records.push(obj);
      }
    });
    this.rows$ = records;
    console.log('JSON' + JSON.stringify(this.rows$))
    if(level === "scatterForecastingProtoCol" ){
      for(const rows of this.rows$){
        if(rows.hasDetails == 1){
          this.rowDatas.push({
            'details':'details',
            'Link':rows.details,
            'protocolName':rows.protocolName,
            'Variance':rows.Variance,
            'Total Kits-In OR Kits- Out':rows.TotalKitsInORKitsOut,
            'sponsor':rows.sponsor,
            // 'x':rows.x,
            // 'y':rows.y
          
          })
        }else if(rows.hasDetails == 0){
          this.rowDatas.push({
            'details':'-',
            'Link':rows.details,
            'protocolName':rows.protocolName,
            'Variance':rows.Variance,
            'Total Kits-In OR Kits- Out':rows.TotalKitsInORKitsOut,
            'sponsor':rows.sponsor,
            // 'x':rows.x,
            // 'y':rows.y
          
            
          })
        }
        
      }
  
      this.plotForeCast();
    }else{
      for(const rows of this.rows$){
        if(rows.hasDetails == 1){
          this.rowDatas.push({
            'details':'details',
            'Link':rows.details,
            'protocolName':rows.protocolName,
            // 'Variance':rows.Variance,
            // 'Total Kits-In OR Kits- Out':rows.TotalKitsInORKitsOut,
            // 'sponsor':rows.sponsor,
            'x':rows.x,
            'y':rows.y
          
          })
        }else if(rows.hasDetails == 0){
          this.rowDatas.push({
            'details':'-',
            'Link':rows.details,
            'protocolName':rows.protocolName,
            // 'Variance':rows.Variance,
            // 'Total Kits-In OR Kits- Out':rows.TotalKitsInORKitsOut,
            // 'sponsor':rows.sponsor,
            'x':rows.x,
            'y':rows.y
          
            
          })
        }
        
      }
      this.plotPerformanceSite();
    }
    // for(const rows of this.rows$){
    //   if(rows.hasDetails == 1){
    //     this.rowDatas.push({
    //       'details':'details',
    //       'Link':rows.details,
    //       'protocolName':rows.protocolName,
    //       'Variance':rows.Variance,
    //       'Total Kits-In OR Kits- Out':rows.TotalKitsInORKitsOut,
    //       'sponsor':rows.sponsor,
    //       'x':rows.x,
    //       'y':rows.y
        
    //     })
    //   }else if(rows.hasDetails == 0){
    //     this.rowDatas.push({
    //       'details':'-',
    //       'Link':rows.details,
    //       'protocolName':rows.protocolName,
    //       'Variance':rows.Variance,
    //       'Total Kits-In OR Kits- Out':rows.TotalKitsInORKitsOut,
    //       'sponsor':rows.sponsor,
    //       'x':rows.x,
    //       'y':rows.y
        
          
    //     })
    //   }
      
    // }

    this.rowData = this.rowDatas
    this.showLoading = false;
    console.log('@@JSON' + JSON.stringify(this.rowData))


    // this.myGrid.model.filter({
    //   by: {},
    // });
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  plotForeCast(){
    this.columnDefs = [
     
      {
        field: 'details',
        headerName: 'Link',
        width: 90,
        cellStyle: {color: '#212121', 'text-decoration':'underline','cursor':'pointer','font-size':'13px','height':'40px','text-underline-offset':'2px'},
        pinned: 'left'
         
      },
      {
         field: 'protocolName',
         width: 150,
         headerName : 'Protocol Name',
         cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'},
        
      },
      {
        field: 'Variance',
        headerName:'% Variance',
        type: 'rightAligned',
        cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'}
      },
      {
        field: 'Total Kits-In OR Kits- Out',
        headerName: 'Total Kits-In/Kits- Out',
        resizable: true,
        type: 'rightAligned',
        cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'}
      },
      
      {
        field: 'sponsor',
        headerName: 'Sponsor Name',
        resizable: true,
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
    this.rowSelection = 'single';
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

  plotPerformanceSite(){
    this.columnDefs = [
     
      {
        field: 'details',
        headerName: 'Link',
        width: 90,
        cellStyle: {color: '#212121', 'text-decoration':'underline','cursor':'pointer','font-size':'13px','height':'40px','text-underline-offset':'2px'},
        pinned: 'left'
         
      },
      {
         field: 'protocolName',
         width: 150,
         headerName : 'Protocol Name',
         cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'},
        
      },
      {
        field: 'x',
        headerName: 'X',
        resizable: true,
        cellStyle: {color: '#212121', 'font-size':'13px','height':'40px'} 
      },
      {
        field: 'y',
        headerName: 'Y',
        resizable: true,
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
    this.rowSelection = 'single';
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

  // onPageSizeChanged(newPageSize) {
   
  //   const inputElement = document.getElementById('page-size') as HTMLInputElement
  //   const value = inputElement.value
  //   this.gridApi.paginationSetPageSize(Number(value));
  // }

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
  }


  getId(cellvalue,sponsorName,scatterForecast) {
   
    var obj: any = {};
    console.log('cellvalue@@@@@@@' + sponsorName)
   
    let sponsor = localStorage.getItem("sponsor_name");
    
    console.log();
    if (cellvalue.includes("protocol")) {
      //  obj.id = cellvalue.split("protocol/")[1];

      let navUrl: string = cellvalue;
      //navUrl = navUrl.replace("..", "home");
      navUrl = navUrl.replace("../protocol", "protocols");
      // console.log(navUrl);
      // this.router.navigate([navUrl]);
      // console.log(this.router);
      if(this.scatterForecast  == true){
        sponsor = sponsorName
      }
      var currentAbsoluteUrl = window.location.href;
      var currentRelativeUrl = this.router.url;
      var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
      var baseUrl = currentAbsoluteUrl.substring(0, index);
      // console.log(baseUrl);

      const url = this.router.serializeUrl(this.router.createUrlTree([navUrl]));
      window.open(baseUrl + url + "/" + btoa(sponsor), "_blank");
    } else {
      //   obj.id = cellvalue.split("site/")[1];

      localStorage.setItem("visibleLink", "false");
      let navUrl: string = cellvalue;
      //navUrl = navUrl.replace("..", "home");
      navUrl = navUrl.replace("../site", "investigator");
      // console.log(navUrl);
      // this.router.navigate([navUrl]);
      // console.log(this.router);
      var currentAbsoluteUrl = window.location.href;
      var currentRelativeUrl = this.router.url;
      var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
      var baseUrl = currentAbsoluteUrl.substring(0, index);
      // console.log(baseUrl);
      this.backServices.setsiteDetailsLinkVisibility("false");

      const url = this.router.serializeUrl(this.router.createUrlTree([navUrl]));
      window.open(baseUrl + url + "/" + btoa(sponsor), "_blank");
    }
    //  return obj;
  }

  onRowClick(event) {
    console.log(event)
    if(event.value == 'details'){
      var obj: any = {};
     
     
      let sponsor = localStorage.getItem("sponsor_name");
      
      console.log();
      if (event.data.Link.includes("protocol")) {
        //  obj.id = cellvalue.split("protocol/")[1];
  
        let navUrl: string = event.data.Link;
        //navUrl = navUrl.replace("..", "home");
        navUrl = navUrl.replace("../protocol", "protocols");
      
        if(this.scatterForecast  == true){
          sponsor =  event.data.sponsor
        }
        var currentAbsoluteUrl = window.location.href;
        var currentRelativeUrl = this.router.url;
        var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
        var baseUrl = currentAbsoluteUrl.substring(0, index);
        // console.log(baseUrl);
  
        const url = this.router.serializeUrl(this.router.createUrlTree([navUrl]));
        window.open(baseUrl + url + "/" + btoa(sponsor), "_blank");
      } else {
        localStorage.setItem("visibleLink", "false");
        let navUrl: string = event.data.Link;
        navUrl = navUrl.replace("../site", "investigator");
        var currentAbsoluteUrl = window.location.href;
        var currentRelativeUrl = this.router.url;
        var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
        var baseUrl = currentAbsoluteUrl.substring(0, index);
        // console.log(baseUrl);
        this.backServices.setsiteDetailsLinkVisibility("false");
          const url = this.router.serializeUrl(this.router.createUrlTree([navUrl]));
        window.open(baseUrl + url + "/" + btoa(sponsor), "_blank");
      }
    
    }
        
    }


  ngOnDestroy() {
    this.cdRef.detach();
    this._sponsorName.unsubscribe();
  }
}
