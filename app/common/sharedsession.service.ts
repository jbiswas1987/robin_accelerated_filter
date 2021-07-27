import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({ providedIn: "root" })
export class SharedSessionService {
  private _sessionID: string;
  public get sessionID(): string {
    return this._sessionID;
  }
  public set sessionID(value: string) {
    this._sessionID = value;
  }
  private _XSRFToken: string;
  public get XSRFToken(): string {
    return this._XSRFToken;
  }
  public set XSRFToken(value: string) {
    this._XSRFToken = value;
  }
  private _UserName: string;
  public get UserName(): string {
    return this._UserName;
  }
  public set UserName(value: string) {
    this._UserName = value;
  }
  private _robin_protocols: string;
  public get robin_protocols(): string {
    return this._robin_protocols;
  }
  public set robin_protocols(value: string) {
    this._robin_protocols = value;
  }
  private _robin_filters: string;
  public get robin_filters(): string {
    return this._robin_filters;
  }
  public set robin_filters(value: string) {
    this._robin_filters = value;
  }
  private _robin_PSfilters: string;
  public get robin_PSfilters(): string {
    return this._robin_PSfilters;
  }
  public set robin_PSfilters(value: string) {
    this._robin_PSfilters = value;
  }
  private _robin_PId: string;
  public get robin_PId(): string {
    return this._robin_PId;
  }
  public set robin_PId(value: string) {
    this._robin_PId = value;
  }

  private _sponsorChange: boolean = false;
  public get changeSponsor(): boolean {
    return this._sponsorChange;
  }
  public set changeSponsor(value: boolean) {
    this._sponsorChange = value;
  }

  constructor() {}

  resetAllStateValues() {
    this.sessionID = "";
    this.XSRFToken = "";
    this.UserName = "";
    this.robin_protocols = "";
    this.robin_filters = "";
    this.robin_PSfilters = "";
    this.robin_PId = "";
  }
}
