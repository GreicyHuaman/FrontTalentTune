import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcontratoComponent } from "./listarcontrato/listarcontrato.component";

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [RouterOutlet, ListarcontratoComponent],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent {
  constructor(public route:ActivatedRoute){}

}
