import { Injectable } from "@angular/core";
import {
  ProtocolInfo,
  Breakdown,
  BreakdownInt,
  SiteDetails,
  ProtocolPerformanceLevelData,
} from "src/app/common/common";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProtocolService {
  private url = "https://qa.pharmacuity.healthcare/RobinAPI";

  constructor(private http: HttpClient) {}

  getProtocolInfo(protocolId: string, sponsor: string) {
    return this.http.post<ProtocolInfo>(
      this.url + "/protocolInfo",
      {
        protocolId: protocolId,
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

  getSiteBreakDown(protocolId: string, sponsor: string) {
    return this.http.post<Breakdown[]>(
      this.url + "/siteBreakDown",
      {
        protocolId: protocolId,
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
  getPatientBreakDown(protocolId: string, sponsor: string) {
    return this.http.post<Breakdown[]>(
      this.url + "/patientBreakDown",
      {
        protocolId: protocolId,
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
  getVisitBreakDown(protocolId: string, sponsor: string) {
    return this.http.post<Breakdown[]>(
      this.url + "/visitBreakDown",
      {
        protocolId: protocolId,
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
  getEnrollmentTarget(protocolId, sponsor) {
    return this.http.post<BreakdownInt>(
      this.url + "/enrollmentTarget",
      {
        protocolId: protocolId,
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

  getSiteDetails(protocolId, sponsor) {
    return this.http.post<SiteDetails[]>(
      this.url + "/siteDetails",
      {
        protocolId: protocolId,
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

  getProtocolPerformance(
    protocol: string,
    enrollmentTarget: number,
    type: string,
    sponsor: string
  ) {
    let protocolarr = [protocol];
    if (type == "PF-Site First Kit Sent") {
      return this.getPFSA(protocolarr, enrollmentTarget, sponsor);
    } else {
      return this.getPFLPI(protocolarr, enrollmentTarget, sponsor);
    }
  }

  getPFSA(protocolId, enrollmentTarget, sponsor) {
    return this.http.post<ProtocolPerformanceLevelData[]>(
      this.url + "/protocolPerformance",
      {
        protocols: protocolId,
        kpi: "PFFKS",
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

  getPFLPI(protocolId, enrollmentTarget, sponsor) {
    return this.http.post<ProtocolPerformanceLevelData[]>(
      this.url + "/protocolPerformance",
      {
        protocols: protocolId,
        kpi: "PFPI",
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
