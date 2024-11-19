import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Observable, Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url=`${base_url}/usuarios`

  private listaCambio=new Subject<Usuario[]>();
  
  private sortList(list: Usuario[]): Usuario[] {
    return list.sort((a, b) => a.idUsuario- b.idUsuario);
  }

  constructor(private http:HttpClient) { }
  
  list(){
    return this.http.get<Usuario[]>(this.url)
  }

  insert(us:Usuario){
    return this.http.post(this.url,us);
  }

  setlist(listaNueva:Usuario[]){
    this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  listId(id:number){
    return this.http.get<Usuario>(`${this.url}/${id}`)
  }

  update(usu:Usuario){
    return this.http.patch(this.url,usu);
  }

  checkNombreUnico(nombre: string) {
    return this.http.get<boolean>(`${this.url}/exists/${nombre}`);
  }

  encontrarUltimoUsuario(): Observable<number> {
    return this.http.get<number>(`${this.url}/ultimoUsuario`);
  }

}
