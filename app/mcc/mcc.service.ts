import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { supplyTargetRes } from "src/app/model/supplyTargetRes";
import { map } from "rxjs/internal/operators/map";
import { ScatterData } from "src/app/common/common";

@Injectable({
  providedIn: "root",
})
export class MccService {
  private url = "https://qa.pharmacuity.healthcare/RobinAPI";

  constructor(private http: HttpClient) {}

  getscatterData(protocols: string[], name: string, sponsor: string) {
    return this.http.post<ScatterData>(
      this.url + "/mccScatter",
      {
        protocols: protocols,
        name: name,
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
