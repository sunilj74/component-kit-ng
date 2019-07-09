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
      return of(data);
  }

  getFifaData() : TreeNodeType {
    let root:TreeNodeType = {
        groupKey: "FIFA World Cup 2018",
        subGroups: []
    };
    let groups = FIFA18
                    .tables
                    .map(p=>p.group)
                    .filter((p,i,a)=>a.indexOf(p)===i);
    groups.forEach(p=>{
        let groupMatches = null;

        let groupResults = FIFA18
            .results
            .find(x => x.group == p);
        if(groupResults!=null){
            groupMatches = groupResults
                .matches
                .map(x => { 
                    let aclass = "draw", bclass = "draw";
                    if(x.a.goals>x.b.goals){
                        aclass = "winner";
                        bclass = "loser";
                    }
                    if (x.b.goals > x.a.goals) {
                        bclass = "winner";
                        aclass = "loser";
                    }


                    return { 
                        groupKey: `${x.a.team} ${x.a.goals}-${x.b.goals} ${x.b.team}`,
                        extras: {
                            ateam: x.a.team,
                            aclass: aclass,
                            bteam: x.b.team,
                            bclass: bclass,
                            score: `${x.a.goals}-${x.b.goals}`
                        }
                    }; 
                });
        }

        let node:TreeNodeType = {
            groupKey: `GROUP ${p}`,
            textClass: "my-tree-group my-tree-group-"+p.toLowerCase(),
            isClosed: "A"!=p,
            subGroups: groupMatches,
            data: [FIFA18.tables.filter(q=>{ 
                return q.group==p;
            })]
        }
        root.subGroups.push(node);
    });
    return root;
  }

}
