export class Usuario {
  idUsuario: number = 0;
  username: string = '';
  password: string = '';
  nombres: string = '';
  apellidos: string = '';
  fechaNacimiento: Date = new Date();
  descripcion: string = '';
  pais: string = '';
  agencia: string = '';
  sexo: string = '';
  estudios: string = '';
  enabled: boolean = true;
}
