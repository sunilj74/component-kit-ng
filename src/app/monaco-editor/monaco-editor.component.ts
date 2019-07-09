import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: "monaco-editor",
  templateUrl: "./monaco-editor.component.html",
  styleUrls: ["./monaco-editor.component.css"]
})
export class MonacoEditorComponent implements OnInit, OnChanges {
  editorOptions = {
    theme: "vs-dark",
    language: "javascript",
    minimap: {
      enabled: false
    },
    fontSize: "20px",
    scrollBeyondLastLine: false,
    scrollBeyondLastColumn: false,
    quickSuggestions: false,
    readOnly: false
  };

  @Input() codes: any = [];
  @Input() file: any;
  code: string = "";
  editor: any;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges){
    if(changes!=null&&(changes["codes"]||changes["file"])){
      this.updateFileCode();
    }
  }

  updateFileCode(){
    if (this.codes != null && this.file != null) {
      this.editorOptions = {
        ...this.editorOptions,
        language: this.file.language
      }
      let fileCode = this.codes.find(p => p.name == this.file.fileName);
      if (fileCode != null) {
        this.code = fileCode.content;
      }
      else {
        this.code = "";
      }
    }
  }

  editorInitialized(e){
    let windowMonaco = (<any>window).monaco.languages;
    if(windowMonaco!=null){
      if(windowMonaco.typescript!=null){
        windowMonaco.typescript.typescriptDefaults.setCompilerOptions({
          noLib: false,
          allowNonTsExtensions: true
        });
      }
    }
    this.editor = e;
  }

  handleCopy(event){
    if(this.editor!=null){
      let model = this.editor.getModel();
      if(model!=null){
        let range = model.getFullModelRange();
        if(range!=null){
          let oldRange = this.editor.getSelection();
          this.editor.setSelection(range);
          this.editor.trigger("", "editor.action.clipboardCopyAction");
          if(oldRange!=null){
            this.editor.setSelection(oldRange);
          }
        }
      }
    }
  }
}
