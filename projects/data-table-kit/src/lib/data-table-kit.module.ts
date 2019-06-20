import { NgModule } from '@angular/core';
import { DataTableKitComponent } from './data-table-kit.component';
import { DataTableCellComponent } from './data-table-cell/data-table-cell.component';
import { DataTableFloatComponent } from './data-table-float/data-table-float.component';
import { DataTableChildDirective } from './data-table-child.directive';
import { DataTableColumnDirective } from './data-table-column.directive';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [DataTableKitComponent, DataTableCellComponent, DataTableFloatComponent, DataTableChildDirective, DataTableColumnDirective],
  imports: [
    BrowserModule
  ],
  exports: [
    DataTableKitComponent,
    DataTableFloatComponent,
    DataTableChildDirective,
    DataTableColumnDirective
  ]
})
export class DataTableKitModule { }
