import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url=`${base_url}/usuarios`

  private listaCambio=new Subject<Usuario[]>();

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

}
