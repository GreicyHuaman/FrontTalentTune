import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarregistroeventoComponent } from './listarregistroevento/listarregistroevento.component';

@Component({
  selector: 'app-registroevento',
  standalone: true,
  imports: [RouterOutlet, ListarregistroeventoComponent],
  templateUrl: './registroevento.component.html',
  styleUrl: './registroevento.component.css'
})
export class RegistroeventoComponent {
  constructor(public route:ActivatedRoute){ }
}
