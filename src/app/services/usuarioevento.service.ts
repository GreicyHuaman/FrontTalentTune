import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { UsuarioEvento } from '../models/UsuarioEvento';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioeventoService {
  private url = `${base_url}/usuarioseventos`;
  private listaCambio = new Subject<UsuarioEvento[]>();

  constructor(private http: HttpClient) {}
 
  list() {
    return this.http.get<UsuarioEvento[]>(this.url);
  }

  insert(ue: UsuarioEvento) {
    return this.http.post(this.url, ue);
  }

  setlist(listaNueva: UsuarioEvento[]) {
    this.listaCambio.next(listaNueva);
  }

  getlist() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<UsuarioEvento>(`${this.url}/${id}`);
  }

  update(ue: UsuarioEvento) {
    return this.http.patch(this.url, ue);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
