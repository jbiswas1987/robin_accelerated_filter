import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { onErrorResumeNext } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return "No Internet Connection";
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string {
    return error.stack;
  }

  getServerMessage(error: HttpErrorResponse): string {
    return error.message;
  }

  getServerStack(error: HttpErrorResponse, reqBody: any): string {
    // handling stack trace
    let sessionID = localStorage.getItem("sessionID");
    let xsrfToken = localStorage.getItem("XSRFToken");
    const httpserverStackTrace: JSON = <JSON>(<unknown>{
      url: error.url,
      statuscode: error.status,
      message: error.message,
      error: error.error,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "J-SESSIONID": sessionID,
        "XSRF-TOKEN": xsrfToken,
      },
      body: reqBody,
    });
    return JSON.stringify(httpserverStackTrace);
  }
}
