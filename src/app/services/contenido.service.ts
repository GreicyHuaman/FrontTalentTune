import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Contenido } from '../models/Contenido';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {
  private url = `${base_url}/contenidos`;
  private listaCambio = new Subject<Contenido[]>();

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Contenido[]>(this.url);
  }

  insert(contenido: Contenido) {
    return this.httpClient.post(this.url, contenido);
  }

  setList(listaNueva: Contenido[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.httpClient.get<Contenido>(`${this.url}/${id}`);
  }

  update(contenido: Contenido) {
    return this.httpClient.patch(this.url, contenido);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

}
