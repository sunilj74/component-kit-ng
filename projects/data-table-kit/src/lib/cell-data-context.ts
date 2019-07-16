export class CellDataContext {
    constructor(private data: any, private editing: boolean, private rowIndex: number) {
    }

    update(edit){
        this.editing = edit;
    }
}
