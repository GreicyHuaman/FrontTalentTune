import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuarioComponent } from './listarusuario/listarusuario.component';
import { CreaeditausuarioComponent } from './creaeditausuario/creaeditausuario.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [ListarusuarioComponent, RouterOutlet, CreaeditausuarioComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  constructor(public route:ActivatedRoute){ }
}
