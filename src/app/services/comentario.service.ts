import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comentario } from '../models/Comentario';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url=`${base_url}/comentarios`
  private listacambio= new Subject<Comentario[]>()

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Comentario[]>(this.url)
  }

  insert(c:Comentario){
    return this.http.post(this.url, c)
  }

  setlist(listanueva:Comentario[]){
    this.listacambio.next(listanueva)
  }

  getlist(){
    return this.listacambio.asObservable()
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  listId(id:number){
    return this.http.get<Comentario>(`${this.url}/${id}`)
  }
}
