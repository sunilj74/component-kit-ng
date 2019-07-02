import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TreeNodeType, toTreeData } from "data-tree-kit";
import { FILES, FIFA18 } from './mockdata';

@Injectable({
  providedIn: 'root'
})
export class DataForTreeService {

  constructor() { }

  fetchFolders(): Observable<TreeNodeType> {
    let data = this.getTreeData();
    console.log("tree data is", data);
    return of(data);
  }
 
  getTreeData() : TreeNodeType {
    let treeNodeRoot = toTreeData(FILES, (node,file,idx,arr)=>{
        node.groupKey = file.Name;
        node.extras = file;
        node.isClosed = true;
        if(!file.IsFolder){
            if(file.Name.endsWith(".ts")){
                node.iconClass = "tree-leaf-icon-ts";
            }
            else if (file.Name.endsWith(".js")) {
                node.iconClass = "tree-leaf-icon-js";
            }
            else if (file.Name.endsWith(".css")) {
                node.iconClass = "tree-leaf-icon-css";
            }
            else if (file.Name.endsWith(".json")) {
                node.iconClass = "tree-leaf-icon-json";
            }
            else if (file.Name.endsWith(".html")) {
                node.iconClass = "tree-leaf-icon-html";
            }
            else{
                node.iconClass = "tree-leaf-icon-doc";
            }
            node.iconClass = "tree-leaf-icon "+node.iconClass;
        }
        node.data = [
            "abc",
            "xyz"
        ];
        let paths = [];
        let dirName = file.DirectoryName;
        if(dirName==null||dirName.length==0){
            let dirTemp = file.FullName.split("/");
            dirTemp.pop();
            dirName = dirTemp.join("/");
        }
        if(dirName!=null&&dirName.length>0){
            paths = dirName.split("/");
        }
        return paths;
    })
    return treeNodeRoot;
  }

  fetchFifaData(): Observable<TreeNodeType> {
      let data = this.getFifaData();
      console.log("fifa data is", data);
      return of(data);
  }

  getFifaData() : TreeNodeType {
    let root:TreeNodeType = {
        groupKey: "FIFA World Cup 2018",
        subGroups: []
    };
    let groups = FIFA18
                    .map(p=>p.group)
                    .filter((p,i,a)=>a.indexOf(p)===i);
    groups.forEach(p=>{
        let node:TreeNodeType = {
            groupKey: `Group ${p}`,
            isClosed: "A"!=p,
            data: [FIFA18.filter(q=>{ 
                return q.group==p;
            })]
        }
        root.subGroups.push(node);
    });
    return root;
  }

}
