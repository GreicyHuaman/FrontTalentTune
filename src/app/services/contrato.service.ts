import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Contrato } from '../models/Contrato';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private url=`${base_url}/contratos`
  private listacambio= new Subject<Contrato[]>()

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Contrato[]>(this.url)
  }

  insert(c:Contrato){
    return this.http.post(this.url, c)
  }

  setlist(listanueva:Contrato[]){
    this.listacambio.next(listanueva)
  }

  getlist(){
    return this.listacambio.asObservable()
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  listId(id:number){
    return this.http.get<Contrato>(`${this.url}/${id}`)
  }

  update(c:Contrato){
    return this.http.patch(this.url,c);
  }

}
