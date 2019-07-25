import { NgModule } from '@angular/core';
import { SplitPanelComponent } from './split-panel/split-panel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SplitPanelComponent],
  imports: [CommonModule],
  exports: [SplitPanelComponent]
})
export class PanelKitModule {}
