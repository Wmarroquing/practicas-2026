import { Routes } from '@angular/router';
import { Login } from './views/login/login';
import { Register } from './views/register/register';

export const routes: Routes = [
    {path:"register", component:Register},
    {path: "login", component: Login},
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
