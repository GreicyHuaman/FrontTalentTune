import { Banda } from "./Banda"
import { Usuario } from "./Usuario"

export class Contrato{
    idContrato:number=0
    fechaInicio:Date= new Date()
    fechaFin:Date= new Date()
    salario:number=0.0
    estado:string=""
    condiciones:string=""
    manager: Usuario = new Usuario();
    talento: Usuario | null = null; // Puede ser un Usuario o null
    banda: Banda | null = null;    // Puede ser una Banda o null
}