import { Evento } from './Evento';
import { Usuario } from './Usuario';

export class UsuarioEvento {
  idUsuarioEvento: number = 0;
  interesado: any; //boolean
  asistio: any; //boolean
  calificacion: number = 0;
  usuario: Usuario = new Usuario();
  evento: Evento = new Evento();
}
