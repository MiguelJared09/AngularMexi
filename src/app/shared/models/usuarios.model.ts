export class Usuario {
    public intIdUsuario: number = 0;
    public varUsuario: string = '';
    public varPassword: string = '';
    public varEmail: string = '';
    public intIdRol: number = 0;
    public bitSatutus: boolean = false;
}
export class UsuarioDetalle{
    public intIdDetalle: number =0;
    public intIdUser: number =0;
    public varNombre: string ='';
    public varAPatern: string ='';
    public varAMatern: string ='';
    public dtFechaNac: Date = new Date;
    public dtFechaFund: Date = new Date;
    public varCurp: string ='';
    public varRfc: string ='';
    public intgenero: number =0;
    public varCp: string ='';
    public varEstado: string ='';
    public varMunicipio: string ='';
    public varCalle: string ='';
    public varColonia: string ='';
    public varReferencia: string ='';
    public varNoint: string ='';
    public varNoExterior: string ='';
    public varNoTelefono: string ='';
    public varNoTelfR1: string ='';
    public varNoTelfR2: string ='';
    public varRazonSocial: string ='';
    public intStatus: number =0;
}
export class Postulaciones {
    public intId: number =0;
    public intIdOfertaLaboral: number = 0;
    public intIdUser: number = 0;
    public userName: string = '';
    public varNombre: string = '';
    public disponibilidad: number = 0;
    public varPuesto: string = '';
    public dtFechaPostulacion: Date = new Date; 
    public varMunicipio: string = '';
}
export class misPostulaciones{
    public intIdOfertaLaboral: number= 0;
    public intIdEmpresa: number = 0;
    public varPuesto: string = '';
    public varDescripcion: string ='';
    public varUbicacion: string ='';
    public decSalario: number = 0;
    public intEstatus: number = 0;
    public dtFechaRegistro: Date = new Date;
    public intTurno: number = 0;
    public varRequisitos: string = '';
    public dtFechaVigencia: Date = new Date;
    public intTipoTrabajo: number = 0;
}
export class UsuarioConsulta extends Usuario {
    public varRol: string = '';
    public bitEsAdmin: boolean = false;
}

export class FiltroUsuario {
    public usuario: string = '';
    public estatus: number = 0;
}
export class cuentas{
    public id: number = 0;
    public userName: string = '';
    public email: string ='';
    public intIdTipoUsuario: number = 0;
    public code: string ='';
}