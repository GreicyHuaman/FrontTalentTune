import { Component } from '@angular/core';
import { ListarnotificacionComponent } from "./listarnotificacion/listarnotificacion.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [ListarnotificacionComponent, RouterOutlet],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent {
  constructor(public route:ActivatedRoute){}

}
