import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarbandaComponent } from "./listarbanda/listarbanda.component";

@Component({
  selector: 'app-banda',
  standalone: true,
  imports: [ListarbandaComponent, RouterOutlet],
  templateUrl: './banda.component.html',
  styleUrl: './banda.component.css'
})
export class BandaComponent {
  constructor(public route:ActivatedRoute){}

  
}
