/* importing modules */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoMaterialModule } from "../material.module";
import { NgxEchartsModule } from "ngx-echarts";
import { GridModule, PipeModule } from "ng2-qgrid";
import { ThemeModule } from "ng2-qgrid/theme/material";
import { ProtocolRoutingModule } from "./protocol-routing.module";
import { MccModule } from "../mcc/mcc.module";
import { MccKpiModule } from "../common/mcc-kpi/mcc-kpi.module";
/* importing components */
import { ProtocolComponent } from "./protocol.component";
import { ProtocolInfoComponent } from "./protocol-info/protocol-info.component";
import { ProtocolMetricsComponent } from "./protocol-metrics/protocol-metrics.component";
import { PerformanceChartComponent } from "./protocol-metrics/performance-chart/performance-chart.component";
import { ProtocolSitePatientComponent } from "./protocol-site-patient/protocol-site-patient.component";
import { PatientBreakdownComponent } from "./protocol-site-patient/patient-breakdown/patient-breakdown.component";
import { SiteBreakdownComponent } from "./protocol-site-patient/site-breakdown/site-breakdown.component";
import { VisitBreakdownComponent } from "./protocol-site-patient/visit-breakdown/visit-breakdown.component";
import { SiteDetailsComponent } from "./site-details/site-details.component";
import { ProtocolMccMetricsComponent } from "./protocol-mcc-metrics/protocol-mcc-metrics.component";
import { ProtocolMccMetricsDetailsComponent } from "./protocol-mcc-metrics/protocol-mcc-metrics-details/protocol-mcc-metrics-details.component";
import { SiteMccMetricsDetailsComponent } from "./protocol-mcc-metrics/site-mcc-metrics-details/site-mcc-metrics-details.component";
import { DialogOverviewExampleDialog } from "../common/dialog-overview";
import { KitsInOutComponent } from './kits-in-out/kits-in-out.component';
import { FanchartKitsINComponent } from './fanchart-kits-in/fanchart-kits-in.component';
import { FanchartKitsOutComponent } from './fanchart-kits-out/fanchart-kits-out.component';
// import { ProtocolsInfoComponent } from './protocols-info/protocols-info.component';
// import {ProtocolsInfoComponent} from '../protocol/protocols-info/protocols-info.component'
@NgModule({
  declarations: [
    ProtocolComponent,
    ProtocolInfoComponent,
    DialogOverviewExampleDialog,
    ProtocolMetricsComponent,
    PerformanceChartComponent,
    ProtocolSitePatientComponent,
    PatientBreakdownComponent,
    SiteBreakdownComponent,
    VisitBreakdownComponent,
    SiteDetailsComponent,
    ProtocolMccMetricsComponent,
    ProtocolMccMetricsDetailsComponent,
    SiteMccMetricsDetailsComponent,
    KitsInOutComponent,
    FanchartKitsINComponent,
    FanchartKitsOutComponent,
    // ProtocolsInfoComponent,
  ],
  imports: [
    CommonModule,
    ProtocolRoutingModule,
    DemoMaterialModule,
    NgxEchartsModule,
    GridModule,
    PipeModule,
    ThemeModule,
    MccKpiModule,
    MccModule,
  ],
  exports: [
    ProtocolComponent,
    ProtocolInfoComponent,
    DialogOverviewExampleDialog,
    ProtocolMetricsComponent,
    PerformanceChartComponent,
    ProtocolSitePatientComponent,
    PatientBreakdownComponent,
    SiteBreakdownComponent,
    VisitBreakdownComponent,
    SiteDetailsComponent,
    ProtocolMccMetricsComponent,
    KitsInOutComponent
  ],
  entryComponents: [DialogOverviewExampleDialog],
})
export class ProtocolModule {}
