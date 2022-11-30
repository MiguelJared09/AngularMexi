import { getLocaleDateTimeFormat } from '@angular/common';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api-servicios.service';
import { getCache } from '../shared/extensions/cache';
import { ServiceModel, ServiceResult } from '../shared/models/servicios.models';
import { IdentityService } from 'src/app/shared/services/identity.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiOfertasLaborales } from '../api/api-ofertaslaborales.services';
import { SolicitarServicios } from '../shared/models/ofertaslaborales.models';
interface Options {
  id: number;
  viewValue: string;
}
interface Sex{
  id: number;
  viewValue: string;
}
@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})

export class PersonasComponent implements OnInit {
  logged = false;
  iduser : any;
  options: Options[] = [
    {id: 0, viewValue: 'Todos'},
    {id: 1, viewValue: 'Oficio'},
    {id: 2, viewValue: 'Profesion'},
  ];
  sexo: Sex[] =[
    {id: 0, viewValue: 'Todos'},
    {id: 1, viewValue: 'Masculino'},
    {id: 2, viewValue: 'Femenino'}
  ]
  form = new FormGroup({
    varNombreTrabahjo: new FormControl(''),
    intTipoTrabajo: new FormControl(this.options[0].id),
    intSexo: new FormControl(this.sexo[0].id) 
  });
  mostrarServicios: boolean;
  listServices: ServiceResult[]=[];
  constructor(
    private api: ApiService,
    private identityService: IdentityService,
    private notify: NotificationService,
    private solicitud: ApiOfertasLaborales
  ) { 
    this.mostrarServicios = true;
  }
  Solicitud = new FormGroup({
    intIdSolicitud: new FormControl(),
    intIdServicio: new FormControl(),
    intIdUsuario: new FormControl(),
  });
 
 

   
  ngOnInit(): void {
    this.identityService.notify().subscribe(async logged => {
      this.logged = logged;
      if (this.logged) {
        this.iduser = this.identityService.getData() || {};
        console.log('usuario',this.iduser.intIdTipoUsuario);
      }
    });
    
    this.getServicios();
    var user = getCache('usr');
    
    if(user == undefined){
      this.mostrarServicios = true;
    }
    else{
      if (user.intIdTipoUsuario ==2){
        this.mostrarServicios = true;
      }
      else{
        this.mostrarServicios = false;
      }
    }
    
  }
  onChange(value: number){
    this.form.value.intTipoServicio = value;
  }
  onChangeS(value: number){
    this.form.value.intSexo = value;
  }
  mostrarDetalle(servicio: ServiceResult){
    servicio.mostrar = !servicio.mostrar;
  }
  async getServicios() {
    var servicios = await this.api.getServiciosBusqueda(this.form.value.varNombreTrabahjo ,   this.form.value.intTipoTrabajo, this.form.value.intSexo);
    if (servicios.result) {
      this.listServices = servicios.data;
    }
    if(this.listServices == null || this.listServices == undefined){
      this.notify.showInfo("No hay Coneccion a internet");
    }
  }
  async SolcitarServicios(servicios: ServiceModel){
    console.log("IdServicio",servicios.intIdServicio);
    console.log("idUsuario",this.iduser.id);
    
    this.Solicitud.get('intIdSolicitud')?.setValue(0);
    this.Solicitud.get('intIdServicio')?.setValue(servicios.intIdServicio);
    this.Solicitud.get('intIdUsuario')?.setValue(this.iduser.id);
    var res: any = await this.solicitud.SolicitarServicio(this.Solicitud.value)
    if(res.result)
      {
        this.notify.showSuccess("Solicitud Exitosa");
      }
      else{
        this.notify.showError("Ah ocurrido un error")
      }
  }
  consultar()
  {
    this.getServicios();
  }
}
