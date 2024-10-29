import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Rol } from '../models/Rol';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url=`${base_url}/roles`
  private listacambio= new Subject<Rol[]>()

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Rol[]>(this.url)
  }

  insert(r:Rol){
    return this.http.post(this.url, r)
  }

  setlist(listanueva:Rol[]){
    this.listacambio.next(listanueva)
  }

  getlist(){
    return this.listacambio.asObservable()
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  listId(id:number){
    return this.http.get<Rol>(`${this.url}/${id}`)
  }

}
