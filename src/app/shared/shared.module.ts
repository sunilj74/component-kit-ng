import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatBottomSheetModule, MatIconModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatIconModule,
    MatSelectModule,
    MatButtonToggleModule
  ]
})
export class SharedModule {}
