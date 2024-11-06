import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { BandaComponent } from './components/banda/banda.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { RolComponent } from './components/rol/rol.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { ContratoComponent } from './components/contrato/contrato.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UsuarioComponent,
    BandaComponent,
    CategoriaComponent,
    NotificacionComponent,
    RolComponent,
    ComentarioComponent,
    MensajeComponent,
    ContratoComponent,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontTalentTune';
}
