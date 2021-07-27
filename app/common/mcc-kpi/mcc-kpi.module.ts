import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MccKpiComponent } from './mcc-kpi.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { MccKpiRoutingModule } from './mcc-kpi-routing.module';

@NgModule({
  declarations: [
    MccKpiComponent
  ],
  imports: [
    CommonModule,
    MccKpiRoutingModule,
    NgxEchartsModule
  ],
  exports: [
    MccKpiComponent
  ],
})
export class MccKpiModule { }
