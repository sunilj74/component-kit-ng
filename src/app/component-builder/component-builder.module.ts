import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableBuilderComponent } from './table-builder/table-builder.component';

import { DataTableKitModule } from "data-table-kit";
import { DataTreeKitModule } from "data-tree-kit";
import { PanelKitModule } from "panel-kit";
import { ColumnPropsComponent } from './column-props/column-props.component';
import { TablePropsComponent } from './table-props/table-props.component';
import { FormsModule } from '@angular/forms';
import { PropEditComponent } from './prop-edit/prop-edit.component';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: 'datatable',
    component: TableBuilderComponent
  }
];

@NgModule({
  declarations: [
    TableBuilderComponent, 
    ColumnPropsComponent, 
    TablePropsComponent, 
    PropEditComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTableKitModule,
    DataTreeKitModule,
    PanelKitModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ComponentBuilderModule { }
