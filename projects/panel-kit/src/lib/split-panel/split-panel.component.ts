import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "split-panel",
  templateUrl: "./split-panel.component.html",
  styleUrls: ["./split-panel.component.css"]
})
export class SplitPanelComponent implements OnInit, OnChanges {
  @ViewChild("firstpane", { static: false }) firstPane: ElementRef;
  @Input("vertical") vertical: boolean = false;
  @Input("allow-resize") allowResize: boolean = true;
  @Input("allow-collapse-first") allowCollapseFirst: boolean = true;
  @Input("allow-collapse-second") allowCollapseSecond: boolean = true;
  @Input("first-panel-size") firstPanelSize: string = "";
  @Input("second-panel-size") secondPanelSize: string = "";

  styleFirst = null;
  styleSecond = null;

  collapsed = 0;
  resizeInfo: any = null;

  ngOnInit() {
    this.updatePanelStyles();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes != null) {
      if (
        changes["vertical"] != null ||
        changes["firstPanelSize"] ||
        changes["secondPanelSize"]
      ) {
        this.updatePanelStyles();
      }
    }
  }

  updatePanelStyles(){
    let widthFirst = "50%";
    let heightFirst = "50%";
    let flexFirst = null;
    let widthSecond = null;
    let heightSecond = null;
    let flexSecond = "1";
    let displayFirst = null;
    let displaySecond = null;

    if(this.vertical){
      widthFirst = "100%";
      widthSecond = "100%";
        if (this.firstPanelSize !== "") {
          heightFirst = this.firstPanelSize;
        }
        else if (this.secondPanelSize !== "") {
          heightSecond = this.secondPanelSize;
          flexFirst = "1";
          flexSecond = null;
        }
    }
    else{
      heightFirst = "100%";
      heightSecond = "100%";
        if (this.firstPanelSize !== "") {
          widthFirst = this.firstPanelSize;
        }
        else if (this.secondPanelSize !== "") {
          widthSecond = this.secondPanelSize;
          flexFirst = "1";
          flexSecond = null;
        }
    }

    if(this.collapsed==1){
      flexFirst = null;
      flexSecond = "1";
      displayFirst = "none";
    }
    else if(this.collapsed==2){
      flexFirst = "1";
      flexSecond = null;
      displaySecond = "none";
    }

    if(this.collapsed!=0){
      if (this.vertical) {
        heightFirst = null;
        heightSecond = null;
      }
      else {
        widthFirst = null;
        widthSecond = null;
      }

    }

    this.styleFirst = {
      width: widthFirst,
      height: heightFirst,
      flex: flexFirst,
      display: displayFirst
    };
    this.styleSecond = {
      width: widthSecond,
      height: heightSecond,
      flex: flexSecond,
      display: displaySecond
    };
  }

  toggleCollapse(event, isFirst) {
    if (this.collapsed != 0) {
      this.collapsed = 0;
    } 
    else {
      this.collapsed = isFirst ? 1 : 2;
    }
    this.updatePanelStyles();
  }

  resizeStart(event) {
    if (!this.allowResize) {
      return;
    }
    if (this.collapsed != 0) {
      return;
    }
    let pos = event.pageX;
    if (this.vertical) {
      pos = event.pageY;
    }
    this.resizeInfo = {
      position: pos
    };
  }

  resizeEnd(event) {
    if (!this.allowResize) {
      return;
    }
    this.resize(event);
    this.resizeInfo = null;
  }

  resize(event) {
    if (
      !this.allowResize ||
      this.resizeInfo == null ||
      this.firstPane == null
    ) {
      return;
    }
    let nativeElement = this.firstPane.nativeElement;
    let pos = event.pageX;
    if (this.vertical) {
      pos = event.pageY;
    }
    let delta = this.resizeInfo.position - pos;
    if (this.vertical) {
      let height = nativeElement.offsetHeight - delta;
      if (height > 0) {
        this.resizeInfo.position = pos;
        nativeElement.style.height = height + "px";
      }
    } else {
      let width = nativeElement.offsetWidth - delta;
      if (width > 0) {
        this.resizeInfo.position = pos;
        nativeElement.style.width = width + "px";
      }
    }
    event.preventDefault();
  }
}
