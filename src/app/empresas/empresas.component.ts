import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiOfertasLaborales } from '../api/api-ofertaslaborales.services';
import { getCache } from '../shared/extensions/cache';
import { OfertasLaboralesResult } from '../shared/models/ofertaslaborales.models';
import { IdentityService } from 'src/app/shared/services/identity.service';
import { ApiService } from '../api/api-servicios.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
interface Options {
  id: number;
  viewValue: string;
}

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  logged = false;
  iduser : any;
  validate: number= 0;
  options: Options[] = [
    {id: 0, viewValue: 'Todos'},
    {id: 1, viewValue: 'Oficio'},
    {id: 2, viewValue: 'Profesion'},
  ];
  form = new FormGroup({
    varCargo:  new FormControl('', [Validators.max(15)]),
    intTipoTrabajo: new FormControl(this.options[0].id)
  });
  mostrartrabajos: boolean;
  listOfertasLaborales: OfertasLaboralesResult[] = [];
  constructor(
    private api: ApiOfertasLaborales,
    private identityService: IdentityService,
    private empleados: ApiService,
    private notify: NotificationService
  ) {
    this.mostrartrabajos = true;
  }
  postulacion = new FormGroup({
    intId: new FormControl(),
    intIdOfertaLab: new FormControl(),
    intIdUser: new FormControl(),
    dtFechaPostulacion: new FormControl()
  });

  ngOnInit(): void {
    this.getOfertas();
    this.identityService.notify().subscribe(async logged => {
      this.logged = logged;
      if (this.logged) {
        this.iduser = this.identityService.getData() || {};
        this.validate = 1;
      }
      else{
        this.validate = 0;
      }
    });

    var user = getCache('usr');
    if (user == undefined) {
      this.mostrartrabajos = true;
    }
    
    else {
      if (user.intIdTipoUsuario == 2) {
        this.mostrartrabajos = true;
      }
      else {
        this.mostrartrabajos = false;
      }
    }
  }
  onChange(value: number){
    this.form.value.intTipoServicio = value;
  }
  mostrarDetalle(oferta: OfertasLaboralesResult) {
    oferta.mostrar = !oferta.mostrar;
  }

  async getOfertas() {
    var ofertas = await this.api.getOfertasLaboralesBusqueda(this.form.value.varCargo, this.form.value.intTipoTrabajo);
    if (ofertas.result) {
      this.listOfertasLaborales = ofertas.data;
    }
    if(this.listOfertasLaborales ==null){
      this.notify.showInfo("Has perdido la coneccion a internet, intenta mas tarde");
    }
  }
  async postular(oferta: OfertasLaboralesResult){
    console.log("id oferta laboral",oferta.intIdOfertaLaboral);
    console.log("cache ",this.iduser.id);
    this.postulacion.get('intId')?.setValue(0);
    this.postulacion.get('intIdOfertaLab')?.setValue(oferta.intIdOfertaLaboral);
    this.postulacion.get('intIdUser')?.setValue(this.iduser.id);
    this.postulacion.get('dtFechaPostulacion')?.setValue('2022-11-28T01:01:44.671Z');
    console.log(this.postulacion.value);
    var res = await this.empleados.CreatePostulacion(this.postulacion.value);
      if(res.result)
      {
        this.notify.showSuccess("Postulacion Exitosa");
      }
      else{
        this.notify.showError("Ah ocurrido un error")
      }
  }
  consultar()
  {
    this.getOfertas();
    console.log(this.getOfertas());
  }

}
