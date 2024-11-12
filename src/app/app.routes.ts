import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { BandaComponent } from './components/banda/banda.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ListarcategoriaComponent } from './components/categoria/listarcategoria/listarcategoria.component';
import { ListarusuarioComponent } from './components/usuario/listarusuario/listarusuario.component';
import { CreaeditabandaComponent } from './components/banda/creaeditabanda/creaeditabanda.component';
import { ListarbandaComponent } from './components/banda/listarbanda/listarbanda.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { ListarnotificacionComponent } from './components/notificacion/listarnotificacion/listarnotificacion.component';
import { CreaeditanotificacionComponent } from './components/notificacion/creaeditanotificacion/creaeditanotificacion.component';
import { RolComponent } from './components/rol/rol.component';
import { ListarrolComponent } from './components/rol/listarrol/listarrol.component';
import { CreaeditarolComponent } from './components/rol/creaeditarol/creaeditarol.component';
import { CreaeditacategoriaComponent } from './components/categoria/creaeditacategoria/creaeditacategoria.component';
import { CreaeditausuarioComponent } from './components/usuario/creaeditausuario/creaeditausuario.component';
import { EventoComponent } from './components/evento/evento.component';
import { ListareventoComponent } from './components/evento/listarevento/listarevento.component';
import { CreaeditaeventoComponent } from './components/evento/creaeditaevento/creaeditaevento.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { ListarcontratoComponent } from './components/contrato/listarcontrato/listarcontrato.component';
import { CreaeditacontratoComponent } from './components/contrato/creaeditacontrato/creaeditacontrato.component';
import { UsuarioeventoComponent } from './components/usuarioevento/usuarioevento.component';
import { CreaeditausuarioeventoComponent } from './components/usuarioevento/creaeditausuarioevento/creaeditausuarioevento.component';
import { ListarusuarioeventoComponent } from './components/usuarioevento/listarusuarioevento/listarusuarioevento.component';
import { UsuariobandaComponent } from './components/usuariobanda/usuariobanda.component';
import { ListarusuariobandaComponent } from './components/usuariobanda/listarusuariobanda/listarusuariobanda.component';
import { CreaeditausuariobandaComponent } from './components/usuariobanda/creaeditausuariobanda/creaeditausuariobanda.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportebandasmascontratosactivosComponent } from './components/reportes/reportebandasmascontratosactivos/reportebandasmascontratosactivos.component';

export const routes: Routes = [
  {
    //rutas del front
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      {
        path: 'listar',
        component: ListarusuarioComponent,
      },
      {
        path: 'registrar',
        component: CreaeditausuarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditausuarioComponent,
      },
    ],
  },

  {
    path: 'bandas',
    component: BandaComponent,
    children: [
      {
        path: 'listar',
        component: ListarbandaComponent,
      },
      {
        path: 'registrar',
        component: CreaeditabandaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditabandaComponent,
      },
    ],
  },

  {
    path: 'categorias',
    component: CategoriaComponent,
    children: [
      {
        path: 'listar',
        component: ListarcategoriaComponent,
      },
      {
        path: 'registrar',
        component: CreaeditacategoriaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditacategoriaComponent,
      },
    ],
  },

  {
    path: 'notificaciones',
    component: NotificacionComponent,
    children: [
      {
        path: 'listar',
        component: ListarnotificacionComponent,
      },
      {
        path: 'registrar',
        component: CreaeditanotificacionComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditanotificacionComponent,
      },
    ],
  },

  {
    path: 'roles',
    component: RolComponent,
    children: [
      {
        path: 'listar',
        component: ListarrolComponent,
      },
      {
        path: 'registrar',
        component: CreaeditarolComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditarolComponent,
      },
    ],
  },
  {
    path: 'eventos',
    component: EventoComponent,
    children: [
      {
        path: 'listar',
        component: ListareventoComponent,
      },
      {
        path: 'registrar',
        component: CreaeditaeventoComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaeventoComponent,
      },
    ],
  },

  {
    path: 'usuarioevento',
    component: UsuarioeventoComponent,
    children: [
      {
        path: 'listar',
        component: ListarusuarioeventoComponent,
      },
      {
        path: 'registrar',
        component: CreaeditausuarioeventoComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditausuarioeventoComponent,
      },
    ],
  },

  {
    path: 'usuariobanda',
    component: UsuariobandaComponent,
    children: [
      {
        path: 'listar',
        component: ListarusuariobandaComponent,
      },
      {
        path: 'registrar',
        component: CreaeditausuariobandaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditausuariobandaComponent,
      },
    ],
  },
  {
    path: 'contratos',
    component: ContratoComponent,
    children: [
      {
        path: 'listar',
        component: ListarcontratoComponent,
      },
      {
        path: 'registrar',
        component: CreaeditacontratoComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditacontratoComponent,
      },
    ],
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    children: [
      {
        path: 'reportemayorcontratos',
        component: ReportebandasmascontratosactivosComponent,
      },
    ],
  },
];
