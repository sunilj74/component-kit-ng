import { Component, OnInit } from '@angular/core';

@Component({
  selector: "edit-inline",
  templateUrl: "./edit-inline.component.html",
  styleUrls: ["./edit-inline.component.css"]
})
export class EditInlineComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}
}
