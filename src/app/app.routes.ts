import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RotaComponent } from './components/rota/rota.component';
import { FornecedoresComponent } from './components/fornecedores/fornecedores.component';
import { FornecedoresDetailsComponent } from './components/fornecedores-details/fornecedores-details.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'nova-rota', component: RotaComponent},
    {path: 'fornecedores', component: FornecedoresComponent},
    {path: 'fornecedores/:id', component: FornecedoresDetailsComponent},
    {path: '**', component: HomeComponent}
];
