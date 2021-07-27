import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MccKpiService {
  private session_Id: string;
  private XSRF_Token: string;
  private url = "https://qa.pharmacuity.healthcare/RobinAPI";

  private indexSelectedSubject: BehaviorSubject<any>;
  indexSelected: Observable<any>;
  constructor(private http: HttpClient) {
    this.indexSelectedSubject = new BehaviorSubject(0);
    this.indexSelected = this.indexSelectedSubject.asObservable();
  }
  getMccBar(id, payload: string[], mcclevel: string, sponsor: string) {
    
    this.session_Id = localStorage.getItem("sessionID");
    this.XSRF_Token = localStorage.getItem("XSRF_Token");
    return this.http.post(
      this.url + "/mccBar",
      {
        name: id,
        protocols: payload,
        flag: mcclevel,
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
  setIndexSelected(val: number) {
    this.indexSelectedSubject.next(val);
  }
}
