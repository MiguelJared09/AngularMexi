export class ServiceModel{
    public intIdServicio: number = 0;
    public intIdUser: number = 0;
    public varNombreTrabahjo: string ='';
    public varDescripcion: string = '';
    public varHabilidades: string ='';
    public varHorario: string ='';
    public decSalario: number = 0;
    public intStatus: number = 1;
    public intTipoTrabajo: number = 1;
    
}
export class ServiceResult extends ServiceModel {
    public varNombre: string = '';
    public varAPatern: string = '';
    public varAMatern: string = ''
    public mostrar: boolean = false;
}

export class postulacionModel{
    public intId: number = 0;
    public intIdOfertaLab: number = 0;
    public intIdUser: number = 0;
    public dtFechaPostulacion: Date = new Date;
    
}
export class solicitudes{
    public solicitud: number = 0;
    public Servicio: number = 0;
    public trabajo: string = '';
    public idUserEmpleado: number = 0;
    public idUserEmpleador: number = 0;
    public nombreEmpresa: string = '';
    public nombreResponsable: string = '';
    public genero: number = 0;
    public ubicacion: string = '';
}