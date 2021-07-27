import { Injectable, Inject, inject } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError, empty } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { ErrorDialogComponent } from "./error/error-dialog";
import { DOCUMENT } from "@angular/common";
import { LoggingService } from "./error/error.logging.service";
import { ErrorService } from "./error/custom.error.service";
import { EMPTY } from "rxjs";
import { LoaderService } from "../common/loader.service";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  public isDialogOpen: Boolean = false;
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private logger: LoggingService,
    private errorService: ErrorService,
    public loaderService: LoaderService,
    @Inject(DOCUMENT) document: any
  ) {}

  openDialog(): any {
    if (this.isDialogOpen) {
      //console.log(url);
      return false;
    } else {
      //console.log("outside if", url);
      this.isDialogOpen = true;

      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        disableClose: true,
        data: { message: "", header: "" },
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log("The dialog was closed");
        this.isDialogOpen = false;
      });
    }
  }

  handleError(error: HttpErrorResponse, reqBody: any) {
    let message = this.errorService.getServerMessage(error);
    let stackTrace = this.errorService.getServerStack(error, reqBody);
    //Checking if the API is server side logging to avoid unnecessary logging loop
    if (error.url.indexOf("logerror") != -1) {
      this.logger.logErrorClientSideOnly(
        "server_side_error",
        new Date().toISOString(),
        message,
        stackTrace
      );
    } else {
      this.logger.logError(
        "server_side_error",
        new Date().toISOString(),
        message,
        stackTrace
      );
    }

    //if the status in UnAuthorised show a pop-up with relevant message
    if (error.status === 401) {
      this.openDialog();
    }
    //this.loaderService.hide();
    //return empty();
    return throwError(error);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let reqNew = req.clone({
      url: document.location.href.startsWith("http://", 0)
        ? req.url.replace("https://", "http://")
        : req.url,
    });
    //this.loaderService.show();
    return next
      .handle(reqNew)
      .pipe(catchError((err) => this.handleError(err, reqNew.body)));
  }
}
