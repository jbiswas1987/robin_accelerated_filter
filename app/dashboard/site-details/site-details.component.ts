import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { DashboardSiteTableComponent } from "../dashboard-metrics/dashboard-site-table/dashboard-site-table.component";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import {
  GoogleMapsAPIWrapper,
  AgmMap,
  LatLngBounds,
  LatLngBoundsLiteral,
} from "@agm/core";
import { MapsAPILoader } from "@agm/core";
import { google } from "google-maps";
import MarkerClusterer from "@googlemaps/markerclustererplus";
import { NgxSpinnerService } from "ngx-spinner";
import { BackServiceService } from "../../common/back-service.service";
import { interval } from "rxjs";
import { Router } from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common'
import {InfoDetailsComponent} from '../../common/info-details/info-details.component'
declare const google: any;
@Component({
  selector: "app-site-details",
  templateUrl: "./site-details.component.html",
  styleUrls: ["./site-details.component.less"],
})
export class SiteDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild("AgmMap") agmMap: AgmMap;

  zoom: number = 2;
  // initial center position for the map
  Latitude: number = 44.5;
  Longitude: number = -89.5;

  //Latitude: any
  details_info: any;
  IsDetailsShow: boolean = false;
  isagm_circel: boolean = false;
  Isexpand_map: boolean = false;
  @ViewChild("siteTable") siteTable: DashboardSiteTableComponent;
  //  markers: marker[]=[];
  siteSunRowspan: string;
  isEnrollment: string = "enrollment";
  isScreen: string = "screen";
  rowheight: string;
  detailscity: any;
  detailscountry: any;
  siteTableRowspan: string;
  markers = [];
  showLoadingForMap: boolean = false;
  isMapShowLoading: boolean = false;
  isRefreshMap: boolean = false;
  mapdetailsresponse: any = [];
  noOfClickOnMapDetails: number;
  initalValue: number = 1;
  calculatevalue: number;
  showLoadingMap: boolean = true;

  radiusChangeLat: any;
  radiusChangeLan: any;
  radius = 1000;
  k: any;
  dist: any;
  circle: any;
  mapClickDetails: any = [];
  count = 0;
  latlngBounds: any;
  onGoingProtocols: any;
  activePhysicians: any;
  enrHighPerformerSiteCount: any;
  enrLowPerformerSiteCount: any;
  scrLowPerformerSiteCount: any;
  scrHighPerformerSiteCount: any;
  scrMediumPerformerSiteCount: any;
  scrNonPerformerSiteCount: any;
  enrMediumPerformerSiteCount: any;
  enrNonPerformerSiteCount: any;
  IsMapLoad: boolean = false;
  isLoading: boolean;
  mapInitialExpand: any;
  siteTableInitialExpand: any;
  currentZoomLevelStatus: any;
  zoomLevelPosition: any;
  IszoomLevel: boolean;
  zoomChangeInitValue: number;
  IsZoomLevelInitialValueSet: boolean;
  IsZoomFilterStatus: boolean;
  IsrefreshFilterStatus: boolean;
  IsZoomINSync: boolean;
  countValue: number;
  refreshImage: any = this.getBaseUrl() + "/assets/icon/refresh.png";
  expandImage: any = this.getBaseUrl() + "/assets/icon/arrow-expand.png";
  filterImage: any = this.getBaseUrl() + "/assets/icon/filter.png";
  markerImage: any = this.getBaseUrl() + "/assets/icon/bubble_new.png";
  collapseImage: any = this.getBaseUrl() + "/assets/icon/arrow-compress.png";
  loader: any = this.getBaseUrl() + "/assets/icon/loadernew.svg";
  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/site_details.pdf"
  constructor(
    private dataService: DashboardService,
    private mapsAPILoader: MapsAPILoader,
    private spinner: NgxSpinnerService,
    private backServices: BackServiceService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.dataService.mapDatas.subscribe((response: any) => {
      this.markers = [];
      this.mapdetailsresponse = [];
      this.IszoomLevel = false;
      this.isLoading = false;
      this.zoom = 2;
      this.zoomChangeInitValue = 2;
      this.IsZoomLevelInitialValueSet = false;
      this.IsZoomFilterStatus = false;
      this.IsrefreshFilterStatus = false;
      this.mapdetailsresponse = response;
      this.IsZoomINSync = true;
      this.noOfClickOnMapDetails = 1;
      // this.isLoading = false;
      this.countValue = 3;

      this.noOfClickOnMapDetails = 1;
      // this.isLoading = false;

      if (this.mapdetailsresponse.length > 1000) {
        //   this.isLoading = true
        //   setTimeout (() => {
        //     this.isLoading = false
        //     console.log('Time Out')
        //  }, 1000);
        //  this.zoom = 1;
        // this.spinner.show();
        // setTimeout(() => {
        //   /** spinner ends after 5 seconds */
        //   this.spinner.hide();
        // }, 1050);
        this.zoom = 2;
        this.isLoading = false;
        // setTimeout(() => {

        // }, 1050);

        console.log(this.zoom);
        for (const mapData of response) {
          // this.isLoading = true
          if (this.markers.length < 375) {
            this.showLoadingForMap = true;
            // this.showLoadingForMap = true;
            this.markers.push({
              lat: mapData.Latitude,
              lng: mapData.Longitude,
              activePhysicians: mapData.ActivePhysicians,
              city: mapData.City,
              country: mapData.Country,
              zip: mapData.Zip,
              enrHighPerformerSiteCount: mapData.EnrHighPerformerSiteCount,
              enrLowPerformerSiteCount: mapData.EnrLowPerformerSiteCount,
              ongoingProtocols: mapData.OngoingProtocols,
              scrHighPerformerSiteCount: mapData.ScrHighPerformerSiteCount,
              scrLowPerformerSiteCount: mapData.ScrLowPerformerSiteCount,
              scrMediumPerformerSiteCount: mapData.ScrMediumPerformerSiteCount,
              scrNonPerformerSiteCount: mapData.ScrNonPerformerSiteCount,
              enrMediumPerformerSiteCount: mapData.EnrMediumPerformerSiteCount,
              enrNonPerformerSiteCount: mapData.EnrNonPerformerSiteCount,
              draggable: true,
            });
          } else {
            this.isLoading = false;
            for (let i = 1; i <= 5; ++i) {
              this.setDelay(i);
            }

            this.showLoadingForMap = false;
            this.isMapShowLoading = false;
            break;
          }
        }
      } else if (
        this.mapdetailsresponse.length >= 250 &&
        this.mapdetailsresponse.length < 1000
      ) {
        this.isLoading = false;
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.isLoading = true;
        }, 1050);

        // this.isLoading = true;
        // this.wait(2000).then( () => this.isLoading = false );
        // setTimeout( () => this.isLoading = false, 2000 );

        this.zoom = 2;
        // this.isLoading = false;
        console.log(this.zoom);
        for (const mapData of response) {
          // this.isLoading = true
          if (this.markers.length < 375) {
            // this.showLoadingForMap = true;
            // this.showLoadingForMap = true;
            this.markers.push({
              lat: mapData.Latitude,
              lng: mapData.Longitude,
              activePhysicians: mapData.ActivePhysicians,
              city: mapData.City,
              country: mapData.Country,
              zip: mapData.Zip,
              enrHighPerformerSiteCount: mapData.EnrHighPerformerSiteCount,
              enrLowPerformerSiteCount: mapData.EnrLowPerformerSiteCount,
              ongoingProtocols: mapData.OngoingProtocols,
              scrHighPerformerSiteCount: mapData.ScrHighPerformerSiteCount,
              scrLowPerformerSiteCount: mapData.ScrLowPerformerSiteCount,
              scrMediumPerformerSiteCount: mapData.ScrMediumPerformerSiteCount,
              scrNonPerformerSiteCount: mapData.ScrNonPerformerSiteCount,
              enrMediumPerformerSiteCount: mapData.EnrMediumPerformerSiteCount,
              enrNonPerformerSiteCount: mapData.EnrNonPerformerSiteCount,
              draggable: true,
            });
          } else {
            // this.spinner.hide();
            // this.spinner.hide();

            // this.isLoading = false;
            // for (let i = 1; i <= 5; ++i) {

            //   this.setDelay(i);
            // }
            break;
          }
        }
      } else if (
        this.mapdetailsresponse.length >= 1 &&
        this.mapdetailsresponse.length <= 250
      ) {
        this.zoom = 2;
        console.log(this.zoom);
        for (const mapData of response) {
          // this.zoom = 2;
          this.markers.push({
            lat: mapData.Latitude,
            lng: mapData.Longitude,
            activePhysicians: mapData.ActivePhysicians,
            city: mapData.City,
            country: mapData.Country,
            zip: mapData.Zip,
            enrHighPerformerSiteCount: mapData.EnrHighPerformerSiteCount,
            enrLowPerformerSiteCount: mapData.EnrLowPerformerSiteCount,
            ongoingProtocols: mapData.OngoingProtocols,
            scrHighPerformerSiteCount: mapData.ScrHighPerformerSiteCount,
            scrLowPerformerSiteCount: mapData.ScrLowPerformerSiteCount,
            scrMediumPerformerSiteCount: mapData.ScrMediumPerformerSiteCount,
            scrNonPerformerSiteCount: mapData.ScrNonPerformerSiteCount,
            enrMediumPerformerSiteCount: mapData.EnrMediumPerformerSiteCount,
            enrNonPerformerSiteCount: mapData.EnrNonPerformerSiteCount,
            draggable: true,
          });
        }
        // this.isLoading = true;
        this.isLoading = false;
        for (let i = 1; i <= 5; ++i) {
          this.setDelay(i);
        }
        this.showLoadingForMap = false;
        this.isMapShowLoading = false;
      } else if (this.mapdetailsresponse.length == 0) {
        this.zoom = 2;
        let oldMapData = this.backServices.getMapData();
        if (
          oldMapData != null &&
          oldMapData.length > 0 &&
          oldMapData != undefined
        ) {
          this.markers = oldMapData;
          this.isLoading = true;
          this.showLoadingForMap = false;
          this.isMapShowLoading = false;
        }
      }

      console.log("length" + this.markers.length);
    });

    this.dataService.loader.subscribe((response: any) => {
      if (response == "true") {
        this.isLoading = false;
        // for (let i = 1; i <= 5; ++i) {
        //   this.setDelay(i);
        // }
      }
    });
  }

  showLoader() {
    this.showLoadingForMap = true;
  }

  setDelay(i) {
    setTimeout(function () {}, 10000);

    if (i == 5) {
      this.isLoading = true;
    }
  }
  // clearMapData(){
  //   this.markers =[];
  // }
  async wait(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  ngOnInit() {
    var windowH = window.screen.height;
    this.setPanelSize(windowH);
    //google.maps.event.addDomListener(window, "load", this.initialize);
    // this.initialize();
  }
  placeMarker($event) {
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }

  ngAfterViewInit() {}

  zoomChange($event) {
    if (this.IsZoomINSync) {
      this.dataService.updateSyncData("true");
      if (this.isRefreshMap) {
        this.countValue--;
        if (this.countValue == 1) {
          this.IsZoomINSync = false;
          this.isRefreshMap = false;
        }
      } else {
        this.IsZoomINSync = false;
      }
    } else {
      this.dataService.updateSyncData("false");
    }
  }

  // zoomChange($event) {
  //   console.log("Markers Length" + $event);

  //   if (
  //     ($event == 1 ||
  //       $event == 2 ||
  //       $event == 3 ||
  //       $event == 4 ||
  //       $event == 5 ||
  //       $event == 6 ||
  //       $event == 7 ||
  //       $event == 8) &&
  //     this.IsZoomLevelInitialValueSet == false
  //   ) {
  //     this.IsZoomLevelInitialValueSet = true;
  //     if ($event == 1) {
  //       this.zoom = 1;
  //       $event = 1;
  //     } else if (this.IsrefreshFilterStatus == true) {
  //       this.zoom = 1;
  //     } else if (this.IsZoomFilterStatus == true) {
  //       this.zoom = $event;
  //     } else {
  //       $event = this.zoomChangeInitValue;
  //     }
  //     // $event =  this.zoomChangeInitValue;
  //   }

  //   if ($event == this.zoom) {
  //     // this.currentZoomLevelStatus = $event
  //     this.IszoomLevel = true;
  //     this.dataService.updateSyncData("true");
  //   }
  //   // else if(($event ==1 || $event ==8) && (this.IszoomLevel == true)){
  //   //   this.IszoomLevel = true;
  //   //   this.dataService.updateSyncData("false");
  //   // }
  //   else if ($event > this.zoom - 1 && this.IszoomLevel == true) {
  //     this.dataService.updateSyncData("false");
  //   }
  //   // else if(($event ==1) && (this.IszoomLevel == false)){
  //   //   this.dataService.updateSyncData("true");
  //   // }
  //   else {
  //     this.dataService.updateSyncData("false");
  //   }
  // }

  zoomChange1($event, m: any) {
    // this.latlngBounds = new window['google'].maps.LatLngBounds();
    const latlngBounds: LatLngBounds = new google.maps.LatLngBounds();
    for (let markers of this.markers) {
      let position = { lat: markers.lat, lng: markers.lng };

      if (
        latlngBounds.contains(
          new google.maps.LatLng(markers.lat, markers.lng)
        ) == true
      ) {
        //Put the item in an Array which can be shown in the List
      }
    }
  }
  checkMarkersInBounds(bounds) {
    this.mapClickDetails = [];
    const latlngBounds: LatLngBounds = new google.maps.LatLngBounds();
    for (let markers of this.markers) {
      let position = { lat: markers.lat, lng: markers.lng };

      if (
        bounds.contains(new google.maps.LatLng(markers.lat, markers.lng)) ===
        true
      ) {
        let selectArea = {
          city: markers.city,
          country: markers.country,
          zip: markers.zip,
        };
        this.mapClickDetails.push(selectArea);
      }
    }
  }

  radiusDragEnd($event: any) {
    this.radiusChangeLat = $event.coords.lat;
    this.radiusChangeLan = $event.coords.lng;
    console.log("@@@@@@Radius change" + $event);
    // this.showHideMarkers();
  }

  event(type, $event) {
    console.log(type, $event);
  }

  setPanelSize(height: number) {
    console.log("@@@@@##" + height);
    switch (height) {
      case 768:
        this.rowheight = "60vh";
        this.siteSunRowspan = "1.5";
        this.siteTableRowspan = "4";
        break;
      case 900:
        this.rowheight = "21vh";
        this.siteSunRowspan = "1.5";
        this.siteTableRowspan = "4";
        break;
      case 1050:
        this.rowheight = "35vh";
        this.siteSunRowspan = "1";
        this.siteTableRowspan = "2";
        break;
      case 1080:
        this.rowheight = "35vh";
        this.siteSunRowspan = "1";
        this.siteTableRowspan = "2";
        break;
      case 1200:
        this.rowheight = "32vh";
        this.siteSunRowspan = "1";
        this.siteTableRowspan = "2";
        break;
    }
  }

  //  clickedMarker(label: string, index: number) {
  //    console.log(`clicked the marker: ${label || index}`)
  //    this.details_info = label || index;
  //    console.log(this.details_info)

  //  }

  clickedMarker(m: any, $event: MouseEvent) {
    m.isClicked = true;
    let selectArea = {
      city: m.city,
      country: m.country,
      zip: m.zip,
      mapClick: "true",
    };

    this.mapClickDetails.push(selectArea);
    // this.dataService.updateMapSelect(selectArea);
  }

  moreLocationInfo() {}

  centerChange($event, m: any) {
    // console.log("@@@"+JSON.stringify($event))
    // this.radiusChangeLat = $event.coords.lat;
    // this.radiusChangeLan = $event.coords.lng;
    //   this.zoom = 2;
    // console.log("Markers Length" + this.markers.length);
    this.dataService.updateSyncData("false");
    if (
      this.noOfClickOnMapDetails < 2 &&
      this.mapdetailsresponse.length > 1000
    ) {
      // this.isLoading = false;
      // setTimeout(() => {
      //   /** spinner ends after 5 seconds */
      //   this.isLoading = true;
      // }, 1500);
      // this.noOfClickOnMapDetails++
      //   this.isLoading = false;
      //   setTimeout(() => {
      //    /** spinner ends after 5 seconds */
      //    this.isLoading = true
      //  }, 250);
      //   this.isLoading = false;
      // //   setTimeout(() => {
      // //    /** spinner ends after 5 seconds */
      // //    this.isLoading = true
      // //  }, 300);
      //   console.log(this.noOfClickOnMapDetails)
      //   this.calculatevalue = Math.round(this.mapdetailsresponse.length /20)
      //   let initalValue = this.noOfClickOnMapDetails  * this.calculatevalue;
      //   let destinationTargetValue = initalValue +15;
      //   for (let j = initalValue; j < destinationTargetValue; j++) {
      //       this.markers.push({
      //         lat: this.mapdetailsresponse[initalValue].Latitude,
      //         lng: this.mapdetailsresponse[initalValue].Longitude,
      //         activePhysicians: this.mapdetailsresponse[initalValue].ActivePhysicians,
      //         city: this.mapdetailsresponse[initalValue].City,
      //         country: this.mapdetailsresponse[initalValue].Country,
      //         zip: this.mapdetailsresponse[initalValue].Zip,
      //         enrHighPerformerSiteCount: this.mapdetailsresponse[initalValue].EnrHighPerformerSiteCount,
      //         enrLowPerformerSiteCount: this.mapdetailsresponse[initalValue].EnrLowPerformerSiteCount,
      //         ongoingProtocols: this.mapdetailsresponse[initalValue].OngoingProtocols,
      //         scrHighPerformerSiteCount: this.mapdetailsresponse[initalValue].ScrHighPerformerSiteCount,
      //         scrLowPerformerSiteCount: this.mapdetailsresponse[initalValue].ScrLowPerformerSiteCount,
      //         scrMediumPerformerSiteCount: this.mapdetailsresponse[initalValue].ScrMediumPerformerSiteCount,
      //         scrNonPerformerSiteCount: this.mapdetailsresponse[initalValue].ScrNonPerformerSiteCount,
      //         draggable: true,
      //       })
      //     }
      //     this.noOfClickOnMapDetails++;
      //     // this.spinner.hide();
      //     this.showLoadingMap = true
    }
  }

  onMouseOver(
    infoWindow,
    ongoingProtocols: any,
    activePhysicians: any,
    city: string,
    country: string,
    label: string,
    index: number,
    enrLowPerformerSiteCount: any,
    enrHighPerformerSiteCount: any,
    scrLowPerformerSiteCount: any,
    scrHighPerformerSiteCount: any,
    scrMediumPerformerSiteCount: any,
    scrNonPerformerSiteCount: any,
    enrMediumPerformerSiteCount: any,
    enrNonPerformerSiteCount: any
  ) {
    this.IsDetailsShow = true;
    //  alert(JSON.stringify(data))

    this.details_info = label;
    this.detailscity = city;
    this.detailscountry = country;
    this.onGoingProtocols = ongoingProtocols;
    this.activePhysicians = activePhysicians;
    this.enrHighPerformerSiteCount = enrHighPerformerSiteCount;
    this.enrLowPerformerSiteCount = enrLowPerformerSiteCount;
    this.scrLowPerformerSiteCount = scrLowPerformerSiteCount;
    this.scrHighPerformerSiteCount = scrHighPerformerSiteCount;
    this.scrMediumPerformerSiteCount = scrMediumPerformerSiteCount;
    this.scrNonPerformerSiteCount = scrNonPerformerSiteCount;
    this.enrMediumPerformerSiteCount = enrMediumPerformerSiteCount;
    this.enrNonPerformerSiteCount = enrNonPerformerSiteCount;
    infoWindow.open();
  }
  zoomLevelFilter() {
    // this.IsZoomLevelInitialValueSet = false;
    // this.IsZoomFilterStatus = true
    // this.zoom = 2;
    this.IsZoomINSync = true;
    this.zoomChange(1);
    this.zoomLevelPosition = this.currentZoomLevelStatus;
    this.backServices.setZoomLevelFilter("false");
    this.backServices.setMapData(this.markers);
    //   this.dataService.updateSyncData('true');
    //  this.IsZoomLevelInitialValueSet = false;
    this.backServices.setSyncMapData("true");
    this.dataService.updateMapSelect(this.mapClickDetails);
  }
  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }

  // expand_map() {
  //   this.zoom = 3;
  //   this.Isexpand_map = true;
  //   let temMarkerData = [];
  //   temMarkerData = this.markers

  //   this.isLoading = false;
  //   setTimeout(() => {
  //    /** spinner ends after 5 seconds */
  //    this.isLoading = true
  //    }, 850);

  //   this.markers = temMarkerData;

  //   temMarkerData =[];
  // }
  collapse_map() {
    this.zoom = 2;
    this.isLoading = false;
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.isLoading = true;
    }, 850);
    this.dataService.updateSyncData("");
    this.backServices.setMapDataLoad("true");
    this.Isexpand_map = false;
  }
  refresh() {
    this.zoom = 1;
    // this.dataService.updateSyncData("");
    this.IsZoomINSync = true;
    this.IsrefreshFilterStatus = true;
    this.IsZoomFilterStatus = false;
    this.isRefreshMap = true;
    this.isLoading = false;

    this.dataService.refreshMapInformationValue(this.isRefreshMap);
  }

  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }

  infoDetails(){
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
     
      disableClose: true,
      data: { message: this.info_dispay},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
    });
    
  }

  
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  Latitude: number;
}
