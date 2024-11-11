import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListareventoComponent } from './listarevento/listarevento.component';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [RouterOutlet, ListareventoComponent ],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent {
  constructor(public route:ActivatedRoute){ }
}
