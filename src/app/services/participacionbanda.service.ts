import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ParticipacionBanda } from '../models/ParticipacionBanda';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ParticipacionbandaService {
  private url = `${base_url}/usuariosbandas`;
  private listaCambio = new Subject<ParticipacionBanda[]>();

  constructor(private http: HttpClient) {}
 
  list() {
    return this.http.get<ParticipacionBanda[]>(this.url);
  }

  insert(pbanda: ParticipacionBanda) {
    return this.http.post(this.url, pbanda);
  }

  setlist(listaNueva: ParticipacionBanda[]) {
    this.listaCambio.next(listaNueva);
  }

  getlist() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<ParticipacionBanda>(`${this.url}/${id}`);
  }

  update(pbanda: ParticipacionBanda) {
    return this.http.put(this.url, pbanda);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
