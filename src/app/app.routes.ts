import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CtraderCallback } from './ctrader-callback/ctrader-callback';

import { Prices} from './prices/prices';
export const routes: Routes = [
    {path: '', component: Home},
    {path: 'ctrader', component: CtraderCallback}
    ,{path: 'prices', component: Prices}
];
