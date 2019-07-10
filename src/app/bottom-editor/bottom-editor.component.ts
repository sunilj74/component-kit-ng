import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material";
import { CODEPATHS } from '../app.constants';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: "bottom-editor",
  templateUrl: "./bottom-editor.component.html",
  styleUrls: ["./bottom-editor.component.css"]
})
export class BottomEditorComponent implements OnInit {
  title: string = "";
  file: string = "";
  files: any[] = [];
  code$: Observable<any>;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private data: any, private bottomPopup: MatBottomSheetRef<BottomEditorComponent>, private appService: AppService) {}

  ngOnInit() {
    this.getCodes();
  }

  getCodes(){
    let codePath = CODEPATHS.find(p=>p.name==this.data);
    if(codePath!=null){
      this.title = codePath.title;
      this.files = codePath.paths.map(p=>{
        let parts = p.split("/");
        let name = parts[parts.length-1];
        let exts = name.split(".");
        let ext = exts[exts.length-1];
        let lang = ext;
        if("ts"==ext){
          lang = "typescript";
        }
        return {
          fileName: parts[parts.length - 1],
          extension: ext,
          language: lang
        };
      });
      this.file = null;
      if(this.files.length>0){
        this.file = this.files.find(p=>p.extension=="html");
        if(this.file==null){
          this.file=this.files[0];
        }
      }
      console.log("files", this.files);
      this.code$ = this.appService.fetchCodes(codePath.paths);
    }
  }

  selectFileName(f) {
    this.file = f;
  }

}
