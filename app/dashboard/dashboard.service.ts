import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

import {
  Protocol,
  TA,
  SunDetails,
  ProtocolPerformanceDetails,
  MapSiteDetails,
} from "src/app/common/common";
// import { userInfo } from 'os';
import{BackServiceService} from '../../app/common/back-service.service'

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  // private url = "https://qa.pharmacuity.healthcare/RobinAPI";
// private localUrl = "http://localhost/robinAPI"
// private url = "https://qa.pharmacuity.healthcare/RobinAPI";
 //private url = "http://localhost/robinAPI";

 private url = "https://qa.pharmacuity.healthcare/RobinAPI";

 // private url = "https://qa.pharmacuity.healthcare/RobinAPI";
  // private localUrl = "http://localhost/robinAPI"
  private sponsordataSubject = new BehaviorSubject("Roche");
  private sponsorNameRestDashbaord = new BehaviorSubject('')
  private googleMapData = new BehaviorSubject("");
  private mapSelectInformation = new BehaviorSubject("");
  private refreshMapInformation = new BehaviorSubject("");
  private protolcolNumberChanged = new BehaviorSubject("");
  private paginationNumber = new BehaviorSubject("");
  private syncMapSiteDetailsTable = new BehaviorSubject("");
  private loaderDisplay = new BehaviorSubject('')
  private forCastDateKitsInOut = new BehaviorSubject('')
  private headerInformationDisplay = new BehaviorSubject('')
  private pageName = new BehaviorSubject('')
  private objLength = new BehaviorSubject('')
  private sessionvalue = new BehaviorSubject('')
  private clearSession = new BehaviorSubject('')
  private exacta = new BehaviorSubject('')
  private newSale_carriedOver = new BehaviorSubject('')
  private existingSale_carriedOver = new BehaviorSubject('')
  private ship_area_filter = new BehaviorSubject('')
  private ko_demand = new BehaviorSubject('')
  private headerStatus = new BehaviorSubject('')
  private batchOneLoad = new BehaviorSubject('')
  private batchSecondLoad = new BehaviorSubject('')
  private headerStatusKOSupplier = new BehaviorSubject('')
  private dynamicMessageData = new BehaviorSubject('')
  private updateSponsorList = new BehaviorSubject('')
  private updateSelectedType = new BehaviorSubject('')
  private updateFiltersItems = new BehaviorSubject('')
  private accelerateFilters = new BehaviorSubject('')
  private stopPropogate = new BehaviorSubject('')
  private drawerOpenCloseState = new BehaviorSubject('')
  private defaultToggleValue = new BehaviorSubject('')
 // private drawerState = new BehaviorSubject('')
  private toggleFilter = new BehaviorSubject('') 
  private toggleDisable = new BehaviorSubject('')

  public sponsorName = this.sponsordataSubject.asObservable();
  public sponsorNameRestDashB= this.sponsorNameRestDashbaord.asObservable();
  public mapDatas = this.googleMapData.asObservable();
  public mapSelectData = this.mapSelectInformation.asObservable();
  public refreshInfo = this.refreshMapInformation.asObservable();
  public protocolNumberList = this.protolcolNumberChanged.asObservable();
  public totalPagination = this.paginationNumber.asObservable();
  public syncMapData = this.syncMapSiteDetailsTable.asObservable();
  public loader = this.loaderDisplay.asObservable(); 
  public forcastdate = this.forCastDateKitsInOut.asObservable();
  public headerInformation = this.headerInformationDisplay.asObservable();
  public currentPageName = this.pageName.asObservable()
  public overViewGridFirstRowObjLength = this.objLength.asObservable();
  public sessionInfo = this.sessionvalue.asObservable()
  public clearSessionValue = this.clearSession.asObservable()
  public exactaDisplay = this.exacta.asObservable()
  public new_sale_carried_over = this.newSale_carriedOver.asObservable()
  public ship_desease_filter_change = this.ship_area_filter.asObservable()
  public ko_demand_obj = this.ko_demand.asObservable()
  public headerComing = this.headerStatus.asObservable()
  public batchoneLoadWidget = this.batchOneLoad.asObservable()
  public batchSecondLoadWidget = this.batchSecondLoad.asObservable()
  public headerComingSuppler = this.headerStatusKOSupplier.asObservable()
  public dynamicMessageSection = this.dynamicMessageData.asObservable()
  public selectedTypeForDashbaord = this.updateSelectedType.asObservable()
  public filtersItem = this.updateFiltersItems.asObservable();
  public accerateFilter = this.accelerateFilters.asObservable();
  public stopPropogateCollapge = this.stopPropogate.asObservable();
  public drawerOpen = this.drawerOpenCloseState.asObservable();
  public defaultToggleOption = this.defaultToggleValue.asObservable()
  public toggleFilterValue = this.toggleFilter.asObservable()
  public toggleDisablevalue = this.toggleDisable.asObservable()
  //configFilesForAccelarateFilter: any = this.getBaseUrl() + "/RobinUI/assets/config/config_accelarateFilter.json";
 configFilesForAccelarateFilter: any = this.getBaseUrl() + "/assets/config/config_accelarateFilter.json";

   configfilesForHeaderInfo :any = this.getBaseUrl() + "/RobinUI/assets/config/config.json";
  //configfilesForHeaderInfo :any = this.getBaseUrl() + "/assets/config/config.json";
  public sponsorListUpdate = this.updateSponsorList.asObservable()
  private sessionId: string;
  private XSRFToken: string;
  constructor(private http: HttpClient,private resetServices : BackServiceService,private router: Router) {}

  updateSponsor(name: string) {
    //clear any filters saved for the sponsor
    localStorage.setItem("robin_protocols", "");
    localStorage.setItem("robin_filters", "");
    localStorage.setItem("protoColID", "");
    this.resetServices.setBackButtonValue('false');
    this.resetServices.setZoomLevelFilter('false')

    this.sponsordataSubject.next(name);
  }

  updateSponsorNameRestDashboard(sponsorName : any){
    this.sponsorNameRestDashbaord.next(sponsorName);
  }

  updateGoogleMapdata(listDatas: any) {
    this.googleMapData.next(listDatas);
  }

  updateMapSelect(selectArea: any) {
    this.mapSelectInformation.next(selectArea);
  }

  refreshMapInformationValue(refreshInformation: any) {
    this.refreshMapInformation.next(refreshInformation);
  }

  protolNumberUpdate(protolcolNumber: any) {
    this.protolcolNumberChanged.next(protolcolNumber);
  }

  paginationNumberUpdate(paginationnumber: any) {
    this.paginationNumber.next(paginationnumber);
  }

  updateSyncData(syncData: any) {
    this.syncMapSiteDetailsTable.next(syncData);
  }

  loadER(loaderRes : any){
    this.loaderDisplay.next(loaderRes)
  }

  forCastDate(forCastdateKitsInOut : any){
    this.forCastDateKitsInOut.next(forCastdateKitsInOut)
  }


  headerInformationDis(headerInfo : any){
   this.headerInformationDisplay.next(headerInfo);
  }

  currentPage(pageName : any){
    this.pageName.next(pageName)
  }

  overViewGridObjLength(objLength : any){
      this.objLength.next(objLength)
  }

  sessionTimeOut(sessionInformation : any){
    this.sessionvalue.next(sessionInformation)
  }

  clearsessionTimeOut(clearsessionInformation : any){
    this.clearSession.next(clearsessionInformation)
  }

   exactaDisplayTable(exactaValue : any){
    this.exacta.next(exactaValue)
   }

   newSales_carriedOver_Total(newSaleCarriedOver : any){
    this.newSale_carriedOver.next(newSaleCarriedOver)
   }

   ship_desease_filter(ship_filter :any){
     this.ship_area_filter.next(ship_filter)
   }

   ko_demand_function(ko_demand :any){
    this.ko_demand.next(ko_demand)
   }

   headerStatusValue(header : any){
     this.headerStatus.next(header)
   }

   batchfirstLoad(loadOne :any){
     this.batchOneLoad.next(loadOne)
   }

   batchSecondLoadMethod(loadSecond :any){
    this.batchSecondLoad.next(loadSecond)
  }

  headerStatusKOSupplerFrom(headerStatusSuppler : any){
    this.headerStatusKOSupplier.next(headerStatusSuppler)

  }

  messageSection(messageData : any){
    this.dynamicMessageData.next(messageData)
  }


  sponsorList(sponsorListUpdate :any){
    this.updateSponsorList.next(sponsorListUpdate);

  }

  selectType(selectedValue :any){
    this.updateSelectedType.next(selectedValue)
  }

  filterUpdate(filtersItem : any){
    this.updateFiltersItems.next(filtersItem)
    
  }

  accelarateFilter(accerateFilterResponse : any){
    this.accelerateFilters.next(accerateFilterResponse)
  }

  stop_collapse(stopPropogateCollapse :any){
    this.stopPropogate.next(stopPropogateCollapse)

  }

  drawerState(drawerState :any){
    this.drawerOpenCloseState.next(drawerState)
  }

  defaultToggle(toggleValue :any){
    this.defaultToggleValue.next(toggleValue)
  }

  toggle(value:any){
    this.toggleFilter.next(value)
  }

  toggleDisableMethood(toggleValue :any){
    this.toggleDisable.next(toggleValue)
  }

  getToken(userInput: any): Observable<any> {
    return this.http.post<any>(
      "https://qa.pharmacuity.healthcare/PharmAcuityApi/Auth/Login",
      userInput
    );
  }

  getRows(sponsor: string) {
    console.log("geting protocol data");
    let sessionID = localStorage.getItem("sessionID");
    let xsrfToken = localStorage.getItem("XSRFToken");
    return this.http.post<Protocol[]>(
      this.url + "/protocol",
      {
        sponsor: sponsor,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "J-SESSIONID": sessionID,
          "XSRF-TOKEN": xsrfToken,
        },
      }
    );
  }

  getGroups(payload: string[], sponsor: string) {
    return this.http.post<TA[]>(
      this.url + "/groups",
      {
        protocols: payload,
        sponsor: sponsor,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "J-SESSIONID": localStorage.getItem("sessionID"),
          "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
        },
      }
    );
  }

  protocolPerformance(payload: string[], sponsor: string) {
    return this.http.post<ProtocolPerformanceDetails[]>(
      this.url + "/dashboardProtocolPerformance",
      {
        protocols: payload,
        sponsor: sponsor,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "J-SESSIONID": localStorage.getItem("sessionID"),
          "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
        },
      }
    );
  }

  getProtocolSites(
    protocols: string[],
    type: string,
    name: string,
    sponsor: string,
    rowsperpage: number,
    pagenumber: number
  ) {
    if (!protocols) protocols = [];

    if (type == "enrollment")
      return this.http.post<TA[]>(
        this.url + "/enrollmentSiteSun",
        {
          protocols: protocols,
          name: name,
          type: "Enroll",
          sponsor: sponsor,
          RowsPerPage: rowsperpage,
          PageNumber: pagenumber,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "J-SESSIONID": localStorage.getItem("sessionID"),
            "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
          },
        }
      );
    else {
      return this.http.post<TA[]>(
        this.url + "/screenSiteSun",
        {
          protocols: protocols,
          name: name,
          type: "Screen",
          sponsor: sponsor,
          RowsPerPage: rowsperpage,
          PageNumber: pagenumber,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "J-SESSIONID": localStorage.getItem("sessionID"),
            "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
          },
        }
      );
    }
  }

  getSun(protocolList: any, name: string, sponsor: string): any {
    if (name == "enrollment")
      return this.http.post<SunDetails>(
        this.url + "/enrollmentSun",
        {
          protocols: protocolList,
          sponsor: sponsor,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "J-SESSIONID": localStorage.getItem("sessionID"),
            "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
          },
        }
      );
    else {
      if (name == "screen")
        return this.http.post<SunDetails>(
          this.url + "/screenSun",
          {
            protocols: protocolList,
            sponsor: sponsor,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "J-SESSIONID": localStorage.getItem("sessionID"),
              "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
            },
          }
        );
    }
  }

  uiErrorLog(
    errDate: string,
    errMessage: string,
    errStack: string,
    errForUser
  ) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = this.url + "/logerror";
      this.http
        .post(
          apiURL,
          {
            errDate: errDate,
            errMessage: errMessage,
            errStack: errStack,
            errForUser: errForUser,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .toPromise()
        .then(
          (res) => {
            // Success
            resolve();
          },
          (msg) => {
            reject(msg);
          }
        )
        .catch((msg) => {
          console.log("error - ", msg);
        });
    });
    return promise;
  }

  //----------Site details API --------------------------------------------

  // getSiteDetailsForMap(protocols: string[],sponsor: any,rowsperpage: any,pagenumber: any) {

  //   return this.http.post<any>(
  //     this.url + "/map",
  //     {
  //       protocols: protocols,
  //       sponsor: sponsor,
  //       RowsPerPage: rowsperpage,
  //       PageNumber: pagenumber,
  //     },
  //     {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "J-SESSIONID": localStorage.getItem("sessionID"),
  //         "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
  //       },
  //     }
  //   );

  // }

  getSiteDetailsForMap(
    protocols: any[],
    sponsor: any,
    rowsperpage: any,
    pagenumber: any
  ): Observable<any> {
    var body = {
      protocols: protocols,
      sponsor: sponsor,
      RowsPerPage: rowsperpage,
      PageNumber: pagenumber,
    };

    var requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    };

    return this.http.post<MapSiteDetails>(
      this.url + "/map",
      body,
      requestOptions
    );
  }

  //------------------------------------------------------------------------------------

  getMapSelectedArea(selectedArea: any): Observable<any> {
    var body = selectedArea;

    var requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    };

    return this.http.post<MapSiteDetails>(
      this.url + "/mapsitedetails",
      body,
      requestOptions
    );
  }

  //------------------------Bar Graph Kits IN and OUT Information------------------

  getBarGraphKitsInOut(barInfoKitsInOut: any): Observable<any> {
    var body = barInfoKitsInOut;
    return this.http.post<any>(
      this.url + "/kf/barchart",
      body,{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "J-SESSIONID": localStorage.getItem("sessionID"),
          "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
        },
      }
      
    );
  }

// getBarGraphKitsInOut(barInfoKitsInOut: any): Observable<any> {
//   var body = barInfoKitsInOut;

//   // var requestOptions = {
//   //   headers: {
//   //     Accept: "application/json",
//   //     "Content-Type": "application/json",
//   //     "J-SESSIONID": localStorage.getItem("sessionID"),
//   //     "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
//   //   },
//   // };
//   let mapURL = 'http://localhost/robinAPI/kf/barchart'

//   return this.http.post<any>(
//     this.url + "/kf/barchart",
//     body,
    
//   );
// }

//------------------------------Line Map-------------------------------

getLineGraphKitsInOut(barInfoKitsInOut: any): Observable<any> {
  var body = barInfoKitsInOut;
  return this.http.post<any>(
    this.url + "/kf/barchart",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }
    
  );
}

// getLineGraphKitsInOut(barInfoKitsInOut: any): Observable<any> {
//   var body = barInfoKitsInOut;

//   // var requestOptions = {
//   //   headers: {
//   //     Accept: "application/json",
//   //     "Content-Type": "application/json",
//   //     "J-SESSIONID": localStorage.getItem("sessionID"),
//   //     "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
//   //   },
//   // };
//   let mapURL = 'http://localhost/robinAPI/kf/barchart'

//   return this.http.post<any>(
//     this.localUrl + "/kf/barchart",
//     body,
    
//   );
// }

//-----------------------------Tree Map----------------------------------------

getTreeMapKitsInOut(barInfoKitsInOut: any): Observable<any> {
  var body = barInfoKitsInOut;
  return this.http.post<any>(
    this.url + "/kf/treemap",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }
    
  );
}

// getTreeMapKitsInOut(barInfoKitsInOut: any): Observable<any> {
//   var body = barInfoKitsInOut;

//   // var requestOptions = {
//   //   headers: {
//   //     Accept: "application/json",
//   //     "Content-Type": "application/json",
//   //     "J-SESSIONID": localStorage.getItem("sessionID"),
//   //     "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
//   //   },
//   // };
//   let mapURL = 'http://localhost/robinAPI/kf/treemap'

//   return this.http.post<any>(
//     this.url + "/kf/treemap",
//     body,
    
//   );
// }

//-----------------------Chrono map data population--------------------------------

getMapKitsInOut(mapInfoKitsInOut: any): Observable<any> {
  var body = mapInfoKitsInOut;
  return this.http.post<any>(
    this.url + "/kf/heatmap",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}

// getMapKitsInOut(mapInfoKitsInOut: any): Observable<any> {
//   var body = mapInfoKitsInOut;

//   // var requestOptions = {
//   //   headers: {
//   //     Accept: "application/json",
//   //     "Content-Type": "application/json",
//   //     "J-SESSIONID": localStorage.getItem("sessionID"),
//   //     "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
//   //   },
//   // };

//   let mapURL = 'http://localhost/robinAPI/kf/heatmap'
  
//   console.log('mapURL '+ mapURL)
//   return this.http.post<any>(
//     this.url + "/kf/heatmap",
//     body   
//   );
// }

// overview data population for Kits In and Out

getOverViewKitsInOut(sponsorName:string): Observable<any> {
  var body = sponsorName;
  return this.http.post<any>(
    this.url + "/kf/overview",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}

// getOverViewKitsInOut(): Observable<any> {
//   var body = '';

//   // var requestOptions = {
//   //   headers: {
//   //     Accept: "application/json",
//   //     "Content-Type": "application/json",
//   //     "J-SESSIONID": localStorage.getItem("sessionID"),
//   //     "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
//   //   },
//   // };

//   let mapURL = 'http://localhost/robinAPI/kf/overview'
  
//   console.log('mapURL '+ mapURL)
//   return this.http.post<any>(
//     this.url + "/kf/overview",
//     body   
//   );
// }
//-------------------------Forecast VS Actual --------------------

getfvsaoverview(sponsor :any): Observable<any> {
  var body = sponsor;
  return this.http.post<any>(
    this.url + "/kf/fvsaoverview",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}

//-----------------Scatter for kits IN----------------------

getMapKitsInScatterPlot(scatterInfoKitsInOut: any): Observable<any> {
  var body = scatterInfoKitsInOut;
  
  return this.http.post<any>(
    this.url + "/kf/scatter",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}

// getMapKitsInScatterPlot(scatterInfoKitsInOut: any): Observable<any> {
//   var body = scatterInfoKitsInOut;

//   // var requestOptions = {
//   //   headers: {
//   //     Accept: "application/json",
//   //     "Content-Type": "application/json",
//   //     "J-SESSIONID": localStorage.getItem("sessionID"),
//   //     "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
//   //   },
//   // };

//   let mapURL = 'http://localhost/robinAPI/kf/scatter'
  
//   console.log('mapURL '+ mapURL)
//   return this.http.post<any>(
//     this.url + "/kf/scatter",
//     body   
//   );
// }

//----------------------FanChart---------------------------------------

// getfanChartKitsInOut(fanChartInfoKitsInOut: any): Observable<any> {
//   var body = fanChartInfoKitsInOut;  
//   return this.http.post<any>(
//     this.url + "/kf/fanchart",
//     body,{
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "J-SESSIONID": localStorage.getItem("sessionID"),
//         "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
//       },
//     }   
//   );
// }


getfanChartKitsInOut(fanChartInfoKitsInOut: any): Observable<any> {
  var body = fanChartInfoKitsInOut;  
  return this.http.post<any>(
    this.url + "/kf/fanchartnumbers",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}

// getfanChartKitsInOut(fanChartInfoKitsInOut: any): Observable<any> {
//   var body = fanChartInfoKitsInOut;

//   // var requestOptions = {
//   //   headers: {
//   //     Accept: "application/json",
//   //     "Content-Type": "application/json",
//   //     "J-SESSIONID": localStorage.getItem("sessionID"),
//   //     "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
//   //   },
//   // };

  
//   return this.http.post<any>(
//     this.url + "/kf/fanchart",
//     body   
//   );
// }

//----------------------Protocols Info---------------------------------------

getprotocolsKitsInOut(): Observable<any> {
  var body = ''; 
  return this.http.post<any>(
    this.url + "/kf/protocols",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}


// getprotocolsKitsInOut(): Observable<any> {
//   var body = '';

 
//   return this.http.post<any>(
//     this.url + "/kf/protocols",
//     body   
//   );
// }

//--------------------------

getExactaData():Observable<any>{
  var body = '';

 
  return this.http.post<any>(
    this.url + "/kf/exacta",
    '',{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "LOGIN-EMAIL":"aninda.mohanty@tcgdigital.com",
        "J-SESSIONID": "",
        "XSRF-TOKEN": ""

        // "J-SESSIONID": localStorage.getItem("sessionID"),
        // "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}

//------------------------------------------

getExactaOrderData(sponsor :any):Observable<any>{
  var body = sponsor;

 
  return this.http.post<any>(
    this.url + "/kf/kitsbyordertype",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}

//---------------KO Analysis....

getkohistoricaldemandData(sponsor :any):Observable<any>{
  var body = sponsor;

 
  return this.http.post<any>(
    this.url + "/kf/kohistoricaldemand",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}


//------------Pareto chart -------------------------------

getkitforecastparetodates(sponsor :any): Observable<any> {
  var body = sponsor;  
  return this.http.post<any>(
    this.url + "/kf/kitforecastparetodates",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}


//------------Pareto chart -------------------------------

getkitforecastpareto(kitforecastparetodates: any): Observable<any> {
  var body = kitforecastparetodates;  
  return this.http.post<any>(
    this.url + "/kf/kitforecastpareto",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}

//-------------KO Supplier Pareto----------------------


getkitSupplierpareto(kitforecastparetodates: any): Observable<any> {
  var body = kitforecastparetodates;  
  return this.http.post<any>(
    this.url + "/kcf/pareto",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}


//---------------Pareto Grid--------------------------

getkitforecastparetogrid(sponsor :any): Observable<any> {
  var body = sponsor;  
  return this.http.post<any>(
    this.url + "/kf/kitforecastparetogriddetails",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}

//----------------------------Grid for 3  month---------------

getkitSupplier3monthfwdgridparetogrid(sponsor :any): Observable<any> {
  var body = sponsor;  
  return this.http.post<any>(
    this.url + "/kcf/3monthfwdgrid",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}


//--------------------------OverViewGrid KO/KI Dashbaord---------------

getkitforecastKOKITotalYear(sponsor :any): Observable<any> {
  var body =sponsor;  
  return this.http.post<any>(
    this.url + "/kf/currentyearkiko",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}

//--------------------------OverViewGrid KO/KI Dashbaord---------------

getkitproductleveldemand(sponsor :any): Observable<any> {
  var body = sponsor;  
  return this.http.post<any>(
    this.url + "/kcf/productleveldemand",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}
//----------------------------------

getsponsor(): Observable<any> {
  var body = '';  
  return this.http.post<any>(
    this.url + "/kf/sponsors",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}

//------------------------------------------------

getsponsorForSupplier(): Observable<any> {
  var body = '';  
  return this.http.post<any>(
    this.url + "/kcf/sponsor",
    body,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": localStorage.getItem("sessionID"),
        "XSRF-TOKEN": localStorage.getItem("XSRFToken"),
      },
    }   
  );
}

//------------------------------------


getMessageReadfromExternalSource(): Observable<any> {
  var body = '';  
  return this.http.get<any>(
    // 'https://raw.githubusercontent.com/jbiswas1987/demo/main/config.json',
    this.configfilesForHeaderInfo
  
  );
}

//--------------------------------------------------------------

getAccelarateFilterExternalSource(): Observable<any> {
  var body = '';  
  return this.http.get<any>(  
    this.configFilesForAccelarateFilter
    // this.url + '/configFiles/config_accelarateFilter.json'  
    //  'https://qa.pharmacuity.healthcare/RobinUI/configFiles/config_accelarateFilter.json',  
    // 'https://raw.githubusercontent.com/jbiswas1987/demo/main/config_accelarateFilter.json'
  );
}

getBaseUrl(): string {
  var currentAbsoluteUrl = window.location.href;
  var currentRelativeUrl = this.router.url;
  var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
  var baseUrl: string = currentAbsoluteUrl.substring(0, index);
  return baseUrl;
}

}



