import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  mydata: any[];

  constructor() { 
    this.fillData();
  }

  ngOnInit() {
  }

  fillData() {
    this.mydata = [
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      },
      {
        name: "Neymar",
        team: "PSG",
        country: "Brazil",
        position: "Striker"
      },
      {
        name: "Messi",
        team: "Barcelona",
        country: "Argentina",
        position: "Striker"
      },
      {
        name: "Ronaldo",
        team: "Juventus",
        country: "Portugal",
        position: "Striker"
      },
      {
        name: "Alison",
        team: "Liverpool",
        country: "Brazil",
        position: "Goalie"
      }
    ];
  }

}
