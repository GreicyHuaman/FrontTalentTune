import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Evento } from '../models/Evento';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private url = `${base_url}/eventos`;
  private listaCambio = new Subject<Evento[]>();

  constructor(private http: HttpClient) {}
 
  list() {
    return this.http.get<Evento[]>(this.url);
  }

  insert(eve: Evento) {
    return this.http.post(this.url,eve);
  }

  setlist(listaNueva: Evento[]) {
    this.listaCambio.next(listaNueva);
  }

  getlist() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Evento>(`${this.url}/${id}`);
  }

  update(eve: Evento) {
    return this.http.patch(this.url,eve);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
}
