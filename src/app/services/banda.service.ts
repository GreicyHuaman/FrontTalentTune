import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Banda } from '../models/Banda';
import { Subject } from 'rxjs';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class BandaService {
  private url=`${base_url}/bandas`
  private listacambio= new Subject<Banda[]>()

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Banda[]>(this.url)
  }

  insert(ba:Banda){
    return this.http.post(this.url, ba)
  }

  setlist(listanueva:Banda[]){
    this.listacambio.next(listanueva)
  }

  getlist(){
    return this.listacambio.asObservable()
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  listId(id:number){
    return this.http.get<Banda>(`${this.url}/${id}`)
  }

}