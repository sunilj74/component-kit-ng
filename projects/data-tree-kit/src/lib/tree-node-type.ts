export interface TreeNodeType {
  groupKey: string;
  subGroups?: TreeNodeType[];
  data?: any[];
  isClosed?: boolean;
  extras?: any;
  iconClass?: string;
}

export function findNode(rootNode: TreeNodeType, paths: string[], create: boolean = false): TreeNodeType {
  if(rootNode!=null){
    if(rootNode.subGroups==null&&create){
      rootNode.subGroups = [];
    }
    let path = paths.shift();
    let subNode = rootNode.subGroups.find(p=>path==p.groupKey);
    if(subNode == null){
      if(create){
        subNode = {
          groupKey: path
        };
        rootNode.subGroups.push(subNode);
        let parentNode = subNode;
        while(paths.length>0){
          path = paths.shift();
          if(path!=null&&path.length>0){
            let tempNode = {
              groupKey: path,
            };
            if(parentNode.subGroups==null){
              parentNode.subGroups=[];
            }
            parentNode.subGroups.push(tempNode);
            parentNode = tempNode;
          }
        }
        return subNode;
      }
      else{
        return null;
      }
    }
    if(paths.length==0){
      return subNode;
    }
    else{
      return findNode(subNode, paths, create);
    }
  }
  return null;
}

export function toTreeData(data: any[], mapper: (n:TreeNodeType, p:any, i: number, arr: any[])=>string[]) : TreeNodeType {
    let treeNode:TreeNodeType = {
        groupKey: "root",
        subGroups: [],
        data: null,
        isClosed: true,
        extras: null
    };
    data.forEach((f,i,a)=>{
      let node: TreeNodeType = {
        groupKey: "",
        subGroups: [],
        data: null,
        isClosed: true,
        extras: null
      };
      let paths = mapper(node, f,i,a);
      if(node.groupKey==null||node.groupKey.length==0){
        throw "groupKey required for node";
      }
      paths.push(node.groupKey);
      let currentNode = findNode(treeNode, paths, true);
      currentNode.data = node.data;
      currentNode.extras = node.extras;
      currentNode.isClosed = node.isClosed;
      currentNode.iconClass = node.iconClass;
    });
    return treeNode;
}
