import { Usuario } from './Usuario';

export class Evento {
  idEvento: number = 0;
  nombre: string = '';
  fecha: Date = new Date(Date.now());
  tipo: string = '';
  duracion: number = 0;
  descripcion: string = '';
  usuario: Usuario = new Usuario();
}
