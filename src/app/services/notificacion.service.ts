import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Notificacion } from '../models/Notificacion';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private url=`${base_url}/notificaciones`
  private listacambio= new Subject<Notificacion[]>()

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Notificacion[]>(this.url)
  }

  insert(noti:Notificacion){
    return this.http.post(this.url, noti)
  }

  setlist(listanueva:Notificacion[]){
    this.listacambio.next(listanueva)
  }

  getlist(){
    return this.listacambio.asObservable()
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  listId(id:number){
    return this.http.get<Notificacion>(`${this.url}/${id}`)
  }
}
