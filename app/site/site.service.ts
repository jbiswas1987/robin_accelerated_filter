import { Injectable } from "@angular/core";
import { Investigator, ProtocolSite } from "src/app/site/siteCommon";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class SiteService {
  private url = "https://qa.pharmacuity.healthcare/RobinAPI";

  constructor(private http: HttpClient) {}

  getInvestigatorInfo(investigatorId, sponsor) {
    return this.http.post<Investigator>(
      this.url + "/investigatorInfo",
      {
        protocolSiteId: investigatorId,
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

  getInvestigatorProtocol(investigatorId, sponsor) {
    return this.http.post<ProtocolSite[]>(
      this.url + "/investigatorProtocol",
      {
        protocolSiteId: investigatorId,
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
