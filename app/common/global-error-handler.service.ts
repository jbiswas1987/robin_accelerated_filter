import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { ErrorService } from "./error/custom.error.service";
import { LoggingService } from "./error/error.logging.service";
import { NotificationService } from "./error/error.notification.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);
    const date = new Date().toISOString();
    // let message;
    // let stackTrace;
    // let errorType;
    if (error instanceof HttpErrorResponse) {
      //NOTE: Server Errors are being logged inside of InterceptorService handler
    } else {
      // Client side Error
      let message = errorService.getClientMessage(error);
      let stackTrace = errorService.getClientStack(error);
      let errorType = "client_side_error";
      //TODO: Show error popup
      //notifier.showError(message);
      logger.logErrorClientSideOnly(errorType, date, message, stackTrace);
    }
  }
}
