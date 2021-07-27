import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DemoMaterialModule } from "./material.module";
import { NgxEchartsModule } from "ngx-echarts";
import { GridModule, PipeModule } from "ng2-qgrid";
import { ThemeModule } from "ng2-qgrid/theme/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { ProtocolMccMetricsComponent } from "./protocol/protocol-mcc-metrics/protocol-mcc-metrics.component";
import { ProtocolMccMetricsDetailsComponent } from "./protocol/protocol-mcc-metrics/protocol-mcc-metrics-details/protocol-mcc-metrics-details.component";
import { SiteMccMetricsDetailsComponent } from "./protocol/protocol-mcc-metrics/site-mcc-metrics-details/site-mcc-metrics-details.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import{ForCastDashboardModule} from './forcast-dashboard/forcast-dashboard.module'
import {KoAnalysisModule} from '../app/ko-analysis/ko-analysis.module'
import {KoSupplierModule} from '../app/ko-supplier/ko-supplier.module'
import { ProtocolModule } from "./protocol/protocol.module";
import { SiteModule } from "./site/site.module";
import { MccKpiModule } from "./common/mcc-kpi/mcc-kpi.module";
import { MccModule } from "./mcc/mcc.module";
import { DataService } from "src/app/common/data.service";
import { LoginComponent } from "../app/login/login.component";
import { HeaderComponent } from "../app/header/header.component";
import { ReactiveFormsModule } from "@angular/forms";
//import { TreeModule } from 'primeng/tree';
import { AuthGuard } from "./auth/auth.guard";
import { AuthenticationService } from "./auth/auth.service";
import { DialogOverviewExampleDialog } from "../app/common/dialog-overview";
import {DialogSessionComponent} from '../app/common/dialog-session/dialog-session.component'
import{InfoDetailsComponent} from '../app/common/info-details/info-details.component'
import { InterceptorService } from "./common/interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorDialogComponent } from "./common/error/error-dialog";
import { GlobalErrorHandlerService } from "./common/global-error-handler.service";
import { LoaderService } from "./common/loader.service";
import { SignInComponent } from "./signin/signin.component";
import { AlertComponent } from "./_components/alert.component";
import { MainComponent } from "./main/main.component";
import { AgmCoreModule } from "@agm/core";
import { AgmJsMarkerClustererModule } from "@agm/js-marker-clusterer";
import { ConfirmationDialogComponent } from "../app/common/confirmation-dialog/confirmation-dialog.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingComponent } from "../app/loading/loading.component";
import { InvestigatorInformation } from "./InvestigatorInfo/investigatorInformation.component";
import {ProtocolDetailsComponent} from '../app/protocol-details/protocol-details.component'
import { ProtocolsInfoComponent } from '../app/protocol/protocols-info/protocols-info.component';
import {
  MatSort, MatTable, MatTableModule, MatTabHeader,
  MatHeaderRow, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef,
  MatSortHeader, MatRow, MatRowDef,  MatCell, MatCellDef, MatTableDataSource
} from '@angular/material';
import {HomeComponent} from '../../src/app/home/home.component';
import { HeaderBreadCrumbComponent } from './header-bread-crumb/header-bread-crumb.component'
// import {ForcastDashboardComponent} from '../app/forcast-dashboard/forcast-dashboard.component'

import { NgxSliderModule } from '@angular-slider/ngx-slider';
// import { AgGridModule } from '@ag-grid-community/angular';

// import { AgGridModule } from 'ag-grid-angular';

import { AgGridModule } from '@ag-grid-community/angular';
// import { ModalModule } from './modal/modal.module';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; 
import { GoogleChartsModule } from 'angular-google-charts';
import {ExcelService} from '../../src/app/forcast-dashboard/excel.service'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ErrorDialogComponent,
    SignInComponent,
    AlertComponent,
    MainComponent,
    ConfirmationDialogComponent,
    LoadingComponent,
    InvestigatorInformation,
    ProtocolDetailsComponent,
    ProtocolsInfoComponent,
    HomeComponent,
    HeaderBreadCrumbComponent,
    DialogSessionComponent,
    InfoDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    NgxEchartsModule,
    GridModule,
    PipeModule,
    ThemeModule,
    DashboardModule,
    ForCastDashboardModule,
    KoAnalysisModule,
    KoSupplierModule,
    ProtocolModule,
    SiteModule,
    MccKpiModule,
    MccModule,
    FormsModule,
    ReactiveFormsModule,
    AgmJsMarkerClustererModule,
    NgxSpinnerModule,
    MatTableModule,
    NgxSliderModule,
    AgGridModule.withComponents([]),
    NgIdleKeepaliveModule.forRoot(),
    GoogleChartsModule,
    NgMultiSelectDropDownModule,
    // ModalModule
    PdfViewerModule,
    AutocompleteLibModule,
    MatProgressSpinnerModule
  ],
  exports: [ErrorDialogComponent, NgxSpinnerModule,MatTableModule,NgxSliderModule],
  providers: [
    DataService,
    AuthGuard,
    AuthenticationService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    ExcelService
    // { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    DialogOverviewExampleDialog,
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    DialogSessionComponent,
    InfoDetailsComponent
  ],
})
export class AppModule {}
