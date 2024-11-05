import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Mensaje } from '../models/Mensaje';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private url=`${base_url}/mensajes`
  private listacambio= new Subject<Mensaje[]>()

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Mensaje[]>(this.url)
  }

  insert(me:Mensaje){
    return this.http.post(this.url, me)
  }

  setlist(listanueva:Mensaje[]){
    this.listacambio.next(listanueva)
  }

  getlist(){
    return this.listacambio.asObservable()
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  listId(id:number){
    return this.http.get<Mensaje>(`${this.url}/${id}`)
  }

}
