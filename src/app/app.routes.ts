import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';

// export const routes: Routes = [
//   { path: '', component: PokemonListComponent },
//   { path: ':name', component: PokemonDetailComponent },
export const routes: Routes = [
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'pokemon/:name', component: PokemonDetailComponent },
];
