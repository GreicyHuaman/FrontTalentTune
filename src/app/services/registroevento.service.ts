import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegistroEvento } from '../models/RegistroEvento';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RegistroeventoService {
  private url = `${base_url}/usuarioseventos`;
  private listaCambio = new Subject<RegistroEvento[]>();

  constructor(private http: HttpClient) {}
 
  list() {
    return this.http.get<RegistroEvento[]>(this.url);
  }

  insert(revento: RegistroEvento) {
    return this.http.post(this.url, revento);
  }

  setlist(listaNueva: RegistroEvento[]) {
    this.listaCambio.next(listaNueva);
  }

  getlist() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<RegistroEvento>(`${this.url}/${id}`);
  }

  update(revento: RegistroEvento) {
    return this.http.put(this.url, revento);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
}
