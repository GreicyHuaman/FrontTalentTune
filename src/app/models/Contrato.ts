import { Banda } from "./Banda"
import { Usuario } from "./Usuario"

export class Contrato{
    idContrato:number=0
    fechaInicio:Date= new Date()
    fechaFin:Date= new Date()
    salario:number=0.0
    estado:string=""
    condiciones:string=""
    usuario: Usuario = new Usuario();
    banda: Banda = new Banda();
}