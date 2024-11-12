import { Banda } from "./Banda";
import { Usuario } from "./Usuario";

export class ParticipacionBanda {
    idUsuarioBanda: number = 0;
    fechaIngreso: Date = new Date();
    fechaSalida: Date = new Date();
    rol: string = '';
    usuario: Usuario = new Usuario();
    banda: Banda = new Banda();
  }