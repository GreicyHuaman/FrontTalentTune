import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuarioeventoComponent } from "./listarusuarioevento/listarusuarioevento.component";

@Component({
  selector: 'app-usuarioevento',
  standalone: true,
  imports: [RouterOutlet, ListarusuarioeventoComponent],
  templateUrl: './usuarioevento.component.html',
  styleUrl: './usuarioevento.component.css'
})
export class UsuarioeventoComponent {
  constructor(public route:ActivatedRoute){}
}
