import { Banda } from "./Banda";
import { Categoria } from "./Categoria";
import { Usuario } from "./Usuario";

export class Contenido {
  idContenido: number = 0;
  titulo: string = '';
  contenido: string = '';
  fechaPublicacion: Date = new Date();
  likes: boolean = false;
  idUsuario: Usuario= new Usuario();
  idCategoria: Categoria = new Categoria();
  idBanda: Banda = new Banda();
}
  