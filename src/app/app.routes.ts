import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditausuarioComponent } from './components/usuario/creaeditausuario/creaeditausuario.component';

export const routes: Routes = [
    {
        //rutas del front
        path:'usuarios', component:UsuarioComponent,
        children:[{
            path:'registrar',component:CreaeditausuarioComponent
        }]
    }
];
