import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Banda } from '../models/Banda';
import { Observable, Subject } from 'rxjs';
import { BandasMasContratosActivosDTO } from '../models/BandasMasContratosActivosDTO';
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

  checkNombreUnico(nombre: string) {
    return this.http.get<boolean>(`${this.url}/exists/${nombre}`);
  }

  getBandasMasContratosActivos(): Observable<BandasMasContratosActivosDTO[]> {
    return this.http.get<BandasMasContratosActivosDTO[]>(
      `${this.url}/BandasMasContratosActivos`
    );
  }

}
