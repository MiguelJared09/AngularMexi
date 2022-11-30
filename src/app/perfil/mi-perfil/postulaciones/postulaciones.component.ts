import { Component, OnInit, Input } from '@angular/core';
import { Postulaciones } from 'src/app/shared/models/usuarios.model';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {
  @Input() dataPost = new Postulaciones();
  
  constructor() { }

  ngOnInit(): void {
  }

}
