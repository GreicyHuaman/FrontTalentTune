import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/Categoria';
import { Subject } from 'rxjs';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url=`${base_url}/categorias`
  private listacambio= new Subject<Categoria[]>()

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Categoria[]>(this.url)
  }

  insert(c:Categoria){
    return this.http.post(this.url, c)
  }

  setlist(listanueva:Categoria[]){
    this.listacambio.next(listanueva)
  }

  getlist(){
    return this.listacambio.asObservable()
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  listId(id:number){
    return this.http.get<Categoria>(`${this.url}/${id}`)
  }
}

