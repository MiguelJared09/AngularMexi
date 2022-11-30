import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AjaxService } from '../shared/services/ajax.service';
import { Result } from '../shared/models/result.model';
import { Usuario } from '../shared/models/usuarios.model';


@Injectable({
    providedIn: 'root'
})
export class ApiBuzonService {

    url = environment.api + '/Admin';

    constructor(private ajax: AjaxService) {

    }


   
}
