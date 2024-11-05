import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmensajeComponent } from "./listarmensaje/listarmensaje.component";

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [RouterOutlet, ListarmensajeComponent],
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css'
})
export class MensajeComponent {
  constructor(public route:ActivatedRoute){}

}
