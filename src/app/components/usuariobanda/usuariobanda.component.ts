import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuariobandaComponent } from "./listarusuariobanda/listarusuariobanda.component";

@Component({
  selector: 'app-usuariobanda',
  standalone: true,
  imports: [RouterOutlet, ListarusuariobandaComponent],
  templateUrl: './usuariobanda.component.html',
  styleUrl: './usuariobanda.component.css'
})
export class UsuariobandaComponent {
  constructor(public route:ActivatedRoute){}
}
