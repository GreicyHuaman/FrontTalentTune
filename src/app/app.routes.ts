import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { BandaComponent } from './components/banda/banda.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ListarcategoriaComponent } from './components/categoria/listarcategoria/listarcategoria.component';
import { ListarusuarioComponent } from './components/usuario/listarusuario/listarusuario.component';
import { CreaeditabandaComponent } from './components/banda/creaeditabanda/creaeditabanda.component';
import { ListarbandaComponent } from './components/banda/listarbanda/listarbanda.component';

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
    }
];
