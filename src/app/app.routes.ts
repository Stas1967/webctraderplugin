import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Prices } from './prices/prices';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'prices', component: Prices },
];
