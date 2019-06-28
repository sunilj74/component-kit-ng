import { NgModule } from '@angular/core';
import { DataTreeKitComponent } from './data-tree-kit.component';
import { BrowserModule } from '@angular/platform-browser';
import { DataTreeCellComponent } from './data-tree-cell/data-tree-cell.component';
import { DataTreeTemplateDirective } from './data-tree-template.directive';

@NgModule({
  declarations: [DataTreeKitComponent, DataTreeCellComponent, DataTreeTemplateDirective],
  imports: [
    BrowserModule
  ],
  exports: [
    DataTreeKitComponent,
    DataTreeCellComponent,
    DataTreeTemplateDirective
  ]
})
export class DataTreeKitModule { }
