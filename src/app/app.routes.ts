import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibroFormComponent } from './libro-form/libro-form.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        title: 'Pagina de inicio'
    },
    {
        path:'libro-form/:id',
        component:LibroFormComponent,
        title: 'Formulario de libros'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }
];
