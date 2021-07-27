/* importing modules */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoMaterialModule } from "../material.module";
import { NgxEchartsModule } from "ngx-echarts";
import { GridModule, PipeModule } from "ng2-qgrid";
import { ThemeModule } from "ng2-qgrid/theme/material";
import { SiteRoutingModule } from "./site-routing.module";
import { MccKpiModule } from "../common/mcc-kpi/mcc-kpi.module";
import { DashboardModule } from "../dashboard/dashboard.module";
/* importing components */
import { SiteComponent } from "./site.component";
import { SiteInfoComponent } from "./site-info/site-info.component";
import { SiteProtocolComponent } from "./site-protocol/site-protocol.component";
import { SiteMccComponent } from "./site-mcc/site-mcc.component";
import { MccSiteDetailsComponent } from "./site-mcc/mcc-site-details/mcc-site-details.component";

@NgModule({
  declarations: [
    SiteComponent,
    SiteInfoComponent,
    SiteProtocolComponent,
    SiteMccComponent,
    MccSiteDetailsComponent,
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    DemoMaterialModule,
    NgxEchartsModule,
    GridModule,
    PipeModule,
    ThemeModule,
    MccKpiModule,
    DashboardModule,
  ],
  exports: [
    SiteComponent,
    SiteInfoComponent,
    SiteProtocolComponent,
    SiteMccComponent,
    MccSiteDetailsComponent,
  ],
})
export class SiteModule {}
