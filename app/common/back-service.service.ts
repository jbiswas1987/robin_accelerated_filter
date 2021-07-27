import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackServiceService {

  private backButton : string = 'false';
  private IsMapDataLoad : string = 'false'
  private zoomLevelFilter : string = 'false'
  private mapData : any;
  private syncdata : string = 'false'
  private siteDetailsLinkVisibility : string = 'false'

  constructor() { }

  public setBackButtonValue(backItem : string){
    this.backButton = backItem;

  }

  public getBackButtonValue() : string{
    return this.backButton;
  }

  public setMapDataLoad(IsMapDataLoad : string){
    this.IsMapDataLoad = IsMapDataLoad;

  }

  public getMapDataLoad() : string{
    return this.IsMapDataLoad;
  }

  public setZoomLevelFilter (zoomLevelFilter : any){
    this.zoomLevelFilter = zoomLevelFilter
  }

  public getZoomLevelFilter (){
    return this.zoomLevelFilter;
  }

  public setMapData (mapData : any){
    this.mapData = mapData
  }

  public getMapData(){
    return this.mapData;
  }

  public setSyncMapData (syncdata : any){
    this.syncdata = syncdata
  }

  public getSyncMapData (){
    return this.syncdata;
  }

  public setsiteDetailsLinkVisibility (siteDetailsLinkVisibility : any){
    this.siteDetailsLinkVisibility = siteDetailsLinkVisibility
  }

  public getsiteDetailsLinkVisibility (){
    return this.siteDetailsLinkVisibility;
  }



}
