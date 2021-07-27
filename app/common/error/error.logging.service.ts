import { Injectable } from "@angular/core";
import { DashboardService } from "src/app/dashboard/dashboard.service";

@Injectable({
  providedIn: "root",
})
export class LoggingService {
  constructor(private dashService: DashboardService) {}

  logError(
    errHandler: string,
    err_date: string,
    message: string,
    stack: string
  ) {
    let userName = localStorage.getItem("UserName");
    this.dashService
      .uiErrorLog(err_date, message, stack, userName)
      .then((res) => {
        console.log("Error log saved successfully");
      })
      .catch((err) => console.log("Unable to save error log to the server"))
      .finally(() => {
        //TODO: Add logging based on environment
        console.warn("error caught");
        console.log(errHandler + " - LoggingService: " + err_date, message);
      });
  }

  logErrorClientSideOnly(
    errHandler: string,
    err_date: string,
    message: string,
    stack: string
  ) {
    //TODO: Add logging based on environment
    console.warn("error caught");
    console.log(errHandler + " - LoggingService: " + err_date, message, stack);
  }
}
