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

export const routes: Routes = [
    {
        //rutas del front
        path:'usuarios', component:UsuarioComponent,
        children:[{
            path:'listar',component:ListarusuarioComponent
        }]
    },

    {
        path:'bandas', component:BandaComponent,
        children:[
            {
                path:'listar', component:ListarbandaComponent
            },
            {
                path:'registrar', component:CreaeditabandaComponent
            },
            {
                path:'ediciones/:id', component:CreaeditabandaComponent
            }
        ]
    },

    {
        path:'categorias', component:CategoriaComponent,
        children:[
            {
                path:'listar', component:ListarcategoriaComponent
            }
        ]
    },

    {
        path:'notificaciones', component:NotificacionComponent,
        children:[
            {
                path:'listar', component:ListarnotificacionComponent
            },
            {
                path:'registrar', component:CreaeditanotificacionComponent
            },
            {
                path:'ediciones/:id', component:CreaeditanotificacionComponent
            }
        ]
    }
];
