import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import { DataTableKitModule } from 'data-table-kit';
import { DataTreeKitModule } from 'data-tree-kit';
import { PanelKitModule } from "panel-kit";


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
import { LargeTableComponent } from './large-table/large-table.component';
import { BottomEditorComponent } from './bottom-editor/bottom-editor.component';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';
import { environment } from "../environments/environment";
import { EditInlineComponent } from './edit-inline/edit-inline.component';
import { EditFullTableComponent } from './edit-full-table/edit-full-table.component';
import { EditPopupComponent } from './edit-popup/edit-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DatatableComponent,
    TreeComponent,
    OrderstableComponent,
    CountryTableComponent,
    TreeTableComponent,
    BasicTreeComponent,
    LargeTableComponent,
    BottomEditorComponent,
    MonacoEditorComponent,
    EditInlineComponent,
    EditFullTableComponent,
    EditPopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    SharedModule,
    HttpClientModule,
    DataTableKitModule,
    DataTreeKitModule,
    PanelKitModule
  ],
  entryComponents: [
    BottomEditorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
