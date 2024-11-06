import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../models/pokemon.model';

export const loadPokemons = createAction(
  '[Pokemon List] Load Pokemons',
  props<{ limit: number; offset: number }>()
);

export const loadPokemonsSuccess = createAction(
  '[Pokemon API] Load Pokemons Success',
  props<{ pokemons: Pokemon[] }>()
);

export const loadPokemonsFailure = createAction(
  '[Pokemon API] Load Pokemons Failure',
  props<{ error: any }>()
);
