import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthsForwardComponent } from '../ko-supplier/months-forward/months-forward.component';
import { ProductDemandComponent } from '../ko-supplier/product-demand/product-demand.component';
import {KoSupplierHomeComponent} from '../ko-supplier/ko-supplier-home/ko-supplier-home.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { GridModule, PipeModule } from "ng2-qgrid";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DemoMaterialModule } from "../material.module";
import { ThemeModule } from "ng2-qgrid/theme/material";
import { NgxEchartsModule } from "ngx-echarts";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {ProductLevelComponent} from '../ko-supplier/product-level/product-level.component'
import { BrowserModule } from '@angular/platform-browser';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


@NgModule({
  declarations: [MonthsForwardComponent, ProductDemandComponent,KoSupplierHomeComponent,ProductLevelComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),GridModule, PipeModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    ThemeModule,
    NgxEchartsModule,
    BrowserModule,
    NgMultiSelectDropDownModule,
    AutocompleteLibModule

  ],
  exports:[KoSupplierHomeComponent]
})
export class KoSupplierModule { }
