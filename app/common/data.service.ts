import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  protocolList: string[];
  sponsor: string;
  month :any;
  barGridClick : boolean = true;
  ko_analysis_obj : any;
  ko_demand_type : any;
  select_filter_date : any

  _sponsorList :any
  _accerateList :any
  _protocolNameList :any
  _allList :any;
  _ctProtocolID :any ='ALL';

  _accerateAllFilterResponse :any;
  _trailTypeSelectedElement :any;
  _sponsorTypeSelectedElement :any
  _protocolNameSelectedElemenet:any;
  _accelarateFilterType :any

  setProtocolList(passyourobject) {
    this.protocolList=passyourobject;
  }

  getProtocolList() {
    return this.protocolList
  }
  setSponsor(sponsor){
    this.sponsor = sponsor
  }
  getSponsor(){
    this.sponsor
  }
  setMonth(month:any){
    this.month = month;
  }
  getMonth(){
    return this.month
  }
  setBarGridClick(barGridClick:any){
    this.barGridClick = barGridClick;
  }
  getBarGridClick(){
    return this.barGridClick
  }
  setKo_AnalysisObj(ko_obj){
    this.ko_analysis_obj = ko_obj
  }
  getKO_AnalysisObj(){
    return this.ko_analysis_obj
  }
  set_ko_demand_type(ko_demand_type:any){
    this.ko_demand_type = ko_demand_type
  }
  get_ko_demand_type(){
    return this.ko_demand_type
  }
  set_filter_date(set_filter_date :any){
    this.select_filter_date = set_filter_date
  }
  get_filter_date(){
    return this.select_filter_date
  }
  set_sponsorList(_sponsorList :any){
    this._sponsorList = _sponsorList
  }
  get_sponsorList(){
    return this._sponsorList
  }
  set_accerateList(_accerateList :any){
    this._accerateList = _accerateList
  }
  get_accerateList(){
    return this._accerateList
  }
  set_protocolNameList(_protocolNameList :any){
    this._protocolNameList = _protocolNameList
  }
  get_protocolNameList(){
    return this._protocolNameList
  }
  set_All_list(_allList :any){
    this._allList = _allList
  }
  get_All_list(){
    return this._allList
  }
  set_city_protocolID(_ctProtocolID :any){
    this._ctProtocolID = _ctProtocolID
  }
  get_city_protocolID(){
    return this._ctProtocolID
  }
  set_accerateFilterALLResponse(_accerateAllFilterResponse :any){
    this._accerateAllFilterResponse = _accerateAllFilterResponse;
  }
  get_accerateFilterALLResponse(){
    return this._accerateAllFilterResponse
  }
  
  set_TrailTypeSetFilterElement(_trailTypeSelectedElement:any){
    this._trailTypeSelectedElement = _trailTypeSelectedElement
  }
  get_TrailTypeSetFilterElement(){
    return this._trailTypeSelectedElement
  }

  set_SponTypeSetFilterElement(_sponsorTypeSelectedElement :any){
    this._sponsorTypeSelectedElement = _sponsorTypeSelectedElement
  }

  get_SponTypeSetFilterElement(){
    return this._sponsorTypeSelectedElement
  }

  set_ProtocolTypeFilterElement(_protocolNameSelectedElemenet :any){
    this._protocolNameSelectedElemenet = _protocolNameSelectedElemenet
  }

  get_ProtocolTypeFilterElement(){
    return this._protocolNameSelectedElemenet
  }

  set_AccelarateFilterType(_accelarateFilterType :any){
    this._accelarateFilterType = _accelarateFilterType
  }

  get_AccelarateFilterType(){
    return this._accelarateFilterType
  }
}
