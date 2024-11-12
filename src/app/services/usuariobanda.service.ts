import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { UsuarioBanda } from '../models/UsuarioBanda';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuariobandaService {
  private url = `${base_url}/usuariosbandas`;
  private listaCambio = new Subject<UsuarioBanda[]>();

  constructor(private http: HttpClient) {}
 
  list() {
    return this.http.get<UsuarioBanda[]>(this.url);
  }

  insert(ub: UsuarioBanda) {
    return this.http.post(this.url, ub);
  }

  setlist(listaNueva: UsuarioBanda[]) {
    this.listaCambio.next(listaNueva);
  }

  getlist() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<UsuarioBanda>(`${this.url}/${id}`);
  }

  update(ub: UsuarioBanda) {
    return this.http.patch(this.url, ub);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
