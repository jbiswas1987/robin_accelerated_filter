import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MccComponent } from "./mcc.component";
import { NgxEchartsModule } from "ngx-echarts";
import { MccProtocolListComponent } from "./mcc-protocol-list/mcc-protocol-list.component";
import { DemoMaterialModule } from "../material.module";
import { GridModule, PipeModule } from "ng2-qgrid";
import { ThemeModule } from "ng2-qgrid/theme/material";
import { MccRoutingModule } from "./mcc-routing.module";
import { AgGridModule } from '@ag-grid-community/angular';

@NgModule({
  declarations: [MccComponent, MccProtocolListComponent],
  imports: [
    CommonModule,
    MccRoutingModule,
    NgxEchartsModule,
    DemoMaterialModule,
    GridModule,
    PipeModule,
    ThemeModule,
    AgGridModule.withComponents([]),
  ],
  exports: [MccComponent,MccProtocolListComponent],
})
export class MccModule {}
