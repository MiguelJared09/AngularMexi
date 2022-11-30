import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.css']
})
export class SuscripcionComponent implements OnInit {
  public payPalConfig: any;
  data :any;
  constructor() { }
  ngOnInit() {
    this.payPalConfig = {
    }
  }
}
