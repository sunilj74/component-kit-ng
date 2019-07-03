import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatBottomSheetModule, MatIconModule } from '@angular/material';
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
    MatIconModule
  ]
})
export class SharedModule {}
