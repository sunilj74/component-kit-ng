import { Component, OnInit } from '@angular/core';

@Component({
  selector: "edit-popup",
  templateUrl: "./edit-popup.component.html",
  styleUrls: ["./edit-popup.component.css"]
})
export class EditPopupComponent implements OnInit {
  employees: any[] = [
    {
      id: "000201-9001",
      firstname: "Michael",
      lastname: "Federer",
      position: "Manager",
      vacations: 20
    },
    {
      id: "000201-9002",
      firstname: "Leslie",
      lastname: "Jones",
      position: "CTO",
      vacations: 15
    },
    {
      id: "000201-9003",
      firstname: "George",
      lastname: "Han",
      position: "Sales Manager",
      vacations: 12
    },
    {
      id: "000201-9004",
      firstname: "Venus",
      lastname: "West",
      position: "Sales Executive",
      vacations: 11
    },
    {
      id: "000201-9005",
      firstname: "Patrick",
      lastname: "Veldman",
      position: "Intern",
      vacations: 5
    },
    {
      id: "000201-9006",
      firstname: "Boris",
      lastname: "Falls",
      position: "Manager",
      vacations: 20
    },
    {
      id: "000201-9007",
      firstname: "Mary",
      lastname: "Vickers",
      position: "Administrator",
      vacations: 15
    },
    {
      id: "000201-9008",
      firstname: "Robert",
      lastname: "Team",
      position: "Executive",
      vacations: 12
    },
    {
      id: "000201-9009",
      firstname: "Barbara",
      lastname: "Fischer",
      position: "Secretary",
      vacations: 19
    },
    {
      id: "000201-9010",
      firstname: "Jean",
      lastname: "Tapes",
      position: "Engineer",
      vacations: 17
    }
  ];
  currentRow: any = null;
  rowData: any = {};
  showModal: boolean = false;
  constructor() {}

  ngOnInit() {}

  editRow(event, row, rowno){
    this.currentRow = row;
    this.rowData = {...row};
    this.showModal = true;
  }

  deleteRow(event, row, rowno) {
    console.log(rowno, row);
    this.employees = this.employees.filter(
      (p,i,a)=>{
        return p!=row;
      });
  }

  apply(event){
    for(let prop in this.rowData){
      this.currentRow[prop]=this.rowData[prop];
    }
    this.rowData = {};
    this.currentRow = null;
    this.showModal = false;
    this.showModal = false;
  }

  discard(event) {
    this.rowData = {};
    this.currentRow = null;
    this.showModal = false;
  }

}
