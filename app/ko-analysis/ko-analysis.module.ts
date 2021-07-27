import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KoAnalysisHomeComponent } from './ko-analysis-home/ko-analysis-home.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { GridModule, PipeModule } from "ng2-qgrid";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { KoAnalysisStackComponent } from './ko-analysis-stack/ko-analysis-stack.component';
import { DemoMaterialModule } from "../material.module";
import { ThemeModule } from "ng2-qgrid/theme/material";
import { NgxEchartsModule } from "ngx-echarts";
import { KoAnalysisLineComponent } from './ko-analysis-line/ko-analysis-line.component';
import { KoAnalysisMainComponent } from './ko-analysis-main/ko-analysis-main.component';
import { KoDemandComponent } from './ko-demand/ko-demand.component';
import { KoDemandMainComponent } from './ko-demand-main/ko-demand-main.component';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FilterPipe } from './filter.pipe';
import { KoAnalysisDrawerComponent } from './ko-analysis-drawer/ko-analysis-drawer.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [KoAnalysisHomeComponent, KoAnalysisStackComponent, KoAnalysisLineComponent, KoAnalysisMainComponent, KoDemandComponent, KoDemandMainComponent, FilterPipe, KoAnalysisDrawerComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),GridModule, PipeModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    ThemeModule,
    NgxEchartsModule,
    NgMultiSelectDropDownModule
  ],
  exports:[KoAnalysisHomeComponent]
})
export class KoAnalysisModule { }
