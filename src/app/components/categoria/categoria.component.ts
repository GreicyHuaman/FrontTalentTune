import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcategoriaComponent } from "./listarcategoria/listarcategoria.component";


@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [ListarcategoriaComponent, RouterOutlet],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  constructor(public route:ActivatedRoute){}

}
