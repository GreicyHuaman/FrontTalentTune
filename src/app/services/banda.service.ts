import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Banda } from '../models/Banda';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class BandaService {
  private url=`${base_url}/bandas`

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Banda[]>(this.url)
  }
}
