import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiOfertasLaborales } from 'src/app/api/api-ofertaslaborales.services';
import { getCache } from 'src/app/shared/extensions/cache';
import { NotificationService } from 'src/app/shared/services/notification.service';
interface Tipo {
  id: number,
  viewValue: string;
};
interface Areas {
  id: number,
  viewValue: string;
}
@Component({
  selector: 'app-ofertas-laborales-captura',
  templateUrl: './ofertas-laborales-captura.component.html',
  styleUrls: ['./ofertas-laborales-captura.component.css']
})
export class OfertasLaboralesCapturaComponent implements OnInit {
tipo : Tipo []=[ 
  {id: 1, viewValue: 'Oficio' },
  {id: 2, viewValue: 'Profesional' },
];
areas: Areas [] = [
  {id: 0, viewValue: 'Administrativo - Contabilidad - Finanzas'},   
  {id: 1, viewValue: 'Manufactura - Producción - Operación'},
  {id: 2, viewValue: 'Servicios Generales - Oficios - Seguridad'},
  {id: 3, viewValue: 'Atencion a Clientes '},
  {id: 4, viewValue: 'Tecnologias de la Informacion - Sistemas'},
  {id: 5, viewValue: 'Deportes - Salud - Belleza'},
  {id: 6, viewValue: 'Mercadotecnia - Relaciones Públicas - Comunicación'},
  {id: 7, viewValue: 'Educacion'},
  {id: 8, viewValue: 'Turismo - Hospitalidad - Gastronomía'},
  {id: 9, viewValue: 'Logistica - Transporte - Distribución - Almacén'},
  {id: 10, viewValue: 'Sector Salud'},
  {id: 11, viewValue: 'Veterinaria - Agricultura - Ganadería'},
  {id: 12, viewValue: 'Trabajadores Domesticos - Y cuidados del Hogar'},
];
  form: FormGroup;
  iduser: number;
  constructor(
    private dialogRef: MatDialogRef<OfertasLaboralesCapturaComponent>,
    private api: ApiOfertasLaborales,
    private notify: NotificationService
  ) {
    this.form = new FormGroup({
      intIdOfertaLaboral: new FormControl(0),
      intIdEmpresa: new FormControl(0),
      varPuesto: new FormControl('', Validators.required),
      varDescripcion: new FormControl('', Validators.required),
      varUbicacion: new FormControl('', Validators.required),
      decSalario: new FormControl(0, Validators.required),
      status: new FormControl(0),
      intTurno: new FormControl('', Validators.required),
      varRequisitos: new FormControl('', Validators.required),
      intTipoTrabajo: new FormControl(),
      intAreaTrabajo: new FormControl(this.areas[0].id)
    });

    this.iduser = 0;
  }

  ngOnInit(): void {
    var user = getCache('usr');
    this.iduser = user.id;
    this.getData();
  }
  onChange(value: number){
    this.form.value.intTipoTrabajo = value;
  }
  async getData() {
    var res = await this.api.getOfertasLaborales(this.iduser);
    if(res.result)
    {
      console.log(res);      
    }
  }

  async agregar() {


    this.form.get('intIdEmpresa')?.setValue(this.iduser);
    if (this.form.valid) {
      console.log(this.form.value);
      var res = await this.api.createOfertaLaboral(this.form.value);
      if(res.result)
      {
        this.notify.showSuccess("Registro Exitoso");
        this.cancelar();
      }
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

}
