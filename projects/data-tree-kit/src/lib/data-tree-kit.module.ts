import { NgModule } from '@angular/core';
import { DataTreeKitComponent } from './data-tree-kit.component';
//import { BrowserModule } from '@angular/platform-browser';
import { DataTreeCellComponent } from './data-tree-cell/data-tree-cell.component';
import { DataTreeTemplateDirective } from './data-tree-template.directive';
import { DataTreeHeaderTemplateDirective } from './data-tree-header-template.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DataTreeKitComponent, DataTreeCellComponent, DataTreeTemplateDirective, DataTreeHeaderTemplateDirective],
  imports: [
    //BrowserModule,
    CommonModule
  ],
  exports: [
    DataTreeKitComponent,
    DataTreeCellComponent,
    DataTreeTemplateDirective,
    DataTreeHeaderTemplateDirective
  ]
})
export class DataTreeKitModule { }
