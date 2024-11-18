import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcontenidoComponent } from "./listarcontenido/listarcontenido.component";

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [RouterOutlet, ListarcontenidoComponent],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})
export class ContenidoComponent {
  constructor(public route:ActivatedRoute){}

}
