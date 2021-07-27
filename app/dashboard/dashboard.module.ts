/* importing modules */
import { NgModule, ErrorHandler } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GridModule, PipeModule } from "ng2-qgrid";
import { ThemeModule } from "ng2-qgrid/theme/material";
import { NgxEchartsModule } from "ngx-echarts";
import { MccKpiModule } from "../common/mcc-kpi/mcc-kpi.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MccModule } from "../mcc/mcc.module";
import { DemoMaterialModule } from "../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
/* importing components */
import { DashboardComponent } from "./dashboard.component";
import { DashboardGroupsComponent } from "./dashboard-groups/dashboard-groups.component";
import { DashboardMetricsComponent } from "./dashboard-metrics/dashboard-metrics.component";
import { DashboardSiteTableComponent } from "./dashboard-metrics/dashboard-site-table/dashboard-site-table.component";
import { ProtocolSiteSunComponent } from "./dashboard-metrics/protocol-site-sun/protocol-site-sun.component";
import { DashboardProtocolMetricsComponent } from "./dashboard-protocol-metrics/dashboard-protocol-metrics.component";
import { AllKpiComponent } from "./dashboard-protocol-metrics/all-kpi/all-kpi.component";
import { DashboardMccMetricsDetailsComponent } from "./dashboard-mcc-metrics-details/dashboard-mcc-metrics-details.component";
/* importing services */
import { GlobalErrorHandlerService } from "../common/global-error-handler.service";
import { SiteDetailsComponent } from './site-details/site-details.component';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { NgxSpinnerModule } from 'ngx-spinner';
import {LoadingComponent} from '../../app/loading/loading.component';
import { ChartDistributionComponent } from './chart-distribution/chart-distribution.component';
import { ProtocolKitsInKitsOutComponent } from './protocol-kits-in-kits-out/protocol-kits-in-kits-out.component';
import { CountryKitsInkitsOutComponent } from './country-kits-inkits-out/country-kits-inkits-out.component';
import { ProtocolKitsInKitsOutScatterComponent } from './protocol-kits-in-kits-out-scatter/protocol-kits-in-kits-out-scatter.component';
// import { KitsBreakDownComponent } from './kits-break-down/kits-break-down.component';
import { OverviewKitsInKitsOutComponent } from './overview-kits-in-kits-out/overview-kits-in-kits-out.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngb-modal';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardGroupsComponent,
    DashboardMetricsComponent,
    DashboardSiteTableComponent,
    ProtocolSiteSunComponent,
    DashboardProtocolMetricsComponent,
    AllKpiComponent,
    DashboardMccMetricsDetailsComponent,
    SiteDetailsComponent,
    ChartDistributionComponent,
    ProtocolKitsInKitsOutComponent,
    CountryKitsInkitsOutComponent,
    ProtocolKitsInKitsOutScatterComponent,
    // KitsBreakDownComponent,
    OverviewKitsInKitsOutComponent,
    
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DemoMaterialModule,
    GridModule,
    PipeModule,
    ThemeModule,
    NgxEchartsModule,
    MccKpiModule,
    MccModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyCdQ4DWXDqVYARo8KHf9IrM87s8hLVkWoA'
    }),
    AgmJsMarkerClustererModule,
    NgxSpinnerModule,
    PdfViewerModule,
    ModalModule
  ],
  exports: [
    DashboardComponent,
    DashboardGroupsComponent,
    DashboardMetricsComponent,
    DashboardSiteTableComponent,
    ProtocolSiteSunComponent,
    DashboardProtocolMetricsComponent,
    AllKpiComponent,
    NgxSpinnerModule,
    // KitsBreakDownComponent
  ],
  //providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandlerService }],
})
export class DashboardModule {}
