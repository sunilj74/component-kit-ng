import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { DataTableKitModule } from 'data-table-kit';
import { DataTreeKitModule } from 'data-tree-kit';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule  } from "./shared/shared.module";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DatatableComponent } from './datatable/datatable.component';
import { TreeComponent } from './tree/tree.component';
import { OrderstableComponent } from './orderstable/orderstable.component';
import { CountryTableComponent } from './country-table/country-table.component';
import { TreeTableComponent } from './treetable/treetable.component';
import { BasicTreeComponent } from './basictree/basictree.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DatatableComponent,
    TreeComponent,
    OrderstableComponent,
    CountryTableComponent,
    TreeTableComponent,
    BasicTreeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    DataTableKitModule,
    DataTreeKitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
