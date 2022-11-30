import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.css']
})
export class PoliticasComponent implements OnInit {

  constructor(private _location: Location) { }
  goBack(){
    this._location.back();
  }
  ngOnInit(): void {
  }

}
