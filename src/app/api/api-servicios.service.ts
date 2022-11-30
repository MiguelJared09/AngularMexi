import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AjaxService } from '../shared/services/ajax.service';
import { Postulaciones } from '../shared/models/usuarios.model';
import { ServiceModel } from '../shared/models/servicios.models';
import { postulacionModel} from '../shared/models/servicios.models';
@Injectable({
    providedIn: 'root'
})
export class ApiService {

    url = environment.api + '/Empleados/';

    constructor(private ajax: AjaxService) {

    }

    async GetServicios(id: number): Promise<any> {
        let res: any;
        try {
            res = this.ajax.get(this.url + id);
        }
        catch (e: any) {
            res = e;
        }
        return res;
    }
    async createService(model: ServiceModel): Promise<any> {

        let res: any;
        try {
            res = this.ajax.post(this.url + 'Crear', model);
        }
        catch (e: any) {
            res
        }
        return res;
    }
    //Task for search Oferta Laboral by name
    async getServiciosBusqueda(value: string, id: string, genero: string): Promise<any> {
        let res: any;

        if (value == '')
            value = '-1';
        
        try {
            res = this.ajax.get(this.url + 'Busqueda/' + value +"?"+ "id="+ id + "&"+ "genero=" + genero);
        }
        catch (e: any) {
            res = e;
        }
        return res;
    }
    async CreatePostulacion(model: postulacionModel): Promise<any> {

        let res: any;
        try {
            res = this.ajax.post(this.url + 'Postulacion', model);
        }
        catch (e: any) {
            res
        }
        return res;
    }
    async GetPostulaciones(id: number): Promise<any> {
        let res: any;
        try {
            res = this.ajax.get(this.url + 'Postulacion/'+id);
        }
        catch (e: any) {
            res = e;
        }
        return res;
    }
    async getMisSolicitudes(id: number): Promise<any> {
        let res: any;

        if (id == null)
            id = 0;
        
        try {
            res = this.ajax.get(this.url + 'MisSolicitudes/'+id );
        }
        catch (e: any) {
            res = e;
        }
        return res;
    }
}