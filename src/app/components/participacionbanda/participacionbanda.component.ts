import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarparticipacionbandaComponent } from "./listarparticipacionbanda/listarparticipacionbanda.component";

@Component({
  selector: 'app-participacionbanda',
  standalone: true,
  imports: [RouterOutlet, ListarparticipacionbandaComponent],
  templateUrl: './participacionbanda.component.html',
  styleUrl: './participacionbanda.component.css'
})
export class ParticipacionbandaComponent {
  constructor(public route:ActivatedRoute){ }
}
