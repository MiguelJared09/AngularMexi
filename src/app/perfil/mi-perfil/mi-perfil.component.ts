import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiExperienciaLaboral } from 'src/app/api/api-experiencialaboral.serrvice';
import { ApiOfertasLaborales } from 'src/app/api/api-ofertaslaborales.services';
import { ApiDetalleService } from 'src/app/api/api-detalle.service';
import { getCache } from 'src/app/shared/extensions/cache';
import { ExperienciaLaboral } from 'src/app/shared/models/experiencialaboral.models';
import { OfertasLaborales } from 'src/app/shared/models/ofertaslaborales.models';
import { ServiceModel } from 'src/app/shared/models/servicios.models';
import { UsuarioDetalle} from 'src/app/shared/models/usuarios.model';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';
import { OfertasLaboralesCapturaComponent } from './ofertas-laborales/ofertas-laborales-captura/ofertas-laborales-captura.component';
import { RegistrodetalleComponent } from './registrodetalle/registrodetalle.component';
import { PublicarvacanteComponent } from './publicarvacante/publicarvacante.component';
import { ApiService } from 'src/app/api/api-servicios.service';
import { OutputService } from 'src/app/shared/services/output.service';
import { timestamp } from 'rxjs/operators';
import { Postulaciones } from 'src/app/shared/models/usuarios.model';
import { misPostulaciones} from 'src/app/shared/models/usuarios.model';
import { solicitudes } from 'src/app/shared/models/servicios.models';
@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  
  constructor(
    private dialog: MatDialog,
    private api: ApiExperienciaLaboral,
    private apiOfertas: ApiOfertasLaborales,
    private apiDetalle: ApiDetalleService,
    private apiService: ApiService,
    private output: OutputService,
  ) {
    this.iduser = 0;
    this.tipoUser = 0;
    this.Status = 0;
  }
  
  listServicios: ExperienciaLaboral[] = [];
  listOfertasLaborales: OfertasLaborales[] = [];
  listServiciosuser: ServiceModel[]=[];
  listDetalle: UsuarioDetalle[] = [];
  listPost: Postulaciones[]= [];
  lisSolicitudes: solicitudes[] = [];
  listMisPostulaciones: misPostulaciones [] = [];
  
  name: string = "";
  iduser: number;
  tipoUser: number;
  Status: number;
  code: string  = "";
  nombre: string = "nombre completo usuario";
  sexo: string = "genero";
  edad: string = "edad";
  direccion_corta: string = "dirección corta";
  ngOnInit(): void {
    var user = getCache('usr');
    this.verificarOnline();
    this.name = user.name;
    this.iduser = user.id;
    this.tipoUser = user.intIdTipoUsuario;
    this.code = user.code;
    console.log('tipouser',this.tipoUser);
    console.log(this.code);
    if (this.tipoUser == 2) {
      this.getMisSolicitudes();
      this.getServicios();
      this.getMisPostulaciones();
      this.getDetalleUsuario();
      // this.getPostulaciones();
      this.output.outputParams.subscribe(data =>{
        this.Status = data;
        })
    }
    if (this.tipoUser >= 3) {
      this.getOfertasLaborales();
      this.getDetalleUsuario();
      this.output.outputParams.subscribe(data =>{
        this.Status = data;
        })
    }
  }

  /*Registro detalle user*/
  CompletarRegistro() {
    this.dialog.open(RegistrodetalleComponent, {
      width: '900px',
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (this.tipoUser == 2) {
        this.getDetalleUsuario();
      }
      if (this.tipoUser >= 3) {
        this.getOfertasLaborales();
      }
    });
  }
  ModificarRegistro(){

  }
  /* Sincrona */
  agregar() {
    this.dialog.open(ExperienciaLaboralComponent, {
      width: '500px',
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (this.tipoUser == 2) {
        this.getServicios();
        this.getMisSolicitudes();
        
      }
      if (this.tipoUser >= 3) {
        this.getOfertasLaborales();
      }
    });
  }
  /* asincrona */
  PublicarVacante() {
    this.dialog.open(PublicarvacanteComponent, {
      width: '50%',
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (this.tipoUser == 2) {
        this.getServicios();
        this.getMisSolicitudes();
      }
      if (this.tipoUser >= 3 ) {
        this.getOfertasLaborales();
      }
    });
  }
  verificarOnline(){
    if(navigator.onLine){
      console.log('conneccion')
    }
    else{

    }console.log('fuera de linea')
  }
  /* Asincrona */
  // async getExperienciaLaboral() {
  //   var res = await this.api.getExperienciaLaboral(this.iduser);
  //   if (res.result) {
  //     this.listExperienciaLaboral = res.data;
  //     console.log(res);
  //   }
  // }
  async getServicios() {
    var res = await this.apiService.GetServicios(this.iduser);
    if (res.result) {
      this.listServicios = res.data;
      console.log(res);
    }
  }

  async getMisPostulaciones(){
    var res = await this.apiOfertas.GetPostulaciones(0,this.iduser)
    if(res.result){
      this.listPost = res.data;
      console.log(res)
    }
  }

  async getMisSolicitudes(){
    var res = await this.apiService.getMisSolicitudes(this.iduser)
    if(res.result){
      this.lisSolicitudes = res.data;
    }
    
  }
  /**/
  // async getPostulaciones(){
  //   var res = await this.apiService.GetPostulaciones(this.iduser);
  //   if(res.result){
  //     this.listPost = res.data;
  //     console.log(res);
  //   }
  // }
  /* Asincrona*/

  async getDetalleUsuario(){
    var detalle = await this.apiDetalle.getDetalle(this.iduser);
  
    if(detalle.result){
       this.listDetalle = detalle.data;
       console.log(detalle);
    }
 }
 async Eliminar(experiencia: ExperienciaLaboral){
  console.log(experiencia.intIdServicio);
 }
 async Detalle(solicitudes: solicitudes){
  console.log(solicitudes.idUserEmpleador);
 }  
  async getOfertasLaborales() {
    var ofertas = await this.apiOfertas.getOfertasLaborales(this.iduser);
    if (ofertas.result) {
      this.listOfertasLaborales = ofertas.data;
      
      console.log(ofertas);
    }
  }

  /* Sincrona */
  agregarOferta() {
    this.dialog.open(OfertasLaboralesCapturaComponent, {
      width: '500px',
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (this.tipoUser == 2) {
        this.getServicios();
      }
      if (this.tipoUser == 3) {
        this.getOfertasLaborales();
      }
    });
  }
}