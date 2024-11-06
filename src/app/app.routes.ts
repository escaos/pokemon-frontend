import { Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon/components/pokemon-list.component';

export const appRoutes: Routes = [
  {
    path: 'pokemon',
    component: PokemonListComponent,
  },
  { path: '', redirectTo: '/pokemon', pathMatch: 'full' },
];
